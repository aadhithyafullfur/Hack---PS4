import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="auth-card" style={{ maxWidth: '600px', textAlign: 'left' }}>
                <h1 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Dashboard</h1>
                <h2 style={{ marginBottom: '0.5rem' }}>Welcome back, {user.fullName}!</h2>
                <p style={{ marginBottom: '2rem' }}>You have successfully authenticated.</p>

                <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user._id}</p>
                </div>

                <Button onClick={handleLogout}>
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
