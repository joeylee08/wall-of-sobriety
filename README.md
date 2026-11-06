# React + Express + Prisma Starter

A minimal, reusable full-stack TypeScript template using React, Vite, React Router, Express, Prisma 7, and PostgreSQL.

## Project Structure

- `client/` — React frontend with Vite, TypeScript, and plain CSS.
- `server/` — Express backend with TypeScript, Prisma, and PostgreSQL.
- `client/src/components/` — Reusable React components.
- `client/src/pages/` — Application pages.
- `server/src/routes/` — API routes.
- `server/src/util/` — Shared backend utilities, including Prisma Client.

## Prerequisites

- Node.js
- npm
- PostgreSQL

## Setup

1. Install dependencies from the project root:

   `npm install`

   `npm install --prefix client`

   `npm install --prefix server`

2. Copy `server/.env.example` to `server/.env`.

3. Set `DATABASE_URL` in `server/.env` to your local PostgreSQL connection string.

4. Create the corresponding PostgreSQL database if it doesn't already exist.

5. Generate Prisma Client:

   `npm run db:generate --prefix server`

6. Start development:

   `npm run dev`

The React frontend runs through Vite. The Express API listens on port 3001.

## Frontend

React Router is configured with a single `/` route pointing to `Home.tsx`.

Global styles are located in `client/src/styles.css`.

Additional pages and components can be added as needed.

## Backend

Express is configured with JSON parsing and a `/api/health` endpoint.

Prisma Client is initialized using the PostgreSQL driver adapter in `server/src/util/prisma.ts`.

The Prisma schema contains no application-specific models.

## Database

After adding your first Prisma model, create a migration:

`npm run db:migrate`

Regenerate Prisma Client after changing the schema:

`npm run db:generate --prefix server`

Generated Prisma Client files are excluded from Git and must be regenerated after cloning.

## Commands

- `npm run dev` — Start frontend and backend development servers.
- `npm run build` — Build frontend and backend.
- `npm run db:migrate` — Run development migrations.
- `npm run db:generate --prefix server` — Generate Prisma Client.
- `npm run start --prefix server` — Start the compiled Express server.

## Production

The frontend builds to `client/dist/`.

The backend builds to `server/dist/`.

Configure the production host to provide environment variables and route frontend requests appropriately.

## Notes

- Do not commit `.env` files, database backups, or `node_modules`.
- Authentication, payments, and application-specific database models are intentionally excluded.
- Add dependencies and features only when the application requires them.