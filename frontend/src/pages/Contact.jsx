import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Reveal } from '../components/Reveal';
const contactHero = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Restaurant interior

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            alert("Thanks for contacting us! We'll get back to you soon.");
            setFormData({ name: '', email: '', message: '' });
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className="page-contact">
            <div style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-bg-body)',
                padding: '6rem 0',
                textAlign: 'center',
                marginBottom: '4rem',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${contactHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Reveal>
                    <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        We'd love to hear from you. Visit us, call us, or write to us.
                    </p>
                </Reveal>
            </div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', paddingBottom: '6rem' }}>

                {/* Contact Info */}
                <Reveal>
                    <div>
                        <h2 style={{ color: 'var(--color-primary)', marginBottom: '2.5rem', fontSize: '2rem' }}>Contact Info</h2>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'var(--color-bg-muted)', padding: '1.2rem', borderRadius: '50%', height: 'fit-content', boxShadow: 'var(--shadow-soft)' }}>
                                <MapPin color="var(--color-secondary)" size={28} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Our Location</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    123, Temple Road,<br />
                                    Malgudi Town, Karnataka - 577401
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'var(--color-bg-muted)', padding: '1.2rem', borderRadius: '50%', height: 'fit-content', boxShadow: 'var(--shadow-soft)' }}>
                                <Phone color="var(--color-secondary)" size={28} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Phone Numbers</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>+91 98765 43210</p>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>+91 99000 12345</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--color-bg-muted)', padding: '1.2rem', borderRadius: '50%', height: 'fit-content', boxShadow: 'var(--shadow-soft)' }}>
                                <Mail color="var(--color-secondary)" size={28} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Email Support</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>hello@hattiangadi.com</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Contact Form */}
                <Reveal delay={0.2}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '3rem',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-hover)',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--color-secondary)' }}>Send a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Your Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
                                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
                                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Your Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', minHeight: '150px', outline: 'none', transition: 'border-color 0.3s', fontFamily: 'inherit' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
                                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    placeholder="Tell us about your catering needs or feedback..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem' }}
                            >
                                {submitting ? 'Sending...' : 'Send Message'} <Send size={20} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
