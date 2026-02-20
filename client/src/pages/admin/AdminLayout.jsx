import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2, Settings, LogOut, Search, Bell, Menu, X, CreditCard } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { fullName: 'Admin User' };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
        { name: 'Leads', path: '/admin/leads', icon: Users },
        { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    // Determine current page title
    const currentNav = navItems.find(item => item.path === location.pathname) || { name: 'Admin Dashboard' };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f', color: '#ffffff' }}>

            {/* Mobile Sidebar Toggle Overlay */}
            {isMobileSidebarOpen && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className="glass-panel"
                style={{
                    width: '260px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 0,
                    borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    top: 0, bottom: 0, left: 0,
                    background: 'rgba(15, 15, 15, 0.7)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 50,
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transform: isMobile
                        ? (isMobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
                        : 'translateX(0)'
                }}
            >
                {/* Mobile Close */}
                {isMobile && (
                    <button
                        style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingTop: '0.5rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
                        <LayoutDashboard size={18} color="#60a5fa" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>I TECH</h2>
                        <span style={{ fontSize: '0.65rem', color: '#60a5fa', letterSpacing: '1px', fontWeight: '600', textTransform: 'uppercase' }}>Admin Console</span>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileSidebarOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.875rem',
                                    padding: '0.875rem 1rem',
                                    backgroundColor: isActive ? 'rgba(96, 165, 250, 0.08)' : 'transparent',
                                    color: isActive ? '#60a5fa' : '#9ca3af',
                                    border: '1px solid',
                                    borderColor: isActive ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? '600' : '500',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <item.icon size={18} style={{ opacity: isActive ? 1 : 0.7 }} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem',
                        color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '12px', cursor: 'pointer',
                        fontSize: '0.9rem', fontWeight: '500', marginTop: 'auto',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <LogOut size={18} style={{ opacity: 0.8 }} /> Logout
                </button>
            </aside>

            {/* Main Content Area */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                marginLeft: isMobile ? '0' : '260px',
                width: isMobile ? '100%' : 'calc(100% - 260px)'
            }}>

                {/* Header */}
                <header style={{
                    height: '76px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 2rem',
                    background: 'rgba(15, 15, 15, 0.8)',
                    backdropFilter: 'blur(12px)',
                    position: 'sticky', top: 0, zIndex: 30
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isMobile && (
                            <button
                                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                onClick={() => setIsMobileSidebarOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '600', letterSpacing: '-0.02em', display: isMobile ? 'none' : 'block' }}>{currentNav.name}</h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        {!isMobile && (
                            <div style={{ position: 'relative' }}>
                                <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px',
                                        padding: '0.5rem 1rem 0.5rem 2.25rem', color: 'white', fontSize: '0.85rem', width: '240px',
                                        outline: 'none', transition: 'all 0.2s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                    }}
                                />
                            </div>
                        )}

                        <button style={{
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer',
                            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}>
                            <Bell size={18} color="#9ca3af" />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#60a5fa', borderRadius: '50%', border: '2px solid #0f0f0f' }}></span>
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.75rem', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.fullName || 'Admin User'}</div>
                                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Administrator</div>
                            </div>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.9rem', fontWeight: 'bold', color: '#60a5fa'
                            }}>
                                {user.fullName ? user.fullName.charAt(0) : 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
