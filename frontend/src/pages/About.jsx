import React from 'react';
import { Reveal } from '../components/Reveal';
// Authentic Indian cooking images
const aboutImg1 = '/images/about-kitchen.jpeg'; // Traditional kitchen
const aboutImg2 = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Fresh spices

export default function About() {
    return (
        <div className="page-about">
            {/* Header Section */}
            <div style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-bg-body)',
                padding: '6rem 0',
                textAlign: 'center',
                marginBottom: '4rem'
            }}>
                <Reveal>
                    <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3.5rem', marginBottom: '1rem' }}>Our Heritage</h1>
                    <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        A journey back to the roots of traditional Indian cooking.
                    </p>
                </Reveal>
            </div>

            <div className="container" style={{ paddingBottom: '6rem' }}>
                {/* Story Section 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <Reveal>
                        <div style={{ position: 'relative' }}>
                            <img src={aboutImg1} alt="Traditional Kitchen" style={{ width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow-hover)' }} />
                            <div style={{
                                position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px',
                                backgroundColor: 'var(--color-primary)', borderRadius: '50%', zIndex: -1, opacity: 0.2
                            }}></div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>The Art of Slow Cooking</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                                Hatti Angadi was born from a simple desire: to bring back the lost art of slow cooking.
                                In a world of fast food, we chose <strong>clay pots</strong>.
                                The porous nature of clay allows heat and moisture to circulate during cooking,
                                enhancing the natural flavors and nutritional value of the ingredients.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Story Section 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <Reveal order={2}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Farm to Table</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                                In a world of artificial flavors, we chose <strong>fresh farm ingredients</strong>.
                                Our recipes are inspired by the rural kitchens of Karnataka, where food is not just eaten, but revered.
                                Every spice is hand-ground, and every vegetable is sourced daily from local farmers who share our passion for purity.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal order={1}>
                        <div style={{ position: 'relative' }}>
                            <img src={aboutImg2} alt="Fresh Spices" style={{ width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow-hover)' }} />
                            <div style={{
                                position: 'absolute', bottom: '-20px', right: '-20px', width: '120px', height: '120px',
                                backgroundColor: 'var(--color-accent)', borderRadius: '50%', zIndex: -1, opacity: 0.1
                            }}></div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
