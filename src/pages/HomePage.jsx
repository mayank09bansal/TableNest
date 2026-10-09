import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { RESTAURANTS, CITIES } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { Search, MapPin, Calendar, Clock, Users, Sparkles, Award, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { selectedCity, setSelectedCity } = useBooking();

  const [searchCity, setSearchCity] = useState(selectedCity === 'all' ? 'delhi' : selectedCity);
  const [searchDate, setSearchDate] = useState('Tomorrow');
  const [searchTime, setSearchTime] = useState('8:00 PM');
  const [searchGuests, setSearchGuests] = useState('2 Guests');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    setSelectedCity(searchCity);
    navigate('/restaurants');
  };

  // Filter restaurants by currently selected city if not 'all'
  const displayedRestaurants = selectedCity === 'all'
    ? RESTAURANTS
    : RESTAURANTS.filter(r => r.cityId === selectedCity);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={16} />
              <span>India's Premier Dining Reservation Platform</span>
            </div>

            <h1 className="hero-title">
              Reserve Iconic Tables at India's <span>Finest Kitchens</span>
            </h1>

            <p className="hero-subtitle">
              From Bukhara's legendary 18-hour dal in New Delhi to Karavalli's coastal courtyard in Bengaluru — unlock guaranteed tables at the country's most celebrated culinary destinations.
            </p>

            {/* Quick Reservation Search Bar */}
            <form onSubmit={handleQuickSearch} className="search-bar-card">
              {/* City Selection */}
              <div className="search-field">
                <MapPin size={20} className="search-field-icon" />
                <div className="search-field-content">
                  <label className="search-field-label">City</label>
                  <select
                    className="search-field-input"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    {CITIES.filter(c => c.id !== 'all').map(city => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Selection */}
              <div className="search-field">
                <Calendar size={20} className="search-field-icon" />
                <div className="search-field-content">
                  <label className="search-field-label">Date</label>
                  <select
                    className="search-field-input"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  >
                    <option value="Today">Today (Tonight)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div className="search-field">
                <Clock size={20} className="search-field-icon" />
                <div className="search-field-content">
                  <label className="search-field-label">Time</label>
                  <select
                    className="search-field-input"
                    value={searchTime}
                    onChange={(e) => setSearchTime(e.target.value)}
                  >
                    <option value="12:30 PM">12:30 PM (Lunch)</option>
                    <option value="1:00 PM">1:00 PM (Lunch)</option>
                    <option value="7:30 PM">7:30 PM (Dinner)</option>
                    <option value="8:00 PM">8:00 PM (Dinner)</option>
                    <option value="8:30 PM">8:30 PM (Dinner)</option>
                    <option value="9:00 PM">9:00 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              {/* Guests Selection */}
              <div className="search-field">
                <Users size={20} className="search-field-icon" />
                <div className="search-field-content">
                  <label className="search-field-label">Guests</label>
                  <select
                    className="search-field-input"
                    value={searchGuests}
                    onChange={(e) => setSearchGuests(e.target.value)}
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="4 Guests">4 Guests (Party)</option>
                    <option value="6 Guests">6 Guests (Group)</option>
                    <option value="8+ Guests">8+ Guests (Celebration)</option>
                  </select>
                </div>
              </div>

              {/* Submit Search Button */}
              <button type="submit" className="btn btn-primary" style={{ padding: '14px 28px', borderRadius: 'var(--radius-md)' }}>
                <Search size={18} />
                <span>Find Table</span>
              </button>
            </form>

            {/* City Badges Navigation */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', alignSelf: 'center', fontWeight: '600', marginRight: '6px' }}>
                Quick Browse:
              </span>
              {CITIES.map(city => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setSelectedCity(city.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    background: selectedCity === city.id ? 'var(--primary)' : 'var(--bg-surface)',
                    color: selectedCity === city.id ? '#FFFFFF' : 'var(--text-muted)',
                    border: `1px solid ${selectedCity === city.id ? 'var(--primary)' : 'var(--border-main)'}`,
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Indian Restaurants Section */}
      <section className="container" style={{ paddingBottom: '70px' }}>
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              {selectedCity === 'all' ? 'India\'s Legendary Dining Havens' : `Celebrated Dining in ${CITIES.find(c => c.id === selectedCity)?.name}`}
            </h2>
            <p className="section-subtitle">
              Handpicked culinary institutions with verified real-time table availability.
            </p>
          </div>

          <Link to="/restaurants" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>View All ({RESTAURANTS.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="restaurant-grid">
          {displayedRestaurants.slice(0, 6).map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Curated Dining Experience Banner */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-main)', borderBottom: '1px solid var(--border-main)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '12px' }}>The TableNest Standard</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              We partner directly with India’s most revered restaurateurs to provide guaranteed seating, personalized hospitality, and zero waiting times.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-main)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Guaranteed Table Holds</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Your selected table is locked directly in the restaurant’s reservation book upon booking. No walk-in delays or cancellations.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-main)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', marginBottom: '20px' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Curated Floor Positions</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Choose specific dining zones—from window bay booths and royal diwans to open courtyards beneath ancient tamarind canopies.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-main)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <HeartHandshake size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Bespoke Hospitality</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Notify the chef and maître d' of dietary preferences (Jain, vegetarian, gluten-free) and celebratory occasions in advance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
