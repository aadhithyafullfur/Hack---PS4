import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Database, PieChart, LayoutDashboard, FileText, Target, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, slug }) => (
    <div
        className="glass-card"
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'flex-start',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        }}
    >
        <div style={{
            padding: '14px',
            borderRadius: '16px',
            background: 'rgba(96, 165, 250, 0.08)',
            border: '1px solid rgba(96, 165, 250, 0.15)',
            marginBottom: '1.5rem',
            color: '#60a5fa',
            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.05)'
        }}>
            <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff', letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>{description}</p>
        <Link
            to={`/services/${slug}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#60a5fa',
                fontWeight: '500',
                fontSize: '0.95rem',
                textDecoration: 'none',
                marginTop: 'auto',
                transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.textShadow = '0 0 10px rgba(96, 165, 250, 0.4)';
                e.currentTarget.style.color = '#93c5fd';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.textShadow = 'none';
                e.currentTarget.style.color = '#60a5fa';
            }}
        >
            Learn More <ArrowRight size={18} style={{ marginLeft: '0.5rem', transition: 'transform 0.3s ease' }} />
        </Link>
    </div>
);

const Products = () => {
    return (
        <>
            <Navbar />

            {/* Page Header Section */}
            <section className="section" style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center', position: 'relative' }}>
                <div className="hero-glow" style={{ top: '30%' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.4rem 1.25rem',
                        background: 'rgba(96, 165, 250, 0.1)',
                        border: '1px solid rgba(96, 165, 250, 0.2)',
                        borderRadius: '2rem',
                        color: '#60a5fa',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '1.5rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        Premium IT Solutions
                    </div>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to right, #ffffff, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        IT & AI-Driven Services
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        margin: '0 auto',
                        lineHeight: '1.7',
                        fontWeight: '400'
                    }}>
                        Comprehensive solutions to help your business connect data, derive insights, and scale smarter.
                    </p>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        <ServiceCard
                            icon={Database}
                            title="Data Integration & Connectivity"
                            description="Connect all your business data from multiple sources — CRMs, analytics, ad platforms — into one unified system with seamless setup and automation."
                            slug="data-integration"
                        />
                        <ServiceCard
                            icon={PieChart}
                            title="Custom Analytics & Insights"
                            description="Transform raw data into actionable insights with tailored analytics dashboards designed to highlight key performance indicators and trends."
                            slug="analytics"
                        />
                        <ServiceCard
                            icon={LayoutDashboard}
                            title="Dashboard Design & Implementation"
                            description="Build interactive, real-time dashboards that help your teams visualize performance across marketing, sales, product, and finance."
                            slug="dashboard-design"
                        />
                        <ServiceCard
                            icon={FileText}
                            title="Automated Reporting Solutions"
                            description="Automate your reporting workflows to deliver scheduled reports, alerts, and summaries without manual effort — enabling faster decisions."
                            slug="reporting"
                        />
                        <ServiceCard
                            icon={Target}
                            title="Strategic Data Consulting"
                            description="Receive expert guidance to define goals, set key metrics, and align performance tracking with your business objectives."
                            slug="consulting"
                        />
                        <ServiceCard
                            icon={Brain}
                            title="AI & Predictive Modelling Services"
                            description="Leverage predictive analytics and AI to forecast trends, benchmark performance, and generate smart insights from your business data."
                            slug="ai-predictive"
                        />
                    </div>
                </div>
            </section>

            {/* Call-To-Action Footer Section */}
            <section className="section" style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="glass-panel" style={{
                        padding: '5rem 3rem',
                        borderRadius: '2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        {/* Background Glow inside CTA */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '400px',
                            height: '400px',
                            background: 'rgba(96, 165, 250, 0.12)',
                            filter: 'blur(80px)',
                            zIndex: 0
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                fontSize: '2.75rem',
                                fontWeight: '700',
                                marginBottom: '1.25rem',
                                letterSpacing: '-0.02em',
                                color: '#ffffff'
                            }}>
                                Ready to Accelerate Your Data-Driven Growth?
                            </h2>
                            <p style={{
                                fontSize: '1.15rem',
                                color: '#9ca3af',
                                marginBottom: '2.5rem',
                                maxWidth: '600px',
                                margin: '0 auto 2.5rem auto'
                            }}>
                                Work with our expert team to unlock smarter insights and business performance.
                            </p>
                            <Link to="/demo-request" className="btn btn-primary" style={{
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                borderRadius: '2rem'
                            }}>
                                Request a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Products;
