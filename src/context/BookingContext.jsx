import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANTS } from '../data/restaurants';

const BookingContext = createContext();

const INITIAL_BOOKINGS = [
  {
    id: 'TN-84920',
    restaurantId: 'bukhara',
    restaurantName: 'Bukhara',
    cuisine: 'North-West Frontier & Tandoor',
    location: 'ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, Chanakyapuri, New Delhi - 110021',
    date: 'Tomorrow, 8:00 PM',
    rawDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '8:00 PM',
    guests: 4,
    tableId: 'T5',
    tableNumber: 'Table 5',
    tableLabel: 'Royal Diwan Booth 6P',
    tableSection: 'Royal Diwan',
    depositAmount: 1500,
    gstAmount: 75,
    convenienceFee: 50,
    totalAmount: 1625,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    guestName: 'Eleanor Vance',
    guestPhone: '+91 98112 45901',
    guestEmail: 'eleanor.vance@tablenest.com',
    occasion: 'Anniversary Dinner',
    specialRequests: 'Celebrating wedding anniversary. Quiet table preferred, please arrange flower centerpiece.',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'TN-72104',
    restaurantId: 'indian-accent',
    restaurantName: 'Indian Accent',
    cuisine: 'Modern Indian',
    location: 'The Lodhi, Lodhi Road, CGO Complex, Pragati Vihar, New Delhi - 110003',
    date: 'Last Friday, 7:30 PM',
    rawDate: '2026-10-02',
    time: '7:30 PM',
    guests: 2,
    tableId: 'T2',
    tableNumber: 'Table 2',
    tableLabel: 'Window Bay 4P',
    tableSection: 'Window View',
    depositAmount: 1000,
    gstAmount: 50,
    convenienceFee: 50,
    totalAmount: 1100,
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    guestName: 'Eleanor Vance',
    guestPhone: '+91 98112 45901',
    guestEmail: 'eleanor.vance@tablenest.com',
    occasion: 'Fine Dining Date',
    specialRequests: 'Chef tasting menu paired with sommelier wine selection.',
    status: 'Completed',
    createdAt: '2026-10-01T12:00:00Z'
  }
];

const INITIAL_USER = {
  fullName: 'Eleanor Vance',
  email: 'eleanor.vance@tablenest.com',
  phone: '+91 98112 45901',
  preferredCity: 'delhi',
  preferredCuisine: 'Modern Indian',
  dietaryPreference: 'Vegetarian Friendly',
  avatarInitials: 'EV'
};

export const BookingProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tablenest_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const sanitizeBookings = (list) => {
    return list.map(b => {
      if (b.status === 'Cancelled') {
        const totalPaid = b.totalAmount || b.paidAmount || 1100;
        const cancellationFee = 350; // Fixed restaurant table-holding fee
        const gstFee = b.gstAmount || (b.depositAmount ? Math.round(b.depositAmount * 0.05) : 75);
        const totalDeductions = cancellationFee + gstFee;
        const netRefund = Math.max(0, totalPaid - totalDeductions);
        return {
          ...b,
          paidAmount: totalPaid,
          cancellationFee,
          gstFee,
          totalDeductions,
          netRefund,
          totalCompensationRefund: netRefund,
          refundMode: b.refundMode || (b.paymentMethod ? `Original Payment Method (${b.paymentMethod})` : 'Original Payment Source (UPI / Bank Card)'),
          compensationMode: b.refundMode || (b.paymentMethod ? `Original Payment Method (${b.paymentMethod})` : 'Original Payment Source (UPI / Bank Card)'),
          refundStatus: 'Refund Credited ✓'
        };
      }
      return b;
    });
  };

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('tablenest_bookings');
    if (!saved) return INITIAL_BOOKINGS;
    try {
      const parsed = JSON.parse(saved);
      return sanitizeBookings(parsed);
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tablenest_favorites');
    return saved ? JSON.parse(saved) : ['indian-accent', 'karavalli'];
  });

  const [selectedCity, setSelectedCity] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('tablenest_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tablenest_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tablenest_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const createBooking = (bookingData) => {
    const newId = `TN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      ...bookingData,
      id: newId,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Reservation Confirmed at ${bookingData.restaurantName}! Ref: ${newId}`);
    return newBooking;
  };

  const cancelBooking = (bookingId, cancellationData = {}) => {
    const refundRef = `REF-${Math.floor(10000 + Math.random() * 90000)}`;
    const cancellationFee = 350; // Fixed restaurant table-holding cancellation fee
    let refundCreditedAmount = 0;
    const isWallet = cancellationData.refundDestination === 'wallet';

    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const totalPaid = b.totalAmount || 1100;
        const gstFee = b.gstAmount || (b.depositAmount ? Math.round(b.depositAmount * 0.05) : 75);
        const totalDeductions = cancellationFee + gstFee;
        const netRefund = Math.max(0, totalPaid - totalDeductions);
        refundCreditedAmount = netRefund;

        const refundMode = isWallet
          ? 'TableNest Dining Wallet (Instant 1:1 Refund)'
          : `Original Payment Method (${b.paymentMethod || 'UPI / Bank Card'})`;

        return {
          ...b,
          status: 'Cancelled',
          cancelledAt: new Date().toISOString(),
          cancellationReason: cancellationData.reason || 'Change of personal dining plans',
          refundRef,
          paidAmount: totalPaid,
          cancellationFee,
          gstFee,
          totalDeductions,
          netRefund,
          totalCompensationRefund: netRefund,
          refundMode,
          compensationMode: refundMode,
          refundStatus: 'Refund Credited ✓'
        };
      })
    );

    if (isWallet && refundCreditedAmount > 0) {
      setUser(prev => ({
        ...prev,
        diningWalletBalance: (prev.diningWalletBalance || 0) + refundCreditedAmount
      }));
      showToast(`Reservation cancelled. Net ₹${refundCreditedAmount} refunded to your TableNest Wallet (₹${cancellationFee} fixed fee + GST deducted).`);
    } else {
      showToast(`Reservation cancelled. Net refund of ₹${refundCreditedAmount} initiated to your original payment method (₹${cancellationFee} fixed fee + GST deducted).`);
    }
  };

  const toggleFavorite = (restId) => {
    setFavorites(prev => {
      const exists = prev.includes(restId);
      const next = exists ? prev.filter(id => id !== restId) : [...prev, restId];
      showToast(exists ? 'Removed from saved favorites' : 'Added to saved favorites');
      return next;
    });
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const next = { ...prev, ...updatedFields };
      if (updatedFields.fullName) {
        const parts = updatedFields.fullName.trim().split(' ');
        next.avatarInitials = parts.length > 1
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : (parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'TN');
      }
      return next;
    });
    showToast('Profile and preferences updated successfully.');
  };

  return (
    <BookingContext.Provider
      value={{
        user,
        updateUser,
        bookings,
        createBooking,
        cancelBooking,
        favorites,
        toggleFavorite,
        selectedCity,
        setSelectedCity,
        showToast,
        toastMessage
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
