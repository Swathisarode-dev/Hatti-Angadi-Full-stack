import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import footerBg from '../assets/img4.jpeg';

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#2C1810', // Deep secondary color
            color: 'var(--color-bg-muted)',
            padding: '6rem 0 2rem',
            marginTop: 'auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Subtle Background Overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.05,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

                    {/* Brand */}
                    <div>
                        <h2 className="text-kannada" style={{ color: 'var(--color-primary-light)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>ಹಟ್ಟಿ ಅಂಗಡಿ</h2>
                        <p style={{ opacity: 0.8, maxWidth: '350px', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            Every bite at Hatti Angadi is a tribute to the timeless traditions of Karnataka's rural kitchens. Pure vegetarian, clay-pot cooked, and heart-served.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                            <Link to="#" style={{ color: 'var(--color-primary-light)' }}><Facebook size={24} /></Link>
                            <Link to="#" style={{ color: 'var(--color-primary-light)' }}><Instagram size={24} /></Link>
                            <Link to="#" style={{ color: 'var(--color-primary-light)' }}><Twitter size={24} /></Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.3rem', borderBottom: '2px solid var(--color-primary)', width: 'fit-content', paddingBottom: '0.5rem' }}>Explore</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-light)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Home</Link></li>
                            <li><Link to="/menu" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-light)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Our Menu</Link></li>
                            <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-light)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Our Heritage</Link></li>
                            <li><Link to="/reviews" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-light)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Guest Love</Link></li>
                            <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-light)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Get in Touch</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.3rem', borderBottom: '2px solid var(--color-primary)', width: 'fit-content', paddingBottom: '0.5rem' }}>Visit Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <MapPin size={20} color="var(--color-primary-light)" style={{ marginTop: '5px' }} />
                                <p style={{ opacity: 0.8, margin: 0 }}>123, Temple Road, Malgudi Town, Karnataka - 577401</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Phone size={20} color="var(--color-primary-light)" />
                                <p style={{ opacity: 0.8, margin: 0 }}>+91 98765 43210</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Mail size={20} color="var(--color-primary-light)" />
                                <p style={{ opacity: 0.8, margin: 0 }}>hello@hattiangadi.com</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', textAlign: 'center', opacity: 0.5, fontSize: '0.95rem' }}>
                    &copy; {new Date().getFullYear()} Hatti Angadi. Handcrafted with traditional love.
                </div>
            </div>
        </footer>
    );
}
