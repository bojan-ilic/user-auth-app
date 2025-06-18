/**
 * @desc    Auth routes for user registration, login, logout, and current user info
 * @route   /api/auth
 */

import {Router} from 'express';
import {registerUser} from '../controllers/auth/registerUser';
import {loginUser} from '../controllers/auth/loginUser';
import {logoutUser} from '../controllers/auth/logoutUser';
import {getCurrentUser} from '../controllers/auth/getCurrentUser';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post('/logout', logoutUser);

// @route   GET /api/auth/current-user
// @desc    Get current logged-in user
// @access  Private (based on cookie)
router.get('/current-user', getCurrentUser);

export default router;

