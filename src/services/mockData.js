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
  { id: 'mandi_1', name: 'Coimbatore Mandi', nameHi: 'कोयंबटूर मंडी', distanceKm: 42, baseTransportCostPerKg: 2.6, handlingCostPerKg: 1.5, todayPricePerKg: 31.0, forecastDay2: 34.0, forecastDay3: 35.2, demandLevel: 'High', demandIndex: 92, arrivalVolumeTons: 420, coordinates: [11.0168, 76.9558] },
  { id: 'mandi_2', name: 'Madurai Mandi', nameHi: 'मदुरै मंडी', distanceKm: 128, baseTransportCostPerKg: 4.8, handlingCostPerKg: 1.5, todayPricePerKg: 33.0, forecastDay2: 34.5, forecastDay3: 33.8, demandLevel: 'Medium', demandIndex: 81, arrivalVolumeTons: 610, coordinates: [9.9252, 78.1198] },
  { id: 'mandi_3', name: 'Salem Mandi', nameHi: 'सलेम मंडी', distanceKm: 95, baseTransportCostPerKg: 3.8, handlingCostPerKg: 1.4, todayPricePerKg: 31.0, forecastDay2: 32.5, forecastDay3: 33.0, demandLevel: 'Medium', demandIndex: 76, arrivalVolumeTons: 350, coordinates: [11.6643, 78.1460] },
  { id: 'mandi_4', name: 'Erode Mandi', nameHi: 'इरोड मंडी', distanceKm: 76, baseTransportCostPerKg: 3.2, handlingCostPerKg: 1.3, todayPricePerKg: 30.5, forecastDay2: 31.2, forecastDay3: 32.1, demandLevel: 'Medium', demandIndex: 70, arrivalVolumeTons: 290, coordinates: [11.3410, 77.7172] },
  { id: 'mandi_5', name: 'Karur Mandi', nameHi: 'करूर मंडी', distanceKm: 88, baseTransportCostPerKg: 3.5, handlingCostPerKg: 1.4, todayPricePerKg: 29.8, forecastDay2: 30.5, forecastDay3: 31.0, demandLevel: 'Low', demandIndex: 65, arrivalVolumeTons: 180, coordinates: [10.9501, 78.0772] },
  { id: 'mandi_6', name: 'Pollachi Market', nameHi: 'पोलाची बाजार', distanceKm: 12, baseTransportCostPerKg: 1.0, handlingCostPerKg: 1.2, todayPricePerKg: 27.5, forecastDay2: 28.0, forecastDay3: 28.2, demandLevel: 'Low', demandIndex: 58, arrivalVolumeTons: 80, coordinates: [10.6620, 77.0062] },
  { id: 'mandi_7', name: 'Tiruppur Mandi', nameHi: 'तिरुपुर मंडी', distanceKm: 55, baseTransportCostPerKg: 3.0, handlingCostPerKg: 1.5, todayPricePerKg: 30.5, forecastDay2: 31.8, forecastDay3: 32.0, demandLevel: 'High', demandIndex: 85, arrivalVolumeTons: 160, coordinates: [11.1085, 77.3411] },
  { id: 'mandi_8', name: 'Dindigul Market', nameHi: 'डिंडीगुल बाजार', distanceKm: 110, baseTransportCostPerKg: 4.2, handlingCostPerKg: 1.4, todayPricePerKg: 32.0, forecastDay2: 33.1, forecastDay3: 33.5, demandLevel: 'Medium', demandIndex: 77, arrivalVolumeTons: 210, coordinates: [10.3673, 77.9803] },
  { id: 'mandi_9', name: 'Trichy Mandi', nameHi: 'त्रिची मंडी', distanceKm: 160, baseTransportCostPerKg: 5.5, handlingCostPerKg: 1.6, todayPricePerKg: 34.0, forecastDay2: 35.5, forecastDay3: 36.1, demandLevel: 'High', demandIndex: 88, arrivalVolumeTons: 520, coordinates: [10.7905, 78.7047] },
  { id: 'mandi_10', name: 'Namakkal Market', nameHi: 'नमक्कल बाजार', distanceKm: 135, baseTransportCostPerKg: 4.9, handlingCostPerKg: 1.3, todayPricePerKg: 31.5, forecastDay2: 32.2, forecastDay3: 33.0, demandLevel: 'Medium', demandIndex: 72, arrivalVolumeTons: 195, coordinates: [11.2189, 78.1674] },
  { id: 'mandi_11', name: 'Theni Mandi', nameHi: 'थेनी मंडी', distanceKm: 145, baseTransportCostPerKg: 5.1, handlingCostPerKg: 1.5, todayPricePerKg: 32.8, forecastDay2: 34.0, forecastDay3: 34.5, demandLevel: 'High', demandIndex: 83, arrivalVolumeTons: 310, coordinates: [10.0104, 77.4768] },
  { id: 'mandi_12', name: 'Palani Market', nameHi: 'पलानी बाजार', distanceKm: 105, baseTransportCostPerKg: 4.0, handlingCostPerKg: 1.4, todayPricePerKg: 30.2, forecastDay2: 31.0, forecastDay3: 31.5, demandLevel: 'Low', demandIndex: 62, arrivalVolumeTons: 140, coordinates: [10.4500, 77.5200] },
  { id: 'mandi_13', name: 'Ooty Market', nameHi: 'ऊटी बाजार', distanceKm: 85, baseTransportCostPerKg: 4.5, handlingCostPerKg: 1.8, todayPricePerKg: 38.0, forecastDay2: 39.5, forecastDay3: 40.2, demandLevel: 'High', demandIndex: 95, arrivalVolumeTons: 85, coordinates: [11.4100, 76.6992] },
  { id: 'mandi_14', name: 'Coonoor Mandi', nameHi: 'कुनूर मंडी', distanceKm: 70, baseTransportCostPerKg: 3.8, handlingCostPerKg: 1.7, todayPricePerKg: 36.5, forecastDay2: 37.0, forecastDay3: 38.1, demandLevel: 'Medium', demandIndex: 75, arrivalVolumeTons: 65, coordinates: [11.3530, 76.7959] },
  { id: 'mandi_15', name: 'Mettupalayam', nameHi: 'मेट्टुपलयम', distanceKm: 35, baseTransportCostPerKg: 2.2, handlingCostPerKg: 1.4, todayPricePerKg: 30.0, forecastDay2: 31.5, forecastDay3: 32.0, demandLevel: 'High', demandIndex: 89, arrivalVolumeTons: 380, coordinates: [11.3000, 76.9500] },
  { id: 'mandi_16', name: 'Aroor Market', nameHi: 'अरूर बाजार', distanceKm: 180, baseTransportCostPerKg: 6.2, handlingCostPerKg: 1.3, todayPricePerKg: 32.5, forecastDay2: 33.0, forecastDay3: 33.5, demandLevel: 'Low', demandIndex: 55, arrivalVolumeTons: 110, coordinates: [12.0620, 78.4830] },
  { id: 'mandi_17', name: 'Dharmapuri Mandi', nameHi: 'धर्मपुरी मंडी', distanceKm: 195, baseTransportCostPerKg: 6.5, handlingCostPerKg: 1.4, todayPricePerKg: 31.8, forecastDay2: 32.5, forecastDay3: 33.0, demandLevel: 'Medium', demandIndex: 68, arrivalVolumeTons: 220, coordinates: [12.1211, 78.1582] },
  { id: 'mandi_18', name: 'Krishnagiri Market', nameHi: 'कृष्णागिरी बाजार', distanceKm: 220, baseTransportCostPerKg: 7.0, handlingCostPerKg: 1.5, todayPricePerKg: 33.5, forecastDay2: 34.0, forecastDay3: 34.5, demandLevel: 'Medium', demandIndex: 74, arrivalVolumeTons: 280, coordinates: [12.5186, 78.2137] },
  { id: 'mandi_19', name: 'Hosur Mandi', nameHi: 'होसुर मंडी', distanceKm: 250, baseTransportCostPerKg: 8.0, handlingCostPerKg: 1.6, todayPricePerKg: 35.0, forecastDay2: 36.5, forecastDay3: 37.0, demandLevel: 'High', demandIndex: 91, arrivalVolumeTons: 450, coordinates: [12.7409, 77.8253] },
  { id: 'mandi_20', name: 'Gobichettipalayam', nameHi: 'गोबी चेट्टीपलायम', distanceKm: 65, baseTransportCostPerKg: 3.5, handlingCostPerKg: 1.3, todayPricePerKg: 29.5, forecastDay2: 30.0, forecastDay3: 30.5, demandLevel: 'Medium', demandIndex: 66, arrivalVolumeTons: 150, coordinates: [11.4547, 77.4363] }
];

