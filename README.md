# TableNest — Premium Indian Fine Dining & Table Reservations

An elegant, high-end restaurant table reservation web application built with **React**, **Vite**, and **React Router DOM**, celebrating India's most iconic culinary destinations.

---

## 📋 Project Highlights

- **Website Brand:** **TableNest** (Formerly placeholder MESA)
- **Framework:** **React 18 + Vite 6**
- **Client-Side Routing:** **React Router DOM v6**
- **Dining Focus:** 100% Authentic Indian Fine Dining and Heritage Culinary Institutions
- **Locations:** Real, authentic addresses across New Delhi, Mumbai, Bengaluru, Goa, Kolkata, and Chennai
- **Visual Floor Plan:** Real-time interactive seating selector (Window Bay, Royal Diwan, Courtyard Verandah, Central Salon)
- **State Management:** Persistent bookings, wishlists, and user profiles across page reloads via React Context + `localStorage`
- **Clean Layout:** Removed prototype bar at the top, single unified footer at the bottom

---

## 🏛️ Featured Indian Culinary Institutions

1. **Bukhara** — ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, Chanakyapuri, New Delhi (North-West Frontier & Tandoor)
2. **Indian Accent** — The Lodhi, Lodhi Road, CGO Complex, Pragati Vihar, New Delhi (Modern Progressive Indian)
3. **The Bombay Canteen** — Unit 1, Process House, Kamala Mills, Lower Parel, Mumbai (Regional Indian Reimagined)
4. **Karavalli** — The Gateway Hotel, 66 Residency Road, Ashok Nagar, Bengaluru (Coastal Karnataka & Mangalorean)
5. **Dum Pukht** — ITC Maurya, Diplomatic Enclave, Chanakyapuri, New Delhi (Royal Awadhi & Dum Biryani)
6. **Avartana** — ITC Grand Chola, 63 Anna Salai, Guindy, Chennai (Avant-Garde South Indian)
7. **Gunpowder** — 4/171 Saunta Vaddo, Assagao, Bardez, North Goa (Coastal Kerala & Peninsular Spice)
8. **Peter Cat** — 18A, Park Street, Park Street area, Kolkata (Legendary Chelo Kebabs)
9. **Trishna** — 7 Sai Baba Marg, Kala Ghoda, Fort, Mumbai (Coastal Mangalorean Garlic Crab)
10. **Chor Bizarre** — Hotel Broadway, 4/15A Asaf Ali Road, Daryaganj, Old Delhi (Kashmiri Wazwan)

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🗺️ Application Routes

- `/` — **Home Page:** Hero banner, quick table finder, city filters, and featured restaurants
- `/restaurants` — **Explore Restaurants:** Live text search, city filters, cuisine filters, price tags, and sorting
- `/restaurant/:id` — **Restaurant Details:** Authentic address, hours, signature dishes, chef background, and reservation action
- `/booking/:id` — **Interactive Booking Wizard:**
  - *Step 1:* Party size, reservation date, lunch/dinner seating slot
  - *Step 2:* Interactive Visual Floor Plan with clickable table positions
  - *Step 3:* Guest information, dining occasions, and dietary notes
- `/confirmation/:bookingId` — **Booking Confirmation:** Reference code (`TN-xxxxx`), receipt, map directions link, and management actions
- `/my-bookings` — **My Bookings:** Active upcoming bookings, past history, and cancellation management
- `/profile` — **Profile & Settings:** Personal dining preferences, preferred city/cuisine, and saved wishlist
- `/login` & `/signup` — **Authentication:** Luxury sign-in with show/hide password toggle and 1-click VIP demo sign-in
