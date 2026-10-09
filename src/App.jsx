import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

export function App() {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {/* Header rendered globally (clean luxury brand header, no prototype strip) */}
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Unified Single Footer (Never repeated across screens) */}
      {!isAuthPage && <Footer />}

      {/* Global Toast Notifications */}
      <Toast />
    </>
  );
}

export default App;
