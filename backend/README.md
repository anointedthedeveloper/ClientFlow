# ClientFlow — Backend

NestJS REST API for ClientFlow. Handles authentication, multi-tenant data access, and all CRM business logic.

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)

---

## Stack

- **Framework**: NestJS (TypeScript)
- **ORM**: Prisma 7
- **Database**: PostgreSQL
- **Auth**: JWT + Passport.js
- **Validation**: class-validator + class-transformer
- **API Docs**: Swagger / OpenAPI
- **Security**: Helmet, express-rate-limit, bcryptjs

---

## Project Structure

```
src/
├── modules/
│   ├── auth/               Register, login, JWT strategy
│   ├── customers/          Customer CRUD
│   ├── deals/              Deal CRUD + dashboard stats
│   └── activities/         Activity logging per deal
├── common/
│   ├── guards/             JwtAuthGuard, RolesGuard
│   └── decorators/         @CurrentUser, @Roles
├── prisma/                 PrismaService + PrismaModule
└── main.ts                 Bootstrap, Swagger, CORS, rate limiting
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clientflow"
JWT_SECRET="your-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start the server

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

API runs at `http://localhost:3001`
Swagger docs at `http://localhost:3001/api/docs`

---

## API Modules

### Auth — `/api/auth`

| Method | Path        | Description                        | Auth |
|--------|-------------|------------------------------------|------|
| POST   | `/register` | Create organization + admin user   | No   |
| POST   | `/login`    | Login, returns access + refresh    | No   |
| GET    | `/me`       | Get current authenticated user     | Yes  |

### Customers — `/api/customers`

| Method | Path   | Description                        | Auth |
|--------|--------|------------------------------------|------|
| GET    | `/`    | List customers, optional `?search` | Yes  |
| POST   | `/`    | Create customer                    | Yes  |
| GET    | `/:id` | Get single customer                | Yes  |
| PUT    | `/:id` | Update customer                    | Yes  |
| DELETE | `/:id` | Delete customer                    | Yes  |

### Deals — `/api/deals`

| Method | Path           | Description                    | Auth |
|--------|----------------|--------------------------------|------|
| GET    | `/dashboard`   | Stats: customers, deals, revenue, by stage | Yes |
| GET    | `/`            | List all deals with customer   | Yes  |
| POST   | `/`            | Create deal                    | Yes  |
| GET    | `/:id`         | Get deal with activities       | Yes  |
| PUT    | `/:id`         | Update deal (stage, value etc) | Yes  |
| DELETE | `/:id`         | Delete deal                    | Yes  |

### Activities — `/api/activities`

| Method | Path             | Description                  | Auth |
|--------|------------------|------------------------------|------|
| POST   | `/`              | Log a note, call, or email   | Yes  |
| GET    | `/deal/:dealId`  | Get all activities for deal  | Yes  |

---

## Database Schema

```prisma
model Organization { id, name, plan, createdAt }

model User {
  id, email, password, name
  role: ADMIN | SALES | SUPPORT
  organizationId
}

model Customer { id, name, email, phone, company, organizationId }

model Deal {
  id, title, value
  stage: LEAD | CONTACTED | PROPOSAL | CLOSED
  customerId, assignedToId, organizationId
}

model Activity {
  id, type: NOTE | CALL | EMAIL
  content, dealId, createdBy
}
```

All queries are scoped to `organizationId` from the authenticated user's JWT.

---

## Auth Flow

1. Client calls `POST /api/auth/login` with email + password
2. Server returns `accessToken` (15m) and `refreshToken` (7d)
3. Client sends `Authorization: Bearer <accessToken>` on all protected routes
4. `JwtAuthGuard` validates the token and attaches the user to the request
5. `@CurrentUser()` decorator extracts the user in controllers

---

## Roles

| Role    | Description                          |
|---------|--------------------------------------|
| ADMIN   | Full access                          |
| SALES   | Customers, deals, activities         |
| SUPPORT | Customers and activities only        |

Use `@Roles('ADMIN')` + `RolesGuard` to restrict endpoints.

---

## Scripts

```bash
npm run start:dev     # watch mode
npm run build         # compile
npm run start:prod    # production
npm run test          # unit tests
npm run test:e2e      # e2e tests
npm run test:cov      # coverage
```

---

## Deployment (Render / Railway)

1. Set build command: `npm install && npx prisma generate && npm run build`
2. Set start command: `npm run start:prod`
3. Add all variables from `.env.example` to the platform's environment settings
4. Ensure `DATABASE_URL` points to your hosted PostgreSQL instance (Neon / Supabase)

---

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)
