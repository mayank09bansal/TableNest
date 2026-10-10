import React, { createContext, useContext, useMemo, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatDate, getTables, hashPassword, localDateISO, passwordSalt, readStorage, restaurants, storageKeys, writeStorage } from './data.js';

const BookingContext = createContext(null);
const cities = ['All cities', ...new Set(restaurants.map((restaurant) => restaurant.city))];

function BookingProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(storageKeys.users, []));
  const [user, setUser] = useState(() => readStorage(storageKeys.currentUser, null));
  const [bookings, setBookings] = useState(() => readStorage(storageKeys.bookings, []));
  const [draft, setDraft] = useState(() => readStorage(storageKeys.draft, {}));
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const save = (key, value, update) => {
    if (!writeStorage(key, value)) {
      setError('Could not save changes in this browser. Check available storage and try again.');
      return false;
    }
    update(value);
    setError('');
    return true;
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => current === message ? '' : current), 3600);
  };

  const signUp = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((account) => account.email === normalizedEmail)) throw new Error('An account with this email already exists. Sign in instead.');
    const salt = passwordSalt();
    const account = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      salt,
      passwordHash: await hashPassword(password, salt),
      city: 'All cities',
      diet: 'No preference'
    };
    if (!save(storageKeys.users, [...users, account], setUsers)) return false;
    const session = { id: account.id, name: account.name, email: account.email, city: account.city, diet: account.diet };
    if (!save(storageKeys.currentUser, session, setUser)) return false;
    notify('Account created. Welcome to TableNest!');
    return true;
  };

  const signIn = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = users.find((candidate) => candidate.email === normalizedEmail);
    if (!account) throw new Error('No local account was found for this email. Create an account first.');
    if (await hashPassword(password, account.salt) !== account.passwordHash) throw new Error('That password does not match this account.');
    const session = { id: account.id, name: account.name, email: account.email, city: account.city, diet: account.diet };
    if (!save(storageKeys.currentUser, session, setUser)) return false;
    notify(`Welcome back, ${account.name.split(/\s+/)[0]}!`);
    return true;
  };

  const signOut = () => {
    try {
      localStorage.removeItem(storageKeys.currentUser);
      localStorage.removeItem(storageKeys.draft);
      setUser(null);
      setDraft({});
      notify('You have signed out.');
    } catch (storageError) {
      console.error('Could not sign out:', storageError);
      setError('Unable to sign out in this browser. Please try again.');
    }
  };

  const updateProfile = (changes) => {
    const account = users.find((candidate) => candidate.id === user?.id);
    if (!account) {
      setError('Account details could not be found. Please sign in again.');
      return false;
    }
    const nextAccount = { ...account, ...changes };
    const nextUsers = users.map((candidate) => candidate.id === account.id ? nextAccount : candidate);
    const session = { id: nextAccount.id, name: nextAccount.name, email: nextAccount.email, city: nextAccount.city, diet: nextAccount.diet };
    if (!writeStorage(storageKeys.users, nextUsers) || !writeStorage(storageKeys.currentUser, session)) {
      setError('Could not save your profile. Check available storage and try again.');
      return false;
    }
    setUsers(nextUsers);
    setUser(session);
    setError('');
    notify('Profile updated.');
    return true;
  };

  const updateBookingDraft = (changes) => save(storageKeys.draft, { ...draft, ...changes }, setDraft);

  const confirmBooking = () => {
    const restaurant = restaurants.find((item) => item.id === draft.restaurantId);
    if (!user || !restaurant || !draft.date || !draft.time || !draft.tables?.length) {
      setError('Complete each booking step before confirming.');
      return null;
    }
    if (draft.date < localDateISO()) {
      setError('Choose a date that is today or later.');
      return null;
    }
    const restaurantTables = getTables(restaurant.id);
    const selected = restaurantTables.filter((table) => draft.tables.includes(table.id));
    if (selected.reduce((sum, table) => sum + table.seats, 0) < Number(draft.guests)) {
      setError('Your selected tables do not fit your party. Please choose another table.');
      return null;
    }
    const conflict = bookings.some((booking) =>
      booking.status === 'Confirmed' && booking.restaurantId === restaurant.id &&
      booking.date === draft.date && booking.time === draft.time &&
      booking.tables.some((tableId) => draft.tables.includes(tableId))
    );
    if (conflict) {
      setError('A selected table was just booked. Please choose another.');
      return null;
    }
    const booking = {
      id: `TN-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      userId: user.id,
      name: user.name,
      email: user.email,
      restaurantId: restaurant.id,
      date: draft.date,
      time: draft.time,
      guests: Number(draft.guests),
      tables: draft.tables,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    if (!save(storageKeys.bookings, [...bookings, booking], setBookings)) return null;
    save(storageKeys.draft, {}, setDraft);
    setError('');
    notify('Reservation confirmed.');
    return booking;
  };

  const cancelBooking = (id) => {
    const next = bookings.map((booking) => booking.id === id && booking.userId === user?.id
      ? { ...booking, status: 'Cancelled', cancelledAt: new Date().toISOString() }
      : booking
    );
    if (save(storageKeys.bookings, next, setBookings)) notify('Reservation cancelled.');
  };

  const value = useMemo(() => ({
    users, user, bookings, draft, toast, error, notify, setError, signUp, signIn, signOut,
    updateProfile, updateBookingDraft, confirmBooking, cancelBooking
  }), [users, user, bookings, draft, toast, error]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used inside BookingProvider.');
  return context;
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props}>{children}</button>;
}

function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</span>;
}

function PageHeading({ eyebrow, title, children }) {
  return <div className="page-heading"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{children && <p>{children}</p>}</div>;
}

function Header() {
  const { user, signOut } = useBooking();
  if (!user) {
    return <header className="site-header"><Link className="brand" to="/home" aria-label="TableNest home"><span className="brand-mark">T</span><span>table<span className="brand-light">nest</span></span></Link><Link className="button button-small button-outline" to="/login">Sign in</Link></header>;
  }
  return <header className="site-header">
    <Link className="brand" to="/home" aria-label="TableNest home"><span className="brand-mark">T</span><span>table<span className="brand-light">nest</span></span></Link>
    <nav className="top-nav" aria-label="Main navigation">
      <Link to="/home">Home</Link><Link to="/restaurants">Restaurants</Link><Link to="/bookings">My bookings</Link><Link to="/profile">Profile</Link>
    </nav>
    <div className="header-user"><span className="avatar">{user.name.trim().slice(0, 1).toUpperCase()}</span><span className="header-name">{user.name}</span><button className="text-button" onClick={signOut}>Sign out</button></div>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><span>TableNest</span><span>Good food starts with a good seat.</span></footer>;
}

function Layout() {
  const { user, toast, error } = useBooking();
  return <>
    <Header />
    <main className="page"><Routes>
      <Route path="/" element={<Navigate to={user ? '/home' : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to="/home" replace /> : <AuthPage />} />
      <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <AuthPage signup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
      <Route path="/reserve/date" element={<Protected><DateTimePage /></Protected>} />
      <Route path="/reserve/tables" element={<Protected><TableSelectionPage /></Protected>} />
      <Route path="/reserve/summary" element={<Protected><BookingSummaryPage /></Protected>} />
      <Route path="/confirmation/:id" element={<Protected><ConfirmationPage /></Protected>} />
      <Route path="/bookings" element={<Protected><MyBookingsPage /></Protected>} />
      <Route path="/booking/:id" element={<Protected><BookingDetailsPage /></Protected>} />
      <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes></main>
    <Footer />
    <div className={`toast${toast || error ? ' toast-visible' : ''}${error ? ' toast-error' : ''}`} role="status" aria-live="polite">{error || toast}</div>
  </>;
}

function Protected({ children }) {
  const { user } = useBooking();
  return user ? children : <Navigate to="/login" replace />;
}

function AuthPage({ signup = false }) {
  const { signUp, signIn, error: storageError } = useBooking();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const email = String(values.email || '').trim();
    const password = String(values.password || '');
    if (signup && String(values.name || '').trim().length < 2) return setError('Enter your full name (at least 2 characters).');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
    if (password.length < 8) return setError('Password must be at least 8 characters long.');
    if (signup && password !== values.confirmPassword) return setError('The passwords do not match.');
    setBusy(true);
    setError('');
    try {
      const success = signup
        ? await signUp({ name: values.name, email, password })
        : await signIn({ email, password });
      if (success) navigate('/home');
    } catch (authError) {
      setError(authError.message || 'We could not complete sign-in. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <section className="auth-layout">
    <div className="auth-story"><Link className="brand brand-inverse" to="/home"><span className="brand-mark">T</span><span>table<span className="brand-light">nest</span></span></Link>
      <div className="auth-story-copy"><Eyebrow light>A seat at the table</Eyebrow><h1>Make room for a lovely meal.</h1><p>Find a restaurant, pick your table, and look forward to dinner.</p></div>
      <span className="auth-story-note">Thoughtful tables for memorable meals.</span>
    </div>
    <div className="auth-form-wrap"><div className="auth-form-card">
      <Eyebrow>{signup ? 'Join TableNest' : 'Welcome back'}</Eyebrow><h2>{signup ? 'Create your account' : 'Sign in'}</h2>
      <p className="form-intro">{signup ? 'It only takes a moment to get started.' : 'Sign in to continue to your table.'}</p>
      {(error || storageError) && <div className="alert alert-error" role="alert">{error || storageError}</div>}
      <form onSubmit={submit} noValidate>
        {signup && <><label className="field-label" htmlFor="auth-name">Full name</label><input className="text-input" id="auth-name" name="name" autoComplete="name" maxLength={60} placeholder="e.g. Asha Rao" required /></>}
        <label className="field-label" htmlFor="auth-email">Email address</label><input className="text-input" id="auth-email" name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" required />
        <label className="field-label" htmlFor="auth-password">Password</label><input className="text-input" id="auth-password" name="password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={8} placeholder="At least 8 characters" required />
        {signup && <><label className="field-label" htmlFor="auth-confirm">Confirm password</label><input className="text-input" id="auth-confirm" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} placeholder="Enter your password again" required /></>}
        <Button className="button-full" type="submit" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account →' : 'Sign in →'}</Button>
      </form>
      <p className="auth-switch">{signup ? 'Already have an account?' : 'New to TableNest?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Sign in' : 'Create an account'}</Link></p>
      <p className="local-data-note">Account and booking data are stored in this browser only.</p>
    </div></div>
  </section>;
}

function RestaurantCard({ restaurant }) {
  return <article className="restaurant-card">
    <Link className={`restaurant-art art-${restaurant.tone}`} to={`/restaurant/${restaurant.id}`} aria-label={`View ${restaurant.name}`}><span className="art-letter">{restaurant.mark}</span><span className="art-caption">{restaurant.city}</span></Link>
    <div className="restaurant-card-content"><div className="card-title-row"><h3><Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link></h3></div>
      <p className="restaurant-meta">{restaurant.cuisine} <span>·</span> {restaurant.city}</p><p className="card-description">{restaurant.description}</p>
      <Link className="inline-link" to={`/restaurant/${restaurant.id}`}>View restaurant <span aria-hidden="true">→</span></Link>
    </div>
  </article>;
}

function RestaurantGrid({ items }) {
  return <div className="restaurant-grid">{items.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>;
}

function CitySelect({ value, onChange, label = 'Choose a city' }) {
  return <label className="search-field search-city"><span className="search-icon" aria-hidden="true">⌖</span><span className="search-field-copy"><small>{label}</small><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{cities.map((city) => <option key={city}>{city}</option>)}</select></span></label>;
}

function HomePage() {
  const { user, bookings } = useBooking();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(user?.city || 'All cities');
  const navigate = useNavigate();
  const upcoming = bookings.find((booking) => booking.userId === user?.id && booking.status === 'Confirmed' && booking.date >= localDateISO());
  const upcomingRestaurant = restaurants.find((item) => item.id === upcoming?.restaurantId);
  const search = (event) => {
    event.preventDefault();
    navigate('/restaurants', { state: { query, city } });
  };
  return <>
    <section className="hero"><div className="hero-copy"><Eyebrow light>Your next meal, made simple</Eyebrow><h1>Good evenings<br />begin with a <em>table.</em></h1><p>Discover thoughtful dining spots and reserve the seat that feels just right.</p>
      <div className="hero-actions"><Link className="button button-gold" to="/restaurants">Find a restaurant <span aria-hidden="true">→</span></Link><Link className="hero-secondary" to="/bookings">View my bookings</Link></div>
    </div><div className="hero-side" aria-hidden="true"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-dish">✳</div><div className="hero-side-label"><span className="status-dot"></span>A table is waiting</div></div><div className="hero-curve"></div></section>
    <section className="quick-search surface"><form className="search-row" onSubmit={search}>
      <label className="search-field"><span className="search-icon" aria-hidden="true">⌕</span><span className="search-field-copy"><small>Where do you want to eat?</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Restaurant, cuisine or city" /></span></label>
      <CitySelect value={city} onChange={setCity} /><Button type="submit">Explore tables →</Button>
    </form></section>
    <section className="content-section"><div className="section-heading"><div><Eyebrow>A few favourites</Eyebrow><h2>Places worth gathering for</h2></div><Link className="inline-link" to="/restaurants">See all restaurants →</Link></div><RestaurantGrid items={restaurants.filter((restaurant) => ['bukhara', 'indian-accent', 'bombay-canteen', 'punjab-grill', 'soam', 'thaker-bhojanalay'].includes(restaurant.id))} /></section>
    <section className="welcome-strip"><div className="welcome-mark">✳</div><div><Eyebrow>A little easier</Eyebrow><h2>Choose a time. Pick your table. You’re all set.</h2></div><Link className="button button-outline" to="/restaurants">Start exploring</Link></section>
    {upcoming && <section className="upcoming-hint"><span className="status-dot"></span><span>Your next table is at <strong>{upcomingRestaurant?.name || 'a restaurant'}</strong> on {formatDate(upcoming.date)}.</span><Link to={`/booking/${upcoming.id}`}>View details</Link></section>}
  </>;
}

function RestaurantsPage() {
  const location = useLocation();
  const [query, setQuery] = useState(location.query || '');
  const [city, setCity] = useState(location.city || 'All cities');
  const results = restaurants.filter((restaurant) => {
    const matches = `${restaurant.name} ${restaurant.city} ${restaurant.cuisine}`.toLowerCase().includes(query.toLowerCase().trim());
    return matches && (city === 'All cities' || city === restaurant.city);
  });
  return <>
    <PageHeading eyebrow="Find your next favourite" title="Restaurants">Browse by city, then choose a restaurant to see its tables and available times.</PageHeading>
    <section className="filter-bar surface"><form className="filter-form" onSubmit={(event) => event.preventDefault()}>
      <label className="search-field"><span className="search-icon" aria-hidden="true">⌕</span><span className="search-field-copy"><small>Search</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, cuisine or city" /></span></label>
      <CitySelect value={city} onChange={setCity} label="City" /><Button type="submit">Search</Button>
    </form></section>
    <div className="results-heading"><strong>{results.length} {results.length === 1 ? 'restaurant' : 'restaurants'}</strong><span>Pick a place to view details</span></div>
    {results.length ? <RestaurantGrid items={results} /> : <div className="empty-state"><div className="empty-icon">⌕</div><h2>No restaurants found</h2><p>Try another name or choose a different city.</p><Button variant="outline" onClick={() => { setQuery(''); setCity('All cities'); }}>Clear search</Button></div>}
  </>;
}

function RestaurantDetailsPage() {
  const { id } = useParams();
  const restaurant = restaurants.find((item) => item.id === id);
  const { user, updateBookingDraft } = useBooking();
  const navigate = useNavigate();
  if (!restaurant) return <NotFoundPage />;
  function begin() {
    if (!user) return navigate('/login');
    if (updateBookingDraft({ restaurantId: restaurant.id, date: localDateISO(), guests: 2, time: '', tables: [] })) navigate('/reserve/date');
  }
  return <>
    <Link to="/restaurants" className="back-link">← All restaurants</Link>
    <section className="detail-hero"><div className={`detail-art art-${restaurant.tone}`}><span className="art-letter">{restaurant.mark}</span><span className="art-caption">A TableNest favourite</span></div>
      <div className="detail-copy"><Eyebrow>{restaurant.city}</Eyebrow><h1>{restaurant.name}</h1><p className="detail-cuisine">{restaurant.cuisine}</p><p>{restaurant.description}</p>
        <div className="detail-facts"><span>⌖ {restaurant.city}</span><span>◷ Lunch &amp; dinner</span><span>♧ {getTables(restaurant.id).length} tables</span></div>
        <Button onClick={begin}>Reserve a table →</Button>
      </div>
    </section>
    <section className="content-section detail-below"><div className="section-heading"><div><Eyebrow>A quick look</Eyebrow><h2>Plan your visit</h2></div></div><div className="info-cards">
      <article className="info-card"><span className="info-icon">◷</span><h3>Seating times</h3><p>12:00 PM · 12:30 PM · 1:00 PM<br />6:30 PM · 7:00 PM · 7:30 PM · 8:00 PM</p></article>
      <article className="info-card"><span className="info-icon">⌖</span><h3>Location</h3><p>{restaurant.city}<br />Address shared by the restaurant.</p></article>
      <article className="info-card"><span className="info-icon">♧</span><h3>Choose your seat</h3><p>Choose from the window, air-conditioned room, garden, or main dining room.</p></article>
    </div></section>
  </>;
}

function Progress({ active }) {
  const steps = [{ id: 'date', label: 'Date & time' }, { id: 'tables', label: 'Your table' }, { id: 'summary', label: 'Review' }, { id: 'confirmation', label: 'Confirmed' }];
  const current = steps.findIndex((step) => step.id === active);
  return <ol className="progress" aria-label="Reservation progress">{steps.map((step, index) => <li key={step.id} className={index === current ? 'progress-current' : index < current ? 'progress-done' : ''}><span className="progress-dot">{index < current ? '✓' : index + 1}</span><span>{step.label}</span></li>)}</ol>;
}

function BookingAside({ restaurant, draft }) {
  return <aside className="booking-aside"><div className="aside-card"><Eyebrow>Your restaurant</Eyebrow><h3>{restaurant.name}</h3><p>{restaurant.cuisine} · {restaurant.city}</p>{draft.date && <p>{formatDate(draft.date)}{draft.time ? ` · ${draft.time}` : ''}</p>}<hr /><p className="aside-tip">No payment details are needed to reserve a table.</p></div></aside>;
}

function DateTimePage() {
  const { draft, updateBookingDraft, setError } = useBooking();
  const navigate = useNavigate();
  const restaurant = restaurants.find((item) => item.id === draft.restaurantId);
  if (!restaurant) return <Navigate to="/restaurants" replace />;
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (!values.date || !values.time) return setError('Choose a date and seating time to continue.');
    if (values.date < localDateISO() || values.date > localDateISO(maxDate)) return setError('Choose a date within the next 60 days.');
    if (updateBookingDraft({ date: values.date, time: values.time, guests: Number(values.guests), tables: [] })) {
      setError('');
      navigate('/reserve/tables');
    }
  }
  const times = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'];
  return <><Progress active="date" /><div className="booking-layout"><section className="booking-main">
    <PageHeading eyebrow="Step 1 of 3" title="When would you like to dine?">Choose a day and seating time at {restaurant.name}.</PageHeading>
    <form className="surface form-card" onSubmit={submit}>
      <label className="field-label" htmlFor="booking-date">Reservation date</label><input className="text-input date-input" type="date" id="booking-date" name="date" min={localDateISO()} max={localDateISO(maxDate)} defaultValue={draft.date || localDateISO()} required />
      <span className="field-hint">Reservations can be made up to 60 days ahead.</span>
      <label className="field-label spaced-label" htmlFor="booking-guests">Number of guests</label><select className="text-input" id="booking-guests" name="guests" defaultValue={draft.guests || 2}>{[1, 2, 3, 4, 5, 6, 8, 10].map((number) => <option key={number} value={number}>{number} {number === 1 ? 'guest' : 'guests'}</option>)}</select>
      <span className="field-label spaced-label">Select a time</span><div className="time-grid">{times.map((time) => <label className="time-choice" key={time}><input type="radio" name="time" value={time} defaultChecked={draft.time === time} required /><span>{time}</span></label>)}</div>
      <FormError /><div className="form-actions"><Link className="button button-outline" to={`/restaurant/${restaurant.id}`}>Back to restaurant</Link><Button type="submit">Choose a table →</Button></div>
    </form>
  </section><BookingAside restaurant={restaurant} draft={draft} /></div></>;
}

function FormError() {
  const { error } = useBooking();
  return <p className="form-error" aria-live="polite">{error}</p>;
}

function TableSelectionPage() {
  const { draft, bookings, updateBookingDraft, setError } = useBooking();
  const navigate = useNavigate();
  const [areaFilter, setAreaFilter] = useState('All areas');
  const restaurant = restaurants.find((item) => item.id === draft.restaurantId);
  if (!restaurant || !draft.date || !draft.time) return <Navigate to="/restaurants" replace />;
  const restaurantTables = getTables(restaurant.id);
  const booked = bookings.filter((booking) => booking.status === 'Confirmed' && booking.restaurantId === restaurant.id && booking.date === draft.date && booking.time === draft.time).flatMap((booking) => booking.tables);
  const selected = Array.isArray(draft.tables) ? draft.tables : [];
  const availableCapacity = restaurantTables.filter((table) => !booked.includes(table.id)).reduce((sum, table) => sum + table.seats, 0);
  const selectedCapacity = restaurantTables.filter((table) => selected.includes(table.id)).reduce((sum, table) => sum + table.seats, 0);
  const areaNames = [...new Set(restaurantTables.map((table) => table.area))];
  const areas = ['All areas', ...areaNames];

  function toggle(table) {
    if (booked.includes(table.id)) return;
    const next = selected.includes(table.id) ? selected.filter((id) => id !== table.id) : [...selected, table.id];
    updateBookingDraft({ tables: next });
    setError('');
  }

  return <><Progress active="tables" /><div className="booking-layout"><section className="booking-main">
    <PageHeading eyebrow="Step 2 of 3" title="Choose your table">{formatDate(draft.date)} · {draft.time} · {draft.guests} {Number(draft.guests) === 1 ? 'guest' : 'guests'}</PageHeading>
    <div className="floor-plan surface"><div className="floor-plan-head"><Eyebrow>{restaurant.name}</Eyebrow><span className="availability"><span className="status-dot"></span>{restaurantTables.length - booked.length} available</span></div>
      <div className="table-options" role="group" aria-label="Filter tables by area">{areas.map((area) => <button key={area} type="button" className={`table-filter${areaFilter === area ? ' table-filter-active' : ''}`} aria-pressed={areaFilter === area} onClick={() => setAreaFilter(area)}>{area}</button>)}</div>
      <div className="table-selection-status" aria-live="polite"><span>{selected.length ? `${selected.length} ${selected.length === 1 ? 'table' : 'tables'} selected · ${selectedCapacity} seats` : 'Choose one or more tables'}</span>{selected.length > 0 && <button type="button" className="text-button" onClick={() => { updateBookingDraft({ tables: [] }); setError(''); }}>Clear selection</button>}</div>
      <div className="floor-map" aria-label="Interactive restaurant floor plan">
        {areaNames.filter((area) => areaFilter === 'All areas' || areaFilter === area).map((area) => {
          const areaTables = restaurantTables.filter((table) => table.area === area);
          return <section className={`floor-zone zone-${area.toLowerCase().replace(/\s+/g, '-')}`} key={area} aria-label={`${area} tables`}>
            <h3 className="zone-label">{area === 'Main dining' ? 'Main dining room' : area}</h3>
            <div className="zone-tables">{areaTables.map((table) => <button key={table.id} type="button" className={`table-choice ${selected.includes(table.id) ? 'table-selected' : ''} ${booked.includes(table.id) ? 'table-unavailable' : ''}`} style={{ gridRow: table.row, gridColumn: table.column }} onClick={() => toggle(table)} disabled={booked.includes(table.id)} aria-pressed={selected.includes(table.id)} aria-label={`Table ${table.id}, ${table.seats} seats, ${table.area}, ${booked.includes(table.id) ? 'unavailable' : selected.includes(table.id) ? 'selected' : 'available'}`}><span className="table-number">{table.id}</span><span className="table-seat-count">{table.seats} seats</span><span className="table-action">{selected.includes(table.id) ? '✓ Selected' : booked.includes(table.id) ? 'Reserved' : '+ Select'}</span></button>)}</div>
          </section>;
        })}
      </div>
      <div className="floor-landmarks"><span>Entrance</span><span>Service station</span></div>
      <div className="table-legend"><span><i className="legend-dot"></i>Available</span><span><i className="legend-dot selected-dot"></i>Selected</span><span><i className="legend-dot unavailable-dot"></i>Unavailable</span></div>
    </div>
    {availableCapacity < Number(draft.guests) && <div className="alert alert-info">Not enough seats are available for this party at this time. Go back and choose another time.</div>}
    <FormError /><div className="form-actions"><Link className="button button-outline" to="/reserve/date">Back</Link><Button disabled={!selected.length} onClick={() => { if (selected.length) { setError(''); navigate('/reserve/summary'); } }}>Review booking →</Button></div>
  </section><BookingAside restaurant={restaurant} draft={draft} /></div></>;
}

function BookingSummaryPage() {
  const { user, draft, setError, confirmBooking } = useBooking();
  const restaurant = restaurants.find((item) => item.id === draft.restaurantId);
  const navigate = useNavigate();
  if (!restaurant || !draft.date || !draft.time || !draft.tables?.length) return <Navigate to="/reserve/tables" replace />;
  const selected = getTables(restaurant.id).filter((table) => draft.tables.includes(table.id));
  const enoughSeats = selected.reduce((sum, table) => sum + table.seats, 0) >= Number(draft.guests);
  function confirm() {
    setError('');
    const booking = confirmBooking();
    if (booking) navigate(`/confirmation/${booking.id}`);
  }
  return <><Progress active="summary" /><div className="booking-layout"><section className="booking-main">
    <PageHeading eyebrow="Step 3 of 3" title="Review your booking">Check the details below. Nothing will be charged to your account.</PageHeading>
    {!enoughSeats && <div className="alert alert-error">Your selected tables do not fit your party. Please choose another table.</div>}
    <section className="surface summary-card"><div className="summary-restaurant"><span className={`restaurant-mini art-${restaurant.tone}`}>{restaurant.mark}</span><div><Eyebrow>Restaurant</Eyebrow><h2>{restaurant.name}</h2><p>{restaurant.cuisine} · {restaurant.city}</p></div></div>
      <div className="summary-divider"></div><dl className="summary-list">
        <div><dt>Date</dt><dd>{formatDate(draft.date)}</dd></div><div><dt>Time</dt><dd>{draft.time}</dd></div><div><dt>Party size</dt><dd>{draft.guests} {Number(draft.guests) === 1 ? 'guest' : 'guests'}</dd></div>
        <div><dt>Tables</dt><dd>{selected.map((table) => `${table.id} · ${table.seats} seats · ${table.area}`).join(' / ')}</dd></div><div><dt>Booked by</dt><dd>{user.name}<br /><span className="muted">{user.email}</span></dd></div>
      </dl><div className="no-payment-note"><span>✓</span><span>Table reservation only — no payment is required.</span></div>
    </section>
    <div className="form-actions"><Link className="button button-outline" to="/reserve/tables">Back to tables</Link><Button disabled={!enoughSeats} onClick={confirm}>Confirm reservation →</Button></div>
  </section><BookingAside restaurant={restaurant} draft={draft} /></div></>;
}

function ConfirmationPage() {
  const { id } = useParams();
  const { bookings } = useBooking();
  const booking = bookings.find((item) => item.id === id);
  if (!booking) return <div className="confirmation-wrap"><p>Loading your confirmation…</p></div>;
  const restaurant = restaurants.find((item) => item.id === booking.restaurantId);
  return <section className="confirmation-wrap"><div className="confirmation-icon">✓</div><Eyebrow>Reservation confirmed</Eyebrow><h1>Your table is waiting.</h1><p className="confirmation-intro">We’ve saved your reservation. Here are the details for your visit.</p>
    <section className="surface confirmation-card"><div className="confirmation-top"><div><Eyebrow>Booking reference</Eyebrow><h2>{booking.id}</h2></div><span className="status-pill status-confirmed">Confirmed</span></div><div className="summary-divider"></div>
      <h3>{restaurant?.name || 'Restaurant'}</h3><p>{formatDate(booking.date)} · {booking.time}</p><p>{booking.guests} {Number(booking.guests) === 1 ? 'guest' : 'guests'} · Table{booking.tables.length === 1 ? '' : 's'} {booking.tables.join(', ')}</p>
      <div className="no-payment-note"><span>✓</span><span>Table booking only. No payment was taken.</span></div>
    </section><div className="confirmation-actions"><Link className="button button-primary" to={`/booking/${booking.id}`}>View booking details</Link><Link className="button button-outline" to="/home">Back to home</Link></div>
  </section>;
}

function MyBookingsPage() {
  const { user, bookings } = useBooking();
  const mine = bookings.filter((booking) => booking.userId === user.id).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  return <><PageHeading eyebrow="Your plans" title="My bookings">Keep track of your upcoming tables and past reservations.</PageHeading>
    {mine.length ? <div className="booking-list">{mine.map((booking) => {
      const restaurant = restaurants.find((item) => item.id === booking.restaurantId);
      const date = new Date(`${booking.date}T12:00:00`);
      return <article className="surface booking-card" key={booking.id}><div className="booking-date-chip"><strong>{new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)}</strong><span>{new Intl.DateTimeFormat('en', { month: 'short' }).format(date)}</span></div>
        <div className="booking-card-main"><div className="booking-card-title"><h2>{restaurant?.name || 'Restaurant'}</h2><span className={`status-pill ${booking.status === 'Confirmed' ? 'status-confirmed' : 'status-cancelled'}`}>{booking.status}</span></div><p>{formatDate(booking.date)} · {booking.time}</p><p>{booking.guests} guests · Table{booking.tables.length === 1 ? '' : 's'} {booking.tables.join(', ')}</p></div>
        <Link className="button button-small button-outline" to={`/booking/${booking.id}`}>Details →</Link>
      </article>;
    })}</div> : <EmptyState icon="♧" title="No bookings yet" message="Your confirmed tables will appear here." action={<Link className="button button-primary" to="/restaurants">Find a restaurant</Link>} />}
  </>;
}

function BookingDetailsPage() {
  const { id } = useParams();
  const { user, bookings, cancelBooking } = useBooking();
  const booking = bookings.find((item) => item.id === id && item.userId === user.id);
  if (!booking) return <NotFoundPage type="Booking" />;
  const restaurant = restaurants.find((item) => item.id === booking.restaurantId);
  function cancel() {
    if (window.confirm('Cancel this table reservation?')) cancelBooking(booking.id);
  }
  return <><Link to="/bookings" className="back-link">← My bookings</Link><PageHeading eyebrow="Booking details" title={`Reference ${booking.id}`}>Your reservation information is all in one place.</PageHeading>
    <section className="surface details-card"><div className="details-header"><div><Eyebrow>Status</Eyebrow><h2><span className={`status-pill ${booking.status === 'Confirmed' ? 'status-confirmed' : 'status-cancelled'}`}>{booking.status}</span></h2></div><span className="details-reference">{booking.id}</span></div>
      <div className="summary-divider"></div><h2>{restaurant?.name || 'Restaurant'}</h2><p className="restaurant-meta">{restaurant?.cuisine} · {restaurant?.city}</p>
      <dl className="summary-list details-list"><div><dt>Date</dt><dd>{formatDate(booking.date)}</dd></div><div><dt>Time</dt><dd>{booking.time}</dd></div><div><dt>Guests</dt><dd>{booking.guests}</dd></div>
        <div><dt>Tables</dt><dd>{booking.tables.map((id) => { const table = getTables(booking.restaurantId).find((item) => item.id === id); return table ? `${table.id} · ${table.seats} seats · ${table.area}` : id; }).join(' / ')}</dd></div>
        <div><dt>Booked by</dt><dd>{booking.name}<br /><span className="muted">{booking.email}</span></dd></div>
      </dl><div className="no-payment-note"><span>✓</span><span>No payment is collected for table reservations.</span></div>
      {booking.status === 'Confirmed' && <div className="details-actions"><Button variant="outline button-danger" onClick={cancel}>Cancel reservation</Button></div>}
    </section>
  </>;
}

function ProfilePage() {
  const { user, updateProfile } = useBooking();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const name = String(values.name || '').trim();
    if (name.length < 2 || name.length > 60) {
      setSaved(false);
      setError('Name must be between 2 and 60 characters.');
      return;
    }
    setError('');
    setSaved(updateProfile({ name, city: values.city, diet: values.diet }));
  }
  return <><PageHeading eyebrow="Your account" title="Profile & settings">Update the details we use for your reservations.</PageHeading>
    <section className="surface profile-card"><div className="profile-intro"><span className="profile-avatar">{user.name.trim().slice(0, 1).toUpperCase()}</span><div><h2>{user.name}</h2><p>{user.email}</p></div></div>
      <form className="profile-form" onSubmit={submit} noValidate><label className="field-label" htmlFor="profile-name">Full name</label><input className="text-input" id="profile-name" name="name" maxLength={60} defaultValue={user.name} required />
        <label className="field-label" htmlFor="profile-email">Email address</label><input className="text-input" id="profile-email" name="email" type="email" value={user.email} disabled /><span className="field-hint">Email address is linked to your account in this browser.</span>
        <label className="field-label spaced-label" htmlFor="profile-city">Preferred city</label><select className="text-input" id="profile-city" name="city" defaultValue={user.city || 'All cities'}>{cities.map((city) => <option key={city}>{city}</option>)}</select>
        <label className="field-label spaced-label" htmlFor="profile-diet">Dining preference</label><select className="text-input" id="profile-diet" name="diet" defaultValue={user.diet || 'No preference'}>{['No preference', 'Vegetarian', 'Vegan', 'Jain'].map((diet) => <option key={diet}>{diet}</option>)}</select>
        <p className="form-error" role="alert">{error}</p><div className="profile-actions"><Button type="submit">Save changes</Button>{saved && <span className="field-hint" role="status">Changes saved.</span>}</div>
      </form><p className="local-data-note">Account details and reservations are stored in this browser.</p>
    </section>
  </>;
}

function EmptyState({ icon, title, message, action }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><h2>{title}</h2><p>{message}</p>{action}</div>;
}

function NotFoundPage({ type = 'Page' }) {
  return <EmptyState icon="?" title={`${type} not found`} message="It may have been removed or the link may be out of date." action={<Link className="button button-primary" to="/home">Go to home</Link>} />;
}

export function App() {
  return <HashRouter><BookingProvider><Layout /></BookingProvider></HashRouter>;
}
