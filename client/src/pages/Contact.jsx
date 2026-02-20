import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Contact = () => {
    return (
        <>
            <Navbar />

            <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2.5rem' }}>Contact Us</h2>
                            <p>We're here to help you.</p>
                        </div>
                        <form>
                            <Input label="Full Name" type="text" name="name" required />
                            <Input label="Email Address" type="email" name="email" required />
                            <div className="input-group">
                                <label className="input-label" htmlFor="message" style={{ position: 'relative', top: '0', left: '0', marginBottom: '0.5rem', display: 'block' }}>Message</label>
                                <textarea id="message" name="message" className="input-field" rows="5" required></textarea>
                            </div>
                            <Button type="submit">Send Message</Button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
