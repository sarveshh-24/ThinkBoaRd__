# ThinkBoard 📝

ThinkBoard is a full-stack MERN notes application where users can create, view, edit, and delete their own notes.

The project now includes JWT-based authentication, password hashing, protected API routes, user-specific notes, theme persistence, and Upstash rate limiting.

## 🚀 Live Demo

The original deployment is available at:

[https://thinkboard-s6cc.onrender.com/](https://thinkboard-00wu.onrender.com/)

> This JWT-authenticated version should be deployed separately after you create the new GitHub repository.

## ✨ Features

- User registration and login
- JWT authentication stored in an HTTP-only cookie
- Password hashing with bcryptjs
- Protected note routes
- Each user can access only their own notes
- Create, read, update, and delete notes
- Light/Dark theme using DaisyUI
- Theme preference persists when navigating between pages
- Toast notifications
- Loading and empty states
- Upstash Redis rate limiting
- Responsive React UI

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Axios, Tailwind CSS, DaisyUI, Lucide React, React Hot Toast

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser

**Services:** Upstash Redis / Ratelimit

## 📁 Project Structure

```text
ThinkBoard/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── lib/
│       ├── pages/
│       └── App.jsx
├── .gitignore
└── README.md
```

## 🔐 How Authentication Works

1. A new user registers with a name, email, and password.
2. The password is hashed with bcryptjs before it is stored.
3. On registration/login, the server creates a JWT.
4. The JWT is stored in an HTTP-only cookie.
5. Protected routes verify the JWT before handling requests.
6. Every note stores the ID of the user who created it.
7. Note queries also check ownership, so knowing another note's ID is not enough to access it.

## 💻 Run Locally

### 1. Install dependencies

Install the backend dependencies:

```bash
cd backend
npm install
```

Then install the frontend dependencies:

```bash
cd ../frontend
npm install
```

The project already includes the authentication dependencies (`jsonwebtoken`, `bcryptjs`, and `cookie-parser`), so no separate JWT installation is required.

For a production build, run from the project root:

```bash
cd ..
npm run build
```

### 2. Configure environment variables

Create `backend/.env` using `backend/.env.example` as a template:

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
JWT_SECRET=your_long_random_secret
PORT=5001
NODE_ENV=development
```

Never commit `.env` to GitHub.

### 3. Start the backend

```bash
cd backend
npm run dev
```

### 4. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## 🌐 Deployment

For a Render deployment, add these environment variables to the service:

```text
MONGO_URI
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
JWT_SECRET
NODE_ENV=production
```

The root build command is:

```bash
npm run build
```

The root start command is:

```bash
npm start
```

If Auto-Deploy is enabled, pushing a new commit to the connected GitHub repository will trigger a new Render deployment automatically.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get the current logged-in user |

### Notes

All note endpoints require authentication.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/notes` | Get the current user's notes |
| GET | `/api/notes/:id` | Get one of the current user's notes |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update one of the current user's notes |
| DELETE | `/api/notes/:id` | Delete one of the current user's notes |

## 🧪 Recommended Test

Before deploying, create two accounts:

```text
Account A → create a note
Account B → log in
```

Account B should see an empty notes page and should not be able to access Account A's note, even if its note ID is known.

## 📚 What This Project Demonstrates

- MERN stack development
- REST API design
- MongoDB CRUD operations
- JWT authentication
- Password hashing
- HTTP-only cookies
- Protected routes and resource ownership
- React routing and state management
- API error handling
- Rate limiting
- Theme persistence
- Production deployment workflow

## 📄 License

This project is intended primarily as a learning and portfolio project.
