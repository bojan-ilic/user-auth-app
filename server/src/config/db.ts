/**
 * MongoDB connection setup using Mongoose.
 * Exits the process on failure to prevent server from running without a DB.
 */

import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI || '');
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1); // Exit the process if DB connection fails
	}
};

export default connectDB;
