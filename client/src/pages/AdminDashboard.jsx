import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut, Search, Bell, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>

            {/* Sidebar */}
            <aside className="glass-panel" style={{
                width: '280px',
                borderRadius: '0',
                borderRight: '1px solid var(--glass-border)',
                borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed', top: 0, bottom: 0, left: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(96, 165, 250, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BarChart2 size={20} color="#60a5fa" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>LeadPulse</h2>
                        <span style={{ fontSize: '0.75rem', color: '#60a5fa', letterSpacing: '1px', fontWeight: '600' }}>ADMIN CONSOLE</span>
                    </div>
                </div>

                <nav style={{ flex: 1 }}>
                    {[
                        { name: 'Overview', icon: LayoutDashboard },
                        { name: 'User Management', icon: Users },
                        { name: 'Model Performance', icon: Activity },
                        { name: 'System Settings', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                width: '100%',
                                padding: '0.875rem 1rem',
                                backgroundColor: activeTab === item.name ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                                color: activeTab === item.name ? '#60a5fa' : '#9ca3af',
                                border: activeTab === item.name ? '1px solid rgba(96, 165, 250, 0.2)' : '1px solid transparent',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                                textAlign: 'left',
                                fontSize: '0.95rem',
                                fontWeight: activeTab === item.name ? '600' : '500',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                        color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '0.75rem', cursor: 'pointer',
                        fontSize: '0.95rem', fontWeight: '500', marginTop: 'auto',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>

                {/* Header */}
                <header style={{
                    height: '80px',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 2.5rem',
                    background: 'rgba(15, 15, 20, 0.6)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky', top: 0, zIndex: 10
                }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '600' }}>{activeTab}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem',
                                    padding: '0.6rem 0.6rem 0.6rem 2.5rem', color: 'white', fontSize: '0.875rem', width: '280px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={20} color="#9ca3af" />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #0f172a' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--glass-border)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.fullName || 'Admin User'}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Administrator</div>
                            </div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>
                                {user.fullName ? user.fullName.charAt(0) : 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div style={{ padding: '2.5rem', flex: 1, overflowY: 'auto' }}>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '2.5rem' }}>
                        <div className="glass-card" style={{ padding: '1.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.5px' }}>Total Users</h3>
                                    <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'white' }}>1,284</div>
                                </div>
                                <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
                                    <Users size={20} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>+12.5%</span>
                                <span style={{ color: '#6b7280' }}>from last month</span>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.5px' }}>Active Models</h3>
                                    <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'white' }}>8</div>
                                </div>
                                <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#3b82f6' }}>
                                    <Activity size={20} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ color: '#3b82f6', fontWeight: '600' }}>Operational</span>
                                <span style={{ color: '#6b7280' }}>All systems healthy</span>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.5px' }}>API Requests</h3>
                                    <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'white' }}>842k</div>
                                </div>
                                <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#f59e0b' }}>
                                    <BarChart2 size={20} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ color: '#f59e0b', fontWeight: '600' }}>85%</span>
                                <span style={{ color: '#6b7280' }}>of monthly limit</span>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for AI Visualization */}
                    <div className="glass-panel" style={{
                        height: '450px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: 'rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ textAlign: 'center', color: '#6b7280' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Activity size={40} style={{ opacity: 0.5 }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#e2e8f0' }}>Real-time Inference Visualization</h3>
                            <p>Waiting for data stream...</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
