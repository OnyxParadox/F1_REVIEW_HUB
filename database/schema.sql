-- F1 Review Hub Database Schema
-- Standard PostgreSQL DDL

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS constructor_standings CASCADE;
DROP TABLE IF EXISTS driver_standings CASCADE;
DROP TABLE IF EXISTS race_results CASCADE;
DROP TABLE IF EXISTS races CASCADE;
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- 1. TEAMS TABLE
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    country VARCHAR(50) NOT NULL,
    team_principal VARCHAR(100) NOT NULL,
    base VARCHAR(100) NOT NULL,
    chassis VARCHAR(100) NOT NULL,
    power_unit VARCHAR(100) NOT NULL,
    color_hex VARCHAR(20) NOT NULL DEFAULT '#E10600',
    description TEXT,
    championships_won INT DEFAULT 0,
    points INT DEFAULT 0,
    logo_symbol VARCHAR(10) DEFAULT '🏎️',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. DRIVERS TABLE
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    permanent_number INT NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    points INT DEFAULT 0,
    championship_position INT,
    wins INT DEFAULT 0,
    podiums INT DEFAULT 0,
    pole_positions INT DEFAULT 0,
    driver_rating NUMERIC(3,1) DEFAULT 9.0,
    bio TEXT,
    avatar_symbol VARCHAR(10) DEFAULT '👤',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CARS TABLE
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    team_id INT UNIQUE REFERENCES teams(id) ON DELETE CASCADE,
    car_name VARCHAR(100) NOT NULL,
    engine VARCHAR(100) NOT NULL,
    chassis VARCHAR(100) NOT NULL,
    top_speed_kph INT NOT NULL,
    acceleration_0_100 NUMERIC(3,1) NOT NULL,
    weight_kg INT NOT NULL,
    wheelbase_mm INT NOT NULL,
    aero_downforce_score INT NOT NULL,
    description TEXT,
    rating NUMERIC(3,1) DEFAULT 9.0,
    strengths TEXT,
    weaknesses TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. RACES TABLE
CREATE TABLE races (
    id SERIAL PRIMARY KEY,
    round_number INT NOT NULL UNIQUE,
    grand_prix_name VARCHAR(100) NOT NULL,
    circuit_name VARCHAR(100) NOT NULL,
    location_country VARCHAR(50) NOT NULL,
    race_date DATE NOT NULL,
    total_laps INT NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled',
    winner_driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    pole_driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    fastest_lap_driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. RACE RESULTS TABLE
CREATE TABLE race_results (
    id SERIAL PRIMARY KEY,
    race_id INT REFERENCES races(id) ON DELETE CASCADE,
    driver_id INT REFERENCES drivers(id) ON DELETE CASCADE,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    position INT NOT NULL,
    grid_position INT NOT NULL,
    points_earned NUMERIC(4,1) DEFAULT 0,
    race_time_or_status VARCHAR(50) NOT NULL,
    fastest_lap BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. DRIVER STANDINGS TABLE
CREATE TABLE driver_standings (
    id SERIAL PRIMARY KEY,
    driver_id INT UNIQUE REFERENCES drivers(id) ON DELETE CASCADE,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    position INT NOT NULL,
    points NUMERIC(5,1) NOT NULL,
    wins INT DEFAULT 0,
    podiums INT DEFAULT 0,
    pole_positions INT DEFAULT 0,
    position_change INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. CONSTRUCTOR STANDINGS TABLE
CREATE TABLE constructor_standings (
    id SERIAL PRIMARY KEY,
    team_id INT UNIQUE REFERENCES teams(id) ON DELETE CASCADE,
    position INT NOT NULL,
    points NUMERIC(5,1) NOT NULL,
    wins INT DEFAULT 0,
    podiums INT DEFAULT 0,
    position_change INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. REVIEWS TABLE
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    category VARCHAR(20) NOT NULL CHECK (category IN ('Race', 'Driver', 'Team', 'Car')),
    subject_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_drivers_team_id ON drivers(team_id);
CREATE INDEX idx_race_results_race_id ON race_results(race_id);
CREATE INDEX idx_race_results_driver_id ON race_results(driver_id);
CREATE INDEX idx_reviews_category ON reviews(category);
