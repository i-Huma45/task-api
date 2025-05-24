# Collaborative Task Management API

## Setup

1. `cp .env.example .env` → fill values
2. `docker-compose up --build`
3. Browse `http://localhost:4000/docs` for Swagger UI

## Scripts

- `npm start` – run production server
- `npm test` – run tests

## Features

- JWT auth, role-based access
- CRUD for Projects & Tasks
- Comments & Tags
- Email reminders (cron job)
- Swagger/OpenAPI docs
- Dockerized + PostgreSQL
