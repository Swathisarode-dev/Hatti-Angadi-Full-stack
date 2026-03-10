import React, { useState, useEffect } from 'react';
import { Star, User, MessageCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';
const reviewsBg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Food background

const PageHeader = ({ title, subtitle }) => (
    <div style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-bg-body)',
        padding: '6rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${reviewsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Reveal>
            <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3.5rem', marginBottom: '1rem' }}>{title}</h1>
            <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>
        </Reveal>
    </div>
);

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ customer_name: '', rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchReviews = () => {
        fetch(`${API_URL}/api/reviews/`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch(`${API_URL}/api/reviews/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    setFormData({ customer_name: '', rating: 5, comment: '' }); // Reset form
                    setMessage({ type: 'success', text: 'Thank you for your review! It means a lot to us.' });
                    fetchReviews(); // Refresh list
                } else {
                    setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
                }
            })
            .catch(() => setMessage({ type: 'error', text: 'Network error.' }))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="page-reviews">
            <PageHeader
                title="Guest Journals"
                subtitle="Stories of spice, clay, and tradition shared by our beloved guests."
            />

            <div className="container" style={{ paddingBottom: '6rem' }}>

                {/* REVIEWS GRID */}
                {loading ? (
                    <p className="text-center" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Reading the journals...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2.5rem',
                        marginBottom: '6rem'
                    }}>
                        {reviews.length === 0 ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-bg-muted)', borderRadius: '24px' }}>
                                <MessageCircle size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>The journal is empty. Be the first to share your experience!</p>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <Reveal key={review.id} delay={index * 0.1}>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        padding: '2.5rem',
                                        borderRadius: '24px',
                                        boxShadow: 'var(--shadow-soft)',
                                        borderBottom: '4px solid var(--color-primary-light)',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{ position: 'absolute', top: '15px', right: '20px', opacity: 0.1 }}>
                                            <MessageCircle size={60} color="var(--color-secondary)" />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                                <div style={{ background: 'var(--color-bg-muted)', padding: '0.6rem', borderRadius: '50%' }}>
                                                    <User size={22} color="var(--color-secondary)" />
                                                </div>
                                                {review.customer_name}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} fill={i < review.rating ? "#FFC107" : "none"} stroke={i < review.rating ? "#FFC107" : "#ccc"} />
                                            ))}
                                        </div>
                                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontStyle: 'italic', fontSize: '1.05rem', flex: 1 }}>
                                            "{review.comment}"
                                        </p>
                                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f5f5f5' }}>
                                            <small style={{ color: '#aaa', fontWeight: 600 }}>
                                                {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </small>
                                        </div>
                                    </div>
                                </Reveal>
                            ))
                        )}
                    </div>
                )}

                {/* WRITE A REVIEW FORM */}
                <Reveal>
                    <div style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        backgroundColor: 'var(--color-bg-card)',
                        padding: '4rem',
                        borderRadius: '32px',
                        boxShadow: 'var(--shadow-hover)',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-secondary)', fontSize: '2rem' }}>Share Your Story</h3>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>How was your clay-pot experience at Hatti Angadi?</p>

                        {message && (
                            <div style={{
                                padding: '1.2rem', marginBottom: '2rem', borderRadius: '12px',
                                backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
                                color: message.type === 'success' ? '#2e7d32' : '#c62828',
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Guest Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.customer_name}
                                    onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', outline: 'none' }}
                                    placeholder="Your name"
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Rating</label>
                                <div style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={40}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            fill={star <= formData.rating ? "#FFC107" : "none"}
                                            stroke={star <= formData.rating ? "#FFC107" : "#ccc"}
                                            style={{ transition: 'transform 0.2s', transform: star <= formData.rating ? 'scale(1.1)' : 'scale(1)' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Share Your Experience</label>
                                <textarea
                                    required
                                    value={formData.comment}
                                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', minHeight: '150px', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }}
                                    placeholder="What did you love about the food and ambience?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '12px' }}
                            >
                                {submitting ? 'Sharing...' : 'Publish My Story'}
                            </button>
                        </form>
                    </div>
                </Reveal>

            </div>
        </div>
    );
}
