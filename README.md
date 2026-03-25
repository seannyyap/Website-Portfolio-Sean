# Portfolio Website - Sean

A modern portfolio built with **Next.js (App Router)** and **Sanity Studio**.

## Project structure

```
Website-Portfolio-Sean/
├── frontend/                    # Next.js app + embedded Sanity Studio (/admin)
│   ├── app/                     # App Router pages (including /admin)
│   ├── components/              # UI sections (Hero/About/Projects/Experience/etc)
│   ├── sanity/                  # Sanity env + schemas + studio tools
│   ├── sanity.config.ts         # Studio config (basePath: /admin)
│   ├── .env.example             # Example env (safe to commit)
│   └── .env.local               # Local env (DO NOT COMMIT)
└── README.md
```

## Prerequisites
- **Node.js** v18+ (LTS recommended)
- A **Sanity** project + dataset (create at `sanity.io/manage`)

## Setup

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Configure env vars

Copy `frontend/.env.example` → `frontend/.env.local` and set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Important:
- `NEXT_PUBLIC_*` variables are exposed to the browser. **Never put secrets/tokens there.**

### 3) Sanity CORS

In `sanity.io/manage` → your project → **API** → **CORS origins**:
- Add `http://localhost:3000`
- Enable **Allow credentials / Authenticated requests**

## Run locally

```bash
cd frontend
npm run dev
```

- Website: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/admin`

## Content model

Sanity document types:
- `siteSettings`: controls Hero/About/TechStack/Contact/Footer/Navigation
- `project`: projects list + images + links
- `experience`: timeline entries

## Security / secrets

- `.env.local` must never be committed.
- If you ever accidentally committed a token/password, **rotate it immediately** in the provider (MongoDB Atlas / Sanity / GitHub).
