# TableNest (MESA) — Restaurant Reservations

A pure **HTML5 and CSS3** static frontend implementation for **TableNest / MESA — Restaurant Reservations**, an elegant, high-end restaurant table booking web application.

---

## 📋 Project Overview

This project implements the complete frontend user interface for TableNest strictly using **HTML5 and CSS3**. 

- **Technologies Used:** HTML5, CSS3.
- **Strictly Excluded:** JavaScript, Python, Backend frameworks, Databases, APIs, and External CSS libraries (Bootstrap/Tailwind).
- **Zero Dependencies / No Build Step:** Runs immediately by opening `index.html` directly in any web browser.

---

## 🎨 Visual Design System & Color Palette

The interface faithfully reproduces the provided **MESA login reference screen** and brand identity:

| Design Token | CSS Custom Property | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Page Background** | `--background` | `#FBF8F2` | Warm off-white / cream body background |
| **Card Background** | `--surface-card` | `#FFFFFF` | Elevated cards, auth cards, panels |
| **Input Background** | `--input-background` | `#F5F1EB` | Form fields, search bars, slot chips |
| **Primary Burnt-Orange** | `--primary` | `#A33F17` | Primary buttons, brand badge, active chips |
| **Primary Hover** | `--primary-hover` | `#843111` | Button hover and interactive focus |
| **Main Text** | `--text-primary` | `#2D211B` | Headings, primary labels, dark brown typography |
| **Secondary Text** | `--text-secondary` | `#81746B` | Subtitles, descriptions, metadata |
| **Borders** | `--border` | `#E9E0D6` | Subtle dividers, card borders, chip outlines |
| **Footer Background** | `--footer-background`| `#FCFAF7` | Clean warm footer surface |

### Typography
- **Headings:** `Playfair Display` (Serif, refined luxury aesthetic)
- **Body & UI:** `DM Sans` / `Plus Jakarta Sans` (Clean sans-serif readability)

---

## 🚀 How to Open the Website

No installation, build step, or server configuration is required.

