import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { ArrowRight, Activity, Zap, Layers, BarChart, Database, Layout, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { incrementEngagement } from '../utils/engagementTracker';

const Home = () => {
    React.useEffect(() => {
        incrementEngagement('website_visits');
    }, []);
    return (
        <>
            <Navbar />

            {/* 2️⃣ Hero Section */}
            <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '8rem' }}>
                <div className="hero-glow"></div>
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1.2' }}>
                            Empower Your Business With<br />
                            <span style={{ color: '#60a5fa' }}>Real-Time Lead Intelligence</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 3rem' }}>
                            See critical metrics, analyze performance, and optimize your growth — all in one place without complexity.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
                            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                                Try It Free
                            </Link>
                            <Link to="/demo-request" className="btn btn-secondary" style={{ padding: '1rem 3rem' }}>
                                Book a Demo
                            </Link>
                        </div>

                        {/* Visual Area - Glassy Dashboard Mockup */}
                        <div className="glass-panel" style={{
                            height: '400px', width: '100%',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            background: 'rgba(20,20,25,0.6)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                            </div>
                            <div style={{ textAlign: 'center', color: '#52525b' }}>
                                <BarChart size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Interactive Analytics Dashboard Preview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5️⃣ Social Proof */}
            <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--glass-border)', background: 'rgba(5,5,5,0.5)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by 20,000+ scaling teams & agencies</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.6 }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af' }}>ACME Inc.</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af' }}>GlobalTech</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af' }}>Nebula</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af' }}>FoxRun</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af' }}>Circle</span>
                    </div>
                </div>
            </section>

            {/* 3️⃣ Feature Overview (Icon Cards) */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-4 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                        <div className="glass-card">
                            <div style={{ width: '50px', height: '50px', background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Database size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Connect</h3>
                            <p style={{ fontSize: '0.95rem' }}>Bring all your lead data together from any source instantly.</p>
                        </div>
                        <div className="glass-card">
                            <div style={{ width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Layers size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Prepare</h3>
                            <p style={{ fontSize: '0.95rem' }}>Clean, enrich, and merge data automatically for accuracy.</p>
                        </div>
                        <div className="glass-card">
                            <div style={{ width: '50px', height: '50px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Layout size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Visualize</h3>
                            <p style={{ fontSize: '0.95rem' }}>Beautiful real-time dashboards that anyone can read.</p>
                        </div>
                        <div className="glass-card">
                            <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Activity size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Analyze</h3>
                            <p style={{ fontSize: '0.95rem' }}>Spot insights and emerging trends instantly with AI.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6️⃣ Problem & Solution */}
            <section className="section" style={{ background: 'linear-gradient(to right, rgba(20,20,25,0.5), rgba(10,10,15,0.8))' }}>
                <div className="container">
                    <div className="grid grid-cols-2 gap-12" style={{ alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Stop Drowning in Data Silos</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Most teams struggle to connect the dots between clicks, leads, and revenue. Manual spreadsheets are slow, error-prone, and provide zero predictive value.
                            </p>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                                I TECH eliminates the guesswork by unifying your stack into a single source of truth.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="glass-card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}> <Zap size={20} color="#60a5fa" /> Measure What Matters</h4>
                                    <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>Know your most critical KPI numbers instantly.</p>
                                </div>
                                <div className="glass-card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}> <Activity size={20} color="#60a5fa" /> Understand Performance</h4>
                                    <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>See trends at a glance with historical modeling.</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-panel" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {/* Decorative Elements simulating UI */}
                            <div style={{ width: '300px', height: '200px', background: 'rgba(96, 165, 250, 0.05)', borderRadius: '12px', border: '1px solid rgba(96, 165, 250, 0.2)', position: 'absolute', top: '100px', left: '50px' }}></div>
                            <div style={{ width: '300px', height: '200px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', position: 'absolute', bottom: '100px', right: '50px', backdropFilter: 'blur(10px)' }}></div>
                            <div style={{ zIndex: 2, textAlign: 'center' }}>
                                <Shield size={48} color="#60a5fa" />
                                <p style={{ marginTop: '1rem' }}>Unified Intelligence Engine</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7️⃣ "Why Choose Us" Cards */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>Why Growing Teams Choose I TECH</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {[
                            { title: 'Easy Setup', icon: Zap },
                            { title: 'No Code Required', icon: Layout },
                            { title: 'Scales With You', icon: Database },
                            { title: 'AI-Powered Insights', icon: Activity },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                                <item.icon size={32} style={{ margin: '0 auto 1.5rem', color: '#60a5fa' }} />
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 0 }}>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9️⃣ How It Works / Steps */}
            <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div className="grid grid-cols-3 gap-12" style={{ textAlign: 'center' }}>
                        <div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e1e1e', border: '2px solid #60a5fa', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>1</div>
                            <h3 style={{ fontSize: '1.25rem' }}>Connect Sources</h3>
                            <p>Link your CRM and lead forms.</p>
                        </div>
                        <div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e1e1e', border: '2px solid rgba(255,255,255,0.2)', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>2</div>
                            <h3 style={{ fontSize: '1.25rem' }}>Configure Insights</h3>
                            <p>Select your key performance indicators.</p>
                        </div>
                        <div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e1e1e', border: '2px solid rgba(255,255,255,0.2)', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>3</div>
                            <h3 style={{ fontSize: '1.25rem' }}>Act on Performance</h3>
                            <p>Optimize campaigns based on hard data.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8️⃣ Demo/CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Get Started With Intelligent Lead Insights</h2>
                        <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '3rem' }}>14-day free trial, no credit card required.</p>

                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                Try It Free
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

export default Home;
