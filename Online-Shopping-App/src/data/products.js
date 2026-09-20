export const categories = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
  { id: 'beauty', name: 'Beauty', icon: '🧴' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' },
  { id: 'health', name: 'Health Care', icon: '🩺' }
];

const imageSets = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85'
  ],
  home: [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85'
  ],
  sports: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85'
  ],
  books: [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237e?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85'
  ],
  grocery: [
    'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=85'
  ],
  health: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85'
  ]
};

const brandPool = {
  electronics: ['Sony', 'Apple', 'Samsung', 'JBL', 'boAt', 'OnePlus', 'Dell', 'Lenovo', 'Logitech', 'VIVA Tech'],
  fashion: ['Nike', 'Adidas', 'Levi’s', 'H&M', 'Zara', 'Puma', 'Uniqlo', 'Van Heusen', 'Allen Solly', 'VIVA Style'],
  home: ['IKEA', 'Philips', 'Havells', 'Prestige', 'Milton', 'Wakefit', 'Dyson', 'Godrej', 'Kurlon', 'VIVA Home'],
  beauty: ['Ordinary', 'CeraVe', 'Minimalist', 'Cetaphil', 'Maybelline', 'L’Oréal', 'Nivea', 'Plum', 'Neutrogena', 'VIVA Beauty'],
  sports: ['Nike', 'Adidas', 'Puma', 'Asics', 'Decathlon', 'Yonex', 'Reebok', 'Under Armour', 'HRX', 'VIVA Active'],
  books: ['Penguin', 'HarperCollins', 'Rupa', 'Bloomsbury', 'Pan Macmillan', 'Oxford', 'Cambridge', 'VIVA Reads'],
  grocery: ['Tata', 'Aashirvaad', 'Fortune', 'Organic India', 'Amul', 'Dabur', 'Nestlé', 'Lipton', 'VIVA Fresh'],
  health: ['Dr. Trust', 'Himalaya', 'HealthKart', 'Omron', 'Beurer', 'Accu-Chek', 'Dettol', 'Vicks', 'VIVA Care']
};

const seeds = [
  ['AeroSound Pro ANC Headphones','electronics',7999,9999,4.6,1284,'Best Seller',8,'Tomorrow',0],
  ['Linen Relaxed Fit Overshirt','fashion',2199,3299,4.4,812,'Trending',14,'2 days',0],
  ['PureGlow Niacinamide Serum 10%','beauty',899,1199,4.7,845,'Top Rated',22,'Tomorrow',0],
  ['BrewMate Compact Coffee Maker','home',3499,6999,4.3,963,'50% Off',7,'2 days',0],
  ['UrbanTrail Travel Backpack 28L','fashion',1999,2999,4.5,1108,'Deal',19,'Tomorrow',0],
  ['PulseFit Smartwatch AMOLED','electronics',5499,7999,4.5,1560,'New',11,'Tomorrow',0],
  ['CloudNest Lounge Accent Chair','home',8999,11999,4.6,276,'Home Pick',5,'5 days',0],
  ['MoveDaily Training Sneakers','sports',2899,5999,4.5,732,'Bestseller',16,'Tomorrow',0],
  ['The Art of Clear Thinking','books',549,799,4.8,2104,'Reader Pick',31,'Tomorrow',0],
  ['PureHarvest Premium Green Tea','grocery',399,699,4.6,1180,'Fresh',40,'Tomorrow',0],
  ['Aura Ceramic Table Lamp','home',1599,3199,4.4,489,'New',12,'2 days',0],
  ['FlexCore Yoga Mat Pro','sports',1299,1899,4.7,926,'Fitness Pick',27,'Tomorrow',0]
];

