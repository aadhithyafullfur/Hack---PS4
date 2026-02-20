import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
