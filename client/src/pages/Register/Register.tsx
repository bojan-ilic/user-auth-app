/**
 * @desc User registration page
 * - Displays a registration form using Formik with Yup validation
 * - On success: registers the user via backend and redirects to /home
 * - On failure: shows an error message from the backend
 */

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

const Register = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	// Initial empty values for the form fields
	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	// Yup schema for validating form input fields
	const validationSchema = Yup.object({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		email: Yup.string().email('Invalid email format').required('Email is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
	});

	// Handles form submission: sends data to backend and navigates on success
	const handleSubmit = async (values: typeof initialValues) => {
		try {
			setErrorMessage('');
			await axios.post('http://localhost:5000/api/auth/register', values, {
				withCredentials: true
			});
			navigate('/home');
		} catch (error: any) {
			const message = error.response?.data?.message || 'Registration failed';
			console.error('Error: ', message);
			setErrorMessage(message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

				{errorMessage && (
					<div className="text-red-500 text-sm text-center mb-2">
						{errorMessage}
					</div>
				)}

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({isSubmitting}) => (
						<Form className="space-y-4">
							<div>
								<Field
									type="text"
									name="firstName"
									placeholder="First Name"
									className="w-full px-4 py-2 border rounded"
								/>
								<ErrorMessage name="firstName" component="div" className="text-red-500 text-sm"/>
							</div>

							<div>
								<Field
									type="text"
									name="lastName"
									placeholder="Last Name"
									className="w-full px-4 py-2 border rounded"
								/>
								<ErrorMessage name="lastName" component="div" className="text-red-500 text-sm"/>
							</div>

							<div>
								<Field
									type="email"
									name="email"
									placeholder="Email"
									className="w-full px-4 py-2 border rounded"
								/>
								<ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
							</div>

							<div>
								<Field
									type="password"
									name="password"
									placeholder="Password"
									className="w-full px-4 py-2 border rounded"
								/>
								<ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`w-full py-2 px-4 rounded text-white 
									${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
							>
								{isSubmitting ? 'Registering...' : 'Register'}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Register;
