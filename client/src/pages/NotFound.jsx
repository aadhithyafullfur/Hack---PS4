import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <>
            <Navbar />
            <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem 2rem' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem', color: '#ef4444'
                        }}>
                            <AlertTriangle size={40} />
                        </div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: 1 }}>404</h1>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Page Not Found</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#9ca3af' }}>
                            The page you are looking for doesn't exist or has been moved.
                        </p>
                        <Link to="/" className="btn btn-primary">
                            Return Home
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default NotFound;
