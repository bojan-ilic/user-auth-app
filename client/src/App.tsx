import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

/**
 * @desc Main App component
 * - Defines the structure of routes in the application
 * - "/" shows the registration page
 * - "/home" shows the protected Home page (requires authentication)
 */
const App = () => {
	return (
		<Routes>
			{/* Public route */}
			<Route path="/" element={<Register/>}/>

			{/* Protected route - accessible only to authenticated users */}
			<Route
				path="/home"
				element={
					<ProtectedRoute>
						<Home/>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default App;
