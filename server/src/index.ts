/**
 * Entry point of the server application.
 * Connects to MongoDB and starts the Express server.
 */

import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Failed to connect to DB:', err);
		process.exit(1); // Exit process on DB connection failure
	});