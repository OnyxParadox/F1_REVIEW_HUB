const db = require('../db');
const { fallbackStore } = require('../utils/initDb');

class DbService {
  // ---------------- TEAMS ----------------
  async getTeams() {
    try {
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
    } catch (err) {
      console.warn('Using fallback data for getTeams:', err.message);
      return fallbackStore.teams.map(team => ({
        ...team,
        drivers: fallbackStore.drivers.filter(d => d.team_id === team.id)
      }));
    }
  }

  async getTeamById(id) {
    const teamId = parseInt(id, 10);
    try {
      const res = await db.query('SELECT * FROM teams WHERE id = $1', [teamId]);
      if (res.rows.length === 0) return null;
      const team = res.rows[0];

      // Get drivers
      const driversRes = await db.query('SELECT * FROM drivers WHERE team_id = $1 ORDER BY points DESC', [teamId]);
      team.drivers = driversRes.rows;

      // Get car
      const carRes = await db.query('SELECT * FROM cars WHERE team_id = $1', [teamId]);
      team.car = carRes.rows[0] || null;

      // Get reviews
      const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Team' AND subject_id = $1 ORDER BY created_at DESC", [teamId]);
      team.reviews = reviewsRes.rows;

      return team;
    } catch (err) {
      console.warn(`Using fallback data for getTeamById(${teamId}):`, err.message);
      const team = fallbackStore.teams.find(t => t.id === teamId);
      if (!team) return null;
      return {
        ...team,
        drivers: fallbackStore.drivers.filter(d => d.team_id === teamId),
        car: fallbackStore.cars.find(c => c.team_id === teamId) || null,
        reviews: fallbackStore.reviews.filter(r => r.category === 'Team' && r.subject_id === teamId)
      };
    }
  }

  // ---------------- DRIVERS ----------------
  async getDrivers() {
    try {
      const res = await db.query(`
        SELECT d.*, t.name AS team_name, t.code AS team_code, t.color_hex AS team_color
        FROM drivers d
        LEFT JOIN teams t ON d.team_id = t.id
        ORDER BY d.points DESC;
      `);
      return res.rows;
    } catch (err) {
      console.warn('Using fallback data for getDrivers:', err.message);
      return fallbackStore.drivers;
    }
  }

  async getDriverById(id) {
    const driverId = parseInt(id, 10);
    try {
      const res = await db.query(`
        SELECT d.*, t.name AS team_name, t.code AS team_code, t.color_hex AS team_color, t.chassis, t.power_unit
        FROM drivers d
        LEFT JOIN teams t ON d.team_id = t.id
        WHERE d.id = $1
      `, [driverId]);
      
      if (res.rows.length === 0) return null;
      const driver = res.rows[0];

      // Get recent race results
      const resultsRes = await db.query(`
        SELECT rr.*, r.grand_prix_name, r.circuit_name, r.race_date, r.round_number
        FROM race_results rr
        JOIN races r ON rr.race_id = r.id
        WHERE rr.driver_id = $1
        ORDER BY r.round_number DESC
        LIMIT 5;
      `, [driverId]);
      driver.recent_results = resultsRes.rows;

      // Get reviews
      const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Driver' AND subject_id = $1 ORDER BY created_at DESC", [driverId]);
      driver.reviews = reviewsRes.rows;

      return driver;
    } catch (err) {
      console.warn(`Using fallback data for getDriverById(${driverId}):`, err.message);
      const driver = fallbackStore.drivers.find(d => d.id === driverId);
      if (!driver) return null;
      return {
        ...driver,
        recent_results: [
          { race_id: 9, grand_prix_name: 'Canadian Grand Prix', circuit_name: 'Circuit Gilles Villeneuve', race_date: '2026-06-09', round_number: 9, position: 1, points_earned: 25, race_time_or_status: '1:45:47.997' },
          { race_id: 8, grand_prix_name: 'Monaco Grand Prix', circuit_name: 'Circuit de Monaco', race_date: '2026-05-26', round_number: 8, position: 2, points_earned: 18, race_time_or_status: '+1.854s' }
        ],
        reviews: fallbackStore.reviews.filter(r => r.category === 'Driver' && r.subject_id === driverId)
      };
    }
  }

