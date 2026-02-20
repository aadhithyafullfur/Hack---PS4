import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const service = servicesData[slug];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (!service) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Service Not Found</h1>
                    <button className="btn btn-secondary" onClick={() => navigate('/services')}>
                        Back to Services
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '10rem', paddingBottom: '4rem', position: 'relative' }}>
                <div className="hero-glow" style={{ top: '20%' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                        <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Services
                    </Link>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to right, #ffffff, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        maxWidth: '900px'
                    }}>
                        {service.title}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        lineHeight: '1.7',
                        maxWidth: '800px',
                        marginBottom: '3rem'
                    }}>
                        {service.longDescription}
                    </p>
                </div>
            </section>

            {/* Image Showcase Section */}
            <section className="section" style={{ paddingTop: '0', paddingBottom: '6rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
                        {service.images.map((img, index) => (
                            <div key={index} style={{
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                                aspectRatio: '16/9'
                            }}>
                                <img src={img} alt={`${service.title} showcase ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '6rem 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', textAlign: 'center' }}>Core Capabilities</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '6px', borderRadius: '50%', color: '#60a5fa', marginRight: '1rem', flexShrink: 0 }}>
                                    <Check size={20} />
                                </div>
                                <p style={{ margin: 0, fontSize: '1.1rem', color: '#e5e7eb', lineHeight: '1.5', paddingTop: '4px' }}>{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section" style={{ padding: '8rem 0' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Transparent Pricing</h2>
                        <p style={{ fontSize: '1.15rem', color: '#9ca3af' }}>Select the ideal plan for your team's scale.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                        {service.pricing.map((tier, idx) => {
                            const isMiddle = idx === 1;
                            return (
                                <div key={idx} className="glass-card" style={{
                                    position: 'relative',
                                    padding: isMiddle ? '3.5rem 2.5rem' : '2.5rem',
                                    transform: isMiddle ? 'scale(1.05)' : 'none',
                                    borderColor: isMiddle ? 'rgba(96, 165, 250, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                                    boxShadow: isMiddle ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(96, 165, 250, 0.1)' : 'var(--glass-shadow)',
                                    zIndex: isMiddle ? 2 : 1
                                }}>
                                    {isMiddle && (
                                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: '#60a5fa', color: '#000', padding: '4px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>{tier.plan}</h3>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0 2rem 0', color: '#ffffff' }}>{tier.price}</div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0' }}>
                                        {tier.features.map((f, fIdx) => (
                                            <li key={fIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#9ca3af', fontSize: '0.95rem' }}>
                                                <Check size={16} style={{ color: '#60a5fa', marginRight: '0.75rem', flexShrink: 0 }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className={isMiddle ? "btn btn-primary" : "btn btn-secondary"} style={{ width: '100%', borderRadius: '1rem' }}>
                                        Get Started
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="section" style={{ padding: '0 0 6rem 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="glass-panel" style={{
                        padding: '5rem 3rem',
                        borderRadius: '2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'rgba(96, 165, 250, 0.12)', filter: 'blur(80px)', zIndex: 0 }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.75rem', fontWeight: '700', marginBottom: '2.5rem', color: '#ffffff' }}>
                                Ready to Transform Your Data Strategy?
                            </h2>
                            <Link to="/demo-request" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '2rem' }}>
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

export default ServiceDetail;
