/**
 * MESA — Restaurant Reservations System
 * Frontend Application Logic & State Management
 */

// ==========================================================================
// 1. Data Store & Configuration
// ==========================================================================

const RESTAURANTS = [
  {
    id: 'saffron-table',
    name: 'Saffron Table',
    cuisine: 'Indian',
    location: 'Downtown Heritage Quarter, 14 Park Lane',
    rating: 4.9,
    reviewsCount: 312,
    priceRange: '$$$',
    image: 'assets/saffron_table.jpg',
    shortDesc: 'Contemporary Indian fine dining celebrating heritage spice blends and artisanal clay-oven delicacies.',
    fullDesc: 'Saffron Table reinterprets royal Indian culinary traditions through a contemporary, refined lens. Centered around traditional clay tandoors and slow-simmered brass handis, each preparation showcases hand-ground regional spices, heritage grains, and sustainably sourced ingredients in a warm, candlelit sanctuary.',
    tags: ['Outdoor Terrace', "Chef's Tasting Menu", 'Valet Parking', 'Handcrafted Cocktails', 'Clay Oven Specialties'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM'
  },
  {
    id: 'la-tavola',
    name: 'La Tavola',
    cuisine: 'Italian',
    location: 'Old Market Piazza, 82 Florence Ave',
    rating: 4.8,
    reviewsCount: 284,
    priceRange: '$$$$',
    image: 'assets/la_tavola.jpg',
    shortDesc: 'Authentic handcrafted pastas, wood-fired hearth specialties, and an exceptional regional wine selection.',
    fullDesc: 'La Tavola embodies the rustic warmth of Tuscan hospitality. Fresh pasta is extruded and shaped by hand daily, complemented by slow-braised ragùs and wood-fired flatbreads baked over aromatic seasoned oak.',
    tags: ['Handmade Pasta', 'Wood-Fired Hearth', 'Sommelier Selection', 'Romantic Ambience', 'Private Dining'],
    hours: 'Lunch: 12:00 PM – 3:00 PM | Dinner: 6:30 PM – 11:00 PM'
  },
  {
    id: 'dragon-wok',
    name: 'Dragon Wok',
    cuisine: 'Chinese',
    location: 'Canal District, 19 Silk Route',
    rating: 4.7,
    reviewsCount: 198,
    priceRange: '$$',
    image: 'assets/dragon_wok.jpg',
    shortDesc: 'Masterfully tossed wok specialties, Cantonese dim sum, and aromatic Sichuan delicacies.',
    fullDesc: 'Combining high-heat wok cooking with delicate Cantonese dim sum craftsmanship, Dragon Wok offers a theatrical culinary journey under soft amber lanterns and traditional dark wood latticework.',
    tags: ['Artisanal Dim Sum', 'Wok Hei Specialties', 'Family Style Seating', 'Loose Leaf Teas'],
    hours: 'Lunch: 11:30 AM – 3:30 PM | Dinner: 6:00 PM – 10:30 PM'
  },
  {
    id: 'the-green-fork',
    name: 'The Green Fork',
    cuisine: 'Continental',
    location: 'Botanical Gardens, 45 Elm Grove',
    rating: 4.8,
    reviewsCount: 245,
    priceRange: '$$$',
    image: 'assets/the_green_fork.jpg',
    shortDesc: 'Farm-to-table European continental cuisine spotlighting organic seasonal harvests.',
    fullDesc: 'Nestled beside lush greenery, The Green Fork curates honest European continental dining that champions hyper-seasonal organic produce, house-baked sourdough, and wood-roasted game and vegetables.',
    tags: ['Farm to Table', 'Garden Terrace', 'Organic Ingredients', 'Sunday Brunch', 'Biodynamic Wines'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 10:30 PM'
  },
  {
    id: 'sakura-house',
    name: 'Sakura House',
    cuisine: 'Japanese',
    location: 'Zenith Boulevard, 7 Cherry Way',
    rating: 4.9,
    reviewsCount: 360,
    priceRange: '$$$$',
    image: 'assets/sakura_house.jpg',
    shortDesc: 'Traditional omakase and precision robata grilling in a tranquil, minimalist wooden sanctuary.',
    fullDesc: 'Sakura House honors Edomae sushi traditions and binchotan charcoal grilling. Sourced daily from pristine fisheries and served over warm seasoned rice in a peaceful sanctuary of pale hinoki wood.',
    tags: ['Omakase Counter', 'Robata Grill', 'Rare Sake Collection', 'Intimate Seating', 'Chef Curated'],
    hours: 'Lunch: 12:00 PM – 2:30 PM | Dinner: 6:30 PM – 10:30 PM'
  },
  {
    id: 'casa-mexicana',
    name: 'Casa Mexicana',
    cuisine: 'Mexican',
    location: 'Sunlit Plaza, 31 Mission Street',
    rating: 4.7,
    reviewsCount: 220,
    priceRange: '$$',
    image: 'assets/casa_mexicana.jpg',
    shortDesc: 'Vibrant regional Mexican cooking, slow-braised meats, hand-pressed heirloom masa, and mezcal pairings.',
    fullDesc: 'Casa Mexicana brings the soul of Oaxaca and Michoacán to life with hand-ground moles, slow-braised barbacoa, and heirloom corn tortillas pressed to order on hot comals, accompanied by curated artisanal agave spirits.',
    tags: ['Heirloom Corn Masa', 'Artisanal Mezcals', 'Patio Seating', 'Handmade Tortillas', 'Live Acoustic'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 6:00 PM – 11:00 PM'
  }
];

const TABLE_DEFINITIONS = [
  { id: 'T1', status: 'available', section: 'Window View', capacity: '2–4 guests' },
  { id: 'T2', status: 'available', section: 'Window View', capacity: '2–4 guests' },
  { id: 'T3', status: 'unavailable', section: 'Main Dining', capacity: '2–4 guests' },
  { id: 'T4', status: 'available', section: 'Main Dining', capacity: '2–4 guests' },
  { id: 'T5', status: 'available', section: 'Main Dining', capacity: '2–4 guests' },
  { id: 'T6', status: 'unavailable', section: 'Main Dining', capacity: '2–4 guests' },
  { id: 'T7', status: 'available', section: 'Garden Terrace', capacity: '2–4 guests' },
  { id: 'T8', status: 'available', section: 'Garden Terrace', capacity: '2–4 guests' }
];

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

// Default initial state
const DEFAULT_USER = {
  fullName: 'Eleanor Vance',
  email: 'user@example.com',
  phone: '+1 (555) 382-9104',
  preferredCuisine: 'Indian'
};

const DEFAULT_BOOKINGS = [
  {
    bookingId: 'MSA-1048',
    restaurantId: 'saffron-table',
    restaurantName: 'Saffron Table',
    cuisine: 'Indian',
    location: 'Downtown Heritage Quarter, 14 Park Lane',
    date: 'Tomorrow, Oct 9, 2026',
    time: '7:30 PM',
    table: 'T2',
    tableSection: 'Window View',
    guests: 2,
    status: 'Confirmed',
    specialRequests: 'Window seat preferred / anniversary dinner'
  }
];

// Current reservation in progress
let currentBookingState = {
  restaurant: null,
  date: '',
  dateLabel: '',
  time: '7:30 PM',
  guests: 2,
  table: 'T2',
  specialRequests: ''
};

// ==========================================================================
// 2. Storage & State Management
// ==========================================================================

function getStorageItem(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

function getBookings() {
  const bookings = getStorageItem('mesa_bookings', null);
  if (!bookings) {
    setStorageItem('mesa_bookings', DEFAULT_BOOKINGS);
    return DEFAULT_BOOKINGS;
  }
  return bookings;
}

function saveBookings(bookings) {
  setStorageItem('mesa_bookings', bookings);
}

function getUserProfile() {
  return getStorageItem('mesa_user_profile', DEFAULT_USER);
}

function saveUserProfile(profile) {
  setStorageItem('mesa_user_profile', profile);
}

function getAuthStatus() {
  return getStorageItem('mesa_authenticated', true);
}

function setAuthStatus(status) {
  setStorageItem('mesa_authenticated', status);
}

// ==========================================================================
// 3. Router & Screen Navigation
// ==========================================================================

const screens = [
  'login',
  'home',
  'restaurants',
  'restaurant-details',
  'booking-datetime',
  'booking-table',
  'booking-summary',
  'booking-confirmation',
  'my-bookings',
  'booking-details',
  'profile'
];

let selectedCuisineFilter = 'All';

function navigateTo(screenId, params = {}) {
  window.location.hash = screenId;
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const targetScreen = screens.includes(hash) ? hash : 'home';

  // Toggle screens
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });

  const activeElement = document.getElementById(`screen-${targetScreen}`);
  if (activeElement) {
    activeElement.classList.add('active');
  }

  // Update navigation items
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-nav') === targetScreen);
  });

  // Header and Footer visibility toggle (hide on login screen to match reference)
  const siteHeader = document.querySelector('.site-header');
  const siteFooter = document.querySelector('.site-footer');
  if (siteHeader) {
    siteHeader.style.display = targetScreen === 'login' ? 'none' : 'flex';
  }
  if (siteFooter) {
    siteFooter.style.display = targetScreen === 'login' ? 'none' : 'block';
  }

  // Render view-specific data
  if (targetScreen === 'home') {
    renderPopularRestaurants();
  } else if (targetScreen === 'restaurants') {
    renderRestaurantList();
  } else if (targetScreen === 'restaurant-details') {
    renderRestaurantDetails();
  } else if (targetScreen === 'booking-datetime') {
    renderBookingDateTime();
  } else if (targetScreen === 'booking-table') {
    renderBookingTable();
  } else if (targetScreen === 'booking-summary') {
    renderBookingSummary();
  } else if (targetScreen === 'my-bookings') {
    renderMyBookings();
  } else if (targetScreen === 'booking-details') {
    renderBookingDetailsScreen();
  } else if (targetScreen === 'profile') {
    renderProfileScreen();
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ==========================================================================
// 4. Toast Notifications
// ==========================================================================

function showToast(message) {
  let toast = document.getElementById('mesa-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'mesa-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================================================
// 5. Auth (Login & Sign Up)
// ==========================================================================

let isSignUpMode = false;

function setupAuth() {
  const loginForm = document.getElementById('login-form');
  const authToggleLink = document.getElementById('auth-mode-toggle');
  const authTitle = document.getElementById('auth-header-title');
  const authSubtitle = document.getElementById('auth-header-subtitle');
  const authSubmitBtn = document.getElementById('auth-submit-button');
  const authNameGroup = document.getElementById('auth-name-group');
  const authConfirmPassGroup = document.getElementById('auth-confirmpass-group');
  const authOptionsRow = document.getElementById('auth-options-row');
  const togglePassBtn = document.getElementById('toggle-password-vis');
  const passInput = document.getElementById('auth-password');
  const demoFillBtn = document.getElementById('quick-demo-fill-btn');

  // Password visibility toggle
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Quick Demo fill
  if (demoFillBtn) {
    demoFillBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('auth-email');
      if (emailInput) emailInput.value = 'user@example.com';
      if (passInput) passInput.value = 'mesa2026';
      showToast('Demo credentials applied.');
    });
  }

  // Switch between Sign In and Sign Up
  if (authToggleLink) {
    authToggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      isSignUpMode = !isSignUpMode;
      if (isSignUpMode) {
        authTitle.textContent = 'Create an Account';
        authSubtitle.textContent = 'Join MESA for seamless dining reservations';
        authSubmitBtn.innerHTML = `Create Account <span style="font-size:1.1em">&rarr;</span>`;
        authNameGroup.style.display = 'flex';
        authConfirmPassGroup.style.display = 'flex';
        authOptionsRow.style.display = 'none';
        authToggleLink.textContent = 'Sign In';
        document.getElementById('auth-switch-label').textContent = 'Already have an account?';
      } else {
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Sign in to manage your table reservations';
        authSubmitBtn.innerHTML = `Sign In <span style="font-size:1.1em">&rarr;</span>`;
        authNameGroup.style.display = 'none';
        authConfirmPassGroup.style.display = 'none';
        authOptionsRow.style.display = 'flex';
        authToggleLink.textContent = 'Sign Up';
        document.getElementById('auth-switch-label').textContent = "Don't have an account?";
      }
    });
  }

  // Form submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value || 'user@example.com';
      const name = isSignUpMode ? (document.getElementById('auth-name').value || 'Eleanor Vance') : 'Eleanor Vance';

      const user = getUserProfile();
      user.email = email;
      if (isSignUpMode) user.fullName = name;
      saveUserProfile(user);
      setAuthStatus(true);

      updateUserUI();
      showToast(isSignUpMode ? 'Welcome to MESA! Account created.' : 'Welcome back!');
      navigateTo('home');
    });
  }
}

