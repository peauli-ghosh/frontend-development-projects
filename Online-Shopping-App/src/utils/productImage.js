const U = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

const images = {
  clothing: [
    U('photo-1602810318383-e386cc2a3ccf'),
    U('photo-1515886657613-9f3515b0c78f'),
    U('photo-1529139574466-a303027c1d8b'),
    U('photo-1551488831-00ddcb6c6bd3')
  ],

  shoes: [
    U('photo-1542291026-7eec264c27ff'),
    U('photo-1525966222134-fcfa99b8ae77'),
    U('photo-1552346154-21d32810aba3')
  ],

  backpack: [
    U('photo-1553062407-98eeb64c6a62')
  ],

  suitcase: [
    U('photo-1553531384-cc64ac80f931')
  ],

  watch: [
    U('photo-1523275335684-37898b6baf30')
  ],

  headphones: [
    U('photo-1505740420928-5e560c06d30e')
  ],

  earbuds: [
    U('photo-1590658268037-6bf12165a8df')
  ],

  laptop: [
    U('photo-1496181133206-80ce9b88a853')
  ],

  camera: [
    U('photo-1516035069371-29a1b244cc32')
  ],

  coffee: [
    U('photo-1517668808822-9ebb02f2a0e6')
  ],

  furniture: [
    U('photo-1567538096630-e0c55bd6374c'),
    U('photo-1555041469-a586c61ea9bc')
  ],

  lamp: [
    U('photo-1507473885765-e6ed057f782c')
  ],

  beauty: [
    U('photo-1620916566398-39f1143ab7be'),
    U('photo-1556229010-6c3f2c9ca5f8')
  ],

  sports: [
    U('photo-1517836357463-d25dfeac3438'),
    U('photo-1461896836934-ffe607ba8211')
  ],

  books: [
    U('photo-1544947950-fa07a98d237e'),
    U('photo-1512820790803-83ca734da794')
  ],

  grocery: [
    U('photo-1506617420156-8e4536971650'),
    U('photo-1542838132-92c53300491e')
  ],

  health: [
    U('photo-1584308666744-24d5c474f2ae'),
    U('photo-1576091160399-112ba8d25d1d')
  ]
};

const pick = (list, index = 0) =>
  list[index % list.length];

export function getProductImage(product) {
  const title = `${product?.title || ''} ${product?.brand || ''}`.toLowerCase();
  const index = Number(product?.id || 0);

  // TRAVEL
  if (/suitcase|luggage|trolley|hardcase|carry.?on/.test(title)) {
    return pick(images.suitcase);
  }

  if (/backpack|rucksack|travel bag|travel organizer/.test(title)) {
    return pick(images.backpack);
  }

  // FOOTWEAR
  if (/shoe|sneaker|footwear|running/.test(title)) {
    return pick(images.shoes, index);
  }

  // WATCHES
  if (/watch|smartwatch|chronograph/.test(title)) {
    return pick(images.watch);
  }

  // AUDIO
  if (/headphone/.test(title)) {
    return pick(images.headphones);
  }

  if (/earbud/.test(title)) {
    return pick(images.earbuds);
  }

  // COMPUTERS
  if (/laptop|notebook|computer/.test(title)) {
    return pick(images.laptop);
  }

  // CAMERAS
  if (/camera|dslr|mirrorless/.test(title)) {
    return pick(images.camera);
  }

  // COFFEE MACHINES
  if (/coffee maker|espresso|coffee machine/.test(title)) {
    return pick(images.coffee);
  }

  // HOME / FURNITURE
  if (
    /chair|sofa|couch|table|furniture|desk organizer|storage basket|pillow|bedsheet|dinner set|cookware|vacuum/.test(title)
  ) {
    return pick(images.furniture, index);
  }

  // LIGHTING
  if (/lamp|lighting|light/.test(title)) {
    return pick(images.lamp);
  }

  // BEAUTY
  if (
    /serum|cleanser|sunscreen|moisturizer|lip balm|shampoo|conditioner|lotion|mask|perfume|beauty/.test(title)
  ) {
    return pick(images.beauty, index);
  }

  // CLOTHING
  if (
    /shirt|t-shirt|overshirt|kurta|saree|anarkali|chinos|cargo|polo|jogger|co-ord|clothing|apparel/.test(title)
  ) {
    return pick(images.clothing, index);
  }

  // CATEGORY FALLBACKS
  if (product?.category === 'sports') {
    return pick(images.sports, index);
  }

  if (product?.category === 'books') {
    return pick(images.books, index);
  }

  if (product?.category === 'grocery') {
    return pick(images.grocery, index);
  }

  if (product?.category === 'health') {
    return pick(images.health, index);
  }

  return product?.image || images.clothing[0];
}
