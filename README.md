# Task Manager UI

React and Vite frontend for the Task Manager API.

## Requirements

- Node.js 20+
- The backend running from `../task-manager`

## Setup

From this directory:

```powershell
npm install
```

The development configuration uses Vite on port `5173` and proxies `/api`
requests to `http://localhost:3000`. To use a direct API URL instead, create
`.env` in this directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Do not put `VITE_API_BASE_URL` in the parent directory's `.env`; Vite reads the
frontend environment file from `task-manager-ui`.

## Run

Start the backend first in another terminal:

```powershell
cd ..\task-manager
npm run dev
```

Then start the frontend from this directory:

```powershell
npm run dev
```

Open `http://localhost:5173`.

## User flow

1. Register at `/register`.
2. Log in at `/login`; the JWT is stored in local storage.
3. Open `/tasks`; authenticated API requests receive the JWT automatically.
4. Create, edit, complete, and delete tasks.
5. Confirm logout to clear the token and return to `/login`.

## Validation

```powershell
npm run lint
npm run build
```

## Port and CORS notes

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Backend CORS setting: `task-manager/.env` -> `FRONTEND_URL=http://localhost:5173`
- Swagger: `http://localhost:3000/api-docs/`

If you change the frontend port, update both Vite's `server.port` and the
backend `FRONTEND_URL`, then restart both servers.