function updateUserUI() {
  const user = getUserProfile();
  const avatarName = document.querySelector('.user-avatar-name');
  const avatarCircle = document.querySelector('.user-avatar-circle');
  if (avatarName) {
    avatarName.textContent = user.fullName.split(' ')[0] || 'Guest';
  }
  if (avatarCircle) {
    const initials = user.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'M';
    avatarCircle.textContent = initials;
  }
}

// ==========================================================================
// 6. Home Screen
// ==========================================================================

function renderPopularRestaurants() {
  const popularContainer = document.getElementById('popular-restaurants-grid');
  if (!popularContainer) return;

  // Show only 3 popular restaurants as required
  const popular = [
    RESTAURANTS.find(r => r.id === 'saffron-table'),
    RESTAURANTS.find(r => r.id === 'la-tavola'),
    RESTAURANTS.find(r => r.id === 'sakura-house')
  ].filter(Boolean);

  popularContainer.innerHTML = popular.map(restaurant => createRestaurantCardHTML(restaurant)).join('');
}

function setupQuickSearch() {
  const quickSearchForm = document.getElementById('quick-search-form');
  if (!quickSearchForm) return;

  // Default quick search date to tomorrow
  const dateInput = document.getElementById('quick-search-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  quickSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cuisine = document.getElementById('quick-search-cuisine').value;
    const query = document.getElementById('quick-search-query').value.trim();

    selectedCuisineFilter = cuisine || 'All';
    navigateTo('restaurants');

    if (query) {
      setTimeout(() => {
        const searchInput = document.getElementById('restaurant-text-search');
        if (searchInput) {
          searchInput.value = query;
          filterAndRenderRestaurants();
        }
      }, 50);
    }
  });
}

