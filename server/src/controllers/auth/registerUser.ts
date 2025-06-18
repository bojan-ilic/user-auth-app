/**
 * @desc    Register a new user and issue a JWT token in HTTP-only cookie
 * @route   POST /api/auth/register
 * @access  Public
 */

import {Request, Response} from 'express';
import generateToken from '../../utils/generateToken';
import User from '../../models/User';


export const registerUser = async (req: Request, res: Response): Promise<void> => {

	// Extract user input from request body
	const {firstName, lastName, email, password} = req.body;

	// Validate required fields
	if (!firstName || !lastName || !email || !password) {
		res.status(400).json({message: 'All fields are required.'});
		return;
	}

	// Validate password length (minimum 6 characters)
	if (password.length < 6) {
		res.status(400).json({message: 'Password must be at least 6 characters.'});
		return;
	}

	// Check if user with the same email already exists
	try {
		const existingUser = await User.findOne({email});
		if (existingUser) {
			res.status(400).json({message: 'Email is already registered.'});
			return;
		}

		// Create and save new user
		const newUser = new User({firstName, lastName, email, password});
		await newUser.save();

		// Generate JWT token
		const token = generateToken(newUser._id.toString());

		// Set JWT as HTTP-only cookie and respond with user data
		res
			.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000
			})
			.status(201) // Created – New user registered successfully
			.json({
				_id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email
			});
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({message: 'Server error'});
	}
};
