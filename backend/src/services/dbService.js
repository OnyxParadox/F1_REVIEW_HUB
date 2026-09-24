const db = require('../db');

class DbService {
  // ---------------- TEAMS ----------------
  async getTeams() {
    const res = await db.query(`
      SELECT t.*, 
        COALESCE(json_agg(json_build_object(
          'id', d.id, 
          'name', d.name, 
          'code', d.code, 
          'permanent_number', d.permanent_number,
          'nationality', d.nationality,
          'avatar_symbol', d.avatar_symbol
        )) FILTER (WHERE d.id IS NOT NULL), '[]') AS drivers
      FROM teams t
      LEFT JOIN drivers d ON t.id = d.team_id
      GROUP BY t.id
      ORDER BY t.points DESC;
    `);
    return res.rows;
  }

  async getTeamById(id) {
    const teamId = parseInt(id, 10);
    const res = await db.query('SELECT * FROM teams WHERE id = $1', [teamId]);
    if (res.rows.length === 0) return null;
    const team = res.rows[0];

    const driversRes = await db.query('SELECT * FROM drivers WHERE team_id = $1 ORDER BY points DESC', [teamId]);
    team.drivers = driversRes.rows;

    const carRes = await db.query('SELECT * FROM cars WHERE team_id = $1', [teamId]);
    team.car = carRes.rows[0] || null;

    const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Team' AND subject_id = $1 ORDER BY created_at DESC", [teamId]);
    team.reviews = reviewsRes.rows;

    return team;
  }

  // ---------------- DRIVERS ----------------
  async getDrivers() {
    const res = await db.query(`
      SELECT d.*, t.name AS team_name, t.code AS team_code, t.color_hex AS team_color
      FROM drivers d
      LEFT JOIN teams t ON d.team_id = t.id
      ORDER BY d.points DESC;
    `);
    return res.rows;
  }

  async getDriverById(id) {
    const driverId = parseInt(id, 10);
    const res = await db.query(`
      SELECT d.*, t.name AS team_name, t.code AS team_code, t.color_hex AS team_color, t.chassis, t.power_unit
      FROM drivers d
      LEFT JOIN teams t ON d.team_id = t.id
      WHERE d.id = $1
    `, [driverId]);

    if (res.rows.length === 0) return null;
    const driver = res.rows[0];

    const resultsRes = await db.query(`
      SELECT rr.*, r.grand_prix_name, r.circuit_name, r.race_date, r.round_number
      FROM race_results rr
      JOIN races r ON rr.race_id = r.id
      WHERE rr.driver_id = $1
      ORDER BY r.round_number DESC
      LIMIT 5;
    `, [driverId]);
    driver.recent_results = resultsRes.rows;

    const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Driver' AND subject_id = $1 ORDER BY created_at DESC", [driverId]);
    driver.reviews = reviewsRes.rows;

    return driver;
  }

  // ---------------- CARS ----------------
  async getCars() {
    const res = await db.query(`
      SELECT c.*, t.name AS team_name, t.code AS team_code, t.color_hex
      FROM cars c
      LEFT JOIN teams t ON c.team_id = t.id
      ORDER BY c.top_speed_kph DESC;
    `);
    return res.rows;
  }

  async getCarById(id) {
    const carId = parseInt(id, 10);
    const res = await db.query(`
      SELECT c.*, t.name AS team_name, t.code AS team_code, t.color_hex, t.team_principal, t.base
      FROM cars c
      LEFT JOIN teams t ON c.team_id = t.id
      WHERE c.id = $1
    `, [carId]);

    if (res.rows.length === 0) return null;
    const car = res.rows[0];

    const driversRes = await db.query('SELECT id, name, code, permanent_number, nationality FROM drivers WHERE team_id = $1', [car.team_id]);
    car.drivers = driversRes.rows;

    const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Car' AND subject_id = $1 ORDER BY created_at DESC", [carId]);
    car.reviews = reviewsRes.rows;

    return car;
  }

  // ---------------- RACES ----------------
  async getRaces() {
    const res = await db.query(`
      SELECT r.*, 
             w.name AS winner_driver_name, w.code AS winner_code,
             p.name AS pole_driver_name, p.code AS pole_code,
             f.name AS fastest_lap_driver_name
      FROM races r
      LEFT JOIN drivers w ON r.winner_driver_id = w.id
      LEFT JOIN drivers p ON r.pole_driver_id = p.id
      LEFT JOIN drivers f ON r.fastest_lap_driver_id = f.id
      ORDER BY r.round_number ASC;
    `);
    return res.rows;
  }

  async getRaceById(id) {
    const raceId = parseInt(id, 10);
    const res = await db.query(`
      SELECT r.*, 
             w.name AS winner_driver_name, w.code AS winner_code,
             p.name AS pole_driver_name, p.code AS pole_code,
             f.name AS fastest_lap_driver_name
      FROM races r
      LEFT JOIN drivers w ON r.winner_driver_id = w.id
      LEFT JOIN drivers p ON r.pole_driver_id = p.id
      LEFT JOIN drivers f ON r.fastest_lap_driver_id = f.id
      WHERE r.id = $1;
    `, [raceId]);

    if (res.rows.length === 0) return null;
    const race = res.rows[0];

    const resultsRes = await db.query(`
      SELECT rr.*, d.name AS driver_name, d.code AS driver_code, d.permanent_number, t.name AS team_name, t.color_hex AS team_color
      FROM race_results rr
      JOIN drivers d ON rr.driver_id = d.id
      JOIN teams t ON rr.team_id = t.id
      WHERE rr.race_id = $1
      ORDER BY rr.position ASC;
    `, [raceId]);
    race.results = resultsRes.rows;

    const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Race' AND subject_id = $1 ORDER BY created_at DESC", [raceId]);
    race.reviews = reviewsRes.rows;

    return race;
  }

  // ---------------- STANDINGS ----------------
  async getDriverStandings() {
    const res = await db.query(`
      SELECT ds.*, d.name AS driver_name, d.code AS driver_code, d.permanent_number, d.nationality,
             t.name AS team_name, t.code AS team_code, t.color_hex AS team_color
      FROM driver_standings ds
      JOIN drivers d ON ds.driver_id = d.id
      JOIN teams t ON ds.team_id = t.id
      ORDER BY ds.position ASC;
    `);
    return res.rows;
  }

  async getConstructorStandings() {
    const res = await db.query(`
      SELECT cs.*, t.name AS team_name, t.code AS team_code, t.country, t.color_hex AS team_color, t.logo_symbol
      FROM constructor_standings cs
      JOIN teams t ON cs.team_id = t.id
      ORDER BY cs.position ASC;
    `);
    return res.rows;
  }

  // ---------------- REVIEWS ----------------
  async getReviews(category) {
    let queryText = 'SELECT * FROM reviews';
    const params = [];
    if (category && category !== 'All') {
      queryText += ' WHERE category = $1';
      params.push(category);
    }
    queryText += ' ORDER BY created_at DESC';

    const res = await db.query(queryText, params);
    return res.rows;
  }

  async getReviewById(id) {
    const reviewId = parseInt(id, 10);
    const res = await db.query('SELECT * FROM reviews WHERE id = $1', [reviewId]);
    return res.rows[0] || null;
  }

  async createReview({ category, subject_id, title, author, rating, review_text }) {
    const res = await db.query(`
      INSERT INTO reviews (category, subject_id, title, author, rating, review_text)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [category, parseInt(subject_id, 10), title, author, parseInt(rating, 10), review_text]);

    return res.rows[0];
  }
}

module.exports = new DbService();
