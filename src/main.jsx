import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { HashRouter as Router } from "react-router-dom";

// Initialize a new instance of QueryClient

// Use createRoot().render instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router basename="/">
        <App />
      </Router>
  </React.StrictMode>
);
