import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

import { API_URL } from '../config';

const PageHeader = ({ title }) => (
    <div style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-bg-body)',
        padding: '4rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Reveal>
            <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3rem' }}>{title}</h1>
        </Reveal>
    </div>
);

export default function BookTable() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        timeSlot: '',
        guests: 2,
        specialRequests: ''
    });
    const [submitting, setSubmitting] = useState(false);

    // Time slots available
    const timeSlots = [
        '11:00 AM - 12:30 PM',
        '12:30 PM - 02:00 PM',
        '02:00 PM - 03:30 PM',
        '06:00 PM - 07:30 PM',
        '07:30 PM - 09:00 PM',
        '09:00 PM - 10:30 PM'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Generate a random table number (1-20)
        const tableNumber = Math.floor(Math.random() * 20) + 1;

        const payload = {
            customer_name: formData.name,
            phone: formData.phone,
            date: formData.date,
            time_slot: formData.timeSlot,
            guests: formData.guests,
            table_number: tableNumber,
            special_requests: formData.specialRequests,
            status: 'Confirmed'
        };

        fetch(`${API_URL}/api/table-bookings/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to book table');
                }
            })
            .then(data => {
                // Navigate to thank you page with booking details
                navigate('/thank-you', {
                    state: {
                        type: 'table_booking',
                        customerName: formData.name,
                        phone: formData.phone,
                        date: formData.date,
                        timeSlot: formData.timeSlot,
                        guests: formData.guests,
                        tableNumber: data.table_number || tableNumber
                    }
                });
            })
            .catch(err => {
                console.error(err);
                alert('Failed to book table. Please try again or call us directly.');
            })
            .finally(() => setSubmitting(false));
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="page-book-table">
            <PageHeader title="Reserve Your Table" />

            <div className="container" style={{ paddingBottom: '6rem', maxWidth: '800px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '3rem',
                        borderRadius: '32px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                                Book Your Experience
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                Reserve a table at Hatti Angadi and enjoy authentic village-style dining in our traditional ambience.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {/* Name */}
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                        <User size={20} color="var(--color-primary)" />
                                        Your Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem',
                                            borderRadius: '16px',
                                            border: '2px solid #f0f0f0',
                                            fontSize: '1.05rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s'
                                        }}
                                        placeholder="Enter your full name"
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                        <Phone size={20} color="var(--color-primary)" />
                                        Phone Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem',
                                            borderRadius: '16px',
                                            border: '2px solid #f0f0f0',
                                            fontSize: '1.05rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s'
                                        }}
                                        placeholder="Enter your mobile number"
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    />
                                </div>

                                {/* Date and Guests Row */}
                                <div className="stack-on-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {/* Date */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                            <Calendar size={20} color="var(--color-primary)" />
                                            Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            min={today}
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '1.2rem',
                                                borderRadius: '16px',
                                                border: '2px solid #f0f0f0',
                                                fontSize: '1.05rem',
                                                outline: 'none',
                                                transition: 'border-color 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                        />
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                            <Users size={20} color="var(--color-primary)" />
                                            Guests
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                            style={{
                                                width: '100%',
                                                padding: '1.2rem',
                                                borderRadius: '16px',
                                                border: '2px solid #f0f0f0',
                                                fontSize: '1.05rem',
                                                outline: 'none',
                                                transition: 'border-color 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                        />
                                    </div>
                                </div>

                                {/* Time Slot */}
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                        <Clock size={20} color="var(--color-primary)" />
                                        Preferred Time Slot
                                    </label>
                                    <select
                                        required
                                        value={formData.timeSlot}
                                        onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem',
                                            borderRadius: '16px',
                                            border: '2px solid #f0f0f0',
                                            fontSize: '1.05rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                            backgroundColor: '#fff',
                                            cursor: 'pointer'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    >
                                        <option value="">Select a time slot</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem' }}>
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        value={formData.specialRequests}
                                        onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem',
                                            borderRadius: '16px',
                                            border: '2px solid #f0f0f0',
                                            fontSize: '1.05rem',
                                            minHeight: '120px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                            resize: 'vertical'
                                        }}
                                        placeholder="Any special occasion, dietary requirements, or seating preferences?"
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '1.5rem',
                                        fontSize: '1.2rem',
                                        borderRadius: '16px',
                                        marginTop: '1rem'
                                    }}
                                >
                                    {submitting ? 'Reserving...' : 'Confirm Reservation'}
                                </button>
                            </div>
                        </form>

                        {/* Info Box */}
                        <div style={{
                            marginTop: '3rem',
                            padding: '1.5rem',
                            backgroundColor: 'var(--color-bg-muted)',
                            borderRadius: '16px',
                            borderLeft: '4px solid var(--color-primary)'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                <strong>Note:</strong> Your reservation will be confirmed immediately. Please arrive 10 minutes before your scheduled time.
                                For groups larger than 12 people, please call us directly at <strong>+91 98765 43210</strong>.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