// ==========================================================================
// 7. Restaurant Listing & Cuisine Filter
// ==========================================================================

function createRestaurantCardHTML(r) {
  return `
    <div class="restaurant-card" data-id="${r.id}">
      <div class="restaurant-img-wrap">
        <img class="restaurant-card-img" src="${r.image}" alt="${r.name}" loading="lazy">
        <span class="restaurant-cuisine-tag">${r.cuisine}</span>
        <span class="restaurant-price-tag">${r.priceRange}</span>
      </div>
      <div class="restaurant-card-body">
        <div class="card-title-row">
          <h3 class="restaurant-name">${r.name}</h3>
          <span class="restaurant-rating">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${r.rating}
          </span>
        </div>
        <div class="restaurant-location">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${r.location}
        </div>
        <p class="restaurant-short-desc">${r.shortDesc}</p>
        <button class="btn btn-secondary btn-block" onclick="selectAndOpenRestaurant('${r.id}')">
          View Restaurant &rarr;
        </button>
      </div>
    </div>
  `;
}

function renderRestaurantList() {
  const chipsContainer = document.getElementById('cuisine-filter-chips');
  if (chipsContainer) {
    const cuisines = ['All', 'Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Continental'];
    chipsContainer.innerHTML = cuisines.map(c => `
      <button class="cuisine-chip ${c === selectedCuisineFilter ? 'active' : ''}" onclick="setCuisineFilter('${c}')">
        ${c}
      </button>
    `).join('');
  }

  filterAndRenderRestaurants();
}

