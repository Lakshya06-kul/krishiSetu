// Seed data for AgriLink AI platform

export const INITIAL_USER_PROFILES = {
  farmer: {
    id: 'usr_farmer_1',
    name: 'Ramesh Kumar',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    location: 'Coimbatore Suburb, TN',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    acres: 3,
    primaryCrop: 'Tomatoes',
    language: 'en'
  },
  buyer: {
    id: 'usr_buyer_1',
    name: 'Priya Foods Pvt. Ltd.',
    contactPerson: 'Priya Sharma',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 91234 56789',
    company: 'Priya Wholesale Foods',
    verified: true,
    rating: 4.8,
    totalPurchases: 142,
    location: 'Coimbatore Central',
    preferredCrops: ['Tomatoes', 'Onions', 'Potatoes']
  },
  fpo: {
    id: 'usr_fpo_1',
    name: 'Anita Sharma (Kongu FPO)',
    role: 'fpo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 94444 11223',
    fpoName: 'Kongu Farmer Producer Co.',
    membersCount: 120,
    totalAcres: 450,
    location: 'Erode-Coimbatore Belt'
  }
};

export const CROPS_CATALOG = [
  { id: 'tomatoes', name: 'Fresh Tomatoes', nameHi: 'ताजा टमाटर', icon: '🍅', avgPrice: 32, unit: 'kg' },
  { id: 'onions', name: 'Nashik Onions', nameHi: 'नासिक प्याज', icon: '🧅', avgPrice: 24, unit: 'kg' },
  { id: 'potatoes', name: 'Jyoti Potatoes', nameHi: 'आलू', icon: '🥔', avgPrice: 20, unit: 'kg' },
  { id: 'cauliflower', name: 'Cauliflower', nameHi: 'फूलगोभी', icon: '🥦', avgPrice: 28, unit: 'kg' },
  { id: 'carrots', name: 'Ooty Carrots', nameHi: 'गाजर', icon: '🥕', avgPrice: 42, unit: 'kg' }
];

export const MANDIS_DATABASE = [
  {
    id: 'mandi_1',
    name: 'Coimbatore Mandi',
    nameHi: 'कोयंबटूर मंडी',
    distanceKm: 42,
    baseTransportCostPerKg: 2.6,
    handlingCostPerKg: 1.5,
    todayPricePerKg: 31.0,
    forecastDay2: 34.0,
    forecastDay3: 35.2,
    demandLevel: 'High',
    arrivalVolumeTons: 14.5
  },
  {
    id: 'mandi_2',
    name: 'Madurai Mandi',
    nameHi: 'मदुरै मंडी',
    distanceKm: 128,
    baseTransportCostPerKg: 4.8,
    handlingCostPerKg: 1.5,
    todayPricePerKg: 33.0,
    forecastDay2: 34.5,
    forecastDay3: 33.8,
    demandLevel: 'Medium',
    arrivalVolumeTons: 22.0
  },
  {
    id: 'mandi_3',
    name: 'Salem Mandi',
    nameHi: 'सलेम मंडी',
    distanceKm: 95,
    baseTransportCostPerKg: 3.8,
    handlingCostPerKg: 1.4,
    todayPricePerKg: 31.0,
    forecastDay2: 32.5,
    forecastDay3: 33.0,
    demandLevel: 'Medium',
    arrivalVolumeTons: 18.2
  },
  {
    id: 'mandi_4',
    name: 'Pollachi Local Market',
    nameHi: 'पोलाची स्थानीय बाजार',
    distanceKm: 12,
    baseTransportCostPerKg: 1.0,
    handlingCostPerKg: 1.2,
    todayPricePerKg: 27.5,
    forecastDay2: 28.0,
    forecastDay3: 28.2,
    demandLevel: 'Low',
    arrivalVolumeTons: 8.0
  },
  {
    id: 'mandi_5',
    name: 'Tiruppur Mandi',
    nameHi: 'तिरुपुर मंडी',
    distanceKm: 55,
    baseTransportCostPerKg: 3.0,
    handlingCostPerKg: 1.5,
    todayPricePerKg: 30.5,
    forecastDay2: 31.8,
    forecastDay3: 32.0,
    demandLevel: 'High',
    arrivalVolumeTons: 16.0
  }
];

export const INITIAL_PRODUCE_LOTS = [
  {
    id: 'lot_101',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    crop: 'Tomatoes',
    quantity: 1000,
    unit: 'kg',
    harvestDate: '2026-08-22',
    location: 'Coimbatore Rural',
    distanceKm: 12,
    organic: false,
    qualityNotes: 'Bright red, firm skin, harvest ready.',
    grade: 'A',
    qualityConfidence: 88,
    qualityBonus: 1.5,
    colorScore: 92,
    sizeScore: 86,
    freshnessScore: 95,
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'ACTIVE',
    createdAt: '2026-08-22T14:30:00Z'
  },
  {
    id: 'lot_102',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    crop: 'Nashik Onions',
    quantity: 1500,
    unit: 'kg',
    harvestDate: '2026-08-20',
    location: 'Coimbatore Rural',
    distanceKm: 18,
    organic: true,
    qualityNotes: 'Dry outer skin, uniform bulb size.',
    grade: 'A',
    qualityConfidence: 91,
    qualityBonus: 2.0,
    colorScore: 89,
    sizeScore: 93,
    freshnessScore: 90,
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80'
    ],
    status: 'ACTIVE',
    createdAt: '2026-08-20T10:15:00Z'
  }
];

export const INITIAL_BUYER_OFFERS = [
  {
    id: 'off_201',
    lotId: 'lot_101',
    buyerId: 'usr_buyer_1',
    buyerName: 'Priya Foods Pvt. Ltd.',
    buyerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    offeredPricePerKg: 32.5,
    totalAmount: 32500,
    status: 'PENDING',
    createdAt: '2026-08-23T08:30:00Z',
    note: 'Interested in Grade-A tomatoes. Payment via UPI instant.'
  },
  {
    id: 'off_202',
    lotId: 'lot_101',
    buyerId: 'usr_buyer_2',
    buyerName: 'FreshDirect Hypermarket',
    buyerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    verified: true,
    offeredPricePerKg: 31.0,
    totalAmount: 31000,
    status: 'PENDING',
    createdAt: '2026-08-23T09:15:00Z',
    note: 'Can pick up directly from farm location.'
  }
];

export const TRANSPORT_VEHICLES = [
  { id: 'tractor', name: 'Tractor Trailer', maxLoadKg: 2000, costPerKmPerKg: 0.05, baseFee: 300 },
  { id: 'mini_truck', name: 'Mini Truck (Tata Ace)', maxLoadKg: 1000, costPerKmPerKg: 0.06, baseFee: 250 },
  { id: 'large_truck', name: 'Heavy Duty Truck', maxLoadKg: 10000, costPerKmPerKg: 0.03, baseFee: 800 }
];
