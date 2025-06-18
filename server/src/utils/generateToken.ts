/**
 * @desc    Generate a JWT token for a given user ID
 * @param   userId - The ID of the authenticated user
 * @returns JWT token string valid for 7 days
 */

import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
	return jwt.sign(
		{id: userId}, // Payload: user ID, data stored inside the token
		process.env.JWT_SECRET as string, // Secret key from .env file
		{expiresIn: '7d'}); // Token expires in 7 days
};

export default generateToken;
