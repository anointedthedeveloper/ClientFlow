# ClientFlow

A clean, modern CRM for managing customers, deals, and activities.

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)

---

## Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Zustand, dnd-kit
- **Backend**: NestJS, Prisma, PostgreSQL
- **Auth**: JWT + Refresh tokens

## Quick Start

### 1. Database

Create a PostgreSQL database named `clientflow`.

### 2. Backend

```bash
cd backend
cp .env.example .env        # fill in DATABASE_URL and JWT secrets
npm install
npx prisma migrate dev --name init
npm run start:dev
```

API runs at `http://localhost:3001`  
Swagger docs at `http://localhost:3001/api/docs`

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

App runs at `http://localhost:3000`

---

## Deployment

| Service    | Platform        |
|------------|-----------------|
| Frontend   | Vercel          |
| Backend    | Render / Railway|
| Database   | Neon / Supabase |

## Features (MVP)

- Organization-scoped multi-tenancy
- JWT authentication with role-based access (Admin / Sales / Support)
- Customer management with search
- Deal pipeline — Kanban board with drag-and-drop
- Activity logging (notes, calls, emails) per deal
- Dashboard with pipeline stats
- Swagger API documentation
