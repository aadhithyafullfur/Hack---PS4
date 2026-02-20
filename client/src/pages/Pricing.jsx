import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    // Pricing plan data
    const plans = [
        {
            name: "Professional",
            price: isAnnual ? 135 : 159,
            audience: "Best for teams tracking essential metrics",
            features: [
                "Unlimited Users",
                "Unlimited Custom Metrics",
                "Unlimited Dashboards",
                "Reports & Notifications",
                "Goals & Alerts",
                "130+ Data Sources",
                "API & SDK Integrations"
            ],
            cta: "Start Free Trial",
            ctaLink: "/signup",
            highlight: false
        },
        {
            name: "Growth",
            price: isAnnual ? 319 : 399,
            audience: "Advanced analytics for growing teams",
            features: [
                "Everything in Professional",
                "AI-Performance Summaries",
                "Advanced Filtering",
                "Benchmarks & Smart Alerts",
                "Row-Level Drilldowns",
                "Dataset Creation Tools"
            ],
            cta: "Start Free Trial",
            ctaLink: "/signup",
            highlight: true
        },
        {
            name: "Premium",
            price: isAnnual ? 639 : 799,
            audience: "Enterprise-grade service & support",
            features: [
                "Everything in Growth",
                "Dedicated Reporting Specialist",
                "Priority Support",
                "Advanced Security",
                "Forecasting Tools",
                "OKRs & Company Benchmarks"
            ],
            cta: "Contact Sales",
            ctaLink: "/contact",
            highlight: false
        }
    ];

    // Feature comparison data
    const comparisonFeatures = [
        { name: "Unlimited Users", pro: true, growth: true, prem: true },
        { name: "Unlimited Dashboards", pro: true, growth: true, prem: true },
        { name: "Custom Metrics", pro: true, growth: true, prem: true },
        { name: "AI Summaries", pro: false, growth: true, prem: true },
        { name: "Advanced Filters", pro: false, growth: true, prem: true },
        { name: "Priority Support", pro: false, growth: false, prem: true },
        { name: "Dedicated Analyst", pro: false, growth: false, prem: true },
    ];

    return (
        <>
            <Navbar />

            {/* 1️⃣ Hero / Intro Section */}
            <section className="section" style={{ paddingTop: '8rem', textAlign: 'center', paddingBottom: '3rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Simple to Start, <span style={{ color: '#60a5fa' }}>Built to Scale</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                        Everyone starts with a free 14-day trial. Choose the plan that fits your business and unlock unlimited users, dashboards, and insights.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
                        <Link to="/signup" className="btn btn-primary" style={{ padding: '0.875rem 2.5rem' }}>
                            Start Free Trial
                        </Link>
                        <Link to="/demo-request" className="btn btn-secondary" style={{ padding: '0.875rem 2.5rem' }}>
                            Book a Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2️⃣ Monthly / Annual Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <span style={{ color: !isAnnual ? '#fff' : '#9ca3af', fontWeight: !isAnnual ? 'bold' : 'normal', transition: 'color 0.3s' }}>Monthly Pricing</span>
                <div
                    onClick={() => setIsAnnual(!isAnnual)}
                    style={{
                        width: '60px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px',
                        position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <div style={{
                        width: '24px', height: '24px', background: '#60a5fa', borderRadius: '50%',
                        position: 'absolute', top: '3px', left: isAnnual ? '32px' : '4px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}></div>
                </div>
                <span style={{ color: isAnnual ? '#fff' : '#9ca3af', fontWeight: isAnnual ? 'bold' : 'normal', transition: 'color 0.3s' }}>
                    Annual Pricing <span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '5px' }}>(Save 20%)</span>
                </span>
            </div>

            {/* 3️⃣ Pricing Tiers Grid */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="grid grid-cols-3 gap-8" style={{ alignItems: 'flex-start' }}>
                        {plans.map((plan, idx) => (
                            <div key={idx} className="glass-card" style={{
                                padding: '2.5rem',
                                border: plan.highlight ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.1)',
                                background: plan.highlight ? 'rgba(96, 165, 250, 0.03)' : 'rgba(255,255,255,0.02)',
                                transform: plan.highlight ? 'scale(1.02)' : 'none',
                                position: 'relative',
                                display: 'flex', flexDirection: 'column', height: '100%'
                            }}>
                                {plan.highlight && (
                                    <div style={{
                                        position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                                        background: '#3b82f6', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold',
                                        padding: '4px 12px', borderRadius: '12px', letterSpacing: '0.5px'
                                    }}>
                                        MOST POPULAR
                                    </div>
                                )}

                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: plan.highlight ? '#60a5fa' : '#fff' }}>{plan.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '2rem', minHeight: '40px' }}>{plan.audience}</p>

                                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: 1 }}>
                                    ${plan.price}<span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 'normal' }}>/mo</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '2rem' }}>
                                    {isAnnual ? 'Billed annually' : 'Billed monthly'}
                                </p>

                                <Link to={plan.ctaLink} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', marginBottom: '1rem' }}>
                                    {plan.cta}
                                </Link>

                                {plan.cta === "Start Free Trial" && (
                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6b7280', marginBottom: '2rem' }}>No credit card required</p>
                                )}
                                {plan.cta !== "Start Free Trial" && <div style={{ marginBottom: '2.5rem' }}></div>}

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0 -2.5rem 2rem -2.5rem' }}></div>

                                <ul style={{ flex: 1 }}>
                                    {plan.features.map((feat, fIdx) => (
                                        <li key={fIdx} style={{ display: 'flex', gap: '10px', marginBottom: '1rem', fontSize: '0.95rem', color: '#e2e8f0' }}>
                                            <div style={{ minWidth: '18px', marginTop: '3px' }}>
                                                <Check size={16} color="#60a5fa" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4️⃣ Feature Comparison Table */}
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>Compare Plans</h2>

                    <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af' }}>Feature</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>Professional</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#60a5fa' }}>Growth</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row, rIdx) => (
                                    <tr key={rIdx}>
                                        <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>{row.name}</td>
                                        <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                            {row.pro ? <Check size={20} color="#60a5fa" style={{ display: 'inline' }} /> : <span style={{ color: '#4b5563' }}>—</span>}
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                            {row.growth ? <Check size={20} color="#60a5fa" style={{ display: 'inline' }} /> : <span style={{ color: '#4b5563' }}>—</span>}
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                            {row.prem ? <Check size={20} color="#60a5fa" style={{ display: 'inline' }} /> : <span style={{ color: '#4b5563' }}>—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5️⃣ Social Proof */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Trusted by 20,000+ data-driven companies</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.4, filter: 'grayscale(100%)' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'serif', color: '#fff' }}>Toast</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'serif', color: '#fff' }}>BambooHR</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'serif', color: '#fff' }}>SmartBug</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'serif', color: '#fff' }}>Conair</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'serif', color: '#fff' }}>Dentsu</span>
                    </div>
                </div>
            </section>

            {/* 6️⃣ FAQ Section */}
            <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>Frequently Asked Questions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>What’s included in the trial?</h4>
                            <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>You get full access to the Growth plan features for 14 days. No credit card required to sign up.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>Can I switch plans later?</h4>
                            <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>Yes, you can upgrade or downgrade at any time. Prorated charges will apply automatically.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>Is there a money-back guarantee?</h4>
                            <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>We offer a 30-day money-back guarantee for all annual plans if you're not satisfied.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>Do you offer enterprise contracts?</h4>
                            <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>Yes, for larger teams we offer custom contracts, invoicing, and dedicated support. Contact sales for details.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7️⃣ Final CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Start your free 14-day trial now</h2>
                        <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '3rem' }}>No credit card needed. Unlimited access.</p>

                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                Start Free Trial
                            </Link>
                            <Link to="/demo-request" className="btn btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Pricing;
