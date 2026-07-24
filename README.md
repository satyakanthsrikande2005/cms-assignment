# Production-Ready Enterprise Content Management System (CMS)

[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-green)](https://www.mongodb.com)
[![React](https://img.shields.io/badge/Admin-React%2019%20%7C%20Vite-blue)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Public-Next.js%2016-black)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/DevOps-Docker%20%7C%20Docker%20Compose-blue)](https://www.docker.com)

A full-stack, enterprise-grade Content Management System (CMS) designed with clean layered architecture, robust security, role-based access controls, and containerized microservice execution.

---

## Technical Architecture

```text
Routes → Controllers → Services → Repositories → Models → MongoDB
```

- **Routes**: Request mapping, rate limiting, validation binding, and security middleware.
- **Controllers**: Thin HTTP handlers enforcing uniform JSON envelope formatting.
- **Services**: Encapsulates all business logic, password hashing, JWT operations, and RBAC rules.
- **Repositories**: Direct data access layer isolating Mongoose database queries.
- **Models**: Enforces strict Mongoose schemas, compound indexes, and validation rules.

---

## Technology Stack

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (`jsonwebtoken`) & **bcryptjs**
- **express-validator**
- **Helmet**, **Morgan**, **Compression**, **Cookie Parser**, **CORS**, **Multer**, **uuid**, **slugify**

### Admin Frontend
- **React 19** & **Vite 8**
- **Redux Toolkit** & **React Router v7**
- **Axios** & **Tailwind CSS v4**

### Public Frontend
- **Next.js 16 (App Router)**
- **Axios** & **Tailwind CSS v4**
- **TypeScript**

### DevOps & Deployment
- **Docker** & **Docker Compose**
- **Backend Deployment**: Render / Railway
- **Frontend Deployment**: Vercel
- **Database**: MongoDB Atlas

---

## Directory Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Database loaders
│   │   ├── constants/       # User roles & Content status constants
│   │   ├── controllers/     # HTTP Request/Response Controllers
│   │   ├── docs/            # REST API Documentation
│   │   ├── loaders/         # Express & Database initialization
│   │   ├── middleware/      # Auth, RBAC, Validation & Error handlers
│   │   ├── models/          # Mongoose Schema Definitions
│   │   ├── repositories/    # Database Access Layer
│   │   ├── routes/          # API Route Definitions
│   │   ├── seeds/           # Database Seed Script
│   │   ├── services/        # Business Logic Layer
│   │   ├── utils/           # Response Formatters & Utilities
│   │   ├── validators/      # express-validator schemas
│   │   ├── app.js
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── admin-frontend/
│   ├── src/
│   │   ├── api/             # Axios API Client
│   │   ├── components/      # UI Badges, Pagination, Spinners
│   │   ├── layouts/         # Dashboard Shell with RBAC Nav
│   │   ├── pages/           # Pages, Posts, Categories, Tags, Media, Users, Settings
│   │   ├── store/           # Redux Store & Slices
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── public-frontend/
│   ├── app/                 # Next.js App Router Pages & Layouts
│   ├── components/          # Navbar, Footer, PostCard, Pagination
│   ├── lib/                 # Public Axios API Client
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://localhost:27017/cms_assignment` (or Docker)

### 1. Backend Setup & Seeding

```bash
cd backend
npm install
npm run seed
npm run dev
```

The database seeder automatically initializes the default system accounts:
- **Admin User**: `admin@cms.com` / `Admin@123456`
- **Editor User**: `editor@cms.com` / `Editor@123456`
- **Author User**: `author@cms.com` / `Author@123456`

### 2. Admin Frontend Setup

```bash
cd admin-frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Public Frontend Setup

```bash
cd public-frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Docker Execution

Run the complete microservice architecture using Docker Compose:

```bash
docker compose up --build
```

Access points:
- **Public Website**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `localhost:27017`

---

## API Standard Response Schema

### Success Response Envelope
```json
{
  "success": true,
  "message": "Resource processed successfully",
  "data": {}
}
```

### Error Response Envelope
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email" }
  ]
}
```

---

## Deployment Configuration

- **Backend**: Pre-configured with `render.yaml` for Render deployment and supports Railway.
- **Frontends**: Pre-configured with `vercel.json` for Vercel deployment.
- **Database**: Connect to **MongoDB Atlas** by supplying `MONGODB_URI` in production environment variables.

---

## Security Controls

- **JWT Token Verification** with expiration & secret rotation support.
- **Bcrypt Password Hashing** (cost factor 12).
- **Role-Based Access Control (RBAC)** restricting routes by `admin`, `editor`, and `author`.
- **Helmet HTTP Header Hardening**.
- **CORS Allowed Origins** restrict cross-domain access.
- **NoSQL Injection Protection** via schema type coercion & parameterized Mongoose queries.
- **Input Validation** via `express-validator` across all write operations.

---

## Author

**Satya Kanth Srikande**  
GitHub Repository: [satyakanthsrikande2005/cms-assignment](https://github.com/satyakanthsrikande2005/cms-assignment)