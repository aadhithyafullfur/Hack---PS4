import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    
    // Get plan details from navigation state
    const planDetails = location.state || {
        planName: 'Professional',
        price: 159,
        billing: 'monthly'
    };

    const [formData, setFormData] = useState({
        cardName: user?.fullName || '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        billingEmail: user?.email || '',
        company: user?.company || ''
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        // Format card number (add spaces every 4 digits)
        if (name === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (value.length > 19) value = value.slice(0, 19);
        }

        // Format expiry (MM/YY)
        if (name === 'expiry') {
            value = value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            if (value.length > 5) value = value.slice(0, 5);
        }

        // Format CVV (3-4 digits)
        if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 4);
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate card details (basic validation)
            const cardNumber = formData.cardNumber.replace(/\s/g, '');
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                throw new Error('Invalid card number');
            }

            const [expMonth, expYear] = formData.expiry.split('/');
            if (!expMonth || !expYear || expMonth > 12 || expMonth < 1) {
                throw new Error('Invalid expiry date');
            }

            // Send subscription data to backend
            const response = await axios.post('/api/subscriptions/create', {
                userId: user?._id,
                email: formData.billingEmail,
                planName: planDetails.planName,
                price: planDetails.price,
                billing: planDetails.billing,
                paymentMethod: {
                    last4: cardNumber.slice(-4),
                    cardType: getCardType(cardNumber),
                    expiryMonth: expMonth,
                    expiryYear: expYear
                }
            });

            if (response.data.success) {
                // Update user in localStorage with subscription info
                if (user) {
                    const updatedUser = {
                        ...user,
                        subscription: {
                            plan: planDetails.planName,
                            status: 'active',
                            billing: planDetails.billing
                        }
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }

                setSuccess(true);
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getCardType = (number) => {
        const cleaned = number.replace(/\s/g, '');
        if (/^4/.test(cleaned)) return 'Visa';
        if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
        if (/^3[47]/.test(cleaned)) return 'Amex';
        return 'Card';
    };

    if (success) {
        return (
            <>
                <Navbar />
                <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 2rem'
                            }}>
                                <Check size={40} color="#10b981" />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Payment Successful!</h2>
                            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                                Welcome to <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{planDetails.planName}</span> plan
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                Redirecting to your dashboard...
                            </p>
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
            
            <section className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    
                    <button
                        onClick={() => navigate('/pricing')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'transparent', border: 'none', color: '#60a5fa',
                            cursor: 'pointer', fontSize: '0.95rem', marginBottom: '2rem'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Pricing
                    </button>

                    <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'flex-start' }}>
                        
                        {/* Left: Payment Form */}
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                                Complete Your Order
                            </h1>
                            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                                Secure payment powered by Stripe
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CreditCard size={20} />
                                        Payment Information
                                    </h3>

                                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                        <label className="input-label">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            className="input-field"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                        <label className="input-label">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            className="input-field"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="input-group">
                                            <label className="input-label">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                className="input-field"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                className="input-field"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                                        Billing Information
                                    </h3>

                                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                        <label className="input-label">Email Address</label>
                                        <input
                                            type="email"
                                            name="billingEmail"
                                            className="input-field"
                                            value={formData.billingEmail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Company Name (Optional)</label>
                                        <input
                                            type="text"
                                            name="company"
                                            className="input-field"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div style={{
                                        padding: '1rem', background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '0.75rem', color: '#ef4444',
                                        marginBottom: '1.5rem', fontSize: '0.9rem'
                                    }}>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%', padding: '1.25rem',
                                        fontSize: '1.1rem', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <Lock size={18} />
                                    {loading ? 'Processing...' : `Pay $${planDetails.price}/mo`}
                                </button>

                                <p style={{
                                    textAlign: 'center', fontSize: '0.85rem',
                                    color: '#6b7280', marginTop: '1rem'
                                }}>
                                    🔒 Secured by 256-bit SSL encryption
                                </p>
                            </form>
                        </div>

                        {/* Right: Order Summary */}
                        <div>
                            <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#fff' }}>
                                    Order Summary
                                </h3>

                                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: '#9ca3af' }}>Plan</span>
                                        <span style={{ color: '#fff', fontWeight: '600' }}>{planDetails.planName}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: '#9ca3af' }}>Billing</span>
                                        <span style={{ color: '#fff', textTransform: 'capitalize' }}>{planDetails.billing}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: '#9ca3af' }}>Price</span>
                                        <span style={{ color: '#fff' }}>${planDetails.price}/mo</span>
                                    </div>
                                    {planDetails.billing === 'annual' && (
                                        <div style={{
                                            padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                            borderRadius: '0.5rem', color: '#10b981',
                                            fontSize: '0.85rem', marginTop: '1rem'
                                        }}>
                                            ✓ You're saving 20% with annual billing
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                        <span>Total Due Today</span>
                                        <span style={{ color: '#60a5fa' }}>${planDetails.price}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                        {planDetails.billing === 'monthly' 
                                            ? 'Billed monthly, cancel anytime' 
                                            : `Billed annually ($${planDetails.price * 12})`
                                        }
                                    </p>
                                </div>

                                <div style={{ background: 'rgba(96, 165, 250, 0.05)', padding: '1.5rem', borderRadius: '0.75rem' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#60a5fa' }}>
                                        What's Included:
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {['Unlimited Users', 'Unlimited Dashboards', 'Custom Metrics', '24/7 Support', 'API Access'].map((feature, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#9ca3af' }}>
                                                <Check size={16} color="#10b981" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Checkout;
