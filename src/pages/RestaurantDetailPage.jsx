import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../data/restaurants';
import { useBooking } from '../context/BookingContext';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Heart,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  UtensilsCrossed,
  Layers
} from 'lucide-react';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useBooking();

  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];
  const isFav = favorites.includes(restaurant.id);

  return (
    <div className="container fade-in" style={{ padding: '30px 24px 80px' }}>
      {/* Top Breadcrumb & Back */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Link
          to="/restaurants"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--text-muted)'
          }}
        >
          <ChevronLeft size={18} />
          <span>Back to All Restaurants</span>
        </Link>

        <button
          type="button"
          onClick={() => toggleFavorite(restaurant.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: isFav ? 'var(--primary-light)' : 'var(--bg-surface)',
            border: `1px solid ${isFav ? 'var(--primary-border)' : 'var(--border-main)'}`,
            fontSize: '0.88rem',
            fontWeight: '600',
            color: isFav ? 'var(--primary)' : 'var(--text-main)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Heart
            size={16}
            style={{
              color: isFav ? '#E02424' : 'var(--text-muted)',
              fill: isFav ? '#E02424' : 'transparent'
            }}
          />
          <span>{isFav ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>

      {/* Hero Banner Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr',
          gap: '20px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '36px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
              padding: '30px 28px',
              color: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <span
                style={{
                  background: 'var(--primary)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}
              >
                {restaurant.cuisine}
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                {restaurant.cityName}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: '6px' }}>
              {restaurant.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: '600px' }}>
              {restaurant.subtitle}
            </p>
          </div>
        </div>

        {/* Secondary Dish Highlight Photo */}
        <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
          <img
            src={restaurant.foodImage}
            alt={`${restaurant.name} Cuisine Plating`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '700',
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Star size={16} className="star-icon" />
            <span>{restaurant.rating}</span>
            <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>({restaurant.reviewsCount} reviews)</span>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              background: 'rgba(37, 27, 21, 0.85)',
              color: '#FFFFFF',
              backdropFilter: 'blur(6px)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            Signature Culinary Heritage
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Columns: Detail Story vs Booking Box) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '48px', alignItems: 'start' }}>
        {/* Left Column: Details & Menus */}
        <div>
          {/* Authentic Real Location & Hours Callout */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} style={{ color: 'var(--primary)' }} />
              <span>Authentic Address &amp; Location</span>
            </h3>
            
            <p style={{ fontSize: '1.02rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '12px' }}>
              {restaurant.location}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Operating Hours</span>
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)', marginTop: '4px' }}>
                  {restaurant.hours}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Telephone Inquiries</span>
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)', marginTop: '4px' }}>
                  {restaurant.phone}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Average Dining Cost</span>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>
                  {restaurant.avgCostForTwo}
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant Story */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>About {restaurant.name}</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '16px' }}>
              {restaurant.fullDesc}
            </p>

            {/* Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {restaurant.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-main)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--text-main)'
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Dishes Showcase */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UtensilsCrossed size={22} style={{ color: 'var(--primary)' }} />
              <span>Signature Culinary Highlights</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {restaurant.signatureDishes.map((dish, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px 20px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {dish.name}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {dish.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dining Floor Sections */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={22} style={{ color: 'var(--primary)' }} />
              <span>Seating Ambiance &amp; Zones</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {restaurant.floorSections.map((sec) => (
                <div
                  key={sec.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-main)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '3px' }}>
                      {sec.name}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{sec.desc}</p>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--badge-green)', background: 'var(--badge-green-bg)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                    Available on Floor Plan
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Action Card */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-main)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px 28px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '18px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.06em' }}>
                  Reserve A Table
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--badge-green)', background: 'var(--badge-green-bg)', padding: '3px 8px', borderRadius: 'var(--radius-sm)' }}>
                  Tables Open
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                {restaurant.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Direct table reservation with instant confirmation
              </p>
            </div>

            {/* Guarantees List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--primary)' }} />
                <span>Table deposit 100% adjustable against final bill</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <Award size={18} style={{ color: '#C68A2C' }} />
                <span>Choose table position on interactive floor plan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <Clock size={18} style={{ color: 'var(--primary)' }} />
                <span>Instant reservation voucher with directions</span>
              </div>
            </div>

            {/* Direct Booking Flow CTA */}
            <Link
              to={`/booking/${restaurant.id}`}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', gap: '10px', textDecoration: 'none' }}
            >
              <span>Select Date &amp; Table</span>
              <ArrowRight size={18} />
            </Link>

            <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
              Free cancellation up to 2 hours prior to seating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
