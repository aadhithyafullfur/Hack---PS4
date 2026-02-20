import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    <Bot size={28} color="var(--primary-color)" />
                    <span>I TECH SOLUTIONS</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', display: 'none' }}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                <div className="nav-links hidden-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Pricing</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </Link>
                                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '8px' }}>Sign Out</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500' }}>Log In</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
