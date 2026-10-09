import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CITIES } from '../data/restaurants';
import { MapPin, Calendar, User, Search, Utensils, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { user, bookings, selectedCity, setSelectedCity } = useBooking();
  const [showCityMenu, setShowCityMenu] = useState(false);
  const navigate = useNavigate();

  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;
  const currentCityName = CITIES.find(c => c.id === selectedCity)?.name || 'All India';

  return (
    <header className="header-wrapper">
      <div className="container header-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="brand-link" title="TableNest — Home">
          <div className="brand-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
              <path d="M6 13v6" />
              <path d="M18 13v6" />
              <path d="M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
            </svg>
          </div>
          <div className="brand-title-group">
            <span className="brand-name">TableNest</span>
            <span className="brand-tagline">Indian Fine Dining</span>
          </div>
        </Link>

        {/* Clean Main Navigation (No artificial debug navigation bar) */}
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/restaurants" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            Explore Restaurants
          </NavLink>
          <NavLink to="/my-bookings" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            My Bookings
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="header-actions">
          {/* City Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="city-select-btn"
              onClick={() => setShowCityMenu(!showCityMenu)}
              title="Filter by City"
            >
              <MapPin size={15} style={{ color: 'var(--primary)' }} />
              <span>{currentCityName}</span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {showCityMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-main)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  width: '200px',
                  padding: '8px 0',
                  zIndex: 200
                }}
              >
                <div style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                  Select Dining City
                </div>
                {CITIES.map(city => (
                  <button
                    key={city.id}
                    type="button"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      fontSize: '0.88rem',
                      color: selectedCity === city.id ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: selectedCity === city.id ? '700' : '500',
                      background: selectedCity === city.id ? 'var(--primary-light)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onClick={() => {
                      setSelectedCity(city.id);
                      setShowCityMenu(false);
                      navigate('/restaurants');
                    }}
                  >
                    <span>{city.name}</span>
                    {selectedCity === city.id && <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <Link to="/profile" className="user-profile-pill" title="My Profile & Settings">
            <div className="user-avatar">{user.avatarInitials || 'EV'}</div>
            <span className="user-name">{user.fullName.split(' ')[0]}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
