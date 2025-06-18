/**
 * @desc    Log out the current user by clearing the authentication cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */

import {Request, Response} from 'express';

export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
	res
		// Clear the JWT token from cookies
		.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict'
		})
		// Respond with success message
		.status(200)
		.json({message: 'Logged out successfully'});
};
