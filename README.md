# MicroFin OS

Microfinance operations dashboard rebuilt from the UI template as a real app.

- **Frontend:** React + Vite (plain JS)
- **Backend:** Node.js + Express (in-memory data + REST API)

## Screens

- **Login** — demo credentials pre-filled; any non-empty credentials sign in.
- **Overview (Dashboard)** — animated KPI counters, disbursement bar chart, recent activity, loan portfolio by branch.
- **Human Resources**
  - Employee Records — sortable-looking table of employees.
  - Employee Profile — personal + employment info, onboarding checklist.
  - New Hire Onboarding — 3-step wizard (Personal Info → Job Details → Review) that POSTs a new employee to the API.
- **Placeholder modules** — Financial Management, Supply Chain, Fleet, Facilities, Client Services, Institutional Oversight (scaffolded "coming soon").

## Run it

Two terminals (or run the backend in the background):

```bash
# 1. API server  ->  http://localhost:4000
cd server
npm install
npm start

# 2. Web client  ->  http://localhost:5173  (proxies /api to :4000)
cd client
npm install
npm run dev
```

Open http://localhost:5173 and click **Sign in**.

## API

| Method | Path                  | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/login`          | Demo auth, returns a user object     |
| GET    | `/api/modules`        | Sidebar navigation tree              |
| GET    | `/api/reference`      | Departments + employment types       |
| GET    | `/api/dashboard`      | KPI targets, chart, branches, activity |
| GET    | `/api/employees`      | Employee list                        |
| GET    | `/api/employees/:id`  | One employee + onboarding tasks      |
| POST   | `/api/employees`      | Create a new hire                    |

## Mobile

The stack targets React Native + Expo for mobile as well. The Express API here is
shared; a future `mobile/` Expo client would consume the same endpoints.
