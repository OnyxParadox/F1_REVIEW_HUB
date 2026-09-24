const fs = require('fs');
const path = require('path');
const db = require('../db');

// In-memory fallback data store used when PostgreSQL connection is unavailable
const fallbackStore = {
  teams: [
    { id: 1, name: 'Apex Racing Engineering', code: 'APX', country: 'United Kingdom', team_principal: 'Christian Vane', base: 'Silverstone, UK', chassis: 'AR-24 Prototype', power_unit: 'Apex Turbo Hybrid V6', color_hex: '#E10600', description: 'The reigning benchmark of high-speed efficiency and dominant aero balance.', championships_won: 6, points: 485, logo_symbol: '🔴' },
    { id: 2, name: 'Scuderia Velocita', code: 'VEL', country: 'Italy', team_principal: 'Matteo Rossi', base: 'Maranello, Italy', chassis: 'SF-V26', power_unit: 'Velocita Superfast V6', color_hex: '#FF1801', description: 'Motorsport heritage built on passionate engineering, high straight-line speed, and iconic crimson styling.', championships_won: 16, points: 420, logo_symbol: '🐎' },
    { id: 3, name: 'Silver Arrow Motorsport', code: 'SAM', country: 'Germany', team_principal: 'Toto Sterling', base: 'Brackley, UK', chassis: 'W16 Performance', power_unit: 'Silver Power M16', color_hex: '#00D2BE', description: 'Precision engineering, telemetry-driven race tactics, and unmatched high-speed stability.', championships_won: 8, points: 360, logo_symbol: '⚡' },
    { id: 4, name: 'Papaya Speedworks', code: 'PAP', country: 'United Kingdom', team_principal: 'Zak Harrison', base: 'Woking, UK', chassis: 'MCL-38 Turbo', power_unit: 'Apex Turbo Hybrid V6', color_hex: '#FF8000', description: 'Bold aerodynamic innovations and rapid mid-season upgrades.', championships_won: 9, points: 310, logo_symbol: '🍊' },
    { id: 5, name: 'Alpine Dynasty GP', code: 'ALP', country: 'France', team_principal: 'Bruno Laurent', base: 'Enstone, UK', chassis: 'A526 Sport', power_unit: 'Renault E-Tech 26', color_hex: '#0090FF', description: 'Historic French motorsport legacy combining aggressive mechanical setup.', championships_won: 2, points: 140, logo_symbol: '🔹' }
  ],
  drivers: [
    { id: 1, team_id: 1, name: 'Maximus Vance', code: 'VAN', permanent_number: 1, nationality: 'Netherlands', points: 275, championship_position: 1, wins: 8, podiums: 11, pole_positions: 7, driver_rating: 9.8, bio: 'Three-time world champion renowned for ruthless wheel-to-wheel overtaking and wet weather dominance.', avatar_symbol: '🥇', team_name: 'Apex Racing Engineering', team_color: '#E10600' },
    { id: 2, team_id: 2, name: 'Charles LeClerc', code: 'LEC', permanent_number: 16, nationality: 'Monaco', points: 210, championship_position: 2, wins: 3, podiums: 9, pole_positions: 5, driver_rating: 9.4, bio: 'Single-lap qualifying prodigy with blistering raw speed and tactical intelligence.', avatar_symbol: '🇲🇨', team_name: 'Scuderia Velocita', team_color: '#FF1801' },
    { id: 3, team_id: 3, name: 'Lewis Hamilton', code: 'HAM', permanent_number: 44, nationality: 'United Kingdom', points: 185, championship_position: 3, wins: 2, podiums: 7, pole_positions: 3, driver_rating: 9.6, bio: 'Seven-time champion legendary for tire management, rain mastery, and unmatched racecraft.', avatar_symbol: '👑', team_name: 'Silver Arrow Motorsport', team_color: '#00D2BE' },
    { id: 4, team_id: 4, name: 'Lando Norris', code: 'NOR', permanent_number: 4, nationality: 'United Kingdom', points: 160, championship_position: 4, wins: 1, podiums: 6, pole_positions: 2, driver_rating: 9.2, bio: 'Dynamic modern racer with relentless high-speed pace and surgical precision.', avatar_symbol: '🇬🇧', team_name: 'Papaya Speedworks', team_color: '#FF8000' },
    { id: 5, team_id: 1, name: 'Sergio Perez', code: 'PER', permanent_number: 11, nationality: 'Mexico', points: 120, championship_position: 5, wins: 1, podiums: 4, pole_positions: 1, driver_rating: 8.7, bio: 'Street circuit specialist with legendary tire conservation techniques.', avatar_symbol: '🇲🇽', team_name: 'Apex Racing Engineering', team_color: '#E10600' },
    { id: 6, team_id: 2, name: 'Carlos Sainz', code: 'SAI', permanent_number: 55, nationality: 'Spain', points: 110, championship_position: 6, wins: 1, podiums: 3, pole_positions: 1, driver_rating: 8.9, bio: 'The Smooth Operator. Highly analytical driver providing key engineering feedback.', avatar_symbol: '🇪🇸', team_name: 'Scuderia Velocita', team_color: '#FF1801' },
    { id: 7, team_id: 3, name: 'George Russell', code: 'RUS', permanent_number: 63, nationality: 'United Kingdom', points: 95, championship_position: 7, wins: 0, podiums: 2, pole_positions: 1, driver_rating: 8.8, bio: 'Analytical tactician known for exceptional one-lap qualifying pace.', avatar_symbol: '🇬🇧', team_name: 'Silver Arrow Motorsport', team_color: '#00D2BE' },
    { id: 8, team_id: 4, name: 'Oscar Piastri', code: 'PIA', permanent_number: 81, nationality: 'Australia', points: 90, championship_position: 8, wins: 1, podiums: 2, pole_positions: 0, driver_rating: 8.9, bio: 'Fearless young talent displaying calm composure under pressure.', avatar_symbol: '🇦🇺', team_name: 'Papaya Speedworks', team_color: '#FF8000' },
    { id: 9, team_id: 5, name: 'Esteban Ocon', code: 'OCO', permanent_number: 31, nationality: 'France', points: 45, championship_position: 9, wins: 0, podiums: 0, pole_positions: 0, driver_rating: 8.1, bio: 'Resilient defender capable of securing massive results in unpredictable race conditions.', avatar_symbol: '🇫🇷', team_name: 'Alpine Dynasty GP', team_color: '#0090FF' },
    { id: 10, team_id: 5, name: 'Pierre Gasly', code: 'GAS', permanent_number: 10, nationality: 'France', points: 40, championship_position: 10, wins: 0, podiums: 0, pole_positions: 0, driver_rating: 8.2, bio: 'Grand Prix winner with aggressive instincts and technical consistency.', avatar_symbol: '🇫🇷', team_name: 'Alpine Dynasty GP', team_color: '#0090FF' }
  ],
  cars: [
    { id: 1, team_id: 1, car_name: 'Apex AR-24', engine: 'Apex Turbo Hybrid V6 1.6L', chassis: 'Carbon-fiber honeycomb monocoque', top_speed_kph: 355, acceleration_0_100: 2.4, weight_kg: 798, wheelbase_mm: 3600, aero_downforce_score: 98, description: 'Ground-effect masterpiece optimized for extreme underbody downforce and DRS efficiency.', rating: 9.8, strengths: 'High-speed cornering stability, DRS efficiency', weaknesses: 'Sensitive brake balance under low fuel load', team_name: 'Apex Racing Engineering', color_hex: '#E10600' },
    { id: 2, team_id: 2, car_name: 'Velocita SF-V26', engine: 'Velocita Superfast V6 Turbo', chassis: 'Composite carbon-fiber structure', top_speed_kph: 352, acceleration_0_100: 2.5, weight_kg: 798, wheelbase_mm: 3580, aero_downforce_score: 95, description: 'Straight-line rocket featuring high-rev engine mapping and responsive front-wing aerodynamics.', rating: 9.5, strengths: 'Raw power output, traction out of slow corners', weaknesses: 'Tire degradation during extended stint windows', team_name: 'Scuderia Velocita', color_hex: '#FF1801' },
    { id: 3, team_id: 3, car_name: 'Silver Arrow W16', engine: 'Silver Power M16 E-Performance', chassis: 'Pre-preg carbon-fiber composite', top_speed_kph: 348, acceleration_0_100: 2.5, weight_kg: 798, wheelbase_mm: 3600, aero_downforce_score: 93, description: 'Highly adaptable chassis architecture with active suspension tuning.', rating: 9.3, strengths: 'Braking stability, high-speed chicane transitions', weaknesses: 'Narrow setup operating temperature window', team_name: 'Silver Arrow Motorsport', color_hex: '#00D2BE' },
    { id: 4, team_id: 4, car_name: 'Papaya MCL-38', engine: 'Apex Turbo Hybrid V6 1.6L', chassis: 'Carbon-composite honeycomb', top_speed_kph: 350, acceleration_0_100: 2.4, weight_kg: 798, wheelbase_mm: 3590, aero_downforce_score: 94, description: 'Aggressive high-downforce floor design producing rapid mid-corner speeds.', rating: 9.4, strengths: 'Medium/High-speed cornering grip', weaknesses: 'Top speed penalty on ultra-long straights', team_name: 'Papaya Speedworks', color_hex: '#FF8000' },
    { id: 5, team_id: 5, car_name: 'Alpine A526', engine: 'Renault E-Tech 26 Turbo', chassis: 'Moulded carbon fiber monocoque', top_speed_kph: 345, acceleration_0_100: 2.6, weight_kg: 798, wheelbase_mm: 3570, aero_downforce_score: 88, description: 'Balanced mid-pack challenger designed for mechanical grip and consistent power.', rating: 8.4, strengths: 'Slow-speed traction, mechanical kerb compliance', weaknesses: 'Drag at maximum wing settings', team_name: 'Alpine Dynasty GP', color_hex: '#0090FF' }
  ],
  races: [
    { id: 1, round_number: 1, grand_prix_name: 'Bahrain Grand Prix', circuit_name: 'Bahrain International Circuit', location_country: 'Bahrain', race_date: '2026-03-02', total_laps: 57, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Maximus Vance', winner_driver_id: 1, pole_driver_id: 1 },
    { id: 2, round_number: 2, grand_prix_name: 'Saudi Arabian Grand Prix', circuit_name: 'Jeddah Corniche Circuit', location_country: 'Saudi Arabia', race_date: '2026-03-09', total_laps: 50, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Charles LeClerc', winner_driver_id: 1, pole_driver_id: 2 },
    { id: 3, round_number: 3, grand_prix_name: 'Australian Grand Prix', circuit_name: 'Albert Park Circuit', location_country: 'Australia', race_date: '2026-03-24', total_laps: 58, status: 'Completed', winner_driver_name: 'Carlos Sainz', pole_driver_name: 'Maximus Vance', winner_driver_id: 6, pole_driver_id: 1 },
    { id: 4, round_number: 4, grand_prix_name: 'Japanese Grand Prix', circuit_name: 'Suzuka International Racing Course', location_country: 'Japan', race_date: '2026-04-07', total_laps: 53, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Maximus Vance', winner_driver_id: 1, pole_driver_id: 1 },
    { id: 5, round_number: 5, grand_prix_name: 'Chinese Grand Prix', circuit_name: 'Shanghai International Circuit', location_country: 'China', race_date: '2026-04-21', total_laps: 56, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Maximus Vance', winner_driver_id: 1, pole_driver_id: 1 },
    { id: 6, round_number: 6, grand_prix_name: 'Miami Grand Prix', circuit_name: 'Miami International Autodrome', location_country: 'USA', race_date: '2026-05-05', total_laps: 57, status: 'Completed', winner_driver_name: 'Lando Norris', pole_driver_name: 'Maximus Vance', winner_driver_id: 4, pole_driver_id: 1 },
    { id: 7, round_number: 7, grand_prix_name: 'Emilia Romagna Grand Prix', circuit_name: 'Autodromo Enzo e Dino Ferrari', location_country: 'Italy', race_date: '2026-05-19', total_laps: 63, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Maximus Vance', winner_driver_id: 1, pole_driver_id: 1 },
    { id: 8, round_number: 8, grand_prix_name: 'Monaco Grand Prix', circuit_name: 'Circuit de Monaco', location_country: 'Monaco', race_date: '2026-05-26', total_laps: 78, status: 'Completed', winner_driver_name: 'Charles LeClerc', pole_driver_name: 'Charles LeClerc', winner_driver_id: 2, pole_driver_id: 2 },
    { id: 9, round_number: 9, grand_prix_name: 'Canadian Grand Prix', circuit_name: 'Circuit Gilles Villeneuve', location_country: 'Canada', race_date: '2026-06-09', total_laps: 70, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Lewis Hamilton', winner_driver_id: 1, pole_driver_id: 3 },
    { id: 10, round_number: 10, grand_prix_name: 'Spanish Grand Prix', circuit_name: 'Circuit de Barcelona-Catalunya', location_country: 'Spain', race_date: '2026-06-23', total_laps: 66, status: 'Completed', winner_driver_name: 'Maximus Vance', pole_driver_name: 'Lando Norris', winner_driver_id: 1, pole_driver_id: 4 },
    { id: 11, round_number: 11, grand_prix_name: 'Austrian Grand Prix', circuit_name: 'Red Bull Ring', location_country: 'Austria', race_date: '2026-06-30', total_laps: 71, status: 'Scheduled', winner_driver_name: null, pole_driver_name: null, winner_driver_id: null, pole_driver_id: null },
    { id: 12, round_number: 12, grand_prix_name: 'British Grand Prix', circuit_name: 'Silverstone Circuit', location_country: 'United Kingdom', race_date: '2026-07-07', total_laps: 52, status: 'Scheduled', winner_driver_name: null, pole_driver_name: null, winner_driver_id: null, pole_driver_id: null }
  ],
  reviews: [
    { id: 1, category: 'Race', subject_id: 8, title: 'Monaco GP — Pure Qualifying Masterclass & Tactical Chess', author: 'Motorsport Analyst Pro', rating: 5, review_text: 'The Monaco Grand Prix was an absolute tactical masterpiece. Leclerc delivered an extraordinary pole lap on Saturday, defending masterfully through St. Devote.', created_at: new Date().toISOString() },
    { id: 2, category: 'Race', subject_id: 9, title: 'Canadian GP — Rain, Safety Cars, and Edge-of-Seat Drama', author: 'Telemetry Central', rating: 5, review_text: 'A chaotic wet-to-dry transition race in Montreal. Maximus Vance proved his racecraft under pressure.', created_at: new Date().toISOString() },
    { id: 3, category: 'Driver', subject_id: 1, title: 'Maximus Vance — Clinical Precision Under All Track Conditions', author: 'F1 Technical Digest', rating: 5, review_text: 'Vance has turned race management into a science. His ability to build a gap while conserving tires is unmatched.', created_at: new Date().toISOString() },
    { id: 4, category: 'Driver', subject_id: 2, title: 'Charles LeClerc — The Raw Speed Qualifying King', author: 'Apex Insider', rating: 4, review_text: 'LeClerc possesses unbelievable single-lap commitment. When the car setup is in its window, nobody extracts more peak lap time.', created_at: new Date().toISOString() },
    { id: 5, category: 'Car', subject_id: 1, title: 'Apex AR-24 — Unbeatable Underbody Aero & DRS Efficiency', author: 'Aerodynamics Today', rating: 5, review_text: 'The AR-24 floor venturi tunnels create supreme downforce without drag penalties.', created_at: new Date().toISOString() },
    { id: 6, category: 'Car', subject_id: 2, title: 'Velocita SF-V26 — Blistering Straight-Line Horsepower', author: 'Engine Room Review', rating: 4, review_text: 'The Velocita V6 power unit leads the grid in top-end deployment.', created_at: new Date().toISOString() },
    { id: 7, category: 'Team', subject_id: 1, title: 'Apex Racing — Operation Flawless Pit Execution', author: 'Grid Strategy Watch', rating: 5, review_text: 'Sub-2.0 second pit stops, aggressive undercut calls, and rapid telemetry processing keep Apex at the pinnacle.', created_at: new Date().toISOString() },
    { id: 8, category: 'Team', subject_id: 4, title: 'Papaya Speedworks — The Ultimate Upgrades & Resurgence', author: 'Paddock Pulse', rating: 4, review_text: 'From mid-grid struggles to victory contention, Papaya has produced the most effective upgrade package of the season.', created_at: new Date().toISOString() }
  ]
};

async function initDb() {
  try {
    // Check if connected
    const testResult = await db.query('SELECT 1 as connection_test');
    if (testResult && testResult.rows.length > 0) {
      console.log('⚡ Checking database schema status...');
      
      // Check if teams table exists
      const tableCheck = await db.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'teams'
        );
      `);

      const exists = tableCheck.rows[0].exists;
      if (!exists) {
        console.log('🔄 Database tables not found. Executing schema.sql and seed.sql...');
        const schemaPath = path.join(__dirname, '../../../database/schema.sql');
        const seedPath = path.join(__dirname, '../../../database/seed.sql');

        if (fs.existsSync(schemaPath)) {
          const schemaSql = fs.readFileSync(schemaPath, 'utf8');
          await db.query(schemaSql);
          console.log('✅ Executed schema.sql successfully');
        }

        if (fs.existsSync(seedPath)) {
          const seedSql = fs.readFileSync(seedPath, 'utf8');
          await db.query(seedSql);
          console.log('✅ Executed seed.sql successfully');
        }
      } else {
        console.log('✅ Database schema verified. PostgreSQL tables ready.');
      }
      return { isPostgres: true };
    }
  } catch (error) {
    console.warn('⚠️ Could not connect to PostgreSQL or initialize database automatically:', error.message);
    console.warn('⚠️ Switching to Built-in High-Performance In-Memory Data Fallback mode.');
    return { isPostgres: false };
  }
}

module.exports = {
  initDb,
  fallbackStore
};
