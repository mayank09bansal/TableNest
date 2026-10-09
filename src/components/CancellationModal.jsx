import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  Wallet,
  Receipt
} from 'lucide-react';

export const CancellationModal = ({ booking, isOpen, onClose, onConfirmCancel }) => {
  if (!isOpen || !booking) return null;

  const totalPaid = booking.totalAmount || 1100;
  const cancellationFee = 350; // Fixed restaurant table-holding cancellation fee
  const gstFee = booking.gstAmount || (booking.depositAmount ? Math.round(booking.depositAmount * 0.05) : 75);
  const totalDeductions = cancellationFee + gstFee;
  const netRefund = Math.max(0, totalPaid - totalDeductions);

  const [reason, setReason] = useState('Change of personal dining plans');
  const [refundDestination, setRefundDestination] = useState('original');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmCancel(booking.id, {
        reason,
        refundDestination,
        paidAmount: totalPaid,
        cancellationFee,
        gstFee,
        totalDeductions,
        netRefund
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(37, 27, 21, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="fade-in"
        style={{
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-main)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '540px',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '22px 26px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FDE8E8',
                color: '#E02424',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                Cancel Table Reservation
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {booking.restaurantName} · Ref: {booking.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 26px' }}>
          {/* Booking Summary Pill */}
          <div
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.86rem'
            }}
          >
            <div>
              <strong style={{ display: 'block', color: 'var(--text-main)' }}>
                {booking.tableNumber || booking.tableLabel} ({booking.guests} Guests)
              </strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                {booking.date} at {booking.time}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '700' }}>
                Deposit Paid
              </span>
              <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '1rem' }}>
                ₹{totalPaid}
              </div>
            </div>
          </div>

          {/* Cancellation Fee & GST Deduction Breakdown */}
          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.04em' }}>
              <Receipt size={14} />
              <span>Cancellation Refund Settlement</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Initial Amount Paid:</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{totalPaid}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px', color: '#C81E1E' }}>
              <span>Less: Fixed Cancellation Fee:</span>
              <span style={{ fontWeight: '700' }}>- ₹{cancellationFee}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '10px', color: '#C81E1E' }}>
              <span>Less: Non-Refundable GST:</span>
              <span style={{ fontWeight: '700' }}>- ₹{gstFee}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '8px',
                borderTop: '1px dashed var(--border-main)',
                fontSize: '0.98rem',
                fontWeight: '800'
              }}
            >
              <span style={{ color: 'var(--text-main)' }}>Remaining Amount Refunded:</span>
              <span style={{ color: 'var(--badge-green)', fontSize: '1.2rem' }}>₹{netRefund}</span>
            </div>

            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
              ℹ️ A fixed fee of <strong>₹{cancellationFee}</strong> and GST of <strong>₹{gstFee}</strong> (Total deductions: ₹{totalDeductions}) are deducted. The remaining amount of <strong>₹{netRefund}</strong> will be refunded to you.
            </div>
          </div>

          {/* Cancellation Reason Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ fontSize: '0.84rem' }}>
              Reason for Cancellation
            </label>
            <select
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ fontSize: '0.88rem', padding: '10px 14px' }}
            >
              <option value="Change of personal dining plans">Change of personal dining plans</option>
              <option value="Scheduling or travel conflict">Scheduling or travel conflict</option>
              <option value="Party size changed">Party size changed</option>
              <option value="Looking to try a different restaurant">Looking to try a different restaurant</option>
              <option value="Personal emergency">Personal emergency</option>
            </select>
          </div>

          {/* Refund Destination Selector */}
          <div style={{ marginBottom: '22px' }}>
            <label className="form-label" style={{ fontSize: '0.84rem' }}>
              Where would you like the remaining refund (₹{netRefund}) credited?
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Option A: Original Payment Method (Default) */}
              <div
                onClick={() => setRefundDestination('original')}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${refundDestination === 'original' ? 'var(--primary)' : 'var(--border-main)'}`,
                  background: refundDestination === 'original' ? 'var(--primary-light)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: refundDestination === 'original' ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: refundDestination === 'original' ? '#FFFFFF' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      Original Payment Method ({booking.paymentMethod || 'UPI / Bank Card'})
                    </strong>
                    <span style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '0.95rem' }}>
                      ₹{netRefund}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Refunded directly to original UPI / Bank account
                  </span>
                </div>
              </div>

              {/* Option B: TableNest Dining Wallet */}
              <div
                onClick={() => setRefundDestination('wallet')}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${refundDestination === 'wallet' ? 'var(--primary)' : 'var(--border-main)'}`,
                  background: refundDestination === 'wallet' ? 'var(--primary-light)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: refundDestination === 'wallet' ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: refundDestination === 'wallet' ? '#FFFFFF' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Wallet size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      TableNest Dining Wallet (Instant 1:1 Refund)
                    </strong>
                    <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.95rem' }}>
                      ₹{netRefund}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Exact refund credited instantly to re-book any table across India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
              style={{ padding: '10px 18px' }}
            >
              Keep Reservation
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
              style={{
                padding: '10px 20px',
                background: '#C81E1E',
                borderColor: '#C81E1E',
                gap: '8px'
              }}
            >
              {isSubmitting ? (
                <span>Processing Refund...</span>
              ) : (
                <>
                  <span>Confirm &amp; Refund ₹{netRefund}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
