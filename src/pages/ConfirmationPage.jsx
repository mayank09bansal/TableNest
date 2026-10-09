import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CancellationModal } from '../components/CancellationModal';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Utensils,
  Share2,
  Phone,
  ArrowRight,
  XCircle,
  FileText,
  Gift,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, cancelBooking, showToast } = useBooking();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const booking = bookings.find(b => b.id === bookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Reservation not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const isCancelled = booking.status === 'Cancelled';

  return (
    <div className="container fade-in" style={{ padding: '40px 24px 80px', maxWidth: '780px' }}>
      {/* Success Badge & Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: isCancelled ? '#FDE8E8' : 'var(--badge-green-bg)',
            color: isCancelled ? '#E02424' : 'var(--badge-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {isCancelled ? <XCircle size={38} /> : <CheckCircle2 size={38} />}
        </div>

        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: isCancelled ? '#E02424' : 'var(--badge-green)',
            letterSpacing: '0.08em',
            background: isCancelled ? '#FDE8E8' : 'var(--badge-green-bg)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {isCancelled ? 'Reservation Cancelled with Compensation' : 'Reservation Confirmed & Table Held'}
        </span>

        <h1 style={{ fontSize: '2.4rem', marginTop: '12px', marginBottom: '8px' }}>
          {isCancelled ? 'Reservation Cancelled & Refunded' : 'Your Table is Reserved!'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Booking Reference Code: <strong style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '0.05em' }}>{booking.id}</strong>
        </p>
      </div>

      {/* Luxury Confirmation Card / Receipt */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-main)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '32px'
        }}
      >
        {/* Restaurant Header Strip */}
        <div
          style={{
            padding: '24px 30px',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>
              {booking.cuisine}
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)' }}>
              {booking.restaurantName}
            </h2>
          </div>

          <div
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: isCancelled ? '#FDE8E8' : 'var(--badge-green-bg)',
              color: isCancelled ? '#E02424' : 'var(--badge-green)',
              fontSize: '0.85rem',
              fontWeight: '700'
            }}
          >
            {isCancelled ? '✕ Cancelled & Refunded' : '✓ Confirmed'}
          </div>
        </div>

        {/* Detailed Reservation Grid */}
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Date &amp; Time
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                <Calendar size={16} style={{ color: 'var(--primary)' }} />
                <span>{booking.date} at {booking.time}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Party &amp; Seating
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                <Users size={16} style={{ color: 'var(--primary)' }} />
                <span>{booking.guests} Guests ({booking.tableNumber || booking.tableLabel || 'Table T2'})</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Floor Position
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>
                <Utensils size={16} />
                <span>{booking.tableSection || 'Window View'}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Guest Name
              </span>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                {booking.guestName}
              </div>
            </div>
          </div>

          {/* Actual Address & Contact */}
          <div
            style={{
              padding: '16px 20px',
              background: 'var(--input-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-main)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                  Authentic Location:
                </strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {booking.location}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIVE: Payment & Deposit Receipt Block */}
          {!isCancelled && (
            <div
              style={{
                padding: '18px 20px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-main)',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  <span>Payment &amp; Deposit Receipt</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', background: 'var(--badge-green-bg)', color: 'var(--badge-green)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                  Paid &amp; Confirmed ✓
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: '700' }}>Amount Paid</span>
                  <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.15rem', marginTop: '2px' }}>
                    ₹{booking.totalAmount || 1100}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: '700' }}>Payment Mode</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', marginTop: '2px' }}>
                    {booking.paymentMethod || 'UPI (Google Pay)'}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: '700' }}>Table Deposit</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', marginTop: '2px' }}>
                    ₹{booking.depositAmount || 1000} (Bill credit)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem', color: '#684511', background: 'var(--accent-gold-light)', padding: '8px 12px', borderRadius: '6px' }}>
                ℹ️ <strong>Bill Adjustment:</strong> The reservation deposit of ₹{booking.depositAmount || 1000} will be automatically deducted from your final dining bill at {booking.restaurantName}.
              </div>
            </div>
          )}

          {/* CANCELLED: Compensation & Refund Voucher Block */}
          {isCancelled && (
            <div
              style={{
                padding: '20px 22px',
                background: '#FFF8F6',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid #F5C6BA',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '700', color: '#A33F17' }}>
                  <Gift size={18} />
                  <span>Compensation &amp; Refund Settlement</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'var(--badge-green-bg)', color: 'var(--badge-green)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                  {booking.refundStatus || 'Refund Credited ✓'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', fontSize: '0.88rem', marginBottom: '14px' }}>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Refund Reference</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.95rem', marginTop: '2px' }}>
                    {booking.refundRef || 'REF-83219'}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Deposit Paid</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem', marginTop: '2px' }}>
                    ₹{booking.paidAmount || booking.totalAmount || 1100}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#C81E1E', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Cancellation Fee</span>
                  <div style={{ fontWeight: '700', color: '#C81E1E', fontSize: '0.95rem', marginTop: '2px' }}>
                    - ₹{booking.cancellationFee || 350}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--badge-green)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800' }}>Net Refund</span>
                  <div style={{ fontWeight: '800', color: 'var(--badge-green)', fontSize: '1.2rem', marginTop: '2px' }}>
                    ₹{booking.netRefund || booking.totalCompensationRefund || 750}
                  </div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '6px', border: '1px solid #F2DDD8', fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                <div><strong>Reason:</strong> "{booking.cancellationReason || 'Change of personal dining plans'}"</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  A fixed table-holding charge of <strong>₹{booking.cancellationFee || 350}</strong> was retained by {booking.restaurantName}. The remaining <strong>₹{booking.netRefund || 750}</strong> was credited to your {booking.compensationMode || 'Dining Wallet'}.
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Notice */}
          <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', textAlign: 'center' }}>
            {isCancelled
              ? 'Your table hold was released. You can use your compensation credits to book any table across India anytime.'
              : 'TableNest Concierge verified. Free cancellation with compensation refund available prior to seating.'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
        <Link to="/my-bookings" className="btn btn-primary" style={{ gap: '8px' }}>
          <span>View in My Reservations</span>
          <ArrowRight size={16} />
        </Link>

        {!isCancelled ? (
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="btn btn-outline"
            style={{ gap: '8px', color: '#C81E1E', borderColor: '#E02424' }}
          >
            <XCircle size={16} />
            <span>Cancel Reservation</span>
          </button>
        ) : (
          <Link
            to="/restaurants"
            className="btn btn-secondary"
            style={{ gap: '6px' }}
          >
            <RotateCcw size={16} />
            <span>Book Another Table with Credits</span>
          </Link>
        )}

        <Link to="/restaurants" className="btn btn-secondary">
          Explore Other Restaurants
        </Link>
      </div>

      {/* Cancellation & Compensation Modal */}
      <CancellationModal
        booking={booking}
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmCancel={cancelBooking}
      />
    </div>
  );
};
