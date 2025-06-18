# User Auth App

This is a full-stack user authentication application built with React, TypeScript, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Formik and Yup

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Cookie-based authentication using HTTP-only cookies

## Features

- User registration
- Protected routes
- Fetch current authenticated user
- Logout functionality
- Form validation (client-side and server-side)
- Full cookie-based auth flow with secure session management

## Project Structure

```
user-auth-app/
├── client/                 # Frontend (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── ...
└── server/                 # Backend (Node.js + Express + MongoDB)
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   ├── models/
    │   └── index.ts
    └── ...
```

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:bojan-ilic/user-auth-app.git
cd user-auth-app
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
npm run dev
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
npm run dev
```

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=jwt_secret_key
```

## Notes

- Authentication is handled using HTTP-only cookies for improved security.
- Client requests use `withCredentials: true` to maintain sessions.
- The backend uses CORS configuration to allow credentials from the client domain.

