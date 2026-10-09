import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useBooking();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
