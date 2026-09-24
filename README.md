# 🏎️ F1 Review Hub — DevOps Docker + AWS EC2 Capstone Project

A full-stack Formula 1 telemetry, reviews, and analytics web application created as a **DevOps Capstone Project** for containerization and AWS EC2 cloud deployment.

![F1 Review Hub Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL%20%7C%20Docker-red)
![License](https://img.shields.io/badge/License-MIT-blue)
![Architecture](https://img.shields.io/badge/DevOps-3--Tier%20Containerized-emerald)

---

## 1. Project Overview

**F1 Review Hub** is a dark, high-performance motorsport platform allowing users to explore Formula 1 constructor teams, drivers, technical car specifications, race calendar results, championship standings, and editorial reviews.

This project is specifically structured for **Docker**, **Docker Compose**, and **AWS EC2 deployment**, following modern DevOps best practices such as multi-stage container builds, healthcheck dependencies, containerized database persistence, and environment variable configuration.

---

## 2. Key Features

- **Motorsport Dashboard Aesthetic**: Dark charcoal background (`#0B0E14`), red racing highlights (`#E10600`), neon telemetry meters, glassmorphic cards, and responsive layouts.
- **Teams Portal**: Complete constructor profile dossiers including team principal, facilities base, chassis, engine supplier, driver lineups, and titles won.
- **Drivers Roster**: Career statistics, permanent racing numbers, driver ratings, win/podium counters, recent race finishes, and bios.
- **Interactive Car Telemetry Viewer**: Clickable aerodynamic hotspot inspector (Front Wing, Monocoque, Power Unit, DRS Rear Wing) showing technical telemetry specs.
- **Race Calendar & Classification**: Season calendar, GP status, winner podiums, fastest lap badges, and top 10 race finish classifications.
- **Championship Standings**: Driver & Constructor standings tables with visual points progress bars and position movement trend indicators (`+1`, `-1`, static).
- **F1 Review System**: Read and publish category-specific reviews (Race, Driver, Team, Car) using a modal form backed by Express REST API.
- **About & Architecture**: Visual 3-tier architecture breakdown and DevOps containerization explanation.

---

## 3. Application Architecture

The application follows a clean, decoupled **3-Tier Architecture**:

```
[ Browser / Client ]
        │
        ▼  Port 80 (HTTP)
┌─────────────────────────────────────────────────────────────┐
│ 1. FRONTEND TIER (f1_frontend)                              │
│    • React 18 + Vite SPA                                    │
│    • Production Nginx Web Server                            │
│    • Client-side routing with HTML5 pushState fallback      │
└──────────────────────────┬──────────────────────────────────┘
                           │  Reverse Proxy / API Requests
                           ▼  Port 5000 (HTTP)
┌─────────────────────────────────────────────────────────────┐
│ 2. BACKEND TIER (f1_backend)                                │
│    • Node.js + Express.js REST API                          │
│    • MVC Pattern (Routes, Controllers, Services)           │
│    • Morgan Request Logger & Healthcheck Middleware        │
└──────────────────────────┬──────────────────────────────────┘
                           │  PostgreSQL Driver Connection (`pg`)
                           ▼  Port 5432 (TCP)
┌─────────────────────────────────────────────────────────────┐
│ 3. DATABASE TIER (f1_postgres)                              │
│    • PostgreSQL 15 Relational Database                      │
│    • Auto-initialized via schema.sql & seed.sql             │
│    • Persistent volume `postgres-data`                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript, HTML5, CSS3, Axios, React Router v6, Lucide React Icons | Dark motorsport design system with custom telemetry CSS |
| **Backend** | Node.js, Express.js, `pg` (node-postgres), dotenv, cors, morgan, helmet | REST API architecture with error handling middleware |
| **Database** | PostgreSQL 15 | Relational SQL schema with foreign keys and sample seed data |
| **Containerization** | Docker, Dockerfiles, Nginx multi-stage build | Lightweight Alpine base images |
| **Orchestration** | Docker Compose | Service dependency healthchecks, bridge network, named persistent volume |

---

## 5. Project Structure

```
f1-review-hub/
├── backend/
│   ├── src/
│   │   ├── controllers/       # API Controllers (teams, drivers, cars, races, standings, reviews, health)
│   │   ├── routes/            # Express Routers
│   │   ├── services/          # Database Service Abstraction (`dbService.js`)
│   │   ├── db/                # PostgreSQL Connection Pool (`index.js`)
│   │   ├── middleware/        # Request Logger & Central Error Handler
│   │   ├── utils/             # Database Auto-Initializer & Fallback Store (`initDb.js`)
│   │   ├── app.js             # Express App Configuration
│   │   └── server.js          # Entry point & Graceful Shutdown Handler
│   ├── .env.example
│   ├── Dockerfile             # Node 20 Alpine Backend Container Manifest
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, TeamCard, DriverCard, CarCard, RaceCard, InteractiveCarViewer, ReviewModal, etc.
│   │   ├── pages/             # Home, Teams, Drivers, Cars, Races, Standings, Reviews, About
│   │   ├── services/          # Axios API Client (`api.js`)
│   │   ├── App.jsx            # React Router Routes Setup
│   │   ├── main.jsx           # React Root Entry Point
│   │   └── index.css          # Motorsport Design System Styling
│   ├── public/
│   ├── nginx.conf             # Nginx reverse proxy & SPA client routing config
│   ├── Dockerfile             # Multi-stage build (Node -> Nginx Alpine)
│   ├── vite.config.js
│   └── package.json
│
├── database/
│   ├── schema.sql             # Table DDL definitions & relational indexes
│   └── seed.sql               # Demonstration season sample data
│
├── docker-compose.yml         # 3-Tier Container Orchestration Manifest
├── .gitignore
└── README.md
```

---

## 6. Environment Variables

### Backend Environment Variables (`backend/.env.example`)

```env
PORT=5000
NODE_ENV=development
DB_HOST=database
DB_PORT=5432
DB_NAME=f1_review_hub
DB_USER=f1_user
DB_PASSWORD=f1_secure_password
```

### Frontend Environment Variables (`frontend/.env.example`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 7. Running Without Docker (Local Development Mode)

If you wish to run the project directly using local Node.js and PostgreSQL:

### Step 1: Start PostgreSQL
Ensure PostgreSQL is running locally and create a database named `f1_review_hub`. Execute `database/schema.sql` and `database/seed.sql` to populate initial tables.

### Step 2: Start Backend API
```bash
cd backend
npm install
npm run dev
```
The backend API will run at `http://localhost:5000`.

### Step 3: Start Frontend SPA
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 8. Running With Docker Compose (Primary DevOps Mode)

This is the primary containerized mode designed for the DevOps capstone.

### Prerequisites
- Docker (v20+)
- Docker Compose (v2+)

### Step 1: Build & Start All Containers
From the project root directory, execute:

```bash
docker compose up --build
```

Docker Compose will perform the following steps:
1. Start `f1_postgres` database container and execute auto-seed scripts.
2. Wait for PostgreSQL `service_healthy` status.
3. Build and start `f1_backend` Node.js container.
4. Wait for backend `service_healthy` status (`/api/health`).
5. Build multi-stage Nginx production container for `f1_frontend`.
6. Bind frontend to HTTP port `80`.

### Step 2: Access the Application
- **Frontend Dashboard**: [http://localhost](http://localhost) (Port 80)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Step 3: Stopping Containers
```bash
docker compose down
```

---

## 9. Docker Compose Architecture

The `docker-compose.yml` file configures three services attached to a custom bridge network (`f1-app-network`):

- `database`: Uses `postgres:15-alpine` with healthcheck `pg_isready`. Mounts persistent volume `postgres-data`.
- `backend`: Builds `./backend/Dockerfile`. Uses `curl` healthcheck on `http://localhost:5000/api/health`.
- `frontend`: Builds `./frontend/Dockerfile`. Uses Nginx to serve static React bundle and proxy `/api/` calls to the backend.

---

## 10. Database Setup & Persistence

The database schema includes 8 relational tables:
- `teams`
- `drivers`
- `cars`
- `races`
- `race_results`
- `driver_standings`
- `constructor_standings`
- `reviews`

### Volume Persistence Test
Database state persists across container restarts:
```bash
# Stop containers
docker compose down

# Start containers again
docker compose up -d

# Notice that all user-submitted reviews and standings persist because postgres-data volume remains intact!
```

*Note: Only use `docker compose down -v` if you explicitly want to purge persistent volume data.*

---

## 11. API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck status and DB connection diagnostics |
| `GET` | `/api/teams` | List all F1 constructor teams with driver summary |
| `GET` | `/api/teams/:id` | Get single team details, car spec, and reviews |
| `GET` | `/api/drivers` | List all drivers with team details and ratings |
| `GET` | `/api/drivers/:id` | Get single driver details, bio, and recent race finishes |
| `GET` | `/api/cars` | List all F1 cars with technical specs and aero scores |
| `GET` | `/api/cars/:id` | Get single car technical spec matrix & strengths |
| `GET` | `/api/races` | List season race calendar with winners and pole sitters |
| `GET` | `/api/races/:id` | Get single Grand Prix top 10 classifications & review |
| `GET` | `/api/standings/drivers` | Get Driver Championship standings ordered by position |
| `GET` | `/api/standings/constructors` | Get Constructor Championship standings |
| `GET` | `/api/reviews` | Get all reviews (supports optional `?category=Race\|Driver\|Team\|Car`) |
| `GET` | `/api/reviews/:id` | Get single review details |
| `POST` | `/api/reviews` | Create a new user review |

---

## 12. Health Check & Monitoring

The application includes automated healthcheck probes:

- **Backend Probe**: `curl -f http://localhost:5000/api/health || exit 1`
- **Database Probe**: `pg_isready -U f1_user -d f1_review_hub`
- **Frontend Probe**: `curl -f http://localhost:80/ || exit 1`

Verify status via Docker CLI:
```bash
docker compose ps
```

---

## 13. Logging

Container logs can be inspected cleanly:

```bash
# View all container logs in real time
docker compose logs -f

# View backend logs only
docker compose logs -f backend

# View database logs only
docker compose logs -f database
```

---

## 14. AWS EC2 Deployment Guide

To deploy this capstone project to an **AWS EC2 Linux Instance**:

1. **Launch EC2 Instance**:
   - Ubuntu Server 22.04 LTS or Amazon Linux 2023.
   - Instance Type: `t2.micro` or `t3.small` (Free tier eligible).
   - Inbound Security Group Rules: Allow HTTP (`80`), SSH (`22`), and optionally Custom TCP (`5000`).

2. **Install Docker & Docker Compose on EC2**:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-v2
   sudo systemctl enable --now docker
   sudo usermod -aG docker ubuntu
   ```

3. **Clone & Launch**:
   ```bash
   git clone <your-repository-url> f1-review-hub
   cd f1-review-hub
   docker compose up --build -d
   ```

4. **Verify Deployment**:
   Open `http://<EC2-PUBLIC-IP>` in your browser to view the live dashboard!

---

## 15. Troubleshooting

- **Port 80/5000 in use**: If local port 80 or 5000 is occupied, update `docker-compose.yml` port mappings (e.g. `"8080:80"`).
- **Backend cannot connect to DB**: Ensure `DB_HOST=database` (the Docker container service name) in `.env` or `docker-compose.yml`.
- **Database permission denied**: Ensure named volume `postgres-data` permissions are managed by Docker daemon.

---

## 16. Future Improvements

- CI/CD GitHub Actions pipeline for automated testing and image pushing to Docker Hub / AWS ECR.
- Reverse proxy TLS encryption with Let's Encrypt / Nginx Certbot.
- Live Formula 1 external Ergast/FastF1 API integration mode.

---

## 17. Educational Disclaimer

*F1 Review Hub is a fan-made educational demonstration project created specifically for learning DevOps containerization. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Formula 1, Formula One Management (FOM), FIA, or any F1 team or driver.*
