-- F1 Review Hub Sample / Seed Data
-- Note: Demo / Sample Season Data for Educational Purpose

-- Clear existing data
TRUNCATE reviews, constructor_standings, driver_standings, race_results, races, cars, drivers, teams RESTART IDENTITY CASCADE;

-- 1. INSERT TEAMS
INSERT INTO teams (id, name, code, country, team_principal, base, chassis, power_unit, color_hex, description, championships_won, points, logo_symbol) VALUES
(1, 'Apex Racing Engineering', 'APX', 'United Kingdom', 'Christian Vane', 'Silverstone, UK', 'AR-24 Prototype', 'Apex Turbo Hybrid V6', '#E10600', 'The reigning benchmark of high-speed efficiency and dominant aero balance. Famous for precision pit stops and high-downforce cornering stability.', 6, 485, '🔴'),
(2, 'Scuderia Velocita', 'VEL', 'Italy', 'Matteo Rossi', 'Maranello, Italy', 'SF-V26', 'Velocita Superfast V6', '#FF1801', 'Motorsport heritage built on passionate engineering, high straight-line speed, and iconic crimson styling.', 16, 420, '🐎'),
(3, 'Silver Arrow Motorsport', 'SAM', 'Germany', 'Toto Sterling', 'Brackley, UK', 'W16 Performance', 'Silver Power M16', '#00D2BE', 'Precision engineering, telemetry-driven race tactics, and unmatched high-speed stability across technical circuits.', 8, 360, '⚡'),
(4, 'Papaya Speedworks', 'PAP', 'United Kingdom', 'Zak Harrison', 'Woking, UK', 'MCL-38 Turbo', 'Apex Turbo Hybrid V6', '#FF8000', 'Bold aerodynamic innovations and rapid mid-season upgrades making them a dangerous contender on high-downforce tracks.', 9, 310, '🍊'),
(5, 'Alpine Dynasty GP', 'ALP', 'France', 'Bruno Laurent', 'Enstone, UK', 'A526 Sport', 'Renault E-Tech 26', '#0090FF', 'Historic French motorsport legacy combining aggressive mechanical setup with high straight-line efficiency.', 2, 140, '🔹');

-- 2. INSERT DRIVERS
INSERT INTO drivers (id, team_id, name, code, permanent_number, nationality, date_of_birth, points, championship_position, wins, podiums, pole_positions, driver_rating, bio, avatar_symbol) VALUES
(1, 1, 'Maximus Vance', 'VAN', 1, 'Netherlands', '1997-09-30', 275, 1, 8, 11, 7, 9.8, 'Three-time world champion renowned for ruthless wheel-to-wheel overtaking, wet weather dominance, and relentless lap consistency.', '🥇'),
(2, 2, 'Charles LeClerc', 'LEC', 16, 'Monaco', '1997-10-16', 210, 2, 3, 9, 5, 9.4, 'Single-lap qualifying prodigy with blistering raw speed and tactical intelligence on technical street tracks.', '🇲🇨'),
(3, 3, 'Lewis Hamilton', 'HAM', 44, 'United Kingdom', '1985-01-07', 185, 3, 2, 7, 3, 9.6, 'Seven-time champion legendary for tire management, rain mastery, and unmatched racecraft in high-pressure scenarios.', '👑'),
(4, 4, 'Lando Norris', 'NOR', 4, 'United Kingdom', '1999-11-13', 160, 4, 1, 6, 2, 9.2, 'Dynamic modern racer with relentless high-speed pace and surgical precision through rapid chicane transitions.', '🇬🇧'),
(5, 1, 'Sergio Perez', 'PER', 11, 'Mexico', '1990-01-26', 120, 5, 1, 4, 1, 8.7, 'The street circuit specialist with legendary tire conservation techniques and defense tactics.', '🇲🇽'),
(6, 2, 'Carlos Sainz', 'SAI', 55, 'Spain', '1994-09-01', 110, 6, 1, 3, 1, 8.9, 'The Smooth Operator. Highly analytical driver providing key engineering feedback and consistent point scoring.', '🇪🇸'),
(7, 3, 'George Russell', 'RUS', 63, 'United Kingdom', '1998-02-15', 95, 7, 0, 2, 1, 8.8, 'Analytical tactician known for exceptional one-lap qualifying pace and aggressive race restarts.', '🇬🇧'),
(8, 4, 'Oscar Piastri', 'PIA', 81, 'Australia', '2001-04-06', 90, 8, 1, 2, 0, 8.9, 'Fearless young talent displaying calm composure under pressure and exceptional overtaking maneuvers.', '🇦🇺'),
(9, 5, 'Esteban Ocon', 'OCO', 31, 'France', '1996-09-17', 45, 9, 0, 0, 0, 8.1, 'Resilient wheel-to-wheel defender capable of securing massive results in unpredictable race conditions.', '🇫🇷'),
(10, 5, 'Pierre Gasly', 'GAS', 10, 'France', '1996-02-07', 40, 10, 0, 0, 0, 8.2, 'Grand Prix winner with aggressive instincts, sharp race-pace recovery, and technical consistency.', '🇫🇷');

