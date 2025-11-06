// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css'; // Ensure global styles are loaded

// Get the root element from the public/index.html file
const rootElement = document.getElementById('root');

if (rootElement) {
    // Use React's concurrent mode entry point (createRoot)
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            {/* The main component of our application */}
            <App />
        </React.StrictMode>,
    );
} else {
    console.error("The root element (#root) was not found in the DOM. Ensure public/index.html is correct.");
}
