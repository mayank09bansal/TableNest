import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { RESTAURANTS, CITIES, CUISINES } from '../data/restaurants';
import { User, Mail, Phone, MapPin, Utensils, Heart, LogOut, Check, ArrowRight } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateUser, favorites, toggleFavorite, showToast } = useBooking();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user.fullName || 'Eleanor Vance');
  const [email, setEmail] = useState(user.email || 'eleanor.vance@tablenest.com');
  const [phone, setPhone] = useState(user.phone || '+91 98112 45901');
  const [preferredCity, setPreferredCity] = useState(user.preferredCity || 'delhi');
  const [preferredCuisine, setPreferredCuisine] = useState(user.preferredCuisine || 'Modern Indian');
  const [dietaryPreference, setDietaryPreference] = useState(user.dietaryPreference || 'Vegetarian Friendly');

  const savedRestaurants = RESTAURANTS.filter(r => favorites.includes(r.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({
      fullName,
      email,
      phone,
      preferredCity,
      preferredCuisine,
      dietaryPreference
    });
  };

  const handleSignOut = () => {
    showToast('Signed out of TableNest.');
    navigate('/login');
  };

  return (
    <div className="container fade-in" style={{ padding: '40px 24px 80px', maxWidth: '860px' }}>
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Profile &amp; Dining Preferences</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Manage your personal dining profile, dietary choices, and favorite restaurants across India.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '36px', alignItems: 'start' }}>
        {/* Left Column: Profile Form */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-main)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}
            >
              {user.avatarInitials || 'EV'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>{user.fullName}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</span>
            </div>

            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Dining Wallet
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--badge-green)' }}>
                ₹{user.diningWalletBalance || 500}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Available dining balance
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Preferred City</label>
                <select
                  className="form-select"
                  value={preferredCity}
                  onChange={(e) => setPreferredCity(e.target.value)}
                >
                  {CITIES.filter(c => c.id !== 'all').map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Favorite Cuisine</label>
                <select
                  className="form-select"
                  value={preferredCuisine}
                  onChange={(e) => setPreferredCuisine(e.target.value)}
                >
                  {CUISINES.filter(c => c !== 'All Cuisines').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dietary Preference</label>
              <select
                className="form-select"
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
              >
                <option value="Vegetarian Friendly">Vegetarian Friendly</option>
                <option value="Pure Jain Food (No Onion/Garlic)">Pure Jain Food (No Onion/Garlic)</option>
                <option value="Non-Vegetarian Gourmand">Non-Vegetarian Gourmand</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--border-light)' }}>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-ghost btn-sm"
                style={{ color: '#E02424', gap: '6px' }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>

              <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Wishlist / Saved Restaurants */}
        <div>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px 24px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <Heart size={20} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                Saved Favorites ({savedRestaurants.length})
              </h3>
            </div>

            {savedRestaurants.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {savedRestaurants.map(r => (
                  <div
                    key={r.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      style={{ width: '54px', height: '54px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link to={`/restaurant/${r.id}`} style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.name}
                      </Link>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.cityName} · {r.cuisine}</span>
                    </div>

                    <Link
                      to={`/booking/${r.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    >
                      Book
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                You haven't saved any restaurants to your wishlist yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
