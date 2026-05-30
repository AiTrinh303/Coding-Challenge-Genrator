# 🚀 AI Challenge Generator

![Backend](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![Frontend](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black?logo=openai)
![Auth](https://img.shields.io/badge/Auth-Clerk-orange)
![Deploy](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render)

> A full-stack AI-powered platform that generates multiple-choice coding challenges across Python, JavaScript, Java, and C++ using OpenAI, with authentication, history tracking, and user quota management.

## Table of Contents
- [Live Tech Stack & Resources](#-live-tech-stack--resources)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Application Flow](#-application-flow)
- [Requirements](#-requirements)
- [Backend Setup](#-backend-setup)
- [Run Backend](#-run-backend)
- [Frontend Setup](#-frontend-setup)
- [Run Frontend](#-run-frontend)
- [Deployment (Render)](#-deployment-render)
- [Clerk Configuration](#-clerk-configuration)
- [API Endpoints](#-api-endpoints)
- [OpenAI Integration](#-openai-integration)
- [Database](#-database)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

## 🔗 Live Tech Stack & Resources

- 🤖 OpenAI API Platform: https://platform.openai.com/  
- 🔐 Clerk Authentication: https://go.clerk.com/naBxpyl  
- 🚀 Deployment Platform (Render): https://render.com/  

Backend:

- Python 3.12+
- FastAPI
- SQLAlchemy
- SQLite
- OpenAI API
- Clerk Backend API
- Svix for Clerk webhook verification
- python-dotenv

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- Clerk React

## Course Topics Covered

This project covers several required course topics:

- **Web Development**: FastAPI backend with API routes.
- **Database Integration**: SQLAlchemy models with SQLite.
- **Requests and External Libraries**: OpenAI, Clerk, FastAPI, SQLAlchemy, Svix, dotenv.
- **File Processing and JSON Handling**: JSON parsing from OpenAI and JSON serialization for challenge options.
- **Error Handling and Exceptions**: HTTP exceptions, fallback AI response, webhook verification errors.
- **Virtual Environments and Dependency Management**: `requirements.txt`, `pyproject.toml`, and `uv.lock`.
- **OOP**: SQLAlchemy database models are Python classes.


## ✨ Key Features

### 🧠 AI-Powered Learning
- Generates multi-language multiple-choice questions using OpenAI
- Supported languages: `Python`, `JavaScript`, `Java`, `C++`
- Difficulty levels: `easy`, `medium`, `hard`
- Structured JSON responses with validation
- Fallback system for reliability

### 🔐 Authentication & Security
- Clerk authentication (sign in / sign up)
- Protected routes (frontend)
- Secure backend token verification

### 📊 User System
- Per-user quota management
- Automatic quota creation via Clerk webhooks
- Daily quota reset mechanism

### 📚 Learning Experience
- Instant feedback after answering questions
- Detailed explanations for each answer
- Personal challenge history tracking


## 📁 Project Structure


```text
.
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── database.db
│   └── src/
│       ├── app.py
│       ├── ai_generator.py
│       ├── utils.py
│       ├── prompts/
│       │   └── challenge_system_prompt.txt
│       ├── database/
│       │   ├── model.py
│       │   └── db.py
│       └── routes/
│           ├── challenge.py
│           └── webhooks.py
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── auth/
│       ├── challenge/
│       ├── history/
│       ├── layout/
│       ├── pages/
│       └── utils/
└── README.md
```

## 🔄 Application Flow

1. User logs in via Clerk 🔐  
2. Frontend receives JWT token  
3. Token is sent to backend API  
4. Backend verifies token via Clerk  
5. User quota is checked  
6. OpenAI generates a challenge 🧠  
7. Challenge is stored in SQLite  
8. Frontend renders MCQ(Multiple Choice Questions) interface  
9. User result is saved to history 📊  

## ⚙️ Requirements
Install these before running the project:

- Python 3.12 or newer
- Node.js and npm
- A Clerk account and application
- An OpenAI API key

Optional:

- `uv` Python package manager
- ngrok or another tunnel tool for local Clerk webhook testing

Install `uv` if you want to use it:

```bash
pip install uv
```

## 🔧 Backend Setup

From the repository root:

```bash
cd backend
```

Option 1: install dependencies with `uv`:

```bash
uv sync
```

Option 2: install dependencies with `pip`:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

On Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create the backend environment file:

```text
backend/src/.env
```

Required backend variables:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret
```

Notes:

- `CLERK_SECRET_KEY` is used to authenticate incoming user requests.
- `OPENAI_API_KEY` is used by `backend/src/ai_generator.py`.
- `CLERK_WEBHOOK_SECRET` is used by the Clerk webhook endpoint.

## ▶️ Run Backend

From the `backend/` folder:

```bash
python server.py
```

Or with `uv`:

```bash
uv run ./server.py
```

The backend runs at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
http://localhost:8000/redoc
```

## 💻 Frontend Setup

Open a second terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create or update the frontend environment files.

For local development:

```text
frontend/.env
frontend/.env.development
```

Recommended local variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:8000
```

For production:

```text
frontend/.env.production
```

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=https://your-backend-domain.com
```

## ▶️ Run Frontend

From the `frontend/` folder:

```bash
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173
```

If port `5173` is already in use, Vite may use another port such as:

```text
http://localhost:5174
```

## 🔐 Clerk Configuration

In Clerk, make sure local frontend URLs are allowed.

Recommended local URLs:

```text
http://localhost:5173
http://localhost:5174
```

The backend also checks authorized parties in:

```text
backend/src/utils.py
```

The CORS origins are configured in:

```text
backend/src/app.py
```

If your frontend runs on a new domain or port, update both places.

## 🔐 Clerk Webhook

The backend webhook endpoint is:

```text
POST /webhooks/clerk
```

It verifies the request with `CLERK_WEBHOOK_SECRET`.

When Clerk sends a `user.created` event, the backend creates a challenge quota record for that user.

For production, configure Clerk webhook URL like:

```text
https://your-backend-domain.com/webhooks/clerk
```

For local testing, use a tunnel URL:

```text
https://your-tunnel-url/webhooks/clerk
```

## 🔌 API Endpoints

All challenge endpoints use the `/api` prefix and require a Clerk bearer token.

### Get Quota

```text
GET /api/quota
```

What it does:

- Authenticates the user.
- Finds the user's quota.
- Creates a quota record if one does not exist.
- Resets quota if more than 24 hours have passed.

Example response:

```json
{
  "id": 1,
  "user_id": "user_abc123",
  "quota_remaining": 49,
  "last_reset_date": "2026-05-30T11:00:00"
}
```

### Generate Challenge

```text
POST /api/generate-challenge
```

Example request:

```json
{
  "language": "JavaScript",
  "difficulty": "hard"
}
```

What it does:

- Authenticates the user.
- Checks quota.
- Generates a challenge with OpenAI.
- Saves the challenge in SQLite.
- Decreases quota by 1.

Example response:

```json
{
  "id": 12,
  "language": "JavaScript",
  "difficulty": "hard",
  "title": "Question title",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer_id": 1,
  "explanation": "Explanation text",
  "timestamp": "2026-05-30T11:00:00"
}
```

If the user has no quota left:

```json
{
  "detail": "Quota exhausted"
}
```

### Get History

```text
GET /api/history
```

What it does:

- Authenticates the user.
- Returns challenges created by that user.

Example response:

```json
{
  "challenges": [
    {
      "id": 12,
      "difficulty": "hard",
      "date_created": "2026-05-30T11:00:00",
      "created_by": "user_abc123",
      "title": "Question title",
      "options": "[\"Option A\", \"Option B\", \"Option C\", \"Option D\"]",
      "correct_answer_id": 1,
      "explanation": "Explanation text"
    }
  ]
}
```

Note: the current database model stores challenge difficulty, title, options, answer, explanation, creator, and date. The generate response includes `language`, but language is not currently stored as a database column for history records.

## 🤖 OpenAI Integration

OpenAI challenge generation is implemented in:

```text
backend/src/ai_generator.py
```

The system prompt is stored in:

```text
backend/src/prompts/challenge_system_prompt.txt
```

The backend uses:

```text
gpt-4.1-nano
```

The AI response must contain:

```json
{
  "title": "Question title",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer_id": 0,
  "explanation": "Why the answer is correct"
}
```

If OpenAI fails or returns invalid data, the backend returns a fallback Python list question so the app can still respond.

## Database

The backend uses SQLite with SQLAlchemy.

Database file:

```text
backend/database.db
```

The database path is defined in:

```text
backend/src/database/model.py
```

Tables:

- `challenges`
- `challenge_quotas`

### challenges

Stores generated challenges.

Important fields:

- `id`
- `difficulty`
- `date_created`
- `created_by`
- `title`
- `options`
- `correct_answer_id`
- `explanation`

### challenge_quotas

Stores user quota data.

Important fields:

- `id`
- `user_id`
- `quota_remaining`
- `last_reset_date`

Default quota is `50`.

When more than 24 hours have passed, quota resets to `10` in the current code.

## Deployment Notes

Backend deployment:

- Set backend environment variables in your hosting platform.
- Use `uv run server.py`.
- Make sure the deployed backend URL is added to Clerk webhook settings if webhooks are used.

Frontend deployment:

- Set `VITE_CLERK_PUBLISHABLE_KEY`.
- Set `VITE_API_URL` to the deployed backend URL.
- Build with `npm run build`.
- Deploy the generated `frontend/dist` folder.

After deployment:

- Add production frontend URL to Clerk.
- Add production frontend URL to backend CORS origins.
- Add production frontend URL to Clerk authorized parties in `backend/src/utils.py`.

## Troubleshooting

### Frontend says Clerk key is missing

Check:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Restart the frontend dev server after editing env files.

### Frontend cannot call backend

Check:

```env
VITE_API_URL=http://localhost:8000
```

Also confirm the backend is running:

```text
http://localhost:8000/docs
```

### CORS error

Update the allowed origins in:

```text
backend/src/app.py
```

### Authentication error

Check:

- `CLERK_SECRET_KEY` in `backend/src/.env`
- Authorized parties in `backend/src/utils.py`
- The actual frontend URL shown in the browser

### Webhook error

Check:

```env
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret
```

### OpenAI error

Check:

- `OPENAI_API_KEY` exists.
- The key is valid.
- The account has access to the configured model.

## 📈 Future Improvements
- 🏆 Leaderboard system
- 🧪 Code execution sandbox
- 🌍 Expanded language-specific learning paths
- 🎮 Gamification system
- 📊 Advanced analytics dashboard

## 👨‍💻 Author
Built as a full-stack AI engineering project using:
**React · FastAPI · OpenAI · Clerk · SQLite · Render**