  // ---------------- CARS ----------------
  async getCars() {
    try {
      const res = await db.query(`
        SELECT c.*, t.name AS team_name, t.code AS team_code, t.color_hex
        FROM cars c
        LEFT JOIN teams t ON c.team_id = t.id
        ORDER BY c.top_speed_kph DESC;
      `);
      return res.rows;
    } catch (err) {
      console.warn('Using fallback data for getCars:', err.message);
      return fallbackStore.cars;
    }
  }

  async getCarById(id) {
    const carId = parseInt(id, 10);
    try {
      const res = await db.query(`
        SELECT c.*, t.name AS team_name, t.code AS team_code, t.color_hex, t.team_principal, t.base
        FROM cars c
        LEFT JOIN teams t ON c.team_id = t.id
        WHERE c.id = $1
      `, [carId]);

      if (res.rows.length === 0) return null;
      const car = res.rows[0];

      // Get team drivers
      const driversRes = await db.query('SELECT id, name, code, permanent_number, nationality FROM drivers WHERE team_id = $1', [car.team_id]);
      car.drivers = driversRes.rows;

      // Get reviews
      const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Car' AND subject_id = $1 ORDER BY created_at DESC", [carId]);
      car.reviews = reviewsRes.rows;

      return car;
    } catch (err) {
      console.warn(`Using fallback data for getCarById(${carId}):`, err.message);
      const car = fallbackStore.cars.find(c => c.id === carId);
      if (!car) return null;
      return {
        ...car,
        drivers: fallbackStore.drivers.filter(d => d.team_id === car.team_id),
        reviews: fallbackStore.reviews.filter(r => r.category === 'Car' && r.subject_id === carId)
      };
    }
  }

  // ---------------- RACES ----------------
  async getRaces() {
    try {
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
    } catch (err) {
      console.warn('Using fallback data for getRaces:', err.message);
      return fallbackStore.races;
    }
  }

  async getRaceById(id) {
    const raceId = parseInt(id, 10);
    try {
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

      // Get race results top 10
      const resultsRes = await db.query(`
        SELECT rr.*, d.name AS driver_name, d.code AS driver_code, d.permanent_number, t.name AS team_name, t.color_hex AS team_color
        FROM race_results rr
        JOIN drivers d ON rr.driver_id = d.id
        JOIN teams t ON rr.team_id = t.id
        WHERE rr.race_id = $1
        ORDER BY rr.position ASC;
      `, [raceId]);
      race.results = resultsRes.rows;

      // Get race review
      const reviewsRes = await db.query("SELECT * FROM reviews WHERE category = 'Race' AND subject_id = $1 ORDER BY created_at DESC", [raceId]);
      race.reviews = reviewsRes.rows;

      return race;
    } catch (err) {
      console.warn(`Using fallback data for getRaceById(${raceId}):`, err.message);
      const race = fallbackStore.races.find(r => r.id === raceId);
      if (!race) return null;
      return {
        ...race,
        results: [
          { id: 1, position: 1, grid_position: 2, driver_name: 'Maximus Vance', driver_code: 'VAN', permanent_number: 1, team_name: 'Apex Racing Engineering', team_color: '#E10600', points_earned: 25, race_time_or_status: '1:45:47.997', fastest_lap: false },
          { id: 2, position: 2, grid_position: 1, driver_name: 'Lewis Hamilton', driver_code: 'HAM', permanent_number: 44, team_name: 'Silver Arrow Motorsport', team_color: '#00D2BE', points_earned: 19, race_time_or_status: '+2.286s', fastest_lap: true },
          { id: 3, position: 3, grid_position: 4, driver_name: 'George Russell', driver_code: 'RUS', permanent_number: 63, team_name: 'Silver Arrow Motorsport', team_color: '#00D2BE', points_earned: 15, race_time_or_status: '+4.313s', fastest_lap: false },
          { id: 4, position: 4, grid_position: 3, driver_name: 'Charles LeClerc', driver_code: 'LEC', permanent_number: 16, team_name: 'Scuderia Velocita', team_color: '#FF1801', points_earned: 12, race_time_or_status: '+10.244s', fastest_lap: false },
          { id: 5, position: 5, grid_position: 7, driver_name: 'Lando Norris', driver_code: 'NOR', permanent_number: 4, team_name: 'Papaya Speedworks', team_color: '#FF8000', points_earned: 10, race_time_or_status: '+12.308s', fastest_lap: false }
        ],
        reviews: fallbackStore.reviews.filter(r => r.category === 'Race' && r.subject_id === raceId)
      };
    }
  }

