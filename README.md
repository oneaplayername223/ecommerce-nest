<p align="center">
  <a href="https://www.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" width="130" alt="Docker Logo" /></a>
</p>

<p align="center">
  <b>Containerized NestJS Application</b> – A modern, scalable backend powered by Docker, NestJS, and PostgreSQL.
</p>

<p align="center">
  <a href="https://hub.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-ready-blue" alt="Docker Ready" /></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-15.0-blue.svg" alt="PostgreSQL" /></a>
  <a href="https://www.prisma.io/" target="_blank"><img src="https://img.shields.io/badge/Prisma-ORM-green.svg" alt="Prisma ORM" /></a>
  <a href="https://swagger.io/" target="_blank"><img src="https://img.shields.io/badge/API-Docs%20via%20Swagger-brightgreen.svg" alt="Swagger" /></a>
</p>

---

## 🧠 Description

This project is a **containerized NestJS backend** designed for scalability, maintainability, and consistent deployments using **Docker**.  
All services (API, database, etc.) are orchestrated using **Docker Compose**, ensuring a clean and reproducible development environment.

### 🚀 Technologies Used

- 🧠 **TypeScript** – Strongly typed JavaScript for better reliability  
- ⚙️ **NestJS** – Framework for building efficient server-side applications  
- 🛢️ **PostgreSQL** – Robust relational database  
- 🔍 **Prisma ORM** – Type-safe database access and migrations  
- 🐳 **Docker & Docker Compose** – Containerized environment for consistency across systems  
- 📘 **Swagger** – Auto-generated interactive API documentation at  
  👉 [`http://localhost:3000/api`](http://localhost:3000/api)

---

## 🧩 Project Setup (Dockerized)

To get started, simply build and run all services with Docker Compose.

```bash
# Build and start all containers (in background)
$ docker compose up -d
