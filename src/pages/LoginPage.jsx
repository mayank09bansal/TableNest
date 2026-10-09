import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useBooking();

  const [email, setEmail] = useState('eleanor.vance@tablenest.com');
  const [password, setPassword] = useState('tablenest2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Signed in successfully as Eleanor Vance.');
    navigate('/');
  };

  const handleDemoFill = () => {
    setEmail('eleanor.vance@tablenest.com');
    setPassword('tablenest2026');
    showToast('Demo VIP credentials loaded.');
  };

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card">
        {/* Header with TableNest Logo & v2.4 Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
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

          <span
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-main)',
              fontSize: '0.74rem',
              fontWeight: '700',
              color: 'var(--text-muted)'
            }}
          >
            v2.4
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '1.75rem', marginBottom: '6px' }}>Welcome Back</h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Sign in to manage your table reservations across India
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Mail size={18} />
              </span>
              <input
                type="text"
                required
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
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
                type={showPassword ? 'text' : 'password'}
                required
                className="form-input"
                style={{ paddingLeft: '42px', paddingRight: '42px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  padding: '4px'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Remember me</span>
            </label>

            <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered email.'); }} style={{ color: 'var(--primary)', fontWeight: '600' }}>
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', gap: '8px', fontSize: '1rem' }}
          >
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Pill */}
        <div
          onClick={handleDemoFill}
          style={{
            marginTop: '20px',
            padding: '10px 14px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontSize: '0.82rem'
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Quick testing credentials</span>
          <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Auto-Fill</span>
        </div>

        {/* Switch to Sign Up */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '700' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
