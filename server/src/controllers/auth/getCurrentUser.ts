/**
 * @desc    Get the currently logged-in user based on the token in cookies
 * @route   GET /api/auth/current-user
 * @access  Private
 */

import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
	try {
		// Retrieve token from cookies
		const token = req.cookies.token;

		// If no token is present in cookies, user is not authenticated
		if (!token) {
			res.status(401).json({message: 'Not authenticated'});
			return;
		}

		// Verify token and extract user ID
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

		// Fetch user from DB, excluding password
		const user = await User.findById(decoded.id).select('-password');

		// If user doesn't exist in the database
		if (!user) {
			res.status(404).json({message: 'User not found'});
			return;
		}

		// Respond with user data
		res.status(200).json(user);
	} catch (error) {
		console.error('JWT verification error:', error);
		res.status(401).json({message: 'Invalid or expired token'});
	}
};
