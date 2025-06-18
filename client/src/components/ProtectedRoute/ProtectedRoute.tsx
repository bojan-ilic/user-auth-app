/**
 * @desc ProtectedRoute component
 * - Checks if the user is authenticated on mount
 * - If not authenticated, redirects to the login page ("/")
 * - If authenticated, renders the child components
 */

import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Props interface for ProtectedRoute, expects a single child component

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is authenticated
		const checkAuth = async () => {
			try {
				// Attempt to fetch current user
				await axios.get('http://localhost:5000/api/auth/current-user', {
					withCredentials: true
				});
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
				navigate('/'); // Redirect to login if unauthenticated
			}
		};

		checkAuth();
	}, [navigate]);

	// Show loading state while authentication is being checked
	if (isAuthenticated === null) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-lg">Checking authentication...</p>
			</div>
		);
	}

	// If authenticated, render the protected child component (e.g. <Home />)
	return <>{children}</>;
};

export default ProtectedRoute;
