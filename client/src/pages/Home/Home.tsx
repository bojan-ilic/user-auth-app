/**
 * @desc Home page (protected)
 * - Fetches the current authenticated user on mount
 * - Redirects to "/" if user is not authenticated
 * - Displays welcome message and logout button
 */

import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface User {
	firstName: string;
	lastName: string;
}

const Home = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch current user data on mount
		const fetchUser = async () => {
			try {
				// Attempt to get the authenticated user from the backend
				const res = await axios.get('http://localhost:5000/api/auth/current-user', {
					withCredentials: true
				});
				console.log('User loaded:', res.data);
				setUser(res.data);
			} catch (error) {
				console.error('Not authenticated');
				navigate('/'); // Redirect to login page if the user is not authenticated
			} finally {
				// Mark loading as complete regardless of success or failure
				setLoading(false);
			}
		};

		fetchUser();
	}, [navigate]);

	// Handles logout and redirects to login
	const handleLogout = async () => {
		try {
			await axios.post(
				'http://localhost:5000/api/auth/logout',
				{},
				{withCredentials: true}
			);
			navigate('/');
		} catch (error) {
			console.error('Logout failed');
		}
	};

	// Show loading indicator while fetching user
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-lg">Loading...</p>
			</div>
		);
	}

	// Prevent rendering if user data is not available
	if (!user) return null;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<h1 className="text-2xl font-bold mb-4">
				Welcome {user.firstName} {user.lastName}
			</h1>
			<button
				onClick={handleLogout}
				className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
			>
				Log Out
			</button>
		</div>
	);
};

export default Home;