function setCuisineFilter(cuisine) {
  selectedCuisineFilter = cuisine;
  const chips = document.querySelectorAll('.cuisine-chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.textContent.trim() === cuisine);
  });
  filterAndRenderRestaurants();
}

function filterAndRenderRestaurants() {
  const container = document.getElementById('all-restaurants-grid');
  if (!container) return;

  const searchInput = document.getElementById('restaurant-text-search');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = RESTAURANTS.filter(r => {
    const matchesCuisine = (selectedCuisineFilter === 'All') || (r.cuisine.toLowerCase() === selectedCuisineFilter.toLowerCase());
    const matchesQuery = !query || r.name.toLowerCase().includes(query) || r.location.toLowerCase().includes(query);
    return matchesCuisine && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1px dashed var(--border);">
        <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 6px;">No restaurants found</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Try selecting another cuisine filter or clearing your search query.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 14px;" onclick="setCuisineFilter('All'); document.getElementById('restaurant-text-search').value = '';">Show All Restaurants</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(r => createRestaurantCardHTML(r)).join('');
}

function selectAndOpenRestaurant(id) {
  const restaurant = RESTAURANTS.find(r => r.id === id);
  if (!restaurant) return;

  currentBookingState.restaurant = restaurant;
  navigateTo('restaurant-details');
}

// ==========================================================================
// 8. Restaurant Details Screen
// ==========================================================================

function renderRestaurantDetails() {
  // If no restaurant selected, default to Saffron Table
  if (!currentBookingState.restaurant) {
    currentBookingState.restaurant = RESTAURANTS[0];
  }

  const r = currentBookingState.restaurant;
  const container = document.getElementById('restaurant-details-view');
  if (!container) return;

  container.innerHTML = `
    <div class="page-back-nav">
      <button class="back-link-btn" onclick="navigateTo('restaurants')">
        &larr; Back to restaurants
      </button>
    </div>

    <div class="details-hero-wrap">
      <div class="details-hero-img-box">
        <img class="details-hero-img" src="${r.image}" alt="${r.name}">
      </div>
      <div class="details-body">
        <div class="details-header-meta">
          <div>
            <h1 class="details-title">${r.name}</h1>
            <div class="details-badges-row">
              <span class="badge badge-primary">${r.cuisine}</span>
              <span class="badge">${r.priceRange}</span>
              <span class="badge" style="font-weight:600;">★ ${r.rating} (${r.reviewsCount} reviews)</span>
            </div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="startReservationFlow()">
            Reserve a Table &rarr;
          </button>
        </div>

        <div class="restaurant-location" style="font-size:0.95rem; margin-top: 6px;">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" style="width:16px;height:16px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${r.location}
        </div>

        <p class="details-description">${r.fullDesc}</p>

        <div class="details-tags-row">
          ${r.tags.map(tag => `<span class="feature-tag">${tag}</span>`).join('')}
        </div>

        <div class="details-hours-box">
          <svg class="hours-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <div class="hours-text">
            <strong>Operating Hours</strong><br>
            ${r.hours}
          </div>
        </div>

        <div>
          <button class="btn btn-primary btn-block btn-lg" onclick="startReservationFlow()">
            Reserve a Table at ${r.name} &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

function startReservationFlow() {
  if (!currentBookingState.restaurant) {
    currentBookingState.restaurant = RESTAURANTS[0];
  }
  // Initialize default date if not set
  if (!currentBookingState.date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    currentBookingState.date = tomorrow.toISOString().split('T')[0];
    currentBookingState.dateLabel = formatDateLabel(tomorrow);
  }
  navigateTo('booking-datetime');
}

// ==========================================================================
// 9. Date & Time Selection (Step 2)
// ==========================================================================

function formatDateLabel(dateObj) {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return dateObj.toLocaleDateString('en-US', options);
}

function renderBookingDateTime() {
  const r = currentBookingState.restaurant || RESTAURANTS[0];
  currentBookingState.restaurant = r;

  document.getElementById('datetime-rest-name').textContent = r.name;

  // Build quick dates: Today, Tomorrow, +2 days, +3 days
  const dateChipsContainer = document.getElementById('date-chips-container');
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 4; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    let dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    if (i === 0) dayName = 'Today';
    if (i === 1) dayName = 'Tomorrow';

    dates.push({
      iso: iso,
      dayName: dayName,
      dateString: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullLabel: `${dayName}, ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    });
  }

  // Ensure current date is valid
  if (!currentBookingState.date) {
    currentBookingState.date = dates[1].iso;
    currentBookingState.dateLabel = dates[1].fullLabel;
  }

  dateChipsContainer.innerHTML = dates.map(item => `
    <button type="button" class="date-chip-btn ${currentBookingState.date === item.iso ? 'active' : ''}" onclick="selectDate('${item.iso}', '${item.fullLabel}')">
      <span class="date-chip-day">${item.dayName}</span>
      <span class="date-chip-date">${item.dateString}</span>
    </button>
  `).join('');

  // Custom date picker sync
  const customDatePicker = document.getElementById('custom-date-picker');
  if (customDatePicker) {
    customDatePicker.min = dates[0].iso;
    customDatePicker.value = currentBookingState.date;
    customDatePicker.onchange = (e) => {
      const selected = new Date(e.target.value + 'T00:00:00');
      const label = selected.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      selectDate(e.target.value, label);
    };
  }

  // Render Time Slots (Exact 8 slots required)
  const timeContainer = document.getElementById('time-slots-container');
  timeContainer.innerHTML = TIME_SLOTS.map(t => `
    <button type="button" class="time-slot-btn ${currentBookingState.time === t ? 'active' : ''}" onclick="selectTime('${t}')">
      ${t}
    </button>
  `).join('');

  // Render Guest selector
  const guestContainer = document.getElementById('guest-selector-container');
  const guestCounts = [1, 2, 3, 4, 5, 6, 7, 8];
  guestContainer.innerHTML = guestCounts.map(count => `
    <button type="button" class="guest-chip-btn ${currentBookingState.guests === count ? 'active' : ''}" onclick="selectGuestCount(${count})">
      ${count}
    </button>
  `).join('');
}

