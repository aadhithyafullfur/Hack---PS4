import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const DemoRequest = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => setSubmitted(true), 1500);
    };

    if (submitted) {
        return (
            <>
                <Navbar />
                <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div className="container">
                        <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>Request Sent</h2>
                            <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                Thank you for your interest. We'll be in touch.
                            </p>
                            <Button onClick={() => setSubmitted(false)} className="btn btn-primary">
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem' }}>Request a Demo</h2>
                            <p>See the platform in action.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Input label="Check this box if you are human" type="text" name="name" style={{ display: 'none' }} />

                            <Input label="Full Name" type="text" name="fullname" required />
                            <Input label="Business Email" type="email" name="email" required />
                            <Input label="Company Name" type="text" name="company" required />

                            <div className="input-group">
                                <label className="input-label" htmlFor="industry" style={{ position: 'relative', top: '0', left: '0', marginBottom: '0.5rem', display: 'block' }}>Industry</label>
                                <select className="input-field" name="industry" id="industry" required>
                                    <option value="" style={{ color: 'black' }}>Select Industry...</option>
                                    <option value="SaaS" style={{ color: 'black' }}>SaaS / Technology</option>
                                    <option value="Finance" style={{ color: 'black' }}>Finance</option>
                                    <option value="Healthcare" style={{ color: 'black' }}>Healthcare</option>
                                    <option value="E-commerce" style={{ color: 'black' }}>E-commerce</option>
                                    <option value="Other" style={{ color: 'black' }}>Other</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="message" style={{ position: 'relative', top: '0', left: '0', marginBottom: '0.5rem', display: 'block' }}>Message</label>
                                <textarea id="message" name="message" className="input-field" rows="3"></textarea>
                            </div>

                            <Button type="submit">Submit Request</Button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default DemoRequest;
