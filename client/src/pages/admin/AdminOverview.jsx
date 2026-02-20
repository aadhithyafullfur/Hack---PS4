import React from 'react';
import { Users, UserPlus, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const dataTrend = [
    { name: 'Jan', leads: 40 },
    { name: 'Feb', leads: 30 },
    { name: 'Mar', leads: 20 },
    { name: 'Apr', leads: 45 },
    { name: 'May', leads: 60 },
    { name: 'Jun', leads: 55 },
    { name: 'Jul', leads: 70 },
];

const dataSource = [
    { name: 'Website', value: 35 },
    { name: 'LinkedIn', value: 25 },
    { name: 'Ads', value: 20 },
    { name: 'Referral', value: 15 },
    { name: 'Direct', value: 5 },
];

const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'];

const AdminOverview = () => {

    const kpiData = [
        { title: 'Total Leads', value: '1,284', growth: '+12.5%', icon: Users, color: '#60a5fa' },
        { title: 'New Leads (Today)', value: '42', growth: '+5.2%', icon: UserPlus, color: '#38bdf8' },
        { title: 'Converted Leads', value: '315', growth: '+18.1%', icon: CheckCircle, color: '#818cf8' },
        { title: 'Pending Follow-ups', value: '89', growth: '-2.4%', icon: Clock, color: '#94a3b8' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* KPI Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                {kpiData.map((kpi, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(0,0,0,0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: `rgba(255,255,255,0.03)`,
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <kpi.icon size={20} color={kpi.color} />
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                fontSize: '0.75rem', fontWeight: '500',
                                color: kpi.growth.startsWith('+') ? '#60a5fa' : '#9ca3af',
                                background: kpi.growth.startsWith('+') ? 'rgba(96, 165, 250, 0.1)' : 'rgba(255,255,255,0.05)',
                                padding: '4px 8px', borderRadius: '12px'
                            }}>
                                {kpi.growth.startsWith('+') && <TrendingUp size={12} />}
                                {kpi.growth}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '500', marginBottom: '0.25rem' }}>{kpi.title}</h3>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
                                {kpi.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Line Chart */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', height: '380px', display: 'flex', flexDirection: 'column'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Lead Trend</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataTrend} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#60a5fa' }}
                                />
                                <Line type="monotone" dataKey="leads" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, fill: '#0f0f0f', stroke: '#60a5fa', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '1.5rem', height: '380px', display: 'flex', flexDirection: 'column'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Lead Source</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataSource} margin={{ top: 5, right: 20, bottom: 5, left: -20 }} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {dataSource.map((entry, index) => (
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

export default AdminOverview;
