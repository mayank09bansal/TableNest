import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { updateUser, showToast } = useBooking();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (fullName) {
      updateUser({ fullName, email, phone });
    }
    showToast('Welcome to TableNest! Your account is created.');
    navigate('/');
  };

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card">
        {/* Header with TableNest Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-mark" style={{ width: '38px', height: '38px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <path d="M6 13v6" />
                <path d="M18 13v6" />
              </svg>
            </div>
            <div>
              <span className="brand-name" style={{ fontSize: '1.25rem' }}>TableNest</span>
              <span className="brand-tagline" style={{ display: 'block', fontSize: '0.62rem' }}>RESTAURANT RESERVATIONS</span>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '6px' }}>Create an Account</h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Join India's premier fine dining network for priority reservations
        </p>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <User size={18} />
              </span>
              <input
                type="text"
                required
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="Rohan Mehra"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="rohan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number (+91)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Phone size={18} />
              </span>
              <input
                type="tel"
                required
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', gap: '8px', fontSize: '1rem', marginTop: '10px' }}
          >
            <span>Create Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
