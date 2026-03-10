import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Send, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';
const cartHeaderBg = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Food preparation

const PageHeader = ({ title }) => (
    <div style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-bg-body)',
        padding: '4rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${cartHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Reveal>
            <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3rem' }}>{title}</h1>
        </Reveal>
    </div>
);

export default function Cart() {
    const { cartItems, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setSubmitting(true);

        const payload = {
            customer_name: formData.name,
            phone: formData.phone,
            message: formData.message,
            items_json: JSON.stringify(cartItems),
            total_amount: totalPrice,
            status: 'Pending'
        };

        fetch(`${API_URL}/api/inquiries/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    // Navigate to thank you page with order details
                    navigate('/thank-you', {
                        state: {
                            type: 'order',
                            customerName: formData.name,
                            phone: formData.phone,
                            totalAmount: totalPrice
                        }
                    });
                    clearCart();
                } else {
                    alert("Failed to send inquiry. Please try again.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Network error.");
            })
            .finally(() => setSubmitting(false));
    };

    if (cartItems.length === 0) {
        return (
            <div className="page-cart animate-fade-in" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'var(--color-bg-muted)', padding: '3rem', borderRadius: '50%', marginBottom: '2rem' }}>
                    <ShoppingBag size={80} color="var(--color-text-muted)" />
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--color-secondary)', fontSize: '2rem' }}>Your Pot is Empty</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Add some delicious items from the menu.</p>
                <Link to="/menu" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem', fontSize: '1.1rem' }}>Go to Menu</Link>
            </div>
        );
    }

    return (
        <div className="page-cart">
            <PageHeader title="Review Your Selection" />

            <div className="container" style={{ paddingBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: '4rem' }}>

                {/* LEFT: ITEMS LIST */}
                <Reveal>
                    <div>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Selected Items</h3>
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', overflow: 'hidden', border: '1px solid #eee' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '2rem', borderBottom: '1px solid #f5f5f5'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.name}</h4>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem' }}>₹{item.price}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #f0f0f0', borderRadius: '12px', padding: '2px' }}>
                                            <button onClick={() => updateQty(item.id, -1)} style={{ padding: '0.5rem 1rem', background: 'none', fontWeight: 800, cursor: 'pointer' }}>-</button>
                                            <span style={{ padding: '0 0.5rem', fontWeight: 700, fontSize: '1.1rem', minWidth: '30px', textAlign: 'center' }}>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} style={{ padding: '0.5rem 1rem', background: 'none', fontWeight: 800, cursor: 'pointer' }}>+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', color: '#ff5252', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fff5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div style={{ padding: '2.5rem', backgroundColor: 'var(--color-bg-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Total Amount</h3>
                                <h2 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '2.5rem' }}>₹{totalPrice}</h2>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* RIGHT: INQUIRY FORM */}
                <Reveal delay={0.2}>
                    <div>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Place Your Order</h3>
                        <div className="cart-sidebar" style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow-hover)', border: '1px solid #eee' }}>
                            <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                We process payments manually during confirmation. Submit this form and we will call you shortly to confirm your selection and delivery details.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', outline: 'none' }}
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', outline: 'none' }}
                                        placeholder="Mobile Number"
                                    />
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Special Requests (Optional)</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f0f0f0', fontSize: '1rem', minHeight: '100px', fontFamily: 'inherit', outline: 'none' }}
                                        placeholder="Any allergies or specific instructions?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.2rem', borderRadius: '12px' }}
                                >
                                    {submitting ? 'Processing...' : 'Send Selection'} <Send size={20} style={{ marginLeft: '10px' }} />
                                </button>
                            </form>
                        </div>
                    </div>
                </Reveal>

            </div>
        </div>
    );
}
