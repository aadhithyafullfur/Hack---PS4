import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { User, Mail, Shield, Activity, Settings, Calendar, CreditCard, Key, Lock, LogOut, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '1.5rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>Session Expired</h1>
                        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Please log in to view your secure profile.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>Back to Login</button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const tabs = [
        { id: 'Overview', icon: User },
        { id: 'Subscription', icon: CreditCard },
        { id: 'API Keys', icon: Key },
        { id: 'Security', icon: Lock }
    ];

    return (
        <>
            <Navbar />
            <section className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>

                    {/* Welcome Header */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ffffff' }}>Account Settings</h1>
                        <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>Manage your workspace, subscription, and security preferences.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'flex-start' }} className="md:grid-cols-layout">
                        {/* Fallback layout via inline style media query equivalent for 2 columns */}
                        <style>{`
                            @media (min-width: 900px) {
                                .profile-grid { grid-template-columns: 280px 1fr !important; }
                            }
                        `}</style>
                        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'flex-start' }}>

                            {/* Sidebar */}
                            <div className="glass-panel" style={{ padding: '2rem 1rem', borderRadius: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem', marginBottom: '2.5rem' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff',
                                        boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.fullName}</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#9ca3af', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email}</p>
                                    </div>
                                </div>

                                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                                                background: activeTab === tab.id ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                                                color: activeTab === tab.id ? '#60a5fa' : '#9ca3af',
                                                border: 'none', borderRadius: '1rem', cursor: 'pointer', textAlign: 'left',
                                                fontWeight: activeTab === tab.id ? '600' : '500',
                                                transition: 'all 0.2s ease', position: 'relative'
                                            }}
                                            onMouseOver={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' } }}
                                            onMouseOut={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent' } }}
                                        >
                                            <tab.icon size={18} /> {tab.id}
                                            {activeTab === tab.id && <ChevronRight size={16} style={{ position: 'absolute', right: '1rem' }} />}
                                        </button>
                                    ))}
                                </nav>

                                <div style={{ marginTop: '2rem', padding: '0 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', width: '100%',
                                            background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.1)',
                                            borderRadius: '1rem', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s ease'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)' }}
                                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.1)' }}
                                    >
                                        <LogOut size={18} /> Sign Out
                                    </button>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div>
                                {activeTab === 'Overview' && (
                                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#ffffff' }}>Profile Overview</h2>
                                            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Edit Info</button>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem', borderRadius: '12px' }}>
                                                    <Shield size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Account Role</h3>
                                                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', textTransform: 'capitalize' }}>{user.role || 'User'}</p>
                                                </div>
                                            </div>

                                            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                                <div style={{ background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', padding: '0.75rem', borderRadius: '12px' }}>
                                                    <Activity size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Account Status</h3>
                                                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>Active</p>
                                                </div>
                                            </div>

                                            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.75rem', borderRadius: '12px' }}>
                                                    <Calendar size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Member Since</h3>
                                                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>2025</p>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem' }}>Personal Information</h3>
                                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                                                    <div style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '500' }}>{user.fullName}</div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                                                    <div style={{ color: '#9ca3af', fontSize: '1rem' }}>{user.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Subscription' && (
                                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#ffffff', marginBottom: '2rem' }}>Current Plan</h2>

                                        <div style={{ background: 'linear-gradient(to right, rgba(96,165,250,0.1), rgba(0,0,0,0))', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '1rem', padding: '2.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff' }}>Free Tier</h3>
                                                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '2rem' }}>ACTIVE</span>
                                                </div>
                                                <p style={{ color: '#9ca3af', fontSize: '1rem' }}>You are currently on the basic free tier. Upgrade for advanced features.</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>$0<span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: '500' }}>/mo</span></div>
                                            </div>
                                        </div>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem' }}>Usage Limits</h3>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    <span style={{ color: '#9ca3af' }}>API Requests</span>
                                                    <span style={{ color: '#ffffff', fontWeight: '500' }}>450 / 1,000</span>
                                                </div>
                                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: '45%', height: '100%', background: '#60a5fa', borderRadius: '4px' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    <span style={{ color: '#9ca3af' }}>Data Sources</span>
                                                    <span style={{ color: '#ffffff', fontWeight: '500' }}>2 / 3</span>
                                                </div>
                                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: '66%', height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '2rem' }}>
                                            <button className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>Upgrade Plan</button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'API Keys' && (
                                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#ffffff' }}>API Development</h2>
                                            <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>+ Create New Key</button>
                                        </div>
                                        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>These keys allow you to authenticate API requests. Keep them secure.</p>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
                                            <div style={{ minWidth: '600px' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    <div>Name</div>
                                                    <div>Key Prefix</div>
                                                    <div style={{ textAlign: 'right' }}>Created</div>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr', padding: '1.5rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ffffff', fontWeight: '500' }}>
                                                        Default Workspace Key
                                                    </div>
                                                    <div style={{ fontFamily: 'monospace', color: '#60a5fa', background: 'rgba(96,165,250,0.1)', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', display: 'inline-block', width: 'max-content' }}>
                                                        sk_live_29f8...a49b
                                                    </div>
                                                    <div style={{ textAlign: 'right', color: '#9ca3af', fontSize: '0.9rem' }}>Oct 12, 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <a href="#" style={{ color: '#60a5fa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}><ExternalLink size={14} /> Read API Documentation</a>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Security' && (
                                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#ffffff', marginBottom: '2rem' }}>Security Settings</h2>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>Change Password</h3>
                                                    <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>Ensure your account is using a long, random password to stay secure.</p>
                                                </div>
                                                <button className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Update</button>
                                            </div>
                                        </div>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>Two-Factor Authentication (2FA)</h3>
                                                    <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>Add an extra layer of security to your account.</p>
                                                    <div style={{ marginTop: '1rem', display: 'inline-block', padding: '0.3rem 0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: '600' }}>
                                                        Currently Disabled
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Enable 2FA</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Profile;