1. Locate `index.html` in the project root directory.
2. **Double-click `index.html`** or right-click and choose **Open with** (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
3. The website will immediately load and display all screens.

---

## 💡 Pure CSS Interactive Enhancements

All user interactions function strictly via **HTML5 and CSS3 (no JavaScript)**:

1. **Password Visibility Toggle:**
   - Pure CSS checkbox hack allows clicking the eye icon to seamlessly toggle between hidden password dots (`••••••••`) and plain text (`mesa2026`) with dynamic eye/eye-slash icons.
2. **Interactive Selections (Radios + Labels):**
   - **Date Chips:** Click between Today, Tomorrow, Sunday, or Monday to instantly switch the selected reservation date.
   - **Guest Counts:** Click any number from 1 to 8 to highlight that guest party size.
   - **Seating Times:** Click any of the 8 time slots (12:00 PM to 8:30 PM) to highlight the chosen slot.
   - **Cuisine Filters:** Click any cuisine chip (All, Indian, Italian, Chinese, Japanese, Mexican, Continental) to switch filter chip highlights.
3. **Interactive Dining Floor Plan:**
   - Table **T2** is visibly pre-selected in primary burnt-orange with a `Selected` badge.
   - Tables **T1, T3, T5, T7, and T8** are available and can be clicked to select them in real time.
   - Tables **T4 and T6** are disabled reserved tables.
4. **Dedicated Restaurant Details Screens:**
   - Clicking on any restaurant card (*Saffron Table*, *La Tavola*, *Dragon Wok*, *The Green Fork*, *Sakura House*, or *Casa Mexicana*) opens that specific restaurant's authentic details screen with its respective photograph, description, tags, and hours.
   - Single, prominent "Reserve a Table &rarr;" action button.
5. **Live State Mirroring Across Screens (Summary, Confirmation, My Bookings, Booking Details):**
   - High-level pure CSS state synchronization via global top-level radio inputs coupled with `:has()` selectors:
     - Selecting a restaurant (*Saffron Table*, *La Tavola*, *Dragon Wok*, *The Green Fork*, *Sakura House*, *Casa Mexicana*), date (*Today*, *Tomorrow*, *Sunday*, *Monday*, *Tuesday*, *Friday*), time slot (*12:00 PM* to *8:30 PM*), guest count (*1* to *8*), or floor plan table (*T1* to *T8*) immediately updates that choice dynamically across:
       1. **Booking Summary (`#screen-booking-summary`)**
       2. **Booking Confirmation (`#screen-booking-confirmation`)**
       3. **My Bookings (`#screen-my-bookings`)**
       4. **Booking Details (`#screen-booking-details`)**
     - Dynamic restaurant banner images, cuisine tags, and addresses update instantaneously to reflect the user's booking choice with zero JavaScript.
6. **Pure CSS Booking Cancellation & My Bookings Synchronization:**
   - Clicking **Cancel Booking** on the Booking Details page (`#screen-booking-details`) or on the My Bookings card flips the reservation life state into `Cancelled` via pure CSS radio state binding.
   - On the **Booking Details** screen:
     - Instantly displays the red cancellation alert banner: *"Reservation Cancelled: This reservation has been cancelled and removed from your active bookings."*
     - Updates status badge to `✕ Cancelled` and reservation status to `Cancelled by Guest`.
     - Displays options to `↺ Restore Booking` or `Find Another Table →`.
   - On **My Bookings (`#screen-my-bookings`)**:
     - The active booking card is automatically removed (`display: none !important;`).
     - An elegant empty state box appears: *"No Active Reservations — Your reservation was cancelled and removed."*
     - The reservation record is preserved under *Past Dining History* with a `✕ Cancelled` badge.
7. **Profile Settings:**
   - The "Save Changes" action is configured with `type="button"` so it does not trigger browser GET submission or form reset.
8. **Humane Experience Views Bar:**
   - Top navigator is styled warmly in MESA's cream and beige brand aesthetic (`MESA Experience Views`) with pill links, blending seamlessly into the design.

---

## 📱 Implemented Screens

1. **Login Screen (`#screen-login`):** Reference match with logo mark, version badge, inputs, show/hide password toggle, and footer.
2. **Sign Up Screen (`#screen-signup`):** User registration card.
3. **Home Screen (`#screen-home`):** Hero section, quick search, and 3 popular restaurant cards.
4. **Restaurant Listing & Cuisine Filter (`#screen-restaurants`):** Search bar, cuisine filter chips, and all 6 restaurant cards.
5. **Restaurant Details Screens:**
   - Saffron Table (`#screen-restaurant-details`)
   - La Tavola (`#screen-restaurant-tavola`)
   - Dragon Wok (`#screen-restaurant-dragon`)
   - The Green Fork (`#screen-restaurant-green`)
   - Sakura House (`#screen-restaurant-sakura`)
   - Casa Mexicana (`#screen-restaurant-casa`)
6. **Date & Time Selection (`#screen-booking-datetime`):** Stepper, interactive 6-restaurant picker cards, selectable date chips (6 options), guest chips (1-8), and 8 time slot chips.
7. **Table Selection (`#screen-booking-table`):** Dining floor plan with selectable tables T1-T8, real-time booking specs summary header, and status legend.
8. **Booking Summary (`#screen-booking-summary`):** Dynamic restaurant preview banner, full reservation breakdown mirroring selected options, special requests, and policy card.
9. **Booking Confirmation (`#screen-booking-confirmation`):** Confirmation badge, dynamic restaurant thumbnail, booking ID `MSA-1048`, and full synchronized reservation receipt.
10. **My Bookings (`#screen-my-bookings`):** Active confirmed reservation card dynamically showing selected restaurant thumbnail, date, time, table, and guests, with separate past dining history.
11. **Booking Details (`#screen-booking-details`):** Detail card with dynamic restaurant hero banner, synchronized booking specs, and modify controls.
12. **Profile / Settings (`#screen-profile`):** Personal details form with non-resetting save action.

---

## 📁 Project Directory Structure

```text
MESA/
├── index.html        # Complete semantic HTML5 structure for all screens
├── style.css         # Pure CSS3 styling, design tokens, and interactive radio states
├── assets/           # Local restaurant photography
│   ├── casa_mexicana.jpg
│   ├── dragon_wok.jpg
│   ├── la_tavola.jpg
│   ├── saffron_table.jpg
│   ├── sakura_house.jpg
│   └── the_green_fork.jpg
└── README.md         # Documentation and usage instructions
```