-- 3. INSERT CARS
INSERT INTO cars (id, team_id, car_name, engine, chassis, top_speed_kph, acceleration_0_100, weight_kg, wheelbase_mm, aero_downforce_score, description, rating, strengths, weaknesses) VALUES
(1, 1, 'Apex AR-24', 'Apex Turbo Hybrid V6 1.6L', 'Carbon-fiber honeycomb monocoque', 355, 2.4, 798, 3600, 98, 'Ground-effect masterpiece optimized for extreme underbody downforce and drag reduction system (DRS) efficiency.', 9.8, 'High-speed cornering stability, DRS efficiency, thermal tire management', 'Slightly sensitive brake balance under low fuel load'),
(2, 2, 'Velocita SF-V26', 'Velocita Superfast V6 Turbo', 'Composite carbon-fiber structure', 352, 2.5, 798, 3580, 95, 'Straight-line rocket featuring high-rev engine mapping and responsive front-wing aerodynamics.', 9.5, 'Raw power output, traction out of slow corners, single-lap speed', 'Tire degradation during extended stint windows'),
(3, 3, 'Silver Arrow W16', 'Silver Power M16 E-Performance', 'Pre-preg carbon-fiber composite', 348, 2.5, 798, 3600, 93, 'Highly adaptable chassis architecture with active suspension tuning and low-drag wing configuration.', 9.3, 'Braking stability, high-speed chicane transitions, wet track grip', 'Narrow setup operating temperature window'),
(4, 4, 'Papaya MCL-38', 'Apex Turbo Hybrid V6 1.6L', 'Carbon-composite honeycomb', 350, 2.4, 798, 3590, 94, 'Aggressive high-downforce floor design producing rapid mid-corner speeds on medium and fast tracks.', 9.4, 'Medium/High-speed cornering grip, rapid aero updates', 'Top speed penalty on ultra-long straights'),
(5, 5, 'Alpine A526', 'Renault E-Tech 26 Turbo', 'Moulded carbon fiber monocoque', 345, 2.6, 798, 3570, 88, 'Balanced mid-pack challenger designed for mechanical grip and consistent power distribution.', 8.4, 'Slow-speed traction, mechanical kerb compliance', 'Drag at maximum wing settings');

-- 4. INSERT RACES
INSERT INTO races (id, round_number, grand_prix_name, circuit_name, location_country, race_date, total_laps, status, winner_driver_id, pole_driver_id, fastest_lap_driver_id) VALUES
(1, 1, 'Bahrain Grand Prix', 'Bahrain International Circuit', 'Bahrain', '2026-03-02', 57, 'Completed', 1, 1, 1),
(2, 2, 'Saudi Arabian Grand Prix', 'Jeddah Corniche Circuit', 'Saudi Arabia', '2026-03-09', 50, 'Completed', 1, 2, 2),
(3, 3, 'Australian Grand Prix', 'Albert Park Circuit', 'Australia', '2026-03-24', 58, 'Completed', 6, 1, 4),
(4, 4, 'Japanese Grand Prix', 'Suzuka International Racing Course', 'Japan', '2026-04-07', 53, 'Completed', 1, 1, 1),
(5, 5, 'Chinese Grand Prix', 'Shanghai International Circuit', 'China', '2026-04-21', 56, 'Completed', 1, 1, 3),
(6, 6, 'Miami Grand Prix', 'Miami International Autodrome', 'USA', '2026-05-05', 57, 'Completed', 4, 1, 4),
(7, 7, 'Emilia Romagna Grand Prix', 'Autodromo Enzo e Dino Ferrari', 'Italy', '2026-05-19', 63, 'Completed', 1, 1, 1),
(8, 8, 'Monaco Grand Prix', 'Circuit de Monaco', 'Monaco', '2026-05-26', 78, 'Completed', 2, 2, 2),
(9, 9, 'Canadian Grand Prix', 'Circuit Gilles Villeneuve', 'Canada', '2026-06-09', 70, 'Completed', 1, 3, 3),
(10, 10, 'Spanish Grand Prix', 'Circuit de Barcelona-Catalunya', 'Spain', '2026-06-23', 66, 'Completed', 1, 4, 1),
(11, 11, 'Austrian Grand Prix', 'Red Bull Ring', 'Austria', '2026-06-30', 71, 'Scheduled', NULL, NULL, NULL),
(12, 12, 'British Grand Prix', 'Silverstone Circuit', 'United Kingdom', '2026-07-07', 52, 'Scheduled', NULL, NULL, NULL);