export const MARKET_TREND_DATA = [
  { day: '24 Jul', history: 28, forecast: null, lower: null, upper: null },
  { day: '30 Jul', history: 29, forecast: null, lower: null, upper: null },
  { day: '5 Aug', history: 31, forecast: null, lower: null, upper: null },
  { day: '11 Aug', history: 30, forecast: null, lower: null, upper: null },
  { day: '17 Aug', history: 32, forecast: null, lower: null, upper: null },
  { day: 'Today', history: 31, forecast: 31, lower: 31, upper: 31 },
  { day: '+1', history: null, forecast: 32.1, lower: 31.5, upper: 32.8 },
  { day: '+2', history: null, forecast: 34.0, lower: 33.2, upper: 34.9 },
  { day: '+3', history: null, forecast: 35.2, lower: 34.1, upper: 36.4 },
  { day: '+4', history: null, forecast: 33.1, lower: 32.0, upper: 34.3 },
  { day: '+5', history: null, forecast: 31.8, lower: 30.5, upper: 33.0 },
  { day: '+6', history: null, forecast: 31.2, lower: 29.8, upper: 32.5 }
];

export const PROFIT_BREAKDOWN_DATA = [
  { name: 'Transport Cost', value: 2.6, fill: '#ef4444' },
  { name: 'Market Fee', value: 0.4, fill: '#f59e0b' },
  { name: 'Loading Cost', value: 0.2, fill: '#8b5cf6' },
  { name: 'Net Profit', value: 30.8, fill: '#10b981' }
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