function selectDate(iso, label) {
  currentBookingState.date = iso;
  currentBookingState.dateLabel = label;
  renderBookingDateTime();
}

function selectTime(timeStr) {
  currentBookingState.time = timeStr;
  const buttons = document.querySelectorAll('.time-slot-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === timeStr);
  });
}

function selectGuestCount(count) {
  currentBookingState.guests = count;
  const buttons = document.querySelectorAll('.guest-chip-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.textContent.trim()) === count);
  });
}

function proceedToTableSelection() {
  navigateTo('booking-table');
}

// ==========================================================================
// 10. Table Selection (Step 3)
// ==========================================================================

function renderBookingTable() {
  const r = currentBookingState.restaurant || RESTAURANTS[0];
  document.getElementById('table-rest-name').textContent = r.name;
  document.getElementById('table-datetime-summary').textContent = `${currentBookingState.dateLabel} at ${currentBookingState.time} • ${currentBookingState.guests} Guests`;

  const container = document.getElementById('tables-grid-container');
  if (!container) return;

  container.innerHTML = TABLE_DEFINITIONS.map(table => {
    const isSelected = currentBookingState.table === table.id;
    const isAvailable = table.status === 'available';
    const statusClass = !isAvailable ? 'unavailable' : (isSelected ? 'selected' : 'available');

    return `
      <div class="table-node ${statusClass}" 
           onclick="${isAvailable ? `selectTable('${table.id}')` : ''}"
           title="${table.id} (${table.section}) - ${isAvailable ? 'Available' : 'Reserved'}">
        <span class="table-id-text">${table.id}</span>
        <span class="table-capacity-text">${table.section}</span>
        ${!isAvailable ? '<span style="font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Reserved</span>' : ''}
      </div>
    `;
  }).join('');
}

