import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { RESTAURANTS, CITIES, CUISINES } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export const RestaurantsPage = () => {
  const { selectedCity, setSelectedCity } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(item => {
      // City Filter
      if (selectedCity !== 'all' && item.cityId !== selectedCity) {
        return false;
      }
      // Cuisine Filter
      if (selectedCuisine !== 'All Cuisines' && item.cuisine !== selectedCuisine) {
        return false;
      }
      // Price Filter
      if (selectedPrice !== 'all' && item.priceRange !== selectedPrice) {
        return false;
      }
      // Search Term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesCuisine = item.cuisine.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        const matchesDishes = item.signatureDishes.some(d => d.name.toLowerCase().includes(query));
        return matchesName || matchesLocation || matchesCuisine || matchesTags || matchesDishes;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'priceAsc') return a.priceRange.length - b.priceRange.length;
      if (sortBy === 'priceDesc') return b.priceRange.length - a.priceRange.length;
      return 0;
    });
  }, [selectedCity, selectedCuisine, selectedPrice, searchTerm, sortBy]);

  const resetFilters = () => {
    setSelectedCity('all');
    setSelectedCuisine('All Cuisines');
    setSelectedPrice('all');
    setSearchTerm('');
  };

  return (
    <div className="container fade-in" style={{ padding: '40px 24px 80px' }}>
      {/* Title & Introduction */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
          Explore India’s Iconic Restaurants
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Discover celebrated Indian fine dining institutions, heritage dhabas, and modern culinary temples.
        </p>
      </div>

      {/* Search & Main Filter Controls Card */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-main)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          {/* Live Search Input */}
          <div
            style={{
              flex: '2 1 300px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--input-bg)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 16px'
            }}
          >
            <Search size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by restaurant name, dish (e.g. Dal Bukhara), chef or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-main)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>Price:</span>
            {['all', '₹₹', '₹₹₹', '₹₹₹₹'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPrice(p)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  background: selectedPrice === p ? 'var(--primary)' : 'var(--input-bg)',
                  color: selectedPrice === p ? '#FFFFFF' : 'var(--text-main)',
                  border: `1px solid ${selectedPrice === p ? 'var(--primary)' : 'var(--border-main)'}`
                }}
              >
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px',
                background: 'var(--input-bg)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                color: 'var(--text-main)',
                fontWeight: '600',
                outline: 'none'
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Popular</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* City Filter Pills */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.04em' }}>
              Cities:
            </span>
            {CITIES.map(city => (
              <button
                key={city.id}
                type="button"
                onClick={() => setSelectedCity(city.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  background: selectedCity === city.id ? 'var(--primary-light)' : 'transparent',
                  color: selectedCity === city.id ? 'var(--primary)' : 'var(--text-muted)',
                  border: `1px solid ${selectedCity === city.id ? 'var(--primary-border)' : 'var(--border-main)'}`
                }}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Filter Pills */}
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.04em' }}>
              Cuisines:
            </span>
            {CUISINES.map(cuisine => (
              <button
                key={cuisine}
                type="button"
                onClick={() => setSelectedCuisine(cuisine)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  background: selectedCuisine === cuisine ? 'var(--text-main)' : 'var(--bg-subtle)',
                  color: selectedCuisine === cuisine ? '#FFFFFF' : 'var(--text-muted)',
                  border: '1px solid var(--border-light)'
                }}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Count and Status Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
          Showing <strong>{filteredRestaurants.length}</strong> {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
          {selectedCity !== 'all' && ` in ${CITIES.find(c => c.id === selectedCity)?.name}`}
          {selectedCuisine !== 'All Cuisines' && ` · ${selectedCuisine}`}
        </p>

        {(selectedCity !== 'all' || selectedCuisine !== 'All Cuisines' || selectedPrice !== 'all' || searchTerm) && (
          <button
            type="button"
            onClick={resetFilters}
            style={{
              fontSize: '0.85rem',
              color: 'var(--primary)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <X size={14} /> Clear all filters
          </button>
        )}
      </div>

      {/* Restaurants Grid or Empty State */}
      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-main)'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🍽️</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No dining tables found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 24px' }}>
            We couldn't find any restaurants matching your current search parameters. Try clearing some filters.
          </p>
          <button type="button" onClick={resetFilters} className="btn btn-primary btn-sm">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
