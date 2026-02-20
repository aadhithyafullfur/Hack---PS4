import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Hexagon, Menu, X, ChevronRight, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/products' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                padding: scrolled ? '0.75rem 0' : '1.25rem 0',
                background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
                boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none'
            }}
        >
            <div className="container" style={{ maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>

                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.875rem',
                        textDecoration: 'none',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0) 100%)',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.15)'
                    }}>
                        <Hexagon size={24} color="#60a5fa" strokeWidth={1.5} style={{ position: 'absolute' }} />
                        <div style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%', boxShadow: '0 0 10px #60a5fa' }} />
                    </div>
                    <div>
                        <span style={{
                            color: '#ffffff',
                            fontWeight: '800',
                            fontSize: '1.25rem',
                            letterSpacing: '-0.03em',
                            display: 'block',
                            lineHeight: '1.2'
                        }}>
                            I TECH
                        </span>
                        <span style={{
                            color: '#60a5fa',
                            fontSize: '0.65rem',
                            fontWeight: '600',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            display: 'block'
                        }}>
                            Solutions
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{
                    display: 'none',
                    '@media (minWidth: 1024px)': { display: 'flex' },
                    alignItems: 'center',
                    background: scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
                    border: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                    padding: scrolled ? '0' : '0.5rem 1rem',
                    borderRadius: '100px',
                    backdropFilter: scrolled ? 'none' : 'blur(10px)'
                }} className="lg-nav">
                    <style>
                        {`
                        @media (min-width: 1024px) {
                            .lg-nav { display: flex !important; }
                            .mobile-menu-btn { display: none !important; }
                        }
                        @media (max-width: 1023px) {
                            .lg-nav { display: none !important; }
                            .mobile-menu-btn { display: flex !important; }
                        }
                        `}
                    </style>
                    <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    style={({ isActive }) => ({
                                        padding: '0.5rem 1.25rem',
                                        color: isActive ? '#ffffff' : '#9ca3af',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? '600' : '500',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '100px',
                                        background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                        display: 'block'
                                    })}
                                    onMouseEnter={e => {
                                        if (!e.currentTarget.style.background.includes('rgba(255, 255, 255, 0.08)')) {
                                            e.currentTarget.style.color = '#ffffff';
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!location.pathname.endsWith(link.path)) {
                                            e.currentTarget.style.color = '#9ca3af';
                                            e.currentTarget.style.background = 'transparent';
                                        } else if (location.pathname === '/' && link.path === '/') {
                                            // Handle root exact match differently if needed
                                        }
                                    }}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side Actions Desktop */}
                <div className="lg-nav" style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingRight: '1.25rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>{user.fullName || 'User'}</div>
                                    <Link to="/profile" style={{ fontSize: '0.75rem', color: '#60a5fa', textDecoration: 'none' }}>View Profile</Link>
                                </div>
                                <div style={{
                                    width: '38px', height: '38px', borderRadius: '12px',
                                    background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1rem', fontWeight: 'bold', color: '#60a5fa'
                                }}>
                                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '100px',
                                    fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer',
                                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; e.currentTarget.style.color = '#ef4444'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff'; }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    color: '#fff', fontSize: '0.9rem', fontWeight: '500',
                                    textDecoration: 'none', transition: 'color 0.3s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/demo-request"
                                style={{
                                    background: '#ffffff', color: '#0f0f0f',
                                    padding: '0.6rem 1.5rem', borderRadius: '100px',
                                    fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none',
                                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.1)'; }}
                            >
                                Get Started <ChevronRight size={16} />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white', cursor: 'pointer', transition: 'all 0.3s'
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'rgba(15, 15, 18, 0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                maxHeight: isOpen ? '100vh' : '0',
                opacity: isOpen ? 1 : 0,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    display: 'block', padding: '1rem', color: '#fff', textDecoration: 'none',
                                    fontSize: '1.1rem', fontWeight: '500', borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                {link.name} <ChevronRight size={18} color="#60a5fa" />
                            </Link>
                        ))}
                    </nav>

                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {user ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.1rem', fontWeight: 'bold', color: '#60a5fa'
                                    }}>
                                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{user.fullName || 'User'}</div>
                                        <Link to="/profile" style={{ fontSize: '0.85rem', color: '#60a5fa', textDecoration: 'none' }}>View Profile</Link>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '12px',
                                        background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444', fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Link
                                    to="/login"
                                    style={{
                                        padding: '1rem', textAlign: 'center', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#fff', fontSize: '1rem', fontWeight: '600', textDecoration: 'none'
                                    }}
                                >Log In</Link>
                                <Link
                                    to="/demo-request"
                                    style={{
                                        padding: '1rem', textAlign: 'center', borderRadius: '12px',
                                        background: '#fff', color: '#0f0f0f',
                                        fontSize: '1rem', fontWeight: '600', textDecoration: 'none'
                                    }}
                                >Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