function selectTable(tableId) {
  currentBookingState.table = tableId;
  renderBookingTable();
}

function proceedToSummary() {
  if (!currentBookingState.table) {
    showToast('Please select an available table to proceed.');
    return;
  }
  navigateTo('booking-summary');
}

// ==========================================================================
// 11. Booking Summary (Step 4)
// ==========================================================================

function renderBookingSummary() {
  const r = currentBookingState.restaurant || RESTAURANTS[0];
  const tableDef = TABLE_DEFINITIONS.find(t => t.id === currentBookingState.table) || { section: 'Main Dining' };

  document.getElementById('summary-restaurant').textContent = r.name;
  document.getElementById('summary-cuisine').textContent = r.cuisine;
  document.getElementById('summary-location').textContent = r.location;
  document.getElementById('summary-date').textContent = currentBookingState.dateLabel || currentBookingState.date;
  document.getElementById('summary-time').textContent = currentBookingState.time;
  document.getElementById('summary-table').textContent = `${currentBookingState.table} (${tableDef.section})`;
  document.getElementById('summary-guests').textContent = `${currentBookingState.guests} Guests`;

  const reqInput = document.getElementById('summary-special-requests');
  if (reqInput) {
    reqInput.value = currentBookingState.specialRequests || '';
  }
}

