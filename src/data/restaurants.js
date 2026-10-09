// TableNest — Authentic Indian Fine Dining & Iconic Culinary Destinations
// Real, acclaimed Indian restaurants with authentic locations, real photography, signature dishes & hours

export const CITIES = [
  { id: 'all', name: 'All India' },
  { id: 'delhi', name: 'New Delhi & NCR' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'goa', name: 'Goa' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'chennai', name: 'Chennai' }
];

export const CUISINES = [
  'All Cuisines',
  'Modern Indian',
  'North-West Frontier & Tandoor',
  'Awadhi & Royal Dum',
  'Coastal & Seafood',
  'Regional Indian Reimagined',
  'South Indian Haute Cuisine',
  'Kashmiri Wazwan',
  'Heritage Chelo Kebabs'
];

export const RESTAURANTS = [
  {
    id: 'indian-accent',
    name: 'Indian Accent',
    subtitle: 'Modern Indian Haute Cuisine by Chef Manish Mehrotra',
    cuisine: 'Modern Indian',
    cityId: 'delhi',
    cityName: 'New Delhi',
    location: 'The Lodhi, Lodhi Road, CGO Complex, Pragati Vihar, New Delhi - 110003',
    shortLocation: 'The Lodhi, Lodhi Road, New Delhi',
    rating: 4.9,
    reviewsCount: 1420,
    priceRange: '₹₹₹₹',
    avgCostForTwo: '₹5,000 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Pioneering progressive Indian fine dining seamlessly marrying global techniques with nostalgic Indian flavours.',
    fullDesc: 'Showcased consistently on the World\'s 50 Best Restaurants list, Indian Accent showcases inventive Indian cuisine designed by legendary Chef Manish Mehrotra. Set inside The Lodhi\'s tranquil glass pavilion overlooking serene water bodies, every creation takes Indian heritage spices into a masterclass of avant-garde gastronomy.',
    tags: ["World's 50 Best", "Chef Manish Mehrotra", 'Wine Cellar Pairing', 'Valet Parking', 'Waterfront Glass Pavilion'],
    hours: 'Lunch: 12:00 PM – 2:30 PM | Dinner: 7:00 PM – 11:00 PM',
    phone: '+91 11 6617 5151',
    dietary: ['Pure Veg Tasting Menu', 'Jain Options Available', 'Gluten Free Friendly'],
    signatureDishes: [
      { name: 'Warm Doda Barfi Treacle Tart', desc: 'Accompanied with homemade churned butter ice cream' },
      { name: 'Blue Cheese Naan', desc: 'Mini wood-oven naan stuffed with aged Danish blue cheese' },
      { name: 'Meen Moilee with Kori Roti', desc: 'Kerala spiced sea bass in fragrant coconut turmeric emulsion' },
      { name: 'Soy Keema with Quail Egg', desc: 'Accompanied by toasted mini butter pav' }
    ],
    floorSections: [
      { id: 'waterfront', name: 'Water Pavilion', desc: 'Overlooking The Lodhi\'s reflective pools' },
      { id: 'chef-table', name: 'Chef\'s Private Alcove', desc: 'Direct view of the artisanal plating kitchen' },
      { id: 'main-hall', name: 'Main Glasshouse Dining', desc: 'Candlelit dining with acoustic serenity' }
    ]
  },
  {
    id: 'bukhara',
    name: 'Bukhara',
    subtitle: 'Legendary North-West Frontier & Clay Tandoor Masterpieces',
    cuisine: 'North-West Frontier & Tandoor',
    cityId: 'delhi',
    cityName: 'New Delhi',
    location: 'ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, Chanakyapuri, New Delhi - 110021',
    shortLocation: 'ITC Maurya, Chanakyapuri, New Delhi',
    rating: 4.9,
    reviewsCount: 2890,
    priceRange: '₹₹₹₹',
    avgCostForTwo: '₹6,500 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A global culinary legend celebrated for slow-simmered Dal Bukhara, Sikandari Raan, and hand-eaten tandoori banquets.',
    fullDesc: 'For over four decades, Bukhara at ITC Maurya has redefined frontier hospitality. Unchanged since 1978, the menu features rugged stone walls, raw wood tables, and a theatrical glass-fronted clay tandoor kitchen where master ustads roast whole marinated raans and bake pillow-soft giant naans.',
    tags: ['Legendary Dal Bukhara', 'Apron Dining', 'Heritage Clay Tandoor', 'Presidential Favorite', 'Sommelier Selection'],
    hours: 'Lunch: 12:30 PM – 2:45 PM | Dinner: 7:00 PM – 11:45 PM',
    phone: '+91 11 2611 2233',
    dietary: ['Pure Veg Options', 'No Cutlery Tradition', 'Halal Certified Meats'],
    signatureDishes: [
      { name: 'Dal Bukhara (18-Hour Simmer)', desc: 'Whole black lentils slow-cooked overnight over live charcoal embers with butter and fresh cream' },
      { name: 'Sikandari Raan', desc: 'Whole leg of tender spring lamb marinated in malt vinegar, cinnamon and cumin, roasted in tandoor' },
      { name: 'Murgh Malai Kebab', desc: 'Creamy boneless chicken morsels infused with green cardamom and royal cheese paste' },
      { name: 'Naan Bukhara', desc: 'Massive celebratory baby blanket tandoori bread served family style' }
    ],
    floorSections: [
      { id: 'tandoor-front', name: 'Tandoor Front Row', desc: 'Watch master chefs grill over live coal tandoors' },
      { id: 'heritage-booth', name: 'Stone Arch Booths', desc: 'Intimate rustic wooden banquettes' },
      { id: 'family-round', name: 'Frontier Family Tables', desc: 'Generous heavy oak tables for large parties' }
    ]
  },
  {
    id: 'the-bombay-canteen',
    name: 'The Bombay Canteen',
    subtitle: 'Vibrant Regional Indian Dining & Inventive Cocktails',
    cuisine: 'Regional Indian Reimagined',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    location: 'Unit 1, Process House, Kamala Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai - 400013',
    shortLocation: 'Kamala Mills, Lower Parel, Mumbai',
    rating: 4.8,
    reviewsCount: 1950,
    priceRange: '₹₹₹',
    avgCostForTwo: '₹3,000 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A joyous celebration of India\'s diverse regional cuisines served with cheeky nostalgia and artisanal craft cocktails.',
    fullDesc: 'Housed in an old Bombay bungalow-inspired setting in the heart of Lower Parel, The Bombay Canteen pays homage to every corner of India. From Naga chili braises to Mangalorean ghee roasts and Gujarati seasonal treasures, paired with world-class indigenous cocktails.',
    tags: ['Kamala Mills', 'Artisanal Cocktails', 'Regional India', 'Lively Vibe', 'Outdoor Verandah'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 1:00 AM',
    phone: '+91 22 4966 6666',
    dietary: ['Extensive Vegetarian', 'Jain Options', 'Craft Spirits Bar'],
    signatureDishes: [
      { name: 'Canteen Haleem with Pao', desc: 'Slow-cooked spiced mutton & broken wheat topped with barista onions and mint' },
      { name: 'Baingan Bharta Tart', desc: 'Smoked aubergine in crispy pastry with roasted goat curd' },
      { name: 'Kerala Roast Pork Ribs', desc: 'Coated in spicy Kokum and shallot glaze' },
      { name: 'Coffee Rasgulla Sundae', desc: 'South Indian filter coffee cream layered with soft spongy rasgullas' }
    ],
    floorSections: [
      { id: 'canteen-verandah', name: 'Open Verandah', desc: 'Breezy sunlit patio with lush planters' },
      { id: 'bar-highs', name: 'Cocktail Bar Lounge', desc: 'High tables right beside the mixology counter' },
      { id: 'bungalow-hall', name: 'Heritage Bungalow Hall', desc: 'Vintage teak chairs and hand-painted tiles' }
    ]
  },
  {
    id: 'karavalli',
    name: 'Karavalli',
    subtitle: 'Award-Winning Coastal Karnataka, Mangalorean & Malabar Kitchen',
    cuisine: 'Coastal & Seafood',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    location: 'The Gateway Hotel, 66 Residency Road, Ashok Nagar, Bengaluru - 560025',
    shortLocation: 'Residency Road, Bengaluru',
    rating: 4.9,
    reviewsCount: 1640,
    priceRange: '₹₹₹₹',
    avgCostForTwo: '₹4,200 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A tranquil tropical haven preserving timeless family recipes from coastal South India under a 100-year-old tamarind tree.',
    fullDesc: 'Built in the architectural style of a traditional Mangalorean home with carved wooden pillars and terracotta tile roofs, Karavalli honors coastal food traditions. Master recipes from home cooks of Mangalore, Coorg, Malabar, and Goa are prepared on slow earthen wood-stoves with cold-pressed coconut oils.',
    tags: ['Tamarind Canopy', 'Fresh Coastal Seafood', 'Garden Dining', 'Mangalorean Curries', 'Valet Available'],
    hours: 'Lunch: 12:30 PM – 3:00 PM | Dinner: 7:00 PM – 11:30 PM',
    phone: '+91 80 6660 4545',
    dietary: ['Pure Coastal Veg', 'Gluten Free Neer Dosa', 'Fresh Catch Daily'],
    signatureDishes: [
      { name: 'Tiger Prawns Roast', desc: 'Jumbo sea prawns pan-roasted with Kundapur chili, coriander, and curry leaves' },
      { name: 'Kane Rava Fry', desc: 'Fresh lady fish shallow-fried in crispy semolina crust with house red masala' },
      { name: 'Kori Gassi with Neer Dosa', desc: 'Mangalorean chicken curry steeped in fresh grated coconut, served with gossamer neer dosas' },
      { name: 'Elaneer Payasam', desc: 'Chilled tender coconut pulp simmered gently with cardamom and condensed milk' }
    ],
    floorSections: [
      { id: 'tamarind-courtyard', name: 'Courtyard Under the Tamarind Tree', desc: 'Open-air al-fresco seating beneath fairy lights' },
      { id: 'monsoon-verandah', name: 'Monsoon Verandah', desc: 'Semi-covered terrace with wooden pillars' },
      { id: 'heritage-parlour', name: 'Traditional Parlour', desc: 'Air-conditioned vintage coastal dining room' }
    ]
  },
  {
    id: 'dum-pukht',
    name: 'Dum Pukht',
    subtitle: 'Grand Awadhi Royal Court & Slow-Simmered Dum Biryanis',
    cuisine: 'Awadhi & Royal Dum',
    cityId: 'delhi',
    cityName: 'New Delhi',
    location: 'ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, Chanakyapuri, New Delhi - 110021',
    shortLocation: 'ITC Maurya, Chanakyapuri, New Delhi',
    rating: 4.9,
    reviewsCount: 1820,
    priceRange: '₹₹₹₹',
    avgCostForTwo: '₹6,000 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A palatial ode to the royal Nawabs of Awadh, renowned for melt-in-mouth Kakori kebabs and fragrant sealed handi biryanis.',
    fullDesc: 'Dum Pukht revives the two-hundred-year-old culinary tradition of the Nawabs of Awadh. Food is slow-cooked in sealed heavy copper vessels over low embers, allowing ingredients to mature in their own juices. The restaurant\'s majestic crystal chandeliers, royal blue velvet, and fine bone china evoke an era of regal refinement.',
    tags: ['Royal Awadhi Court', 'Slow-Simmered Dum', 'Silverware Service', 'Kakori Kebab Masterclass', 'Luxury Fine Dining'],
    hours: 'Lunch: 12:30 PM – 2:45 PM | Dinner: 7:00 PM – 11:30 PM',
    phone: '+91 11 2611 2233',
    dietary: ['Nawabi Vegetarian Thali', 'Halal Meats', 'Royal Saffron Infusions'],
    signatureDishes: [
      { name: 'Dum Pukht Biryani', desc: 'Basmati rice and succulent prime cuts of lamb layered with saffron, rose water, sealed with dough' },
      { name: 'Kakori Kebab', desc: 'Fabled melt-in-mouth Awadhi minced lamb kebab scented with cloves, saffron, and roasted chana' },
      { name: 'Shahi Nehari', desc: 'Lamb shanks simmered overnight in an aromatic stock infused with potli masala' },
      { name: 'Zaffrani Kheer', desc: 'Creamy reduced milk and rice scented with royal Kashmiri saffron and silver vark' }
    ],
    floorSections: [
      { id: 'royal-diwan', name: 'Royal Diwan Alcoves', desc: 'Opulent arched booths lined with royal sapphire cushions' },
      { id: 'crystal-hall', name: 'Grand Crystal Hall', desc: 'Directly beneath the cascading Venetian chandeliers' },
      { id: 'nawabi-private', name: 'Nawabi Private Salon', desc: 'Private dining suite with personal butler service' }
    ]
  },
  {
    id: 'avartana',
    name: 'Avartana',
    subtitle: 'Avant-Garde Progressive South Indian Gastronomy',
    cuisine: 'South Indian Haute Cuisine',
    cityId: 'chennai',
    cityName: 'Chennai',
    location: 'ITC Grand Chola, 63 Anna Salai, Little Mount, Guindy, Chennai - 600032',
    shortLocation: 'ITC Grand Chola, Guindy, Chennai',
    rating: 4.9,
    reviewsCount: 1150,
    priceRange: '₹₹₹₹',
    avgCostForTwo: '₹5,500 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Asia\'s 50 Best acclaimed sanctuary reimagining traditional South Indian flavors through molecular and multi-course culinary artistry.',
    fullDesc: 'Derived from the Sanskrit word for \'rhythm\' or \'revolution\', Avartana presents progressive South Indian cuisine that defies expectations. Traditional flavors from Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka are deconstructed and reimagined through theatrical tasting courses in an ethereal setting of pale timber and polished brass.',
    tags: ["Asia's 50 Best", 'Multi-Course Tasting', 'Modernist Gastronomy', 'ITC Grand Chola', 'Artisanal Pairings'],
    hours: 'Lunch: 12:30 PM – 3:00 PM | Dinner: 7:00 PM – 11:00 PM',
    phone: '+91 44 2220 0000',
    dietary: ['Dedicated Pure Veg Tasting Menus', 'Zero Garlic/Onion on Request', 'Wine & Mocktail Flight'],
    signatureDishes: [
      { name: 'Infused Rasam in French Press', desc: 'Clarified aromatic tomato and coriander broth extracted table-side with fresh crushed spices' },
      { name: 'Asparagus & Coconut Spheres', desc: 'Tender baby asparagus with gently tempered Malabar coconut emulsion' },
      { name: 'Morel Mushroom Pyramids', desc: 'Kashmiri gucchi stuffed with spiced curd and served with toasted appam wafers' },
      { name: 'Uthukuli Butter Rice', desc: 'Fragrant short-grain rice tossed in artisan ghee, accompanied with spiced crispy okra crisps' }
    ],
    floorSections: [
      { id: 'zen-chamber', name: 'Minimalist Brass Hall', desc: 'Ethereal room with hand-hammered brass lanterns' },
      { id: 'tasting-counter', name: 'Chef\'s Plating Stage', desc: 'Front-row view of theatrical culinary creations' },
      { id: 'private-enclave', name: 'Private Mahogany Enclave', desc: 'Exclusive dining room for bespoke parties' }
    ]
  },
  {
    id: 'gunpowder',
    name: 'Gunpowder',
    subtitle: 'Bohemian Peninsular South Indian Flavours in an Assagao Heritage Villa',
    cuisine: 'Coastal & Seafood',
    cityId: 'goa',
    cityName: 'Goa',
    location: '4/171 Saunta Vaddo, Assagao, Bardez, North Goa - 403507',
    shortLocation: 'Saunta Vaddo, Assagao, Goa',
    rating: 4.8,
    reviewsCount: 2300,
    priceRange: '₹₹',
    avgCostForTwo: '₹1,800 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A beloved Goan courtyard haven serving rustic, punchy peninsular South Indian home cooking and artisanal craft drinks.',
    fullDesc: 'Set in a breezy, open-air garden courtyard of a restored century-old Portuguese-Goan villa in trendy Assagao, Gunpowder is a celebration of southern spice. Specializing in homestyle curries, piping hot appams, and slow-braised meats from Kerala, Tamil Nadu, and Karnataka, all served under rustling mango trees.',
    tags: ['Restored Portuguese Villa', 'Open-Air Garden', 'Assagao Vibe', 'Craft Cocktails', 'Pet Friendly Patio'],
    hours: 'Lunch: 12:00 PM – 4:00 PM | Dinner: 7:00 PM – 11:00 PM',
    phone: '+91 832 226 8083',
    dietary: ['Extensive Coastal Veg', 'Gluten Free Appams', 'Fresh Seafood Daily'],
    signatureDishes: [
      { name: 'Kerala Beef Roast / Pepper Mutton', desc: 'Slow-caramelized with slivers of fresh coconut and black Tellicherry peppercorns' },
      { name: 'Coorg Pandi Curry with Fluffy Appams', desc: 'Tender pork belly braised with sour Kachampuli vinegar and wild coriander' },
      { name: 'Prawn Curry in Earthen Pot', desc: 'Fresh Arabian Sea prawns in fiery red chili, garlic, and kokum curry' },
      { name: 'Pache Peppercorn Toddy Shake', desc: 'Artisanal spiced cocktail with house-infused syrups' }
    ],
    floorSections: [
      { id: 'garden-canopy', name: 'Mango Garden Courtyard', desc: 'Romantic open-air dining under tropical boughs' },
      { id: 'balcao-patio', name: 'Heritage Balcão', desc: 'Raised Portuguese stone verandah with vintage cane seats' },
      { id: 'art-bistro', name: 'Inner Ceramic Salon', desc: 'Cosy room adjacent to the boutique curate' }
    ]
  },
  {
    id: 'peter-cat',
    name: 'Peter Cat',
    subtitle: 'Iconic Park Street Heritage Landmark & Legendary Chelo Kebabs',
    cuisine: 'Heritage Chelo Kebabs',
    cityId: 'kolkata',
    cityName: 'Kolkata',
    location: '18A, Park Street, Park Street area, Kolkata, West Bengal - 700016',
    shortLocation: 'Park Street, Kolkata',
    rating: 4.8,
    reviewsCount: 3500,
    priceRange: '₹₹',
    avgCostForTwo: '₹1,600 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A timeless Kolkata institution since 1975, celebrated for its dim amber glow, retro charm, and the iconic Chelo Kebab.',
    fullDesc: 'Stepping into Peter Cat on Kolkata\'s legendary Park Street feels like entering an elegant era of old-world hospitality. With soft yellow light filtering through stained amber lanterns and tuxedoed waiters serving sizzling platters, this restaurant has hosted generations of food lovers who come back for one signature dish: the immortal Chelo Kebab.',
    tags: ['Park Street Icon', 'Since 1975', 'Legendary Chelo Kebab', 'Retro Amber Ambience', 'Heritage Kolkata'],
    hours: 'Lunch: 11:30 AM – 4:00 PM | Dinner: 6:00 PM – 11:00 PM',
    phone: '+91 33 2229 8841',
    dietary: ['Vegetarian Kebabs Available', 'Classic Continental', 'Bar Service'],
    signatureDishes: [
      { name: 'The Original Chelo Kebab', desc: 'Bed of aromatic steamed butter rice topped with a soft-poached egg, two minced mutton skewers, one chicken seekh, and a dollop of table butter' },
      { name: 'Beckti Sizzler', desc: 'Fresh Kolkata bhetki fillet tossed in herb butter and grilled garden veggies on a flaming iron plate' },
      { name: 'Mutton Rogan Josh', desc: 'Slow-braised tender goat meat cooked with ratanjot bark and whole spices' },
      { name: 'Flambéed Baked Alaska', desc: 'Retro dessert toasted table-side with golden brandy flame' }
    ],
    floorSections: [
      { id: 'amber-booth', name: 'Amber Lantern Banquette', desc: 'Classic leatherette booths under retro glass lanterns' },
      { id: 'mezzanine', name: 'Heritage Mezzanine', desc: 'Elevated second floor with view of the vintage bar' },
      { id: 'park-street-front', name: 'Park Street Front Window', desc: 'Prime street-facing seats overlooking the lively boulevard' }
    ]
  },
  {
    id: 'trishna',
    name: 'Trishna',
    subtitle: 'World-Renowned Coastal Mangalorean Seafood & Kala Ghoda Landmark',
    cuisine: 'Coastal & Seafood',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    location: '7 Sai Baba Marg, Next to Commerce House, Kala Ghoda, Fort, Mumbai - 400001',
    shortLocation: 'Kala Ghoda, Fort, Mumbai',
    rating: 4.8,
    reviewsCount: 2100,
    priceRange: '₹₹₹',
    avgCostForTwo: '₹3,200 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A global culinary pilgrimage site famous for its legendary Butter Pepper Garlic Jumbo Crab and fresh ocean bounty.',
    fullDesc: 'Tucked into the heritage cobblestone lanes of South Mumbai\'s art district, Trishna looks deceptively modest from the outside, but is celebrated internationally by world chefs and gourmands. With seafood brought in fresh every dawn from Sassoon Docks, their Butter Pepper Garlic crab sauce has become folklore.',
    tags: ['Kala Ghoda Art Precinct', 'World Famous Garlic Crab', 'Fresh Catch Daily', 'South Mumbai Legend', 'Valet Parking'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 6:30 PM – 12:00 AM',
    phone: '+91 22 2270 3202',
    dietary: ['Vegetarian Coastal Dishes', 'Gluten-Free Neer Dosa', 'Fresh Seafood'],
    signatureDishes: [
      { name: 'Butter Pepper Garlic Jumbo Crab', desc: 'Live mud crab bathed in rich golden butter, cracked Tellicherry pepper, and fried garlic slivers' },
      { name: 'Koliwada Prawns', desc: 'Crispy fried jumbo prawns marinated in fiery carom seed and red chili batter' },
      { name: 'Fish Hyderabadi', desc: 'Fresh pomfret smothered in a bright coriander, mint, green chili, and coconut paste' },
      { name: 'Neer Dosa & Appams', desc: 'Paper-thin lace crepes designed to soak up rich coastal gravies' }
    ],
    floorSections: [
      { id: 'bistro-ac', name: 'Main Heritage Dining Hall', desc: 'Wood-paneled intimate air-conditioned dining room' },
      { id: 'upper-gallery', name: 'Upper Floor Gallery', desc: 'Spacious upper deck for larger dining parties' },
      { id: 'corner-alcove', name: 'Quiet Corner Alcove', desc: 'Cozy four-seater tables tucked away for conversation' }
    ]
  },
  {
    id: 'chor-bizarre',
    name: 'Chor Bizarre',
    subtitle: 'Kashmiri Wazwan Feast & Heritage Antiquities in Old Delhi',
    cuisine: 'Kashmiri Wazwan',
    cityId: 'delhi',
    cityName: 'New Delhi',
    location: 'Hotel Broadway, 4/15A Asaf Ali Road, Daryaganj, Old Delhi, New Delhi - 110002',
    shortLocation: 'Asaf Ali Road, Daryaganj, New Delhi',
    rating: 4.7,
    reviewsCount: 1340,
    priceRange: '₹₹₹',
    avgCostForTwo: '₹2,800 for two (approx.)',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    foodImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'An enchanting treasure trove of vintage Indian curiosities, serving authentic multi-course Kashmiri Wazwan feasts.',
    fullDesc: 'Chor Bizarre captures the spirit of the \'thieves market\' (Chor Bazaar) where no two tables or chairs match. Amidst vintage four-poster beds, vintage 1927 cars converted into salad bars, and heirloom silverware, the restaurant serves true royal Kashmiri Wazwan prepared by traditional Wazas from the Valley.',
    tags: ['Traditional Wazwan', 'Vintage 1927 Car Bar', 'Old Delhi Heritage', 'Eclectic Antiquities', 'Royal Chaat Counter'],
    hours: 'Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:30 PM',
    phone: '+91 11 4366 3600',
    dietary: ['Kashmiri Vegetarian Wazwan', 'Pure Saffron Kahwa', 'Traditional Halal'],
    signatureDishes: [
      { name: 'Tarami Kashmiri Wazwan Feast', desc: 'Traditional four-person copper platter with Rista, Gushtaba, Rogan Josh, and Tabak Maaz' },
      { name: 'Tabak Maaz', desc: 'Tender lamb ribs simmered in spiced milk, then pan-fried in pure ghee until crispy gold' },
      { name: 'Palak Riwaz', desc: 'Silky Kashmiri spinach cooked gently with lotus root and whole shallots' },
      { name: 'Kashmiri Kahwa', desc: 'Green tea brewed with crushed almonds, cardamom pods, and Kashmiri saffron threads' }
    ],
    floorSections: [
      { id: 'vintage-car', name: 'Vintage Roadster Enclave', desc: 'Seats right beside the 1927 convertible chaat buffet' },
      { id: 'four-poster', name: 'Antique Canopy Banquette', desc: 'Intimate dining within a carved four-poster wooden pavilion' },
      { id: 'waza-hall', name: 'Royal Wazwan Hall', desc: 'Traditional brass-decorated dining tables' }
    ]
  }
];

// Predefined available tables for the floor plan with reservation deposit fees (adjustable against final bill)
export const DEFAULT_FLOOR_TABLES = [
  { id: 'T1', number: 'Table 1', section: 'Window View', capacity: 2, label: 'Window Bay 2P', type: 'Window', price: 500 },
  { id: 'T2', number: 'Table 2', section: 'Window View', capacity: 4, label: 'Window Bay 4P', type: 'Window', price: 1000 },
  { id: 'T3', number: 'Table 3', section: 'Main Hall', capacity: 4, label: 'Central Salon 4P', type: 'Center', price: 800 },
  { id: 'T4', number: 'Table 4', section: 'Main Hall', capacity: 2, label: 'Intimate Bistro 2P', type: 'Center', price: 500 },
  { id: 'T5', number: 'Table 5', section: 'Royal Diwan', capacity: 6, label: 'Royal Diwan Booth 6P', type: 'Booth', price: 1500 },
  { id: 'T6', number: 'Table 6', section: 'Royal Diwan', capacity: 8, label: 'Family Diwan Suite 8P', type: 'Booth', price: 2000 },
  { id: 'T7', number: 'Table 7', section: 'Courtyard Patio', capacity: 4, label: 'Al-Fresco Verandah 4P', type: 'Outdoor', price: 1000 },
  { id: 'T8', number: 'Table 8', section: 'Courtyard Patio', capacity: 4, label: 'Garden Terrace 4P', type: 'Outdoor', price: 1000 }
];

export const TIME_SLOTS = [
  { time: '12:00 PM', period: 'Lunch', popular: false },
  { time: '12:30 PM', period: 'Lunch', popular: true },
  { time: '1:00 PM', period: 'Lunch', popular: true },
  { time: '1:30 PM', period: 'Lunch', popular: false },
  { time: '2:00 PM', period: 'Lunch', popular: false },
  { time: '7:00 PM', period: 'Dinner', popular: false },
  { time: '7:30 PM', period: 'Dinner', popular: true },
  { time: '8:00 PM', period: 'Dinner', popular: true },
  { time: '8:30 PM', period: 'Dinner', popular: true },
  { time: '9:00 PM', period: 'Dinner', popular: false },
  { time: '9:30 PM', period: 'Dinner', popular: false }
];
