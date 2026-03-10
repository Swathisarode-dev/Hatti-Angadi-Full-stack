import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';
const menuHeaderBg = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Traditional Indian food spread

const PageHeader = ({ title, subtitle }) => (
    <div style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-bg-body)',
        padding: '6rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${menuHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Reveal>
            <h1 style={{ color: 'var(--color-primary-light)', fontSize: '3.5rem', marginBottom: '1rem' }}>{title}</h1>
            <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>
        </Reveal>
    </div>
);

export default function Menu() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${API_URL}/api/categories/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching menu:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div style={{ padding: '8rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>Cooking your menu...</h2>
        </div>
    );

    return (
        <div className="page-menu">
            <PageHeader
                title="Taste the Tradition"
                subtitle="Wholesome, pure vegetarian delicacies cooked in authentic clay pots."
            />

            <div className="container" style={{ paddingBottom: '6rem' }}>
                {categories.map((category, catIndex) => (
                    <div key={category.id} style={{ marginBottom: '6rem' }}>
                        <Reveal delay={catIndex * 0.1}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{ height: '2px', background: 'var(--color-primary-light)', flex: 1 }}></div>
                                <h2 className="text-kannada" style={{ color: 'var(--color-secondary)', fontSize: '2.5rem', whiteSpace: 'nowrap' }}>{category.name}</h2>
                                <div style={{ height: '2px', background: 'var(--color-primary-light)', flex: 1 }}></div>
                            </div>
                        </Reveal>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '2.5rem' }}>
                            {category.items.map((item, itemIndex) => (
                                <Reveal key={item.id} delay={(catIndex * 0.1) + (itemIndex * 0.05)}>
                                    <div className="menu-card" style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        boxShadow: 'var(--shadow-soft)',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid #f0f0f0'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-10px)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                                        }}>
                                        <div style={{ height: '220px', overflow: 'hidden' }}>
                                            <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                                                <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-secondary)' }}>{item.name}</h3>
                                                <span style={{
                                                    backgroundColor: item.is_spicy ? '#ffebee' : '#e8f5e9',
                                                    color: item.is_spicy ? '#c62828' : '#2e7d32',
                                                    padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px'
                                                }}>
                                                    {item.is_spicy ? 'SPICY' : 'MILD'}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>
                                                {item.description}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px dashed #eee' }}>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                                    ₹{item.price}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="btn-primary"
                                                    style={{ padding: '0.7rem 1.5rem', borderRadius: '12px' }}
                                                >
                                                    <Plus size={18} style={{ marginRight: '5px' }} /> Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