function confirmReservation() {
  const r = currentBookingState.restaurant || RESTAURANTS[0];
  const tableDef = TABLE_DEFINITIONS.find(t => t.id === currentBookingState.table) || { section: 'Main Dining' };
  const reqInput = document.getElementById('summary-special-requests');
  const specialRequests = reqInput ? reqInput.value.trim() : '';

  // Generate Booking ID (e.g. MSA-1049)
  const existingBookings = getBookings();
  const nextNumber = 1048 + existingBookings.length;
  const newBookingId = `MSA-${nextNumber}`;

  const newReservation = {
    bookingId: newBookingId,
    restaurantId: r.id,
    restaurantName: r.name,
    cuisine: r.cuisine,
    location: r.location,
    date: currentBookingState.dateLabel || currentBookingState.date,
    time: currentBookingState.time,
    table: currentBookingState.table,
    tableSection: tableDef.section,
    guests: currentBookingState.guests,
    status: 'Confirmed',
    specialRequests: specialRequests,
    createdAt: new Date().toISOString()
  };

  // Prepend to bookings list
  existingBookings.unshift(newReservation);
  saveBookings(existingBookings);

  // Store confirmed booking in state for confirmation screen
  window.lastConfirmedBooking = newReservation;

  renderBookingConfirmation(newReservation);
  navigateTo('booking-confirmation');
}

// ==========================================================================
// 12. Booking Confirmation Screen
// ==========================================================================

function renderBookingConfirmation(reservation) {
  const res = reservation || window.lastConfirmedBooking || getBookings()[0];
  if (!res) return;

  document.getElementById('confirm-booking-id').textContent = res.bookingId;
  document.getElementById('confirm-restaurant').textContent = res.restaurantName;
  document.getElementById('confirm-date').textContent = res.date;
  document.getElementById('confirm-time').textContent = res.time;
  document.getElementById('confirm-table').textContent = `${res.table} (${res.tableSection || 'Main Dining'})`;
  document.getElementById('confirm-guests').textContent = `${res.guests} Guests`;
}

// ==========================================================================
// 13. My Bookings Screen
// ==========================================================================

