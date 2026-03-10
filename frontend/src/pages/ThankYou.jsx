import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export default function ThankYou() {
    const location = useLocation();
    const orderData = location.state || {};
    const [confetti, setConfetti] = useState(true);

    useEffect(() => {
        // Disable confetti after 3 seconds
        const timer = setTimeout(() => setConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const isTableBooking = orderData.type === 'table_booking';

    return (
        <div className="page-thankyou" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f1e8 100%)', padding: '2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Reveal>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '32px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        padding: '4rem 3rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Success Icon */}
                        <div style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                            borderRadius: '50%',
                            padding: '2rem',
                            marginBottom: '2rem',
                            animation: confetti ? 'bounce 0.6s ease-in-out' : 'none'
                        }}>
                            <CheckCircle size={80} color="#fff" strokeWidth={2.5} />
                        </div>

                        {/* Thank You Message */}
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: '1rem',
                            color: 'var(--color-secondary)',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            {isTableBooking ? 'Table Reserved!' : 'Order Received!'}
                        </h1>

                        <p style={{
                            fontSize: '1.3rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '3rem',
                            lineHeight: '1.8'
                        }}>
                            Thank you, <strong style={{ color: 'var(--color-primary)' }}>{orderData.customerName || 'Valued Customer'}</strong>!
                            {isTableBooking
                                ? ' Your table has been successfully reserved.'
                                : ' We have received your order and will contact you shortly to confirm.'}
                        </p>

                        {/* Order/Booking Details */}
                        <div style={{
                            backgroundColor: 'var(--color-bg-muted)',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            marginBottom: '3rem',
                            textAlign: 'left'
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                marginBottom: '1.5rem',
                                color: 'var(--color-secondary)',
                                textAlign: 'center'
                            }}>
                                {isTableBooking ? 'Reservation Details' : 'Order Summary'}
                            </h3>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {isTableBooking ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                background: 'var(--color-primary)',
                                                borderRadius: '12px',
                                                padding: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Calendar size={24} color="#fff" />
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Date</p>
                                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                                                    {orderData.date || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                background: 'var(--color-primary)',
                                                borderRadius: '12px',
                                                padding: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Clock size={24} color="#fff" />
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Time Slot</p>
                                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                                                    {orderData.timeSlot || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                background: 'var(--color-primary)',
                                                borderRadius: '12px',
                                                padding: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Users size={24} color="#fff" />
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Table Number</p>
                                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                                                    Table {orderData.tableNumber || 'TBD'}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                background: 'var(--color-primary)',
                                                borderRadius: '12px',
                                                padding: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Users size={24} color="#fff" />
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Number of Guests</p>
                                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                                                    {orderData.guests || 'Not specified'} {orderData.guests === 1 ? 'Guest' : 'Guests'}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: '1rem',
                                            borderBottom: '2px solid #e0e0e0'
                                        }}>
                                            <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Order Total</span>
                                            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                                ₹{orderData.totalAmount || '0'}
                                            </span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                                            We will call you at <strong>{orderData.phone || 'your number'}</strong> to confirm your order and arrange delivery/pickup.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div style={{
                            background: 'linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%)',
                            borderRadius: '16px',
                            padding: '2rem',
                            marginBottom: '2rem',
                            border: '2px dashed var(--color-primary)'
                        }}>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                                What's Next?
                            </h4>
                            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text)', lineHeight: '1.7' }}>
                                {isTableBooking
                                    ? 'Please arrive 10 minutes before your reservation time. We look forward to serving you!'
                                    : 'Our team will contact you within 15-30 minutes to confirm your order details and delivery information.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link
                                to="/"
                                className="btn-primary"
                                style={{
                                    textDecoration: 'none',
                                    padding: '1rem 2.5rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px'
                                }}
                            >
                                Back to Home
                            </Link>
                            <Link
                                to="/menu"
                                className="btn-secondary"
                                style={{
                                    textDecoration: 'none',
                                    padding: '1rem 2.5rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px'
                                }}
                            >
                                Browse Menu
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}
