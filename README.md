# Test Task Project

This repository contains a test task project with a **server** (running via Docker) and a **client** (React Vite, not using Docker).

---

## Requirements

- **Node.js**: v22
- **Yarn**: latest
- **Docker & Docker Compose** (for the server)

---

## Server Setup (Docker)

The server runs inside a Docker container. Follow the steps below to start it:

```bash
# Copy .env
cp .env.example .env and set your variables

# Build Docker images
docker compose build

# Start Docker containers
docker compose up -d

# Access the app container
docker compose exec app sh

# Install dependencies inside the container
yarn

# Start the server
yarn server

# Run database migrations
yarn db:migrate

# Seed the database
yarn db:seed
```
## Client Setup
```bash
# Build Docker images
# Install dependencies
yarn

# Start client
yarn client
```