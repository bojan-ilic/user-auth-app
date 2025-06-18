import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';

/**
 * @desc App entry point:
 * - Renders the root <App /> component inside #root element
 * - Wraps it in BrowserRouter for client-side routing
 * - Uses React.StrictMode to highlight potential issues
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</React.StrictMode>
);
