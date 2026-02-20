import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-layout">
            {/* Left Side - Brand Panel (Glassy) */}
            <div className="brand-panel">
                <div className="hero-glow" style={{ width: '400px', height: '400px', opacity: 0.5 }}></div>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                        Next-Gen<br />Intelligence
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '400px' }}>
                        Join the platform defining the future of lead conversion.
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Form */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', width: '100%' }}>
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>{title}</h2>
                        <p style={{ color: '#9ca3af' }}>{subtitle}</p>
                    </div>
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;
