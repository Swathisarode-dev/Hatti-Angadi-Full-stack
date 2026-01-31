import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  // Helper to check active state
  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? 'var(--color-primary)' : 'var(--color-secondary)',
    fontWeight: 500,
    fontSize: '1rem',
    transition: 'color 0.2s',
    borderBottom: isActive(path) ? '2px solid var(--color-primary)' : 'none',
    paddingBottom: '4px'
  });

  return (
    <nav className="navbar" style={{
      padding: '1rem 0',
      backgroundColor: 'var(--color-bg-body)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-soft)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
          <div className="logo" style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: 0, lineHeight: 1 }} className="text-kannada">
              ಹಟ್ಟಿ ಅಂಗಡಿ
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>
              Hatti Angadi
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links desktop-only" style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
          {['/', '/menu', '/reviews', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={path}>
                <Link to={path} style={linkStyle(path)}>
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/book-table" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              Book Table
            </Link>
          </li>
          <li>
            <Link to="/cart" style={{ position: 'relative', cursor: 'pointer', display: 'block' }}>
              <ShoppingBag color="var(--color-secondary)" size={24} />
              <span style={{
                position: 'absolute', top: -5, right: -5,
                background: 'var(--color-primary)', color: '#fff',
                fontSize: '0.7rem', width: '18px', height: '18px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{totalItems}</span>
            </Link>
          </li>
        </ul>

        {/* MOBILE ICONS & TOGGLE */}
        <div className="mobile-only" style={{ alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/cart" style={{ position: 'relative' }} onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingBag color="var(--color-secondary)" size={24} />
            <span style={{
              position: 'absolute', top: -5, right: -5,
              background: 'var(--color-primary)', color: '#fff',
              fontSize: '0.6rem', width: '15px', height: '15px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{totalItems}</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', color: 'var(--color-secondary)' }}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', top: '75px', left: 0, right: 0, bottom: 0,
          backgroundColor: 'var(--color-bg-body)', padding: '2rem',
          zIndex: 999, display: 'flex', flexDirection: 'column', gap: '2rem'
        }}>
          {['/', '/menu', '/reviews', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Link key={path} to={path} style={{ ...linkStyle(path), fontSize: '1.5rem', border: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                {label}
              </Link>
            );
          })}
          <Link to="/book-table" className="btn-primary" style={{ justifyContent: 'center', padding: '1rem', fontSize: '1.2rem', textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
            Book Table
          </Link>
        </div>
      )}
    </nav>
  );
}
