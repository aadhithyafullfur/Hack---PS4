import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                            <Bot size={24} color="var(--primary-color)" />
                            <span>I TECH SOLUTIONS</span>
                        </Link>
                        <p style={{ fontSize: '0.9rem', maxWidth: '300px', color: '#9ca3af' }}>
                            Next-generation behavioral intelligence for modern enterprises.
                        </p>
                    </div>

                    {/* Product */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Platform</h4>
                        <Link to="/products" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Services</Link>
                        <Link to="/pricing" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Pricing</Link>
                        <Link to="/demo-request" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Request Demo</Link>
                    </div>

                    {/* Company */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Company</h4>
                        <Link to="/contact" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Contact</Link>
                        <Link to="#" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Privacy Policy</Link>
                        <Link to="#" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Terms of Service</Link>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#9ca3af' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: '#9ca3af' }}><Linkedin size={20} /></a>
                            <a href="#" style={{ color: '#9ca3af' }}><Github size={20} /></a>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                    &copy; {new Date().getFullYear()} I TECH SOLUTIONS. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
