import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M6 13v6" />
                  <path d="M18 13v6" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>
                TableNest
              </span>
            </div>
            <p className="footer-brand-desc">
              India's premier fine dining reservation network. Curating unforgettable culinary moments at the country's most celebrated heritage and modern kitchens.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#B4A79C' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--primary)' }} /> Instant Confirmation
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} style={{ color: '#E5A93B' }} /> Handpicked Tables
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/restaurants" className="footer-link">Explore Restaurants</Link></li>
              <li><Link to="/my-bookings" className="footer-link">My Reservations</Link></li>
              <li><Link to="/profile" className="footer-link">Profile & Preferences</Link></li>
              <li><Link to="/login" className="footer-link">Sign In / Register</Link></li>
            </ul>
          </div>

          {/* Top Indian Metro Cities */}
          <div>
            <h4 className="footer-col-title">Culinary Cities</h4>
            <ul className="footer-links">
              <li><Link to="/restaurants" className="footer-link">New Delhi &amp; NCR</Link></li>
              <li><Link to="/restaurants" className="footer-link">Mumbai &amp; Lower Parel</Link></li>
              <li><Link to="/restaurants" className="footer-link">Bengaluru &amp; Indiranagar</Link></li>
              <li><Link to="/restaurants" className="footer-link">Goa &amp; Assagao</Link></li>
              <li><Link to="/restaurants" className="footer-link">Kolkata &amp; Park Street</Link></li>
              <li><Link to="/restaurants" className="footer-link">Chennai &amp; Guindy</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-col-title">Concierge &amp; Inquiries</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#B4A79C' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
                <span>Connaught Place, Barakhamba Road, New Delhi 110001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>+91 1800 212 9000 (Toll-Free Concierge)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>concierge@tablenest.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom (Unified Single Line) */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} TableNest Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted for true lovers of Indian gastronomy</span>
            <Heart size={14} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};
