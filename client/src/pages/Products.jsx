import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Database, PieChart, LayoutDashboard, FileText, Target, Brain, ArrowRight, Zap, Shield, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, slug }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="glass-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                alignItems: 'flex-start',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                background: isHovered ? 'rgba(25, 30, 40, 0.6)' : 'rgba(20, 20, 25, 0.4)',
                border: `1px solid ${isHovered ? 'rgba(96, 165, 250, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                boxShadow: isHovered ? '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 25px rgba(96, 165, 250, 0.1)' : '0 10px 30px -10px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                padding: '2.5rem'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%)',
                transform: 'translate(30%, -30%)',
                borderRadius: '50%',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.6s ease'
            }} />

            <div style={{
                padding: '18px',
                borderRadius: '20px',
                background: isHovered ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isHovered ? 'rgba(96, 165, 250, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
                marginBottom: '2rem',
                color: isHovered ? '#60a5fa' : '#9ca3af',
                transition: 'all 0.4s ease',
                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
            }}>
                <Icon size={32} strokeWidth={1.5} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#ffffff', letterSpacing: '-0.01em' }}>{title}</h3>
            <p style={{ fontSize: '1.05rem', color: '#9ca3af', marginBottom: '2.5rem', flex: 1, lineHeight: '1.6' }}>{description}</p>

            <Link
                to={`/services/${slug}`}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: isHovered ? '#93c5fd' : '#60a5fa',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    marginTop: 'auto',
                    transition: 'all 0.3s ease'
                }}
            >
                Explore Solution <ArrowRight size={18} style={{ marginLeft: '0.5rem', transform: isHovered ? 'translateX(6px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
            </Link>
        </div>
    );
};

const FeatureRow = ({ icon: Icon, title, description, reverse }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: reverse ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: '4rem',
            marginBottom: '8rem',
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: '1 1 450px', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%', height: '120%',
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0
                }} />
                <div style={{
                    padding: '3.5rem',
                    borderRadius: '24px',
                    position: 'relative',
                    zIndex: 1,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(15, 15, 20, 0.6)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ padding: '1rem', background: 'rgba(96, 165, 250, 0.1)', display: 'inline-block', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid rgba(96, 165, 250, 0.2)', color: '#60a5fa' }}>
                        <Icon size={32} />
                    </div>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1.25rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{title}</h3>
                    <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.7' }}>{description}</p>
                </div>
            </div>
            <div style={{ flex: '1 1 450px' }}>
                <div style={{
                    height: '400px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(30,35,45,0.4) 0%, rgba(15,15,20,0.8) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.4 }} />
                    <Icon size={120} color="rgba(96, 165, 250, 0.05)" strokeWidth={1} style={{ position: 'absolute' }} />

                    {/* Abstract tech visualization */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '60%', position: 'relative', zIndex: 1 }}>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '4px', boxShadow: '0 0 10px #60a5fa' }} />
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', width: '85%' }}>
                            <div style={{ height: '100%', width: '45%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '4px', boxShadow: '0 0 10px #a78bfa' }} />
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', width: '60%' }}>
                            <div style={{ height: '100%', width: '90%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '4px', boxShadow: '0 0 10px #34d399' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    return (
        <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#fff' }}>
            <Navbar />

            {/* Premium Hero Section */}
            <section style={{
                paddingTop: '12rem',
                paddingBottom: '8rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Abstract Background Elements */}
                <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '2rem',
                        color: '#cbd5e1',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
                        Enterprise-Grade IT Solutions
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: '800',
                        marginBottom: '2rem',
                        lineHeight: '1.1',
                        letterSpacing: '-0.03em',
                    }}>
                        Empowering Business with <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 10px 30px rgba(96, 165, 250, 0.2)'
                        }}>Next-Gen Technology</span>
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        margin: '0 auto',
                        lineHeight: '1.8',
                        fontWeight: '400',
                        maxWidth: '700px'
                    }}>
                        Transform your infrastructure, automate operational workflows, and derive strategic intelligence from your data with our elite suite of services.
                    </p>
                </div>
            </section>

            {/* Core Services Grid */}
            <section style={{ padding: '2rem 0 8rem 0', position: 'relative', zIndex: 10 }}>
                <div className="container" style={{ maxWidth: '1300px' }}>

                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Our Core Capabilities</h2>
                        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', margin: '0 auto', borderRadius: '2px' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        <ServiceCard
                            icon={Database}
                            title="Data Architecture & Sync"
                            description="Establish a unified source of truth. We engineer robust data pipelines that ingest, clean, and synchronize data from your disparate systems in real-time."
                            slug="data-integration"
                        />
                        <ServiceCard
                            icon={Brain}
                            title="AI & Machine Learning"
                            description="Deploy predictive models, intelligent agents, and operational AI to automate complex processes and uncover hidden competitive advantages."
                            slug="ai-predictive"
                        />
                        <ServiceCard
                            icon={PieChart}
                            title="Advanced Analytics"
                            description="Convert raw metrics into strategic roadmaps through bespoke analytics. We deliver deep-dive analyses tailored to your specific organizational goals."
                            slug="analytics"
                        />
                        <ServiceCard
                            icon={LayoutDashboard}
                            title="Executive Dashboards"
                            description="Visualize business realities instantly. Custom executive dashboards designed for crystal-clear oversight across finance, operations, and growth."
                            slug="dashboard-design"
                        />
                        <ServiceCard
                            icon={Globe}
                            title="Cloud Infrastructure"
                            description="Build and scale resilient cloud environments on AWS, Azure, or GCP. Optimize for maximum uptime, security, and cost-efficiency."
                            slug="cloud"
                        />
                        <ServiceCard
                            icon={Shield}
                            title="Cybersecurity & Strategy"
                            description="Fortify your digital assets. We provide comprehensive vulnerability assessments, compliance strategies, and proactive threat mitigation."
                            slug="security"
                        />
                    </div>
                </div>
            </section>

            {/* How We Deliver Value (Feature Rows) */}
            <section style={{ padding: '6rem 0', background: 'rgba(10, 10, 12, 0.8)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <FeatureRow
                        icon={Zap}
                        title="Accelerated Digital Transformation"
                        description="We don't just upgrade your systems; we modernize your entire operational approach. By integrating automated workflows and scalable cloud architectures, we drastically reduce time-to-market for your internal initiatives and allow your team to focus on strategic execution rather than maintenance."
                        reverse={false}
                    />

                    <FeatureRow
                        icon={Cpu}
                        title="Future-Proofed Intelligence"
                        description="Our AI and data integrations are built using industry-leading methodologies to ensure longevity. We prioritize scalable data lakes and modular AI microservices so that your technology stack adapts effortlessly as your enterprise grows and market conditions shift."
                        reverse={true}
                    />
                </div>
            </section>

            {/* Premium CTA Section */}
            <section style={{ padding: '8rem 0', textAlign: 'center', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{
                        padding: '6rem 4rem',
                        borderRadius: '32px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
                        background: 'linear-gradient(135deg, rgba(20, 25, 35, 0.9) 0%, rgba(10, 12, 15, 0.95) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                        {/* Elite Glow Effects */}
                        <div style={{
                            position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                            width: '80%', height: '300px', background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 0
                        }}></div>

                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', zIndex: 0 }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                fontWeight: '800',
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.03em',
                                color: '#ffffff',
                                lineHeight: '1.1'
                            }}>
                                Elevate Your Technological Standard
                            </h2>
                            <p style={{
                                fontSize: '1.15rem',
                                color: '#9ca3af',
                                marginBottom: '3rem',
                                maxWidth: '650px',
                                margin: '0 auto 3rem auto',
                                lineHeight: '1.7'
                            }}>
                                Partner with I TECH to architect resilient solutions, harness predictive intelligence, and achieve unprecedented operational clarity.
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/contact" style={{
                                    padding: '1.1rem 3rem',
                                    fontSize: '1.05rem',
                                    fontWeight: '600',
                                    borderRadius: '3rem',
                                    background: '#ffffff',
                                    color: '#0f0f0f',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 25px rgba(255,255,255,0.15)'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(255,255,255,0.25)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,255,255,0.15)'; }}
                                >
                                    Initiate Consultation
                                </Link>

                                <Link to="/demo-request" style={{
                                    padding: '1.1rem 3rem',
                                    fontSize: '1.05rem',
                                    fontWeight: '600',
                                    borderRadius: '3rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                >
                                    View Capabilities
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Products;
