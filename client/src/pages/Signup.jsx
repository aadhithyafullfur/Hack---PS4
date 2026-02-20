import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/signup', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });

            const { token, role, ...userData } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ ...userData, role }));

            // New users differ to Home Page as they are 'user' role by default
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Join us today and start your journey"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
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
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

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
                    Create Account
                </Button>

                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
                    Already have an account? <Link to="/login" style={{ color: '#60a5fa' }}>Sign In</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Signup;
