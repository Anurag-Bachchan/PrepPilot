# PrepPilot

An AI-powered interview preparation tool. Upload your resume (or write a quick self-description) along with a target job description, and get back a personalized interview report — technical & behavioral questions with model answers, a job-match score, identified skill gaps, and a day-by-day preparation roadmap.

## Features

- **JWT-based authentication** — register, login, logout, session persistence via HTTP-only cookies
- **Resume upload & parsing** — accepts a PDF resume and extracts its text server-side
- **AI-generated interview report** (Google Gemini) — for a given resume/self-description + job description, generates:
  - A match score (0–100)
  - Technical questions with intention & model answers
  - Behavioral questions with intention & model answers
  - Skill gaps with severity
  - A multi-day preparation plan
- **AI-tailored resume PDF generation** — generates a job-tailored resume as a downloadable PDF (via Puppeteer)
- **Report history** — view all previously generated interview reports for the logged-in user

## Tech Stack

**Frontend:** React 19, React Router, Axios, Sass, Vite
**Backend:** Node.js, Express 5, MongoDB (Mongoose)
**AI:** Google Gemini (`@google/genai`) with Zod for structured JSON schema validation
**Other:** JWT + bcrypt for auth, Multer for file uploads, `pdf-parse` for resume text extraction, Puppeteer for PDF generation

## Project Structure

```
Resume_Pro/
├── backend/
│   ├── controllers/     # request handlers (auth, interview)
│   ├── middlewares/     # auth guard, file upload (multer)
│   ├── models/          # Mongoose schemas (User, InterviewReport, TokenBlacklist)
│   ├── routes/          # Express route definitions
│   ├── services/        # AI_service.js — Gemini prompt/schema + PDF generation
│   ├── config/          # database connection
│   └── index.js         # app entrypoint
└── frontend/
    └── src/
        ├── Features/
        │   ├── Auth/         # login/register pages, auth context, auth hook, auth API
        │   └── Interview/    # home/interview pages, interview context, interview hook, interview API
        ├── Shared/       # toast system, loader, logout button, error-message helper
        └── app_routes.jsx
```

Each feature follows the same layered pattern: **UI (pages/components) → hooks → context (state) → API service → backend route → controller → model.**

## Prerequisites

- Node.js (v18+ recommended)
- A MongoDB connection string (local or Atlas)
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=3000
DATABASE_URL=<your MongoDB connection string>
JWT_SECRET=<any long random string>
GOOGLE_GENAI_API_KEY=<your Gemini API key>
```

Run the backend:

```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend running at `http://localhost:3000` (see `baseURL` in `src/Features/*/services/*_api.js`).

## API Overview

| Method | Endpoint                              | Description                          | Auth |
|--------|----------------------------------------|---------------------------------------|------|
| POST   | `/api/auth/register`                  | Create an account                     | No   |
| POST   | `/api/auth/login`                     | Log in, sets auth cookie              | No   |
| POST   | `/api/auth/logout`                    | Log out, blacklists token             | Yes  |
| GET    | `/api/auth/me`                        | Get current logged-in user            | Yes  |
| POST   | `/api/interview/generate`             | Upload resume + descriptions, generate report | Yes |
| GET    | `/api/interview/reports`              | List all of the user's reports        | Yes  |
| GET    | `/api/interview/reports/:interviewId` | Get one report by id                  | Yes  |
| POST   | `/api/interview/resume/pdf/:interviewReportId` | Generate a tailored resume PDF | Yes |

## License

ISC
