import React, { useState } from 'react';
import { Mail, CheckCircle, Shield, Key, Check } from 'lucide-react';

const AdminSettings = () => {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [autoFollowUp, setAutoFollowUp] = useState(false);

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [passMsg, setPassMsg] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setPassMsg('New passwords do not match.');
            return;
        }
        if (passwords.new.length < 8) {
            setPassMsg('Password must be at least 8 characters.');
            return;
        }
        // Mock save
        setPassMsg('Password successfully updated.');
        setTimeout(() => setPassMsg(''), 3000);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>

            <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Settings</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Manage your admin preferences and security</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Profile / Preferences Section */}
                <section style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '10px' }}>
                            <Mail size={20} color="#60a5fa" />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#e2e8f0' }}>Notifications & Automation</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Email Notifications Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <div>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#fff', fontWeight: '500' }}>Email Notifications</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>Receive email alerts when a new lead is submitted.</p>
                            </div>
                            <button
                                onClick={() => setEmailNotifs(!emailNotifs)}
                                style={{
                                    width: '44px', height: '24px', borderRadius: '12px',
                                    background: emailNotifs ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                                    position: 'relative', border: 'none', cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '2px', left: emailNotifs ? '22px' : '2px',
                                    transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }} />
                            </button>
                        </div>

                        {/* Auto Follow-up Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#fff', fontWeight: '500' }}>Auto Follow-up</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>Automatically send a welcome email to new leads.</p>
                            </div>
                            <button
                                onClick={() => setAutoFollowUp(!autoFollowUp)}
                                style={{
                                    width: '44px', height: '24px', borderRadius: '12px',
                                    background: autoFollowUp ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                                    position: 'relative', border: 'none', cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '2px', left: autoFollowUp ? '22px' : '2px',
                                    transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>
                            <Shield size={20} color="#f59e0b" />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#e2e8f0' }}>Security</h3>
                    </div>

                    <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem', fontWeight: '500' }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <Key size={18} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password" required
                                    value={passwords.current}
                                    onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                    placeholder="Enter current password"
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                                        color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s'
                                    }}
                                    onFocus={e => { e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem', fontWeight: '500' }}>New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Key size={18} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password" required
                                        value={passwords.new}
                                        onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                        placeholder="Enter new password"
                                        style={{
                                            width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                                            color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s'
                                        }}
                                        onFocus={e => { e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Key size={18} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password" required
                                        value={passwords.confirm}
                                        onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                        placeholder="Confirm new password"
                                        style={{
                                            width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                                            color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s'
                                        }}
                                        onFocus={e => { e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                    />
                                </div>
                            </div>
                        </div>

                        {passMsg && (
                            <div style={{
                                padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                backgroundColor: passMsg.includes('success') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: passMsg.includes('success') ? '#34d399' : '#f87171',
                                border: `1px solid ${passMsg.includes('success') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                            }}>
                                {passMsg.includes('success') ? <CheckCircle size={16} /> : null}
                                {passMsg}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <button
                                type="submit"
                                style={{
                                    background: 'rgba(255,255,255,1)', color: '#0f0f0f', border: 'none',
                                    padding: '0.75rem 1.5rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                Update Password
                            </button>
                        </div>

                    </form>
                </section>

            </div>
        </div>
    );
};

export default AdminSettings;
