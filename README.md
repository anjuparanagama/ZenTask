# ZenTask

> Task & Analytics Management System — a full-stack application to create, organize, and analyze your tasks with rich dashboards and insights.

ZenTask lets users register, manage tasks (with priority, status, and due dates), and view analytics such as completion rates, overdue tasks, and priority breakdowns.

---

## Table of Contents

- [Tech Stack Summary](#tech-stack-summary)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
  - [3. Run Locally](#3-run-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Tech Stack Summary

### Frontend
- **Next.js 16 (App Router) + React 19** — Modern React framework providing SSR/SSG, file-based routing, and fast refresh. React 19 is used for the latest concurrent features.
- **TypeScript** — End-to-end type safety across the codebase.
- **Tailwind CSS v4** — Utility-first styling for rapid, consistent UI development.
- **TanStack Table** — Headless, powerful table primitives for the task data grid.
- **Recharts** — Composable charting library for the analytics/dashboard visualizations.
- **Axios** — Promise-based HTTP client for API communication, with a request interceptor that injects the JWT bearer token.
- **Lottie React** — Rendering of animated splash/illustration assets.
- **lucide-react** — Clean, tree-shakeable icon set.
- **Sonner** — Minimal toast notifications for user feedback.
- **date-fns** — Lightweight date formatting/handling.

**Why these?** The combination prioritizes developer experience, a small bundle footprint, and the ability to build a responsive, data-heavy dashboard quickly. Axios keeps data flow simple, while TanStack Table + Recharts handle the tabular and visual analytics needs. (Note: unused packages such as `zustand` and `@recharts/devtools` were removed to keep dependencies lean.)

### Backend
- **Node.js + Express 5** — Minimal, mature web framework for building the REST API.
- **TypeScript** — Type safety on the server side.
- **MySQL2** — High-performance MySQL/TiDB client with connection pooling.
- **TiDB (MySQL-compatible)** — Distributed, MySQL-compatible database (hosted on TiDB Cloud) used as the primary datastore.
- **JWT (jsonwebtoken)** — Stateless authentication via signed bearer tokens.
- **bcrypt** — Secure password hashing (cost factor 10).
- **CORS** — Cross-origin support for the frontend.
- **dotenv** — Environment configuration management.

**Why these?** Express keeps the API lean and explicit; the MySQL2 pool provides reliable, pooled connections to TiDB; bcrypt + JWT deliver industry-standard auth with no external session store. (Note: unused packages such as `prisma`, `@prisma/client`, `zod`, and their unused type stubs were removed since the runtime uses raw SQL via the MySQL2 pool rather than an ORM.)

---

## Database Schema

The application uses a **MySQL/TiDB** database named `zentask` with two primary tables. A `users` row has many `tasks`; tasks are scoped per user via `user_id`.

### Entity Relationship

```
┌───────────────────┐          ┌──────────────────────────┐
│      users        │ 1      * │          tasks           │
├───────────────────┤──────────┤──────────────────────────┤
│ id        (PK)    │          │ id            (PK)       │
│ name              │          │ title                    │
│ email     (UNIQUE)│          │ description              │
│ password          │          │ priority  (LOW/MED/ HIGH)│
│ created_at        │          │ status   (TODO/IN_PROG/  │
│ updated_at        │          │           COMPLETED)     │
└───────────────────┘          │ due_date                 │
                               │ user_id   (FK -> users)  │
                               │ created_at               │
                               │ updated_at               │
                               └──────────────────────────┘
                                          │
                          FK: fk_tasks_user (ON DELETE CASCADE)
```

### Table Definitions

**`users`**
| Column       | Type             | Constraints                         |
|--------------|------------------|-------------------------------------|
| `id`         | BIGINT           | PK, AUTO_INCREMENT                  |
| `name`       | VARCHAR(100)     | NOT NULL                            |
| `email`      | VARCHAR(150)     | NOT NULL, UNIQUE                    |
| `password`   | VARCHAR(255)     | NOT NULL (bcrypt hash)              |
| `created_at` | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP           |
| `updated_at` | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**`tasks`**
| Column       | Type                          | Constraints                                       |
|--------------|-------------------------------|---------------------------------------------------|
| `id`         | BIGINT                        | PK, AUTO_INCREMENT                                |
| `title`      | VARCHAR(255)                  | NOT NULL                                          |
| `description`| TEXT                          | NULLABLE                                          |
| `priority`   | ENUM('LOW','MEDIUM','HIGH')   | DEFAULT 'LOW'                                     |
| `status`     | ENUM('TODO','IN_PROGRESS','COMPLETED') | DEFAULT 'TODO'                          |
| `due_date`   | DATE                          | NOT NULL                                          |
| `user_id`    | BIGINT                        | NOT NULL, FK -> `users(id)` ON DELETE CASCADE     |
| `created_at` | TIMESTAMP                     | DEFAULT CURRENT_TIMESTAMP                         |
| `updated_at` | TIMESTAMP                     | DEFAULT CURRENT_TIMESTAMP ON UPDATE               |

**Indexes** (for query performance):
- `idx_tasks_user_id`   on `tasks(user_id)`
- `idx_tasks_status`    on `tasks(status)`
- `idx_tasks_priority`  on `tasks(priority)`
- `idx_tasks_due_date`  on `tasks(due_date)`

The full SQL is available in [`backend/database.sql`](backend/database.sql).

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18+ recommended) and **Yarn** (or npm/pnpm)
- A **MySQL/TiDB** database (the project uses a TiDB Cloud instance). You can use a local MySQL or any MySQL-compatible host.
- `git`

### 1. Backend Setup

```bash
# Clone and enter the backend directory
cd backend

# Install dependencies
yarn install          # or: npm install

# Configure environment variables
cp .env.example .env  # if an example exists; otherwise create .env (see below)
```

Create a `.env` file in `backend/` with the following variables (see [Environment Variables](#environment-variables)).

Initialize the database by running the schema:

```bash
# Apply the schema to your MySQL/TiDB instance (e.g. via the mysql CLI)
mysql -h <DB_HOST> -u <DB_USER> -p <DB_NAME> < database.sql
```

Start the backend:

```bash
yarn dev              # ts-node-dev with auto-reload (default port 5000)
# or for production build:
yarn build && yarn start
```

### 2. Frontend Setup

```bash
# From the project root, enter the frontend directory
cd frontend

# Install dependencies
yarn install          # or: npm install

# Configure environment variables
cp .env.example .env.local   # then edit the API base URL
```

The frontend uses `next.config.ts` rewrites so that any request to `/api/*` is proxied to `NEXT_PUBLIC_API_BASE_URL`.

### 3. Run Locally

Run both servers (in separate terminals):

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd backend && yarn dev

# Terminal 2 — Frontend (http://localhost:3000)
cd frontend && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** `frontend/.env.local` is git-ignored. By default the frontend falls back to `http://localhost:5000/api` if `NEXT_PUBLIC_API_BASE_URL` is not set.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable        | Description                                  | Example                              |
|-----------------|----------------------------------------------|--------------------------------------|
| `PORT`          | Port the API server listens on               | `5000`                               |
| `DB_HOST`       | Database host                                | `gateway01.ap-...tidbcloud.com`      |
| `DB_USER`       | Database username                            | `root`                               |
| `DB_PASSWORD`   | Database password                            | `********`                           |
| `DB_NAME`       | Database/schema name                         | `zentask`                            |
| `DB_PORT`       | Database port                                | `4000`                               |
| `DATABASE`      | Database name (alternative key)              | `zentask`                            |
| `JWT_SECRET`    | Secret used to sign JWT tokens               | a long random string                 |

### Frontend (`frontend/.env.local`)
| Variable                   | Description                                              | Example                                |
|----------------------------|----------------------------------------------------------|----------------------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API (used for `/api` rewrites)   | `http://localhost:5000/api`            |

---

## Project Structure

```
ZenTask/
├── backend/                # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/db.ts    # MySQL2 connection pool (TiDB)
│   │   ├── controllers/    # auth, tasks, dashboard logic
│   │   ├── routes/         # Express route definitions
│   │   ├── middleware/     # JWT auth middleware
│   │   └── utils/          # JWT token helpers
│   ├── database.sql        # DB schema & seed
│   └── package.json
├── frontend/               # Next.js 16 + React 19 app
│   ├── src/
│   │   ├── components/     # UI components (SideMenu, Table, Theme, ...)
│   │   ├── services/       # API service layer (auth, task, dashboard)
│   │   ├── hooks/          # React hooks
│   │   ├── lib/            # axios instance, helpers
│   │   └── ...
│   └── package.json
├── netlify.toml            # Netlify deployment config (builds frontend)
└── README.md
```

---

## License

See [LICENSE](LICENSE).
