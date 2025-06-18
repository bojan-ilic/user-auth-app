/**
 * Express app configuration.
 * Sets up middleware, routes, and basic app behavior.
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ // Enable CORS for frontend origin
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use(cookieParser()); // Parse cookies from incoming requests

// Routes
app.use('/api/auth', authRoutes); // Routes for user registration, login, logout, etc.

// Test route
app.get('/', (_req, res) => {
	res.send('API is running...');
});

export default app;