const names = {
  electronics: ['Wireless Earbuds Pro','Noise Cancelling Headphones','5G Android Smartphone','Ultra HD Smart TV','Mechanical Keyboard','Wireless Mouse','Portable Bluetooth Speaker','Fast Charge Power Bank','USB-C Hub','Gaming Monitor','Smart Home Camera','Laptop Stand','Tablet 11-inch','Smart LED Bulb'],
  fashion: ['Oversized Cotton T-Shirt','Classic Denim Jacket','Slim Fit Chinos','Everyday Kurta','Cotton Saree','Embroidered Anarkali','Relaxed Cargo Pants','Leather Finish Wallet','Canvas Sneakers','Minimal Tote Bag','Linen Co-ord Set','Classic Polo Shirt','Printed Ethnic Kurta','Running Joggers'],
  home: ['Air Fryer 4L','Memory Foam Pillow','Bamboo Bedsheet Set','Minimal Wall Clock','Ceramic Dinner Set','Non-stick Cookware Set','Desk Organizer','LED Floor Lamp','Storage Basket Set','Robot Vacuum Cleaner','Scented Candle Set','Wooden Coffee Table'],
  beauty: ['Hyaluronic Acid Serum','Vitamin C Face Serum','Gentle Face Cleanser','SPF 50 Sunscreen','Hydrating Moisturizer','Lip Balm Set','Hair Repair Mask','Shampoo & Conditioner Set','Body Lotion','Clay Face Mask','Perfume Mist','Niacinamide Cleanser'],
  sports: ['Everyday Running Shoes','Performance T-Shirt','Resistance Bands Set','Adjustable Dumbbells','Insulated Sports Bottle','Cricket Bat','Badminton Racket','Football Training Ball','Gym Gloves','Skipping Rope','Cycling Helmet','Training Shorts'],
  books: ['Atomic Habits','The Psychology of Money','Ikigai','Deep Work','The Alchemist','Rich Dad Poor Dad','The Midnight Library','Think Like a Monk','Wings of Fire','The Courage to Be Disliked'],
  grocery: ['Premium Basmati Rice','Organic Honey','Cold Pressed Groundnut Oil','Roasted Almonds','Dark Chocolate Pack','Instant Coffee','Whole Wheat Pasta','Protein Oats','Herbal Tea','Peanut Butter','Organic Jaggery','Mixed Nuts Jar'],
  health: ['Digital Blood Pressure Monitor','Pulse Oximeter','Digital Thermometer','First Aid Kit','Heating Pad','Reusable Hot & Cold Pack','Daily Wellness Organizer','Electric Massager','Vitamin Storage Case','Medicine Box','Posture Corrector','Sleep Eye Mask']
};

const badgePool = ['Popular','Trending','Top Rated','New','Great Value','Bestseller','Limited Deal'];
let id = 13;
const generated = [];
Object.entries(names).forEach(([category, list]) => {
  list.forEach((title, index) => {
    const brand = brandPool[category][index % brandPool[category].length];
    const base = 499 + ((index * 743 + category.length * 311) % 8500);
    const deepDeal = index % 5 === 0;
    const oldPrice = deepDeal ? Math.round(base / 0.48) : Math.round(base / (0.68 + (index % 3) * 0.05));
    const price = base;
    generated.push({
      id: id++, title, brand, category, price, oldPrice, rating: Number((4.1 + (index % 8) * 0.1).toFixed(1)),
      reviews: 120 + index * 137, badge: deepDeal ? '50%+ Deal' : badgePool[index % badgePool.length], stock: 4 + (index * 7) % 34,
      delivery: index % 4 === 0 ? 'Tomorrow' : `${2 + (index % 4)} days`, image: imageSets[category][index % imageSets[category].length],
      colors: ['Black','Sage','Ivory'].slice(0, 1 + index % 3)
    });
  });
});


const brandExtras = [
  {id:111,title:'Heritage Automatic Watch',brand:'Rolex',category:'fashion',price:18999,oldPrice:39999,rating:4.8,reviews:532,badge:'Luxury Deal',stock:4,delivery:'2 days',image:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',colors:['Silver']},
  {id:112,title:'Urban Chronograph Watch',brand:'Fastrack',category:'fashion',price:2499,oldPrice:5999,rating:4.5,reviews:1420,badge:'50%+ Deal',stock:9,delivery:'Tomorrow',image:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85',colors:['Black']},
  {id:113,title:'Everyday Smart Essentials Kit',brand:'VIVA Select',category:'electronics',price:1999,oldPrice:4999,rating:4.6,reviews:388,badge:'50%+ Deal',stock:18,delivery:'Tomorrow',image:'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=85',colors:['Black']},
  {id:114,title:'Classic Green Dial Watch',brand:'Ordinary',category:'fashion',price:3299,oldPrice:6999,rating:4.5,reviews:671,badge:'Popular',stock:10,delivery:'Tomorrow',image:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=85',colors:['Green']},
  {id:115,title:'VIVA Select Travel Organizer',brand:'VIVA Select',category:'fashion',price:899,oldPrice:1999,rating:4.4,reviews:287,badge:'50%+ Deal',stock:25,delivery:'Tomorrow',image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',colors:['Forest']},
];
export const products = [
  ...seeds.map((p, i) => ({ id: p[0] ? p[0] && i + 1 : i + 1, title:p[0], category:p[1], price:p[2], oldPrice:p[3], rating:p[4], reviews:p[5], badge:p[6], stock:p[7], delivery:p[8], image:imageSets[p[1]][p[9] % imageSets[p[1]].length], brand: ['Sony','VIVA Style','Ordinary','Prestige','American Tourister','Apple','IKEA','Nike','Penguin','Tata','Philips','Decathlon'][i], colors: ['Black','Ivory'] })),
  ...generated,
  ...brandExtras
];

export const brands = ['Nike','American Tourister','Rolex','Ordinary','Fastrack','VIVA Select','Sony','Apple','Samsung','Adidas','Levi’s','IKEA','Philips','Minimalist','Cetaphil','Puma','OnePlus','H&M','Prestige','Dyson','Tata','Amul','HealthKart','Omron'];

export const coupons = { VIVA10: 10, SAVE15: 15, WELCOME20: 20, GREEN25: 25 };
