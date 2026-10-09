import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CancellationModal } from '../components/CancellationModal';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Utensils,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Gift
} from 'lucide-react';

export const MyBookingsPage = () => {
  const { bookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCancelBooking, setSelectedCancelBooking] = useState(null);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status === 'Completed');
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');

  const currentList =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'past'
      ? pastBookings
      : cancelledBookings;

  return (
    <div className="container fade-in" style={{ padding: '40px 24px 80px', maxWidth: '880px' }}>
      {/* Title & Introduction */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>My Dining Reservations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Manage your upcoming confirmed tables, claim compensation on cancellations, and review your dining history.
        </p>
      </div>

      {/* Tabs Row */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid var(--border-main)',
          paddingBottom: '16px',
          marginBottom: '32px'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.92rem',
            fontWeight: '700',
            background: activeTab === 'upcoming' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activeTab === 'upcoming' ? '#FFFFFF' : 'var(--text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <span>Upcoming</span>
          <span style={{ fontSize: '0.78rem', background: activeTab === 'upcoming' ? 'rgba(255,255,255,0.25)' : 'var(--border-main)', padding: '2px 8px', borderRadius: '999px' }}>
            {upcomingBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.92rem',
            fontWeight: '700',
            background: activeTab === 'past' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activeTab === 'past' ? '#FFFFFF' : 'var(--text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <span>Past History</span>
          <span style={{ fontSize: '0.78rem', background: activeTab === 'past' ? 'rgba(255,255,255,0.25)' : 'var(--border-main)', padding: '2px 8px', borderRadius: '999px' }}>
            {pastBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cancelled')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.92rem',
            fontWeight: '700',
            background: activeTab === 'cancelled' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activeTab === 'cancelled' ? '#FFFFFF' : 'var(--text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <span>Cancelled ({cancelledBookings.length})</span>
        </button>
      </div>

      {/* Bookings List */}
      {currentList.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {currentList.map(item => (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>
                      {item.cuisine}
                    </span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>· Ref: {item.id}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--text-main)' }}>
                    {item.restaurantName}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <MapPin size={14} style={{ color: 'var(--primary)' }} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    background:
                      item.status === 'Confirmed'
                        ? 'var(--badge-green-bg)'
                        : item.status === 'Completed'
                        ? 'var(--bg-subtle)'
                        : '#FDE8E8',
                    color:
                      item.status === 'Confirmed'
                        ? 'var(--badge-green)'
                        : item.status === 'Completed'
                        ? 'var(--text-main)'
                        : '#E02424'
                  }}
                >
                  {item.status === 'Cancelled' ? '✕ Cancelled & Refunded' : item.status}
                </span>
              </div>

              {/* Booking Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '16px',
                  padding: '16px 20px',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Date &amp; Time</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                    {item.date} · {item.time}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Party Size</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                    {item.guests} Guests
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Table Position</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', marginTop: '2px' }}>
                    {item.tableNumber || item.tableLabel || 'Table T2'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>Deposit Paid</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: '800', color: item.status === 'Cancelled' ? 'var(--text-muted)' : 'var(--badge-green)', marginTop: '2px' }}>
                    ₹{item.totalAmount || 1100} {item.status === 'Cancelled' ? '(Refunded)' : '(On Bill)'}
                  </div>
                </div>
              </div>

              {/* Cancelled Compensation Details Callout */}
              {item.status === 'Cancelled' && (
                <div
                  style={{
                    background: '#FFF8F6',
                    padding: '14px 18px',
                    borderRadius: '8px',
                    border: '1.5px solid #F5C6BA',
                    fontSize: '0.86rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A33F17', fontWeight: '700' }}>
                      <Gift size={16} />
                      <span>Net Refund: ₹{item.netRefund || item.totalCompensationRefund || 750}</span>
                      <span style={{ fontSize: '0.75rem', color: '#C81E1E', fontWeight: '600' }}>(₹{item.cancellationFee || 350} restaurant fee deducted)</span>
                    </div>
                    <span style={{ fontSize: '0.76rem', background: 'var(--badge-green-bg)', color: 'var(--badge-green)', padding: '2px 8px', borderRadius: '999px', fontWeight: '800' }}>
                      {item.refundStatus || 'Refunded ✓'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Mode: <strong>{item.compensationMode || 'TableNest Dining Credit (Instant Wallet)'}</strong> · Reason: "{item.cancellationReason || 'Change of personal dining plans'}"
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <Link
                  to={`/confirmation/${item.id}`}
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{item.status === 'Cancelled' ? 'View Refund Voucher' : 'View Voucher & Directions'}</span>
                  <ArrowRight size={14} />
                </Link>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {item.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCancelBooking(item)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#E02424', borderColor: '#E02424' }}
                    >
                      Cancel Reservation
                    </button>
                  )}

                  <Link
                    to={`/booking/${item.restaurantId}`}
                    className="btn btn-secondary btn-sm"
                  >
                    {item.status === 'Cancelled' ? 'Re-Book Table' : 'Book Again'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '70px 20px',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-main)'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🍽️</div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>
            No {activeTab} dining reservations
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
            {activeTab === 'upcoming'
              ? 'You do not have any active table reservations right now. Ready to explore India\'s best restaurants?'
              : 'No records found in this category.'}
          </p>
          <Link to="/restaurants" className="btn btn-primary btn-sm">
            Discover Restaurants
          </Link>
        </div>
      )}

      {/* Cancellation & Compensation Modal */}
      <CancellationModal
        booking={selectedCancelBooking}
        isOpen={Boolean(selectedCancelBooking)}
        onClose={() => setSelectedCancelBooking(null)}
        onConfirmCancel={cancelBooking}
      />
    </div>
  );
};
