import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Star, MapPin, Heart, Clock, ArrowRight } from 'lucide-react';

export const RestaurantCard = ({ restaurant }) => {
  const { favorites, toggleFavorite } = useBooking();
  const navigate = useNavigate();
  const isFav = favorites.includes(restaurant.id);

  return (
    <div className="restaurant-card">
      {/* Image & Badges */}
      <div className="card-img-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-img"
          loading="lazy"
        />
        
        {/* Cuisine Tag Top Left */}
        <div className="card-badge-top">
          <span>{restaurant.cuisine}</span>
        </div>

        {/* Favorite Button Top Right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: 'none',
            cursor: 'pointer'
          }}
          title={isFav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            size={18}
            style={{
              color: isFav ? '#E02424' : '#55483F',
              fill: isFav ? '#E02424' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          />
        </button>

        {/* Rating Badge Bottom Right */}
        <div className="card-rating-badge">
          <Star size={14} className="star-icon" />
          <span>{restaurant.rating}</span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: '500' }}>
            ({restaurant.reviewsCount})
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-header-row">
          <Link to={`/restaurant/${restaurant.id}`}>
            <h3 className="card-title">{restaurant.name}</h3>
          </Link>
          <span className="card-price">{restaurant.priceRange}</span>
        </div>

        {/* Real Address */}
        <div className="card-location">
          <MapPin size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{restaurant.shortLocation}</span>
        </div>

        {/* Description */}
        <p className="card-desc">{restaurant.shortDesc}</p>

        {/* Feature Tags */}
        <div className="card-tags">
          {restaurant.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-chip">{tag}</span>
          ))}
        </div>

        {/* Card Footer: Cost & Reserve Action */}
        <div className="card-footer">
          <div>
            <div className="cost-label">Average Dining</div>
            <div className="cost-value">{restaurant.avgCostForTwo}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="btn btn-secondary btn-sm"
              title="View details and menu"
            >
              Details
            </Link>
            <Link
              to={`/booking/${restaurant.id}`}
              className="btn btn-primary btn-sm"
              title="Book table now"
            >
              <span>Reserve</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
