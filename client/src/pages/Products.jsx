import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Smartphone, Code, Cloud, Shield, Terminal, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
        <div style={{
            padding: '12px', borderRadius: '12px',
            background: 'rgba(96, 165, 250, 0.1)',
            marginBottom: '1.5rem', color: '#60a5fa'
        }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ marginBottom: '2rem', flex: 1 }}>{description}</p>
        <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem', justifyContent: 'center' }}>
            Learn More <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
        </Link>
    </div>
);

const Products = () => {
    return (
        <>
            <Navbar />

            <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>IT Products & Services</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Reliable technology solutions to power your business growth. We build the infrastructure of tomorrow.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <ServiceCard
                            icon={Code}
                            title="Web Development"
                            description="Custom websites and web applications built for performance, scalability, and security using modern frameworks."
                        />
                        <ServiceCard
                            icon={Smartphone}
                            title="Mobile App Development"
                            description="Native and cross-platform mobile applications designed for seamless user experience on iOS and Android."
                        />
                        <ServiceCard
                            icon={Cloud}
                            title="Cloud Solutions"
                            description="Cloud migration, deployment, and infrastructure management to ensure your business is always online."
                        />
                        <ServiceCard
                            icon={Shield}
                            title="Cybersecurity Services"
                            description="Comprehensive security audits, penetration testing, and monitoring to protect your digital assets."
                        />
                        <ServiceCard
                            icon={Terminal}
                            title="IT Consulting"
                            description="Strategic technology consulting to optimize operations, reduce costs, and improve organizational efficiency."
                        />
                        <ServiceCard
                            icon={Database}
                            title="AI & Data Analytics"
                            description="Intelligent data solutions and AI integration to process large datasets and drive smarter decisions."
                        />
                    </div>
                </div>
            </section>

            <section className="section" style={{ textAlign: 'center', padding: '6rem 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Transform Your IT Infrastructure?</h2>
                        <Link to="/demo-request" className="btn btn-primary">
                            Request a Demo
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Products;
