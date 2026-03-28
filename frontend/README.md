# ClientFlow — Frontend

Next.js 16 frontend for ClientFlow. A clean, responsive CRM interface with a drag-and-drop deal pipeline, customer management, and activity tracking.

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)

---

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Drag and Drop**: dnd-kit
- **Icons**: lucide-react
- **HTTP**: Axios
- **Auth**: JWT stored in cookies (js-cookie)

---

## Project Structure

```
app/
├── (auth)/
│   ├── login/              Sign in page
│   └── register/           Create organization + account
├── (dashboard)/
│   ├── dashboard/          Stats overview
│   ├── customers/          Customer list with search and CRUD
│   ├── deals/              Kanban pipeline board
│   │   └── [id]/           Deal detail + activity log
│   └── settings/           Profile and org info
├── layout.tsx              Root layout with SEO metadata
└── globals.css

components/
├── ui/                     Button, Input, Card, Badge, Modal, EmptyState, Spinner
├── layout/                 Sidebar, AuthProvider
└── deals/                  KanbanBoard

lib/
└── api.ts                  Axios instance with auth interceptors

store/
└── auth.store.ts           Zustand auth store (login, register, logout, fetchMe)

types/
└── index.ts                Shared TypeScript types
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start the development server

```bash
npm run dev
```

App runs at `http://localhost:3000`

> The backend must be running at the URL set in `NEXT_PUBLIC_API_URL`.

---

## Pages

| Route         | Description                                          |
|---------------|------------------------------------------------------|
| `/login`      | Sign in with email and password                      |
| `/register`   | Create a new organization and admin account          |
| `/dashboard`  | Stat cards and pipeline breakdown chart              |
| `/customers`  | Searchable customer list — create, edit, delete      |
| `/deals`      | Kanban board — drag cards to update deal stage       |
| `/deals/[id]` | Deal detail with customer info and activity timeline |
| `/settings`   | Current user profile and organization details        |

---

## Auth Flow

1. On login or register, the API returns an `accessToken`
2. The token is stored in a cookie via `js-cookie`
3. `AuthProvider` calls `GET /auth/me` on mount to hydrate the user store
4. If no valid token is found, the user is redirected to `/login`
5. The Axios interceptor attaches `Authorization: Bearer <token>` to every request
6. On a 401 response, the token is cleared and the user is redirected to `/login`

---

## Key Components

### KanbanBoard

Drag-and-drop board powered by dnd-kit. Each column is a droppable zone keyed by `DealStage`. Dragging a card to a new column calls `PUT /deals/:id` with the updated stage optimistically.

### AuthProvider

Wraps all dashboard routes. Fetches the current user on mount and redirects to `/login` if unauthenticated. Shows a centered spinner during the loading state.

### Sidebar

Fixed left navigation with active route highlighting. Includes the ClientFlow logo, nav links, user info, sign out, and a branding link to [anointedthedeveloper](https://github.com/anointedthedeveloper).

---

## SEO

Root layout (`app/layout.tsx`) includes full Next.js `metadata`:

- Title template: `Page Name | ClientFlow`
- Description, keywords, author
- OpenGraph tags (title, description, URL, site name)
- Twitter card (summary_large_image)
- Robots: index + follow

---

## Scripts

```bash
npm run dev       # development server with hot reload
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
```

---

## Deployment (Vercel)

```bash
npx vercel --prod
```

Set the following environment variable in the Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

---

Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)
