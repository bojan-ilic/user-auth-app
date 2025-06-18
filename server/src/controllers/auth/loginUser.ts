/**
 * @desc    Authenticate user and issue a JWT token in HTTP-only cookie
 * @route   POST /api/auth/login
 * @access  Public
 */

import {Request, Response} from 'express';
import User from '../../models/User';
import generateToken from '../../utils/generateToken';

export const loginUser = async (req: Request, res: Response): Promise<void> => {

	// Destructure email and password from request body
	const {email, password} = req.body;

	// Validate input
	if (!email || !password) {
		res.status(400).json({message: 'Email and password are required.'});
		return;
	}

	// Find user by email
	try {
		const user = await User.findOne({email});

		// If user not found or password doesn't match
		if (!user || !(await user.comparePassword(password))) {
			res.status(400).json({message: 'Invalid email or password.'});
			return;
		}

		// Generate JWT token
		const token = generateToken(user._id.toString());

		// Set token as HTTP-only cookie and respond with user info
		res
			// Set JWT as HTTP-only cookie (secure in production)
			.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
			})
			.status(200)
			// Respond with user data (excluding password)
			.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({message: 'Server error'});
	}
};
