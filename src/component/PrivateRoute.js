import React from 'react';
import { Navigate } from 'react-router-dom';

function Route({ element, ...rest }) {
    const isAuthenticated = false; // Remplacez par votre logique d'authentification réelle

    return isAuthenticated ? element : <Navigate to="/Registration" />;
}

export default Route;

