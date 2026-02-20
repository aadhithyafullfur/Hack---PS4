import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, Users, TrendingUp, Calendar, CreditCard, Check, X, Clock } from 'lucide-react';
import axios from 'axios';

const AdminSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, cancelled, trial

    const fetchSubscriptions = useCallback(async () => {
        try {
            setLoading(true);
            const filterParam = filter !== 'all' ? `?status=${filter}` : '';
            const response = await axios.get(`/api/subscriptions${filterParam}`);
            
            if (response.data.success) {
                setSubscriptions(response.data.data);
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    const handleCancelSubscription = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this subscription?')) return;

        try {
            const response = await axios.patch(`/api/subscriptions/${id}/cancel`);
            if (response.data.success) {
                // Refresh data
                fetchSubscriptions();
            }
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Failed to cancel subscription');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Active' },
            cancelled: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', text: 'Cancelled' },
            trial: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', text: 'Trial' },
            expired: { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', text: 'Expired' }
        };

        const style = styles[status] || styles.expired;

        return (
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: style.bg,
                color: style.color,
                display: 'inline-block'
            }}>
                {style.text}
            </span>
        );
    };

    const getPlanBadge = (plan) => {
        const colors = {
            Professional: '#60a5fa',
            Growth: '#8b5cf6',
            Premium: '#f59e0b'
        };

        return (
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: `${colors[plan]}20`,
                color: colors[plan],
                display: 'inline-block'
            }}>
                {plan}
            </span>
        );
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <div style={{ color: '#9ca3af' }}>Loading subscriptions...</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Stats Cards */}
            {stats && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: 'rgba(96, 165, 250, 0.1)',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <DollarSign size={20} color="#60a5fa" />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Total Revenue</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff' }}>
                            ${stats.revenue.total.toLocaleString()}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                            Monthly: ${stats.revenue.monthly} | Annual: ${stats.revenue.annual}
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Users size={20} color="#10b981" />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Active Subscriptions</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff' }}>
                            {stats.active}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                            {stats.total} total subscriptions
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Clock size={20} color="#3b82f6" />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Trial Accounts</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff' }}>
                            {stats.trial}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                            Cancelled: {stats.cancelled}
                        </p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Filter:</span>
                {['all', 'active', 'trial', 'cancelled'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: filter === f ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                            background: filter === f ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                            color: filter === f ? '#60a5fa' : '#9ca3af',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Subscriptions Table */}
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Customer</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Plan</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Price</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Billing</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Start Date</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                                        No subscriptions found
                                    </td>
                                </tr>
                            ) : (
                                subscriptions.map((sub) => (
                                    <tr key={sub._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.9rem' }}>
                                                    {sub.userId?.fullName || 'N/A'}
                                                </span>
                                                <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                                                    {sub.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {getPlanBadge(sub.planName)}
                                        </td>
                                        <td style={{ padding: '1rem', color: '#ffffff', fontWeight: '600' }}>
                                            ${sub.price}/mo
                                        </td>
                                        <td style={{ padding: '1rem', color: '#9ca3af', textTransform: 'capitalize' }}>
                                            {sub.billing}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {getStatusBadge(sub.status)}
                                        </td>
                                        <td style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                                            {new Date(sub.startDate).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            {sub.status === 'active' && (
                                                <button
                                                    onClick={() => handleCancelSubscription(sub._id)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        color: '#ef4444',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSubscriptions;
