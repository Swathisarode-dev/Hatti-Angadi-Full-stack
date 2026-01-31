import React from 'react';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

// Authentic Indian vegetarian food images
const heroBg = '/images/hero-bg.jpeg'; // Traditional Indian thali
const imgGrid1 = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Clay pot cooking
const imgGrid2 = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Fresh vegetables
const imgGrid3 = '/images/ambience.jpeg'; // Traditional restaurant ambience

export default function Home() {
    return (
        <div className="page-home">
            {/* HERO SECTION */}
            <section className="hero" style={{
                minHeight: '90vh', // Made it slightly taller for impact
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                // Using local asset for background with overlay
                background: `linear-gradient(rgba(44, 24, 16, 0.6), rgba(44, 24, 16, 0.4)), url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Parallax effect
                color: 'var(--color-bg-body)',
                padding: '0 var(--spacing-sm)'
            }}>
                <div className="hero-content">
                    <Reveal>
                        <div style={{
                            border: '1px solid rgba(255,255,255,0.3)',
                            padding: '2rem',
                            backdropFilter: 'blur(3px)',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: '1.2rem',
                                letterSpacing: '4px',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                color: 'var(--color-primary-light)',
                                fontWeight: 600
                            }}>
                                Pure Vegetarian
                            </span>
                            <h1 className="text-kannada" style={{
                                fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                                marginBottom: '1rem',
                                color: '#fff',
                                textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}>
                                ಹಟ್ಟಿ ಅಂಗಡಿ
                            </h1>
                            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 300, color: '#fff' }}>
                                "Every Meal feels like Home"
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '2rem auto', opacity: 0.95, lineHeight: 1.8 }}>
                            Authentic clay-pot cooking. Farm-fresh ingredients. <br />
                            The true taste of Karnataka's heritage.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/menu" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Explore Menu
                            </Link>
                            <Link to="/about" className="btn-secondary" style={{ borderColor: '#fff', color: '#fff', textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Our Story
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center', backgroundColor: '#fdfbf7' }}>
                <div className="container">
                    <Reveal>
                        <h2 style={{ color: 'var(--color-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                            Welcome to Hatti Angadi
                        </h2>
                        <h3 style={{ fontSize: '3rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--color-secondary)' }}>
                            Where Tradition Meets Taste
                        </h3>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                            We believe in the power of slow cooking. Our food is prepared in <strong>earthen pots</strong> using age-old recipes passed down through generations.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-hover)', height: '350px' }}>
                                <img src={imgGrid1} alt="Tradition" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem' }}>Clay Pot Cooking</h3>
                                </div>
                            </div>
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-hover)', height: '350px' }}>
                                <img src={imgGrid2} alt="Fresh" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem' }}>Fresh Ingredients</h3>
                                </div>
                            </div>
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-hover)', height: '350px' }}>
                                <img src={imgGrid3} alt="Ambience" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem' }}>Village Ambience</h3>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