function renderMyBookings() {
  const container = document.getElementById('my-bookings-container');
  if (!container) return;

  const bookings = getBookings();

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-bookings-box">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 8px;">No reservations yet</h3>
        <p style="color: var(--text-secondary); font-size: 0.9375rem; margin-bottom: 20px;">You haven't reserved any tables yet. Discover top restaurants and book your next table.</p>
        <button class="btn btn-primary" onclick="navigateTo('restaurants')">
          Explore Restaurants &rarr;
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="bookings-list">
      ${bookings.map(b => `
        <div class="booking-item-card">
          <div class="booking-info-col">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-version" style="font-weight:700; color:var(--primary);">${b.bookingId}</span>
              <span class="badge badge-success">${b.status}</span>
            </div>
            <h3 class="booking-restaurant-title">${b.restaurantName}</h3>
            <div class="booking-meta-row">
              <span>📅 ${b.date}</span>
              <span>⏰ ${b.time}</span>
              <span>🪑 Table ${b.table}</span>
              <span>👥 ${b.guests} Guests</span>
            </div>
          </div>
          <div class="booking-action-col">
            <button class="btn btn-secondary btn-sm" onclick="viewBookingDetails('${b.bookingId}')">
              Details
            </button>
            <button class="btn btn-outline btn-sm" onclick="cancelBooking('${b.bookingId}')">
              Cancel
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function cancelBooking(bookingId) {
  if (confirm(`Are you sure you want to cancel reservation ${bookingId}?`)) {
    let bookings = getBookings();
    bookings = bookings.filter(b => b.bookingId !== bookingId);
    saveBookings(bookings);
    showToast(`Reservation ${bookingId} cancelled.`);
    renderMyBookings();
  }
}

// ==========================================================================
// 14. Booking Details Screen
// ==========================================================================

let activeDetailsBooking = null;

function viewBookingDetails(bookingId) {
  const bookings = getBookings();
  const found = bookings.find(b => b.bookingId === bookingId);
  if (!found) return;

  activeDetailsBooking = found;
  navigateTo('booking-details');
}

function renderBookingDetailsScreen() {
  const b = activeDetailsBooking || getBookings()[0];
  if (!b) {
    navigateTo('my-bookings');
    return;
  }

  document.getElementById('detail-booking-id').textContent = b.bookingId;
  document.getElementById('detail-restaurant').textContent = b.restaurantName;
  document.getElementById('detail-date').textContent = b.date;
  document.getElementById('detail-time').textContent = b.time;
  document.getElementById('detail-table').textContent = `${b.table} (${b.tableSection || 'Reserved Table'})`;
  document.getElementById('detail-guests').textContent = `${b.guests} Guests`;
  document.getElementById('detail-status').textContent = b.status;
  document.getElementById('detail-special').textContent = b.specialRequests || 'None requested';
}

function modifyCurrentBooking() {
  if (!activeDetailsBooking) return;
  // Load this booking back into current state
  const r = RESTAURANTS.find(item => item.id === activeDetailsBooking.restaurantId) || RESTAURANTS[0];
  currentBookingState = {
    restaurant: r,
    date: activeDetailsBooking.date,
    dateLabel: activeDetailsBooking.date,
    time: activeDetailsBooking.time,
    guests: activeDetailsBooking.guests,
    table: activeDetailsBooking.table,
    specialRequests: activeDetailsBooking.specialRequests || ''
  };
  showToast('You can now modify your reservation date, time, or table.');
  navigateTo('booking-datetime');
}

// ==========================================================================
// 15. Profile / Settings Screen
// ==========================================================================

function renderProfileScreen() {
  const user = getUserProfile();
  document.getElementById('profile-name').value = user.fullName || '';
  document.getElementById('profile-email').value = user.email || '';
  document.getElementById('profile-phone').value = user.phone || '';
  document.getElementById('profile-cuisine').value = user.preferredCuisine || 'Indian';
}

function setupProfileForm() {
  const form = document.getElementById('profile-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      fullName: document.getElementById('profile-name').value.trim(),
      email: document.getElementById('profile-email').value.trim(),
      phone: document.getElementById('profile-phone').value.trim(),
      preferredCuisine: document.getElementById('profile-cuisine').value
    };
    saveUserProfile(updated);
    updateUserUI();
    showToast('Profile updated successfully.');
  });
}

function signOutUser() {
  setAuthStatus(false);
  showToast('You have signed out.');
  navigateTo('login');
}

// ==========================================================================
// 16. Mobile Menu & Initializer
// ==========================================================================

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  setupAuth();
  setupQuickSearch();
  setupProfileForm();
  setupMobileMenu();
  updateUserUI();

  // Handle routing
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
});