  // ---------------- STANDINGS ----------------
  async getDriverStandings() {
    try {
      const res = await db.query(`
        SELECT ds.*, d.name AS driver_name, d.code AS driver_code, d.permanent_number, d.nationality,
               t.name AS team_name, t.code AS team_code, t.color_hex AS team_color
        FROM driver_standings ds
        JOIN drivers d ON ds.driver_id = d.id
        JOIN teams t ON ds.team_id = t.id
        ORDER BY ds.position ASC;
      `);
      if (res.rows.length > 0) return res.rows;
    } catch (err) {
      console.warn('Using fallback data for getDriverStandings:', err.message);
    }

    // Fallback computed standings
    return fallbackStore.drivers
      .sort((a, b) => b.points - a.points)
      .map((d, index) => ({
        id: index + 1,
        driver_id: d.id,
        driver_name: d.name,
        driver_code: d.code,
        permanent_number: d.permanent_number,
        nationality: d.nationality,
        team_name: d.team_name,
        team_color: d.team_color,
        position: index + 1,
        points: d.points,
        wins: d.wins,
        podiums: d.podiums,
        pole_positions: d.pole_positions,
        position_change: index === 1 ? 1 : index === 2 ? -1 : 0
      }));
  }

  async getConstructorStandings() {
    try {
      const res = await db.query(`
        SELECT cs.*, t.name AS team_name, t.code AS team_code, t.country, t.color_hex AS team_color, t.logo_symbol
        FROM constructor_standings cs
        JOIN teams t ON cs.team_id = t.id
        ORDER BY cs.position ASC;
      `);
      if (res.rows.length > 0) return res.rows;
    } catch (err) {
      console.warn('Using fallback data for getConstructorStandings:', err.message);
    }

    // Fallback constructor standings
    return fallbackStore.teams
      .sort((a, b) => b.points - a.points)
      .map((t, index) => ({
        id: index + 1,
        team_id: t.id,
        team_name: t.name,
        team_code: t.code,
        country: t.country,
        team_color: t.color_hex,
        logo_symbol: t.logo_symbol,
        position: index + 1,
        points: t.points,
        wins: index === 0 ? 9 : index === 1 ? 4 : 2,
        podiums: index === 0 ? 15 : index === 1 ? 12 : 9,
        position_change: index === 2 ? 1 : index === 3 ? -1 : 0
      }));
  }

  // ---------------- REVIEWS ----------------
  async getReviews(category) {
    try {
      let queryText = 'SELECT * FROM reviews';
      const params = [];
      if (category && category !== 'All') {
        queryText += ' WHERE category = $1';
        params.push(category);
      }
      queryText += ' ORDER BY created_at DESC';

      const res = await db.query(queryText, params);
      return res.rows;
    } catch (err) {
      console.warn('Using fallback data for getReviews:', err.message);
      if (category && category !== 'All') {
        return fallbackStore.reviews.filter(r => r.category === category);
      }
      return fallbackStore.reviews;
    }
  }

  async getReviewById(id) {
    const reviewId = parseInt(id, 10);
    try {
      const res = await db.query('SELECT * FROM reviews WHERE id = $1', [reviewId]);
      return res.rows[0] || null;
    } catch (err) {
      console.warn(`Using fallback data for getReviewById(${reviewId}):`, err.message);
      return fallbackStore.reviews.find(r => r.id === reviewId) || null;
    }
  }

  async createReview({ category, subject_id, title, author, rating, review_text }) {
    try {
      const res = await db.query(`
        INSERT INTO reviews (category, subject_id, title, author, rating, review_text)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `, [category, parseInt(subject_id, 10), title, author, parseInt(rating, 10), review_text]);

      return res.rows[0];
    } catch (err) {
      console.warn('Adding review to in-memory fallback store:', err.message);
      const newReview = {
        id: fallbackStore.reviews.length + 1,
        category,
        subject_id: parseInt(subject_id, 10),
        title,
        author: author || 'Anonymous Fan',
        rating: parseInt(rating, 10),
        review_text,
        created_at: new Date().toISOString()
      };
      fallbackStore.reviews.unshift(newReview);
      return newReview;
    }
  }
}

module.exports = new DbService();
