export const restaurants = [
  { id: 'bukhara', name: 'Bukhara', city: 'New Delhi', cuisine: 'North-West Frontier', description: 'Bold tandoor cooking and generous flavours at ITC Maurya.', mark: 'B', tone: 'clay' },
  { id: 'indian-accent', name: 'Indian Accent', city: 'New Delhi', cuisine: 'Modern Indian', description: 'A thoughtful, contemporary take on familiar Indian ingredients.', mark: 'I', tone: 'olive' },
  { id: 'bombay-canteen', name: 'The Bombay Canteen', city: 'Mumbai', cuisine: 'Regional Indian', description: 'Seasonal regional dishes served in a lively neighbourhood setting.', mark: 'B', tone: 'rose' },
  { id: 'karavalli', name: 'Karavalli', city: 'Bengaluru', cuisine: 'Coastal South Indian', description: 'Coastal recipes and seafood inspired by the Konkan region.', mark: 'K', tone: 'blue' },
  { id: 'dum-pukht', name: 'Dum Pukht', city: 'New Delhi', cuisine: 'Awadhi', description: 'Slow-cooked Awadhi classics in an elegant dining room.', mark: 'D', tone: 'gold' },
  { id: 'avartana', name: 'Avartana', city: 'Chennai', cuisine: 'Progressive South Indian', description: 'Inventive tasting menus built around South Indian flavours.', mark: 'A', tone: 'teal' },
  { id: 'gunpowder', name: 'Gunpowder', city: 'Goa', cuisine: 'South Indian', description: 'A relaxed village table for deeply spiced regional cooking.', mark: 'G', tone: 'green' },
  { id: 'peter-cat', name: 'Peter Cat', city: 'Kolkata', cuisine: 'Kolkata classics', description: 'A much-loved Park Street dining room and its signature Chelo Kebab.', mark: 'P', tone: 'plum' },
  { id: 'punjab-grill', name: 'Punjab Grill', city: 'New Delhi', cuisine: 'Punjabi', description: 'Punjabi favourites, smoky tandoor flavours, and generous shared plates.', mark: 'P', tone: 'clay' },
  { id: 'soam', name: 'Soam', city: 'Mumbai', cuisine: 'Maharashtrian', description: 'Comforting Maharashtrian dishes inspired by home-style regional cooking.', mark: 'S', tone: 'gold' },
  { id: 'thaker-bhojanalay', name: 'Shree Thaker Bhojanalay', city: 'Mumbai', cuisine: 'Gujarati', description: 'A traditional Gujarati thali with a generous selection of seasonal dishes.', mark: 'T', tone: 'olive' }
];

const seatingLayouts = {
  bukhara: [['Window', [2, 4]], ['AC Room', [2, 4, 6]], ['Main dining', [4, 6, 8]], ['Garden', [2, 4]]],
  'indian-accent': [['Window', [2, 2, 4]], ['AC Room', [2, 4]], ['Main dining', [4, 4, 6, 8]], ['Garden', [2, 4, 6]]],
  'bombay-canteen': [['Window', [2, 4]], ['AC Room', [2, 4, 4]], ['Main dining', [2, 4, 6]], ['Garden', [2, 4]]],
  karavalli: [['Window', [2, 4]], ['AC Room', [2, 4]], ['Main dining', [4, 6, 8]], ['Garden', [2, 4, 6]]],
  'dum-pukht': [['Window', [2, 4]], ['AC Room', [2, 4, 6, 8]], ['Main dining', [4, 6, 8]], ['Garden', [2]]],
  avartana: [['Window', [2, 2]], ['AC Room', [2, 4, 6]], ['Main dining', [2, 4, 4, 6]], ['Garden', [2, 4]]],
  gunpowder: [['Window', [2]], ['AC Room', [2, 4]], ['Main dining', [2, 4, 6]], ['Garden', [2, 4, 6, 8]]],
  'peter-cat': [['Window', [2, 4]], ['AC Room', [2, 4]], ['Main dining', [4, 6, 8, 8]], ['Garden', [2, 4]]],
  'punjab-grill': [['Window', [2, 4]], ['AC Room', [4, 6, 8]], ['Main dining', [4, 6, 8, 8]], ['Garden', [2, 4]]],
  soam: [['Window', [2, 4]], ['AC Room', [2, 4]], ['Main dining', [2, 4, 6]], ['Garden', [2, 4, 6]]],
  'thaker-bhojanalay': [['Window', [2]], ['AC Room', [2, 4, 6, 8]], ['Main dining', [4, 6, 8, 8]], ['Garden', [2, 4]]]
};

export function getTables(restaurantId) {
  const layout = seatingLayouts[restaurantId] || seatingLayouts.bukhara;
  let number = 1;
  return layout.flatMap(([area, capacities]) => capacities.map((seats, index) => ({
    id: `T${number++}`,
    seats,
    area,
    row: Math.floor(index / 3) + 1,
    column: (index % 3) + 1
  })));
}

export const storageKeys = {
  users: 'tablenest.users',
  currentUser: 'tablenest.currentUser',
  bookings: 'tablenest.bookings',
  draft: 'tablenest.bookingDraft'
};

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Could not read ${key} from browser storage:`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} to browser storage:`, error);
    return false;
  }
}

export function localDateISO(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function formatDate(value) {
  if (!value) return 'Choose a date';
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error('Secure password hashing is not available in this browser.');
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function passwordSalt() {
  if (!globalThis.crypto?.getRandomValues) throw new Error('Secure account setup is not available in this browser.');
  return [...crypto.getRandomValues(new Uint8Array(16))].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
