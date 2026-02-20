import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/login', formData);
            const { token, role, ...userData } = response.data;

            // Store user data explicitly including role
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ ...userData, role }));

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/'); // Users go to home page
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your credentials to access your account"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: '#60a5fa' }} /> Remember me
                    </label>
                    <Link to="#" style={{ fontSize: '0.875rem', color: '#60a5fa' }}>Forgot password?</Link>
                </div>

                {error && (
                    <div style={{
                        color: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <Button type="submit" loading={loading} style={{ marginTop: '0.5rem' }}>
                    Sign In
                </Button>

                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#60a5fa' }}>Sign Up</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
