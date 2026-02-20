import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { incrementEngagement } from '../utils/engagementTracker';

const Contact = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const fullname = `${data.firstName} ${data.lastName}`;

            // Send data to backend to create or update the lead
            const response = await axios.post('/api/leads', {
                fullname,
                email: data.email,
                company: data.company,
                industry: 'Not Specified',
                message: data.message,
                source: 'Contact Form'
            });

            if (response.data?.data?._id) {
                localStorage.setItem('leadId', response.data.data._id);
            }

            setSuccess(true);
            e.target.reset();
        } catch (error) {
            console.error('Error submitting contact form:', error);
            // Even if tracking fails to save, track standard engagement
            incrementEngagement('demo_requested');
            setSuccess(true);
            e.target.reset();
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(false), 5000);
        }
    };
    return (
        <>
            <Navbar />

            <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '10rem', paddingBottom: '6rem', position: 'relative' }}>
                <div className="hero-glow" style={{ top: '40%', left: '50%' }}></div>

                <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(to right, #ffffff, #a5b4fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Get In Touch
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                            Whether you need support, want a customized demo, or have a pricing question, our team is ready to help you thrive.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12" style={{ alignItems: 'flex-start' }}>

                        {/* Left Column - Contact Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', padding: '1rem', borderRadius: '1rem', flexShrink: 0 }}>
                                    <MessageSquare size={28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>Chat with Sales</h3>
                                    <p style={{ color: '#9ca3af', marginBottom: '1rem', lineHeight: '1.5' }}>Speak directly to our sales team about custom solutions and enterprise pricing.</p>
                                    <a href="#" style={{ color: '#60a5fa', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#93c5fd'} onMouseOut={(e) => e.currentTarget.style.color = '#60a5fa'}>
                                        sales@itech-solutions.com <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '1rem', flexShrink: 0 }}>
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>Technical Support</h3>
                                    <p style={{ color: '#9ca3af', marginBottom: '1rem', lineHeight: '1.5' }}>Current customers can reach out via our priority 24/7 dedicated support lines.</p>
                                    <a href="#" style={{ color: '#10b981', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.color = '#34d399'} onMouseOut={(e) => e.currentTarget.style.color = '#10b981'}>
                                        +1 (800) 123-4567 <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '1rem', borderRadius: '1rem', flexShrink: 0 }}>
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>Global Headquarters</h3>
                                    <p style={{ color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>
                                        I TECH SOLUTIONS <br />
                                        100 Innovation Drive, Suite 400 <br />
                                        San Francisco, CA 94105
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form Segment */}
                        <div className="glass-panel" style={{ padding: '3.5rem 3rem', borderRadius: '1.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#ffffff' }}>Send a Message</h2>
                                <p style={{ color: '#9ca3af', marginBottom: '2.5rem' }}>Fill out the form below and we'll reply within 24 hours.</p>

                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <Input label="First Name" type="text" name="firstName" required />
                                        <Input label="Last Name" type="text" name="lastName" required />
                                    </div>
                                    <Input label="Work Email" type="email" name="email" required />
                                    <Input label="Company Name" type="text" name="company" required />

                                    <div className="input-group" style={{ marginTop: '0.5rem' }}>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="input-field"
                                            rows="4"
                                            required
                                            placeholder="How can we help you?"
                                            style={{ resize: 'vertical', paddingTop: '1.2rem', fontFamily: 'inherit' }}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.05rem', borderRadius: '1rem' }}
                                    >
                                        {loading ? 'Sending...' : 'Submit Request'}
                                    </button>

                                    {success && (
                                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                            Message captured! We will be in touch soon.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
