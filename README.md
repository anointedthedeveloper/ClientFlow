# ClientFlow

A clean, modern CRM for managing customers, deals, and activities — built for small to mid-size sales teams.

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)

---

## Overview

ClientFlow is a full-stack SaaS CRM with organization-scoped multi-tenancy, a drag-and-drop deal pipeline, customer management, and activity tracking. It is designed to be self-hostable and deployable to modern cloud platforms with minimal configuration.

---

## Monorepo Structure

```
ClientFlow/
├── backend/        NestJS REST API + Prisma + PostgreSQL
├── frontend/       Next.js 16 app (TypeScript + Tailwind CSS)
└── README.md       You are here
```

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | Next.js 16, TypeScript, Tailwind CSS, Zustand   |
| UI         | lucide-react, dnd-kit (drag and drop)           |
| Backend    | NestJS, TypeScript                              |
| ORM        | Prisma 7                                        |
| Database   | PostgreSQL                                      |
| Auth       | JWT (access + refresh tokens), Passport.js      |
| API Docs   | Swagger / OpenAPI                               |
| Security   | Helmet, express-rate-limit, bcryptjs            |

---

## Features

- Organization-scoped multi-tenancy — every record is isolated by org
- JWT authentication with role-based access control (Admin / Sales / Support)
- Customer management — create, edit, delete, search
- Deal pipeline — Kanban board with drag-and-drop stage updates
- Activity logging — notes, calls, and emails per deal
- Dashboard — total customers, deals, revenue, and pipeline breakdown by stage
- Swagger API documentation at `/api/docs`
- Global validation, error handling, and rate limiting

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally or via a cloud provider (Neon, Supabase, Railway)
- npm

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/anointedthedeveloper/clientflow.git
cd clientflow
```

### 2. Set up the database

Create a PostgreSQL database named `clientflow`:

```sql
CREATE DATABASE clientflow;
```

### 3. Start the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your `DATABASE_URL` and JWT secrets, then:

```bash
npm install
npx prisma migrate dev --name init
npm run start:dev
```

API: `http://localhost:3001`
Swagger: `http://localhost:3001/api/docs`

### 4. Start the frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

App: `http://localhost:3000`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable                | Description                          | Example                                      |
|-------------------------|--------------------------------------|----------------------------------------------|
| `DATABASE_URL`          | PostgreSQL connection string         | `postgresql://user:pass@localhost:5432/clientflow` |
| `JWT_SECRET`            | Secret for signing access tokens     | any long random string                       |
| `JWT_REFRESH_SECRET`    | Secret for signing refresh tokens    | any long random string                       |
| `JWT_EXPIRES_IN`        | Access token expiry                  | `15m`                                        |
| `JWT_REFRESH_EXPIRES_IN`| Refresh token expiry                 | `7d`                                         |
| `PORT`                  | Port the API listens on              | `3001`                                       |
| `FRONTEND_URL`          | Allowed CORS origin                  | `http://localhost:3000`                      |

### Frontend (`frontend/.env.local`)

| Variable               | Description              | Example                        |
|------------------------|--------------------------|--------------------------------|
| `NEXT_PUBLIC_API_URL`  | Backend API base URL     | `http://localhost:3001/api`    |

---

## API Endpoints

| Method | Path                        | Description                  | Auth |
|--------|-----------------------------|------------------------------|------|
| POST   | `/api/auth/register`        | Register org + admin user    | No   |
| POST   | `/api/auth/login`           | Login, returns JWT tokens    | No   |
| GET    | `/api/auth/me`              | Get current user             | Yes  |
| GET    | `/api/customers`            | List customers (+ search)    | Yes  |
| POST   | `/api/customers`            | Create customer              | Yes  |
| PUT    | `/api/customers/:id`        | Update customer              | Yes  |
| DELETE | `/api/customers/:id`        | Delete customer              | Yes  |
| GET    | `/api/deals`                | List all deals               | Yes  |
| POST   | `/api/deals`                | Create deal                  | Yes  |
| GET    | `/api/deals/dashboard`      | Dashboard stats              | Yes  |
| GET    | `/api/deals/:id`            | Get deal with activities     | Yes  |
| PUT    | `/api/deals/:id`            | Update deal (incl. stage)    | Yes  |
| DELETE | `/api/deals/:id`            | Delete deal                  | Yes  |
| POST   | `/api/activities`           | Log an activity              | Yes  |
| GET    | `/api/activities/deal/:id`  | Get activities for a deal    | Yes  |

Full interactive docs available at `http://localhost:3001/api/docs`.

---

## Database Schema

```
Organization
  id, name, plan, createdAt

User
  id, email, password, name, role (ADMIN|SALES|SUPPORT), organizationId

Customer
  id, name, email, phone, company, organizationId

Deal
  id, title, value, stage (LEAD|CONTACTED|PROPOSAL|CLOSED),
  customerId, assignedToId, organizationId

Activity
  id, type (NOTE|CALL|EMAIL), content, dealId, createdBy
```

Every table is scoped to `organizationId` — queries never leak data across organizations.

---

## Roles

| Role    | Access                                  |
|---------|-----------------------------------------|
| ADMIN   | Full access to all resources            |
| SALES   | Customers + Deals + Activities          |
| SUPPORT | Customers + Activities                  |

The first user registered in an organization is always assigned the `ADMIN` role.

---

## Frontend Pages

| Route           | Description                              |
|-----------------|------------------------------------------|
| `/login`        | Sign in                                  |
| `/register`     | Create organization + admin account      |
| `/dashboard`    | Stats overview and pipeline chart        |
| `/customers`    | Customer list with search and CRUD       |
| `/deals`        | Kanban board — drag cards between stages |
| `/deals/[id]`   | Deal detail with activity timeline       |
| `/settings`     | Profile and organization info            |

---

## Deployment

| Service  | Recommended Platform     |
|----------|--------------------------|
| Frontend | Vercel                   |
| Backend  | Render or Railway        |
| Database | Neon or Supabase         |

### Deploy frontend to Vercel

```bash
cd frontend
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` to your deployed backend URL in the Vercel dashboard.

### Deploy backend to Render

1. Create a new Web Service pointing to the `backend/` directory
2. Set build command: `npm install && npx prisma generate && npm run build`
3. Set start command: `npm run start:prod`
4. Add all environment variables from `.env.example`

---

## Development Scripts

### Backend

```bash
npm run start:dev     # watch mode
npm run build         # compile TypeScript
npm run start:prod    # run compiled output
npm run test          # unit tests
npm run test:e2e      # end-to-end tests
```

### Frontend

```bash
npm run dev           # development server
npm run build         # production build
npm run start         # serve production build
npm run lint          # ESLint
```

---

## License

MIT

---

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)
