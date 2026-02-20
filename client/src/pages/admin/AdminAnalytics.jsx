import React from 'react';
import { TrendingUp, Activity, Crosshair, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const trendData = [
    { name: 'Jan', leads: 40 },
    { name: 'Feb', leads: 30 },
    { name: 'Mar', leads: 20 },
    { name: 'Apr', leads: 45 },
    { name: 'May', leads: 60 },
    { name: 'Jun', leads: 55 },
    { name: 'Jul', leads: 70 },
    { name: 'Aug', leads: 85 },
    { name: 'Sep', leads: 100 },
];

const sourceData = [
    { name: 'Website', value: 45 },
    { name: 'LinkedIn', value: 30 },
    { name: 'Ads', value: 15 },
    { name: 'Referral', value: 10 },
];

const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];

const AdminAnalytics = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Lead Analytics</h2>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Comprehensive insights into your lead acquisition.</p>
                </div>
            </div>

            {/* Top Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Conversion Rate Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', display: 'flex', flexDirection: 'column',
                    gap: '1rem', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                        <Activity size={120} color="#60a5fa" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '10px' }}>
                            <TrendingUp size={20} color="#60a5fa" />
                        </div>
                        <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '500', margin: 0 }}>Conversion Rate</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>24.5%</span>
                        <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <TrendingUp size={14} /> +3.2%
                        </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Compared to last month (21.3%)</p>
                </div>

                {/* Most Requested Service Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', display: 'flex', flexDirection: 'column',
                    gap: '1rem', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                        <Crosshair size={120} color="#818cf8" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '10px' }}>
                            <Crosshair size={20} color="#818cf8" />
                        </div>
                        <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '500', margin: 0 }}>Most Requested Service</h3>
                    </div>
                    <div>
                        <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em', display: 'block', marginBottom: '0.25rem' }}>
                            Custom Software
                        </span>
                        <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                            Accounting for <strong style={{ color: '#fff' }}>42%</strong> of all leads
                        </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Followed by IT Consulting (28%)</p>
                </div>

                {/* Monthly Performance Summary Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', display: 'flex', flexDirection: 'column',
                    gap: '1rem', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                        <Award size={120} color="#f59e0b" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>
                            <Award size={20} color="#f59e0b" />
                        </div>
                        <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '500', margin: 0 }}>Monthly Performance</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Leads</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>248</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Best Channel</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>Website</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '75%', background: '#60a5fa', borderRadius: '3px' }}></div>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', textAlign: 'right' }}>75% to monthly goal</p>
                </div>
            </div>

            {/* Charts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '1.5rem',
                marginTop: '0.5rem'
            }}>
                {/* Monthly Lead Trend Line Chart */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', height: '400px', display: 'flex', flexDirection: 'column'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Monthly Lead Trend</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(15,15,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#60a5fa', fontWeight: '600' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                />
                                <Line type="monotone" dataKey="leads" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, fill: '#0f0f0f', stroke: '#60a5fa', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lead Source Breakdown Bar Chart */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', height: '400px', display: 'flex', flexDirection: 'column'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Lead Source Breakdown</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sourceData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    contentStyle={{ background: 'rgba(15,15,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ fontWeight: '600' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminAnalytics;
