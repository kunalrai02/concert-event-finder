# Concert & Fest Finder Backend

This is the backend service for the Concert & Fest Finder application, built with Flask, SQLAlchemy, Celery, PostgreSQL, and Redis. It uses a modern Domain-Driven architecture (Controllers, Services, Repositories).

## Getting Started

### 1. Running Locally (Without Docker)

Make sure your virtual environment is activated and dependencies are installed.

To start the Flask development server:
```bash
python run.py
```

### 2. Running with Docker Compose

To boot up the entire stack (Flask, Celery Worker, PostgreSQL, and Redis):
```bash
docker-compose up --build
```
This will automatically handle the database and queue initialization.

---

## Database Migrations (Alembic)

> **CRITICAL RULE:** Never manually create tables in the database. Always use migrations!

We use `Flask-Migrate` to manage database schema changes. Whenever you create a new table in `app/models/` or change a column, you must run migrations.

### Step 1: Initialize (Run ONLY ONCE per project)
If the `migrations/` folder doesn't exist, run this to set it up:
```bash
flask --app run db init
```

### Step 2: Create a Migration (Run EVERY TIME you change models)
After changing your models (e.g., adding a `User` class), generate the migration script:
```bash
flask --app run db migrate -m "Added User table"
```
*(Always provide a clear message describing what changed in the `-m` flag).*

### Step 3: Upgrade Database (Run to APPLY the changes)
To execute the generated script and physically update the Postgres database:
```bash
flask --app run db upgrade
```
*(If you are pulling code from another branch/developer, you should also run this command to apply their database changes).*
