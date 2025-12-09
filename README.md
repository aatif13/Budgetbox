# 📦 BudgetBox — Offline-First Personal Budget Manager

BudgetBox is a local-first monthly budgeting application that works even when the internet disconnects.  
Every keystroke is automatically saved into IndexedDB and remains persistent across refreshes, tab close, and offline mode.  
When connection returns, users can sync their stored local data to the server.

Built for assignment evaluation — fully aligned with PDF requirements.

---

## 🔑 Demo Login (Required by PDF)

| Field    | Value               |
|----------|---------------------|
| Email    | hire-me@anshumat.org |
| Password | HireMe@2025!        |

> Dashboard is not accessible without login.

---

## ✨ Features

| Feature                   | Status |
|----------------------------|--------|
| Fully works offline        | ✔ IndexedDB persistence |
| Auto-saves every keystroke | ✔ No save button needed |
| Dashboard & analytics      | ✔ Burn rate + savings graph |
| Expense visualization      | ✔ Pie chart using Recharts/Chart.js |
| Manual + Auto Sync         | ✔ Sync to backend when online |
| Protected routes           | ✔ Dashboard restricted until login |
| Local-first design         | ✔ Low-latency + durable data model |

---

## 🏗 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Next.js 15 • React • TypeScript |
| Styling    | TailwindCSS • shadcn/ui |
| State      | Zustand + Persist + LocalForage |
| Local DB   | IndexedDB |
| Backend    | Node.js/FastAPI (REST API) |
| Database   | PostgreSQL |
| Deployment | Vercel (client) + Render/Railway (server) |

---

## 🚀 Getting Started (Local)

```bash
npm install
npm run dev

Visit → http://localhost:3000/login
Enter demo credentials → redirected to dashboard.

🔥 How to Test Offline Mode (Important for Review)
- Login using demo account
- Open dashboard
- DevTools → Network tab → toggle Offline
- Change budget values — they must persist instantly
- Refresh page → data should remain
- Turn internet ON → click Sync (or auto-sync triggers)
This validates offline-first architecture.

🔥 Backend Endpoints (Mandatory)
|  |  |  | 
|  |  |  | 
|  |  |  | 


Example sync request:
POST /budget/sync
{
  "income": 60000,
  "expenses": {
    "food": 12000,
    "transport": 4000,
    "bills": 8000,
    "subscriptions": 3000,
    "misc": 2000
  }
}



🏗️ Architecture Diagram
┌─────────────────────────────┐
│         UI Layer             │
│  Next.js + React + Tailwind  │
└───────────────┬─────────────┘
                │
     Client Interactions + Forms
                │
     Local-First Data Handling
                ▼
┌────────────────────────────────────────────────────────────┐
│                    State + Persistence Layer                │
│ Zustand + Zustand-Persist + LocalForage → IndexedDB Store   │
│                                                             │
│ All keystrokes auto-save → survive refresh/offline          │
│ Dashboard reads directly from store in real time            │
└───────────────┬────────────────────────────────────────────┘
                │
          (If Internet Available)
                │
                ▼
     ┌────────────────────────┐
     │     Sync Service       │
     │ POST /budget/sync      │
     │ GET /budget/latest     │
     └────────────┬───────────┘
                  │
            Backend Server
                  │
                  ▼
    ┌──────────────────────────────┐
    │  Node.js/FastAPI Backend     │
    │  with PostgreSQL DB          │
    └──────────────────────────────┘




📁 Folder Structure
budgetbox/
 ├─ frontend/
 │  ├─ app/login/page.tsx
 │  ├─ app/dashboard/page.tsx
 │  ├─ components/ui/*
 │  ├─ store/budgetStore.ts
 │  └─ public/assets
 ├─ backend/
 │  ├─ routes/
 │  ├─ controllers/
 │  └─ database.sql
 ├─ docs/
 │  ├─ demo-screenshots/
 │  └─ demo.gif
 ├─ architecture.png
 └─ README.md ← YOU ARE HERE



✅ Evaluation Criteria Mapping
- Local-first data design → IndexedDB + Zustand Persist ✔
- Offline experience → DevTools offline test ✔
- Sync correctness → POST/GET endpoints ✔
- UI/UX quality → Tailwind + shadcn/ui ✔
- Code structure → Separate frontend/backend folders ✔
- README clarity → This document ✔

📝 Notes for Reviewer
BudgetBox is built with a local-first architecture where data never gets lost.
All inputs auto-persist in IndexedDB, enabling complete offline usage.
A dashboard provides live expense analytics, burn rate, trends & pie chart visualization.
Screenshots, architecture diagram, and demo login credentials are included for easy evaluation.


