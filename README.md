# TableNest

TableNest helps diners discover restaurants, choose a date and time, select seats from an interactive floor plan, and manage their reservations. The interface uses a forest-green, cream, and warm-gold palette with readable text and a guided booking flow.

## Run locally

Requirements: **Node.js 18 or newer** and npm.

Install dependencies once:

```bash
npm install
```

Start the app:

```bash
npm start
```

Open [http://localhost:5174](http://localhost:5174). Vite refreshes the page as source files change. Stop the server with **Ctrl+C**.

If port 5174 is already in use, start Vite on another port:

```bash
npm start -- --port 5175
```

Then open [http://localhost:5175](http://localhost:5175).

Create a production build with:

```bash
npm run build
```

## Suggested professor demonstration

Follow this sequence to show the complete reservation journey and the interaction details:

1. **Introduce the goal.** On the sign-in page, describe TableNest as a simple way to find a restaurant and reserve a specific table, without a payment step.
2. **Create an account and enter the app.** Sign up with a name, email, and password. This also demonstrates the form's required fields and password confirmation.
3. **Discover a restaurant.** On Home, search by a cuisine or city, then open the restaurant list. Try a regional option such as Punjabi, Maharashtrian, or Gujarati to show the search and city filters.
4. **Review the restaurant.** Open a result and point out its cuisine, location, descriptive details, and restaurant-specific table count.
5. **Set reservation details.** Start a booking, choose a date, guest count, and time. Mention that invalid or past dates are rejected.
6. **Explore and select seats.** Use the area filters and floor plan to compare the Window, AC Room, Main dining, and Garden areas. Select a table sized for the party and show the selected state and seat count. Each restaurant has a different layout.
7. **Review and confirm.** Check the booking summary, then confirm. Show the confirmation reference and explain that no payment information is requested.
8. **Manage the reservation.** Open My Bookings, view the booking details, and demonstrate cancellation if time permits.
9. **Close with the design rationale.** Highlight the guided progress steps, clear selection/availability states, responsive layout, and browser-local storage used to retain the account and reservation.

### Presentation tips

- Run the app before presenting and create the demo account in the same browser you will use for the demonstration.
- Choose a future date and note the restaurant, time, and selected table so you can quickly find the booking again.
- If you demonstrate cancellation, explain that it updates the local booking status and frees the selected table for that time.
- Keep the browser window at a comfortable presentation size, then briefly resize it to show the responsive layout.

## Pages and user flow

1. **Login / Sign Up** — Create or access an account stored in this browser.
2. **Home** — Start a restaurant search or revisit an upcoming reservation.
3. **Restaurant Listing** — Search by restaurant, cuisine, or city.
4. **Restaurant Details** — Review a restaurant and begin a reservation.
5. **Date & Time Selection** — Choose a date, party size, and seating time.
6. **Table Selection** — Choose available tables from the Window, AC Room, Main dining, or Garden areas on that restaurant's floor plan.
7. **Booking Summary** — Review the reservation before confirming.
8. **Booking Confirmation** — See the confirmed reservation and reference number.
9. **My Bookings** — View active and cancelled reservations.
10. **Booking Details** — Review or cancel an individual reservation.
11. **Profile / Settings** — Update the local profile and dining preferences.

Protected reservation and account pages send signed-out visitors to sign in. The booking flow does not include payment.

## Local data

Accounts and bookings are stored in the current browser's `localStorage`. They are not sent to a server and do not sync between browsers. Passwords are hashed in the browser for sign-in. Restaurant and table availability are sample content, including Punjabi, Maharashtrian, and Gujarati options. Clearing the browser's site data removes locally saved accounts and bookings.

The frontend uses React, React Router, and Vite. No database or API server is used.
