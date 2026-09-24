# 🏎️ F1 Review Hub — DevOps Docker + AWS EC2 Capstone Project

A full-stack Formula 1 telemetry, reviews, and analytics web application created as a **DevOps Capstone Project** for containerization and AWS EC2 cloud deployment.

![F1 Review Hub Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL%20%7C%20Docker-red)
![License](https://img.shields.io/badge/License-MIT-blue)
![Architecture](https://img.shields.io/badge/DevOps-3--Tier%20Containerized-emerald)

---

## 1. Project Overview

**F1 Review Hub** is a dark, high-performance motorsport dashboard allowing users to explore constructor teams, drivers, technical car specifications, race calendar results, championship standings, and editorial reviews.

*Note: The dataset included in this application consists of fictional demonstration / sample data for learning DevOps containerization.*

This project is hardened for **Docker**, **Docker Compose**, and **AWS EC2 deployment**, following modern DevOps best practices such as multi-stage container builds, healthcheck dependencies, containerized database persistence, and environment variable configuration.

---

## 2. Hardened 3-Tier Architecture

The system follows a clean, decoupled **3-Tier Architecture**:

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
                           │  Internal Reverse Proxy / API Requests
                           ▼  Port 5000 (Internal Docker Network)
┌─────────────────────────────────────────────────────────────┐
│ 2. BACKEND TIER (f1_backend)                                │
│    • Node.js + Express.js REST API                          │
│    • PostgreSQL Driver Connection (`pg`)                    │
│    • Morgan Request Logger & Healthcheck Middleware        │
└──────────────────────────┬──────────────────────────────────┘
                           │  Internal Network (`f1-network`)
                           ▼  Port 5432 (Internal Docker Network)
┌─────────────────────────────────────────────────────────────┐
│ 3. DATABASE TIER (f1_postgres)                              │
│    • PostgreSQL 15 Relational Database                      │
│    • Auto-initialized via schema.sql & seed.sql             │
│    • Persistent volume `postgres-data`                      │
└─────────────────────────────────────────────────────────────┘
```

> **Security Note:** PostgreSQL (Port 5432) and Node.js Backend (Port 5000) are kept internal to the Docker Compose network. Only the Nginx Frontend container exposes Port 80 publicly to the host.

---

## 3. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript, HTML5, CSS3, Axios, React Router v6, Lucide React Icons | Dark motorsport design system with custom telemetry CSS |
| **Backend** | Node.js, Express.js, `pg` (node-postgres), dotenv, cors, morgan, helmet | REST API architecture with clean controller/routes design |
| **Database** | PostgreSQL 15 | Relational SQL schema with foreign keys and sample seed data |
| **Containerization** | Docker, Dockerfiles, Nginx multi-stage build | Lightweight Alpine base images |
| **Orchestration** | Docker Compose | Service dependency healthchecks, bridge network, named persistent volume |

---

## 4. Environment Variables

### Backend Environment Variables (`backend/.env.example`)

```env
PORT=5000
NODE_ENV=production
DB_HOST=database
DB_PORT=5432
DB_NAME=f1_review_hub
DB_USER=f1_user
DB_PASSWORD=f1_secure_password
```

### Frontend Environment Variables (`frontend/.env.example`)

```env
VITE_API_URL=/api
```

---

## 5. Running with Docker Compose (Primary DevOps Mode)

### Prerequisites
- Docker (v20+)
- Docker Compose (v2+)

### Standard Container Management Commands

```bash
# 1. Build all docker images
docker compose build

# 2. Start containers in detached mode
docker compose up -d

# 3. Check container health & status
docker compose ps

# 4. View container logs
docker compose logs
docker compose logs backend
docker compose logs database

# 5. Stop containers (Preserves database volume)
docker compose down
```

> ⚠️ **Important Persistence Note:** Running `docker compose down` gracefully stops containers while preserving your database volume (`postgres-data`). All reviews and created data will remain intact when you start containers again with `docker compose up -d`. Do **NOT** run `docker compose down -v` unless you explicitly intend to purge all persistent database data.

---

## 6. Accessing the Application

- **Frontend Dashboard**: [http://localhost](http://localhost) (Port 80)
- **API Health Check**: [http://localhost/api/health](http://localhost/api/health)
  - Returns `200 OK` with `{"status":"healthy","service":"f1-review-hub-backend","database":"connected"}` when connected.
  - Returns `503 Service Unavailable` with `{"status":"unhealthy","service":"f1-review-hub-backend","database":"disconnected"}` if database is unreachable.

---

## 7. API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck status (`healthy` / `unhealthy`) |
| `GET` | `/api/teams` | List constructor teams with driver summary |
| `GET` | `/api/teams/:id` | Get single team details, car spec, and reviews |
| `GET` | `/api/drivers` | List drivers with team details and ratings |
| `GET` | `/api/drivers/:id` | Get single driver details and recent race finishes |
| `GET` | `/api/cars` | List F1 cars with technical specs |
| `GET` | `/api/cars/:id` | Get single car technical spec matrix |
| `GET` | `/api/races` | List season race calendar |
| `GET` | `/api/races/:id` | Get single Grand Prix classifications |
| `GET` | `/api/standings/drivers` | Get Driver Championship standings |
| `GET` | `/api/standings/constructors` | Get Constructor Championship standings |
| `GET` | `/api/reviews` | Get all reviews (supports `?category=Race\|Driver\|Team\|Car`) |
| `POST` | `/api/reviews` | Create a new user review |

---

## 8. AWS EC2 Deployment Guide

To deploy this capstone project to an **AWS EC2 Linux Instance**:

1. **Launch EC2 Instance**:
   - Ubuntu Server 22.04 LTS or Amazon Linux 2023 (`t2.micro` or `t3.small`).
   - Security Group Rules: Allow HTTP (`80`) and SSH (`22`).

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

## 9. Educational Disclaimer

*F1 Review Hub is a fan-made educational demonstration project created specifically for learning DevOps containerization. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Formula 1, Formula One Management (FOM), FIA, or any F1 team or driver.*
