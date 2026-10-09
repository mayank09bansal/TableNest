import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RESTAURANTS, DEFAULT_FLOOR_TABLES, TIME_SLOTS } from '../data/restaurants';
import { useBooking } from '../context/BookingContext';
import { FloorPlan } from '../components/FloorPlan';
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Utensils,
  CreditCard,
  Smartphone,
  Building,
  Lock,
  Receipt,
  Info,
  Layers
} from 'lucide-react';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, bookings, createBooking } = useBooking();

  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];

  // Booking Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [dateType, setDateType] = useState('Tomorrow');
  const [customDate, setCustomDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('7:30 PM');

  // Multi-table selection state (Array of tables)
  const [selectedTables, setSelectedTables] = useState([DEFAULT_FLOOR_TABLES[1]]); // Default Table 2

  // Guest Details State
  const [guestName, setGuestName] = useState(user.fullName || 'Eleanor Vance');
  const [guestPhone, setGuestPhone] = useState(user.phone || '+91 98112 45901');
  const [guestEmail, setGuestEmail] = useState(user.email || 'eleanor.vance@tablenest.com');
  const [occasion, setOccasion] = useState('Dinner Celebration');
  const [specialRequests, setSpecialRequests] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian Friendly');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('eleanor.vance@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8920 1234 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const formattedDate = dateType === 'Tomorrow' ? 'Tomorrow' : dateType === 'Today' ? 'Today (Tonight)' : customDate;

  // Genuinely booked tables: Check ONLY against active confirmed bookings for this restaurant, date, and time!
  const reservedTableIds = useMemo(() => {
    return bookings
      .filter(b => {
        if (b.status !== 'Confirmed') return false;
        if (b.restaurantId !== restaurant.id) return false;
        // Compare date
        const dateMatch =
          b.date === formattedDate ||
          (dateType === 'Tomorrow' && String(b.date).includes('Tomorrow')) ||
          (dateType === 'Today' && String(b.date).includes('Today')) ||
          (b.rawDate && b.rawDate === customDate);
        const timeMatch = b.time === selectedTime;
        return dateMatch && timeMatch;
      })
      .flatMap(b => {
        if (Array.isArray(b.tableIds) && b.tableIds.length > 0) return b.tableIds;
        if (b.tableId) return [b.tableId];
        return [];
      });
  }, [bookings, restaurant.id, formattedDate, dateType, customDate, selectedTime]);

  // Multiple Table Selection Toggle Handler
  const handleToggleTable = (table) => {
    setSelectedTables(prev => {
      const exists = prev.some(t => t.id === table.id);
      if (exists) {
        if (prev.length === 1) {
          // Keep at least one table selected
          return prev;
        }
        return prev.filter(t => t.id !== table.id);
      } else {
        return [...prev, table];
      }
    });
  };

  // Pricing calculations based on all selected tables combined
  const totalTableDeposit = selectedTables.reduce((sum, t) => sum + (t.price || 500), 0);
  const totalCapacity = selectedTables.reduce((sum, t) => sum + t.capacity, 0);
  const gstAmount = Math.round(totalTableDeposit * 0.05);
  const convenienceFee = 50;
  const totalAmount = totalTableDeposit + gstAmount + convenienceFee;

  const handleNextStep = (e) => {
    e?.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant frontend payment processing
    setTimeout(() => {
      const newBooking = createBooking({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        cuisine: restaurant.cuisine,
        location: restaurant.location,
        shortLocation: restaurant.shortLocation,
        image: restaurant.image,
        date: formattedDate,
        rawDate: customDate,
        time: selectedTime,
        guests,
        tableId: selectedTables[0].id,
        tableIds: selectedTables.map(t => t.id),
        tableNumber: selectedTables.map(t => t.number).join(', '),
        tableLabel: selectedTables.map(t => `${t.number} (${t.label})`).join(', '),
        tableSection: Array.from(new Set(selectedTables.map(t => t.section))).join(' & '),
        totalCapacity,
        depositAmount: totalTableDeposit,
        gstAmount,
        convenienceFee,
        totalAmount,
        guestName,
        guestPhone,
        guestEmail,
        occasion,
        dietaryPreference,
        specialRequests,
        paymentMethod:
          paymentMethod === 'upi'
            ? `UPI (${upiId})`
            : paymentMethod === 'card'
            ? 'Credit Card (Visa •••• 4242)'
            : `Net Banking (${selectedBank})`,
        paymentStatus: 'Paid'
      });

      navigate(`/confirmation/${newBooking.id}`);
    }, 750);
  };

  return (
    <div className="container fade-in" style={{ padding: '36px 24px 80px' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          to={`/restaurant/${restaurant.id}`}
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
          <span>Back to {restaurant.name}</span>
        </Link>
      </div>

      {/* Booking Header */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.08em' }}>
          Table Reservation Experience
        </span>
        <h1 style={{ fontSize: '2.4rem', marginTop: '6px', marginBottom: '8px' }}>
          Reserve at {restaurant.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {restaurant.shortLocation} · {restaurant.cuisine}
        </p>
      </div>

      {/* Progress Step Bubbles */}
      <div className="steps-nav">
        <div className="step-item">
          <div className={`step-bubble ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
            {currentStep > 1 ? '✓' : '1'}
          </div>
          <span className={`step-title ${currentStep === 1 ? 'active' : ''}`}>Party &amp; Time</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item">
          <div className={`step-bubble ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
            {currentStep > 2 ? '✓' : '2'}
          </div>
          <span className={`step-title ${currentStep === 2 ? 'active' : ''}`}>Floor Plan</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item">
          <div className={`step-bubble ${currentStep === 3 ? 'active' : ''}`}>
            3
          </div>
          <span className={`step-title ${currentStep === 3 ? 'active' : ''}`}>Guest Details &amp; Payment</span>
        </div>
      </div>

      {/* Main Grid: Wizard Form on Left vs Live Summary on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '36px', alignItems: 'start' }}>
        {/* Left Form Content */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-xl)', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
          {/* STEP 1: PARTY SIZE, DATE & TIME */}
          {currentStep === 1 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>1. Party Size &amp; Seating Time</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Select how many guests and when you wish to dine.
              </p>

              {/* Guest Count Selection */}
              <div style={{ marginBottom: '28px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} style={{ color: 'var(--primary)' }} />
                  <span>Number of Guests</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      style={{
                        width: '52px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        background: guests === num ? 'var(--primary)' : 'var(--input-bg)',
                        color: guests === num ? '#FFFFFF' : 'var(--text-main)',
                        border: `1.5px solid ${guests === num ? 'var(--primary)' : 'var(--border-main)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div style={{ marginBottom: '28px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} style={{ color: 'var(--primary)' }} />
                  <span>Reservation Date</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  {['Today', 'Tomorrow', 'This Weekend', 'Custom'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDateType(option)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        background: dateType === option ? 'var(--primary)' : 'var(--input-bg)',
                        color: dateType === option ? '#FFFFFF' : 'var(--text-main)',
                        border: `1.5px solid ${dateType === option ? 'var(--primary)' : 'var(--border-main)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      {option === 'Today' ? 'Today (Tonight)' : option}
                    </button>
                  ))}
                </div>

                {dateType === 'Custom' && (
                  <input
                    type="date"
                    className="form-input"
                    value={customDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCustomDate(e.target.value)}
                    style={{ maxWidth: '240px' }}
                  />
                )}
              </div>

              {/* Time Slots Selection */}
              <div style={{ marginBottom: '32px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} style={{ color: 'var(--primary)' }} />
                  <span>Available Seating Slots</span>
                </label>

                {/* Lunch & Dinner Groups */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                    Lunch Slots
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {TIME_SLOTS.filter(s => s.period === 'Lunch').map(slot => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        style={{
                          padding: '9px 16px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.88rem',
                          fontWeight: '600',
                          background: selectedTime === slot.time ? 'var(--primary)' : 'var(--input-bg)',
                          color: selectedTime === slot.time ? '#FFFFFF' : 'var(--text-main)',
                          border: `1.5px solid ${selectedTime === slot.time ? 'var(--primary)' : 'var(--border-main)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                    Dinner Slots
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {TIME_SLOTS.filter(s => s.period === 'Dinner').map(slot => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        style={{
                          padding: '9px 16px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.88rem',
                          fontWeight: '600',
                          background: selectedTime === slot.time ? 'var(--primary)' : 'var(--input-bg)',
                          color: selectedTime === slot.time ? '#FFFFFF' : 'var(--text-main)',
                          border: `1.5px solid ${selectedTime === slot.time ? 'var(--primary)' : 'var(--border-main)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {slot.time}
                        {slot.popular && <span style={{ marginLeft: '4px', fontSize: '0.72rem', opacity: 0.8 }}>★</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue to Step 2 */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  style={{ gap: '8px' }}
                >
                  <span>Select Tables on Floor Plan</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE FLOOR PLAN (MULTI-TABLE SELECTION) */}
          {currentStep === 2 && (
            <div className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>2. Visual Floor Plan</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Select one or more tables. Only genuinely booked tables for <strong>{formattedDate} at {selectedTime}</strong> are disabled.
                  </p>
                </div>
              </div>

              {/* Interactive Floor Plan Component */}
              <FloorPlan
                tables={DEFAULT_FLOOR_TABLES}
                selectedTableIds={selectedTables.map(t => t.id)}
                onToggleTable={handleToggleTable}
                reservedTableIds={reservedTableIds}
                guestCount={guests}
                restaurantName={restaurant.name}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn btn-secondary"
                  style={{ gap: '6px' }}
                >
                  <ChevronLeft size={16} />
                  <span>Back to Date &amp; Time</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  style={{ gap: '8px' }}
                >
                  <span>Continue to Guest Details &amp; Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST INFORMATION & PAYMENT */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="fade-in">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>3. Guest Details &amp; Payment</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
                Review selected tables ({selectedTables.map(t => t.number).join(', ')}) and complete payment.
              </p>

              {/* Guest Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Guest Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Mobile Number (+91)</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (For Booking Receipt)</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dining Occasion</label>
                  <select
                    className="form-select"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                  >
                    <option value="Dinner Celebration">Celebratory Dinner</option>
                    <option value="Romantic Date">Romantic Date Night</option>
                    <option value="Anniversary Dinner">Anniversary Celebration</option>
                    <option value="Birthday Dinner">Birthday Gathering</option>
                    <option value="Business Entertaining">Business Dinner</option>
                    <option value="Casual Gathering">Casual Dining</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dietary Preference</label>
                  <select
                    className="form-select"
                    value={dietaryPreference}
                    onChange={(e) => setDietaryPreference(e.target.value)}
                  >
                    <option value="Vegetarian Friendly">Vegetarian Friendly</option>
                    <option value="Pure Jain Food (No Onion/Garlic)">Pure Jain Food (No Onion/Garlic)</option>
                    <option value="Non-Vegetarian Gourmand">Non-Vegetarian Gourmand</option>
                    <option value="Gluten-Free & Allergies">Gluten-Free & Allergies</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Dining Requests (Optional)</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="e.g. Please arrange quiet seating, high chair needed, or complimentary anniversary candle."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                ></textarea>
              </div>

              {/* PAYMENT SECTION */}
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px dashed var(--border-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={20} style={{ color: 'var(--primary)' }} />
                    <span>Select Payment Method</span>
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--badge-green)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Lock size={12} /> 256-Bit Encrypted
                  </span>
                </div>

                {/* Payment Method Selector Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--primary)' : 'var(--border-main)'}`,
                      background: paymentMethod === 'upi' ? 'var(--primary-light)' : 'var(--input-bg)',
                      color: paymentMethod === 'upi' ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: '700',
                      fontSize: '0.86rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Smartphone size={20} />
                    <span>Instant UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border-main)'}`,
                      background: paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--input-bg)',
                      color: paymentMethod === 'card' ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: '700',
                      fontSize: '0.86rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={20} />
                    <span>Cards (Debit/Credit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'netbanking' ? 'var(--primary)' : 'var(--border-main)'}`,
                      background: paymentMethod === 'netbanking' ? 'var(--primary-light)' : 'var(--input-bg)',
                      color: paymentMethod === 'netbanking' ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: '700',
                      fontSize: '0.86rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Building size={20} />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Form fields based on selected method */}
                {paymentMethod === 'upi' && (
                  <div style={{ background: 'var(--input-bg)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border-main)' }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>Enter UPI Virtual Payment Address (VPA)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        className="form-input"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        style={{ background: '#FFFFFF' }}
                      />
                      <span style={{ background: 'var(--badge-green-bg)', color: 'var(--badge-green)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Verified ✓
                      </span>
                    </div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                      Supports Google Pay, PhonePe, Paytm, CRED &amp; BHIM
                    </span>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div style={{ background: 'var(--input-bg)', padding: '18px 20px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border-main)' }}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" style={{ fontSize: '0.82rem' }}>Card Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ background: '#FFFFFF' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          style={{ background: '#FFFFFF' }}
                        />
                      </div>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.82rem' }}>CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          className="form-input"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          style={{ background: '#FFFFFF' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div style={{ background: 'var(--input-bg)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border-main)' }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>Select Bank</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map(bank => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: `1.5px solid ${selectedBank === bank ? 'var(--primary)' : 'var(--border-main)'}`,
                            background: selectedBank === bank ? '#FFFFFF' : 'transparent',
                            color: selectedBank === bank ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 100% Redeemable Note Alert */}
                <div
                  style={{
                    background: 'var(--accent-gold-light)',
                    border: '1px solid #EEDBB2',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '24px'
                  }}
                >
                  <Info size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.85rem', color: '#684511', lineHeight: '1.5' }}>
                    <strong>100% Redeemable on Food Bill:</strong> The combined reservation deposit of <strong>₹{totalTableDeposit}</strong> will be directly credited and deducted from your final food &amp; beverage bill at {restaurant.name}.
                  </div>
                </div>
              </div>

              {/* Navigation & Pay Button Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn btn-secondary"
                  style={{ gap: '6px' }}
                >
                  <ChevronLeft size={16} />
                  <span>Back to Floor Plan</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary btn-lg"
                  style={{ gap: '10px', minWidth: '260px' }}
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Pay ₹{totalAmount} &amp; Reserve {selectedTables.length} {selectedTables.length === 1 ? 'Table' : 'Tables'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Live Booking Summary Sidebar with Price Breakdown */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-main)',
              borderRadius: 'var(--radius-xl)',
              padding: '30px 26px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Reservation Summary
                </span>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginTop: '2px' }}>
                  {restaurant.name}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{restaurant.shortLocation}</span>
              </div>
            </div>

            {/* Live Synchronized Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} style={{ color: 'var(--primary)' }} /> Date:
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{formattedDate}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} style={{ color: 'var(--primary)' }} /> Seating Time:
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{selectedTime}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={15} style={{ color: 'var(--primary)' }} /> Party Size:
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{guests} Guests</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Utensils size={15} style={{ color: 'var(--primary)' }} /> Selected Tables:
                </span>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>
                    {selectedTables.map(t => t.number).join(', ')}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    Total {totalCapacity} Seats
                  </span>
                </div>
              </div>
            </div>

            {/* PRICE BREAKDOWN CARD */}
            <div
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                marginBottom: '18px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.04em' }}>
                <Receipt size={14} />
                <span>Price &amp; Deposit Breakdown</span>
              </div>

              {/* Individual tables line item */}
              {selectedTables.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t.number} ({t.section}):</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{t.price}</span>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-light)', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Combined Table Deposit:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>₹{totalTableDeposit}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dining GST (5%):</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{gstAmount}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Table-Hold Service Fee:</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{convenienceFee}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-main)',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: 'var(--primary)'
                }}
              >
                <span>Total Due Now:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: 'var(--badge-green)',
                background: 'var(--badge-green-bg)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                marginBottom: '14px'
              }}
            >
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              <span>₹{totalTableDeposit} deposit credited on final restaurant bill</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-light)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>Table held exclusively for 15 minutes past reserved time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