-- 5. INSERT RACE RESULTS (For Canada GP Round 9 demo)
INSERT INTO race_results (race_id, driver_id, team_id, position, grid_position, points_earned, race_time_or_status, fastest_lap) VALUES
(9, 1, 1, 1, 2, 25.0, '1:45:47.997', FALSE),
(9, 3, 3, 2, 1, 19.0, '+2.286s', TRUE),
(9, 7, 3, 3, 4, 15.0, '+4.313s', FALSE),
(9, 2, 2, 4, 3, 12.0, '+10.244s', FALSE),
(9, 4, 4, 5, 7, 10.0, '+12.308s', FALSE),
(9, 10, 5, 6, 10, 8.0, '+18.400s', FALSE),
(9, 5, 1, 7, 16, 6.0, '+21.200s', FALSE),
(9, 6, 2, 8, 12, 4.0, '+25.100s', FALSE),
(9, 8, 4, 9, 8, 2.0, '+29.400s', FALSE),
(9, 9, 5, 10, 9, 1.0, '+35.000s', FALSE);

-- 6. INSERT DRIVER STANDINGS
INSERT INTO driver_standings (driver_id, team_id, position, points, wins, podiums, pole_positions, position_change) VALUES
(1, 1, 1, 275.0, 8, 11, 7, 0),
(2, 2, 2, 210.0, 3, 9, 5, 1),
(3, 3, 3, 185.0, 2, 7, 3, -1),
(4, 4, 4, 160.0, 1, 6, 2, 0),
(5, 1, 5, 120.0, 1, 4, 1, 1),
(6, 2, 6, 110.0, 1, 3, 1, -1),
(7, 3, 7, 95.0, 0, 2, 1, 0),
(8, 4, 8, 90.0, 1, 2, 0, 0),
(9, 5, 9, 45.0, 0, 0, 0, 1),
(10, 5, 10, 40.0, 0, 0, 0, -1);

-- 7. INSERT CONSTRUCTOR STANDINGS
INSERT INTO constructor_standings (team_id, position, points, wins, podiums, position_change) VALUES
(1, 1, 485.0, 9, 15, 0),
(2, 2, 420.0, 4, 12, 0),
(3, 3, 360.0, 2, 9, 1),
(4, 4, 310.0, 2, 8, -1),
(5, 5, 140.0, 0, 0, 0);

-- 8. INSERT REVIEWS
INSERT INTO reviews (category, subject_id, title, author, rating, review_text) VALUES
('Race', 8, 'Monaco GP — Pure Qualifying Masterclass & Tactical Chess', 'Motorsport Analyst Pro', 5, 'The Monaco Grand Prix was an absolute tactical masterpiece. Leclerc delivered an extraordinary pole lap on Saturday, defending masterfully through St. Devote and Swimming Pool complex on Sunday to claim a emotional home victory.'),
('Race', 9, 'Canadian GP — Rain, Safety Cars, and Edge-of-Seat Drama', 'Telemetry Central', 5, 'A chaotic wet-to-dry transition race in Montreal. Maximus Vance proved his racecraft under pressure, navigating safety car restarts and changing grip levels to snatch victory from Lewis Hamilton.'),
('Driver', 1, 'Maximus Vance — Clinical Precision Under All Track Conditions', 'F1 Technical Digest', 5, 'Vance has turned race management into a science. His ability to build a 5-second gap within 3 laps while conserving rear tire temperatures is unmatched in modern motorsport.'),
('Driver', 2, 'Charles LeClerc — The Raw Speed Qualifying King', 'Apex Insider', 4, 'LeClerc possesses unbelievable single-lap commitment. When the car setup is in its window, nobody extracts more peak lap time on street circuits.'),
('Car', 1, 'Apex AR-24 — Unbeatable Underbody Aero & DRS Efficiency', 'Aerodynamics Today', 5, 'The AR-24 floor venturi tunnels create supreme downforce without drag penalties. Its high-speed cornering stability allows drivers to attack kerbs with maximum confidence.'),
('Car', 2, 'Velocita SF-V26 — Blistering Straight-Line Horsepower', 'Engine Room Review', 4, 'The Velocita V6 power unit leads the grid in top-end deployment. While high-speed rear downforce is slightly nervous, its acceleration out of hairpin corners is breathtaking.'),
('Team', 1, 'Apex Racing — Operation Flawless Pit Execution', 'Grid Strategy Watch', 5, 'Sub-2.0 second pit stops, aggressive undercut calls, and rapid telemetry processing keep Apex at the pinnacle of team performance.'),
('Team', 4, 'Papaya Speedworks — The Ultimate Upgrades & Resurgence', 'Paddock Pulse', 4, 'From mid-grid struggles to victory contention, Papaya has produced the most effective upgrade package of the season, putting pressure on top teams.');
