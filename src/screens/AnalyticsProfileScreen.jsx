import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area } from 'recharts';
import { User, BarChart3, Download, Settings, ShieldCheck, Phone, MapPin, Globe, Bell, Users, Building, FileText, CheckCircle2, Lock, ToggleLeft, ToggleRight, Star, History } from 'lucide-react';

// --- FARMER MOCK DATA ---
const FARMER_DATA = {
  Week: [
    { label: 'Mon', revenue: 4000, profit: 3200 }, { label: 'Tue', revenue: 3500, profit: 2800 },
    { label: 'Wed', revenue: 5000, profit: 4100 }, { label: 'Thu', revenue: 4200, profit: 3400 },
    { label: 'Fri', revenue: 6000, profit: 5000 }, { label: 'Sat', revenue: 5500, profit: 4600 },
    { label: 'Sun', revenue: 7000, profit: 5800 }
  ],
  Month: [
    { label: 'Apr', revenue: 24000, profit: 18500 }, { label: 'May', revenue: 28500, profit: 22000 },
    { label: 'Jun', revenue: 35000, profit: 27800 }, { label: 'Jul', revenue: 31000, profit: 24200 },
    { label: 'Aug', revenue: 42000, profit: 34500 }
  ],
  Season: [
    { label: 'Kharif 25', revenue: 120000, profit: 95000 },
    { label: 'Rabi 25-26', revenue: 145000, profit: 110000 },
    { label: 'Zaid 26', revenue: 85000, profit: 68000 },
    { label: 'Kharif 26', revenue: 160000, profit: 130000 }
  ]
};

const CROP_PERFORMANCE = [
  { crop: 'Tomatoes', yield: 4.5, profitPerKg: 31.4 },
  { crop: 'Onions', yield: 6.2, profitPerKg: 21.0 },
  { crop: 'Potatoes', yield: 3.8, profitPerKg: 17.5 },
  { crop: 'Carrots', yield: 2.1, profitPerKg: 38.0 }
];
const MARKET_SHARE = [
  { name: 'Coimbatore Mandi', value: 45, color: '#16A34A' },
  { name: 'Madurai Mandi', value: 25, color: '#2563EB' },
  { name: 'Salem Mandi', value: 20, color: '#F59E0B' },
  { name: 'Direct Buyers', value: 10, color: '#8B5CF6' }
];

// --- BUYER MOCK DATA ---
const BUYER_DATA = {
  Week: [
    { label: 'Week 1', spend: 35000, volume: 1100 }, { label: 'Week 2', spend: 42000, volume: 1400 },
    { label: 'Week 3', spend: 38000, volume: 1250 }, { label: 'Week 4', spend: 45000, volume: 1500 }
  ],
  Month: [
    { label: 'Apr', spend: 120000, volume: 4000 }, { label: 'May', spend: 155000, volume: 5500 },
    { label: 'Jun', spend: 180000, volume: 6200 }, { label: 'Jul', spend: 140000, volume: 4800 },
    { label: 'Aug', spend: 210000, volume: 7000 }
  ],
  Season: [
    { label: 'Q1 2026', spend: 450000, volume: 15000 },
    { label: 'Q2 2026', spend: 520000, volume: 17500 },
    { label: 'Q3 2026', spend: 610000, volume: 20000 }
  ]
};

const QUALITY_PROCURED = [
  { name: 'Grade A', value: 65, color: '#16A34A' },
  { name: 'Grade B', value: 30, color: '#F59E0B' },
  { name: 'Grade C', value: 5, color: '#EF4444' }
];

// --- FPO MOCK DATA ---
const FPO_DATA = {
  Week: [
    { label: 'Mon', members: 118, poolVolume: 2500, revenue: 75000 }, { label: 'Tue', members: 119, poolVolume: 3200, revenue: 95000 },
    { label: 'Wed', members: 119, poolVolume: 2800, revenue: 84000 }, { label: 'Thu', members: 120, poolVolume: 3500, revenue: 105000 },
    { label: 'Fri', members: 120, poolVolume: 4100, revenue: 122000 }, { label: 'Sat', members: 120, poolVolume: 3900, revenue: 116000 },
    { label: 'Sun', members: 120, poolVolume: 2000, revenue: 60000 }
  ],
  Month: [
    { label: 'Apr', members: 105, poolVolume: 12000, revenue: 380000 }, { label: 'May', members: 110, poolVolume: 15000, revenue: 450000 },
    { label: 'Jun', members: 115, poolVolume: 18000, revenue: 520000 }, { label: 'Jul', members: 118, poolVolume: 16500, revenue: 490000 },
    { label: 'Aug', members: 120, poolVolume: 22000, revenue: 650000 }
  ],
  Season: [
    { label: 'Winter 25', members: 95, poolVolume: 45000, revenue: 1350000 },
    { label: 'Summer 26', members: 110, poolVolume: 52000, revenue: 1580000 },
    { label: 'Monsoon 26', members: 120, poolVolume: 65000, revenue: 1950000 }
  ]
};

export default function AnalyticsProfileScreen() {
  const { userProfile, currentRole, lang, toggleLanguage, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'profile' | 'settings'
  const [timeFilter, setTimeFilter] = useState('Month');
  
  // Mock Settings State
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [autoVerify, setAutoVerify] = useState(true);

  const handleCsvExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Mock,Data,Export\n1,2,3";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AgriLink_${currentRole}_Analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${currentRole.toUpperCase()} analytics report exported as CSV!`);
  };

  // ----------------------------------------------------
  // ROLE SPECIFIC ANALYTICS VIEWS
  // ----------------------------------------------------
  const renderFarmerAnalytics = () => {
    const data = FARMER_DATA[timeFilter];
    const totalRev = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Summary */}
        <div className="md:col-span-2 flex gap-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-blue-600 font-bold uppercase">{timeFilter} Revenue</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalRev.toLocaleString()}</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-emerald-600 font-bold uppercase">{timeFilter} Profit</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalProfit.toLocaleString()}</h3>
          </div>
        </div>

        {/* Chart 1: Revenue & Profit Trend Line */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft">
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">Net Revenue & Profit Trend</h4>
          <p className="text-xs text-slate-500 font-medium mb-4">Earnings after deductions</p>
          
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} name="Gross Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={3} name="Net Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Chart 2: Crop Profitability Bar Chart */}
      <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft">
        <h4 className="font-extrabold text-sm text-slate-900 mb-1">Crop Profitability (₹/kg)</h4>
        <p className="text-xs text-slate-500 font-medium mb-4">Average net earnings per crop variety</p>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CROP_PERFORMANCE} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="crop" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="profitPerKg" fill="#16A34A" radius={[6, 6, 0, 0]} name="Net Profit (₹/kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Market Share Doughnut */}
      <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-extrabold text-base text-slate-900">Mandi Market Share Breakdown</h4>
          <p className="text-xs text-slate-500 font-medium mt-1">Distribution of harvest sales across regional mandis</p>
          <div className="mt-4 space-y-2">
            {MARKET_SHARE.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={MARKET_SHARE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4}>
                {MARKET_SHARE.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    );
  };

  const renderBuyerAnalytics = () => {
    const data = BUYER_DATA[timeFilter];
    const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);
    const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Summary */}
        <div className="md:col-span-2 flex gap-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-blue-600 font-bold uppercase">{timeFilter} Spend</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalSpend.toLocaleString()}</h3>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-purple-600 font-bold uppercase">{timeFilter} Volume</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalVolume.toLocaleString()} kg</h3>
          </div>
        </div>

        {/* Buyer Chart 1: Spend & Volume */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft">
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">Procurement Spend Trend</h4>
          <p className="text-xs text-slate-500 font-medium mb-4">Total capital spent on farm procurements</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="spend" stroke="#2563EB" fillOpacity={1} fill="url(#colorSpend)" name="Spend (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Buyer Chart 2: Quality Procured */}
      <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-extrabold text-base text-slate-900">Procured Quality Distribution</h4>
          <p className="text-xs text-slate-500 font-medium mt-1">Breakdown of AI-certified crop grades purchased</p>
          <div className="mt-4 space-y-2">
            {QUALITY_PROCURED.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={QUALITY_PROCURED} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4}>
                {QUALITY_PROCURED.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    );
  };

  const renderFpoAnalytics = () => {
    const data = FPO_DATA[timeFilter];
    const totalRev = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalVolume = data.reduce((sum, item) => sum + item.poolVolume, 0);

    return (
      <div className="grid grid-cols-1 gap-6">
        {/* Total Summary */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-amber-600 font-bold uppercase">{timeFilter} Pooled Volume</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalVolume.toLocaleString()} kg</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex-1">
            <p className="text-xs text-emerald-600 font-bold uppercase">{timeFilter} Revenue</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalRev.toLocaleString()}</h3>
          </div>
        </div>

        {/* FPO Chart: Aggregate Pool Volume & Revenue */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft">
          <h4 className="font-extrabold text-sm text-slate-900 mb-1">Group Pooled Volume & Total Revenue</h4>
          <p className="text-xs text-slate-500 font-medium mb-4">Aggregated performance of member farmers</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={3} name="Total Group Revenue (₹)" />
                <Line yAxisId="right" type="monotone" dataKey="poolVolume" stroke="#F59E0B" strokeWidth={3} name="Pooled Volume (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // ROLE SPECIFIC PROFILES
  // ----------------------------------------------------
  const renderFarmerProfile = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <span className="text-slate-500 font-bold uppercase block text-[10px]">Farm Size / Area</span>
        <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.acres || 3} Acres</span>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <span className="text-slate-500 font-bold uppercase block text-[10px]">Primary Crop</span>
        <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.primaryCrop || 'Tomatoes'}</span>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:col-span-2 flex items-center justify-between">
        <div>
          <span className="text-slate-500 font-bold uppercase block text-[10px]">Location</span>
          <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.location}</span>
        </div>
        <div className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-black border border-amber-200 shadow-sm">
          <Star className="w-4 h-4 fill-amber-500" />
          <span>4.9 / 5.0</span>
          <span className="text-[10px] ml-1 bg-amber-200 px-1.5 py-0.5 rounded text-amber-800">Certified Trusted</span>
        </div>
      </div>
    </div>
  );

  const renderBuyerProfile = () => (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
          <span className="text-slate-500 font-bold uppercase block text-[10px]">Company Name</span>
          <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.company}</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-bold uppercase block text-[10px]">Total Purchases</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.totalPurchases} Lots</span>
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3 h-3" /> Regular Verified Buyer
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-slate-600" />
          <h4 className="font-extrabold text-xs text-slate-900 uppercase">Recent Purchase History</h4>
        </div>
        <div className="space-y-2">
          {[
            { id: 1, farmer: 'Ramesh Kumar', crop: 'Tomatoes', qty: '1000kg', date: '22 Aug 2026' },
            { id: 2, farmer: 'Suresh Patil', crop: 'Nashik Onions', qty: '1500kg', date: '18 Aug 2026' },
            { id: 3, farmer: 'Anita Sharma (Kongu FPO)', crop: 'Ooty Carrots', qty: '500kg', date: '12 Aug 2026' }
          ].map(history => (
            <div key={history.id} className="bg-white border border-slate-100 p-2.5 rounded-lg flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{history.crop} <span className="text-slate-400 font-medium ml-1">({history.qty})</span></p>
                <p className="text-slate-500 font-medium mt-0.5">Bought from: <span className="text-blue-600 font-semibold">{history.farmer}</span></p>
              </div>
              <span className="text-slate-400 font-bold">{history.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFpoProfile = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <span className="text-slate-500 font-bold uppercase block text-[10px]">FPO Organization Name</span>
        <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.fpoName}</span>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <span className="text-slate-500 font-bold uppercase block text-[10px]">Active Members</span>
        <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.membersCount} Farmers</span>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:col-span-2 flex items-center justify-between">
        <div>
          <span className="text-slate-500 font-bold uppercase block text-[10px]">Total Pooled Acreage</span>
          <span className="font-extrabold text-slate-900 mt-0.5 block">{userProfile.totalAcres} Acres</span>
        </div>
        <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded flex items-center gap-1 font-bold">
          <Building className="w-3 h-3" /> FPO Admin
        </div>
      </div>
    </div>
  );


  // ----------------------------------------------------
  // ROLE SPECIFIC SETTINGS
  // ----------------------------------------------------
  const renderFarmerSettings = () => (
    <>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Mandi Price Alerts (Prophet Trigger)</span>
        </div>
        <button onClick={() => setAlertsEnabled(!alertsEnabled)} className={`flex items-center gap-1 ${alertsEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
          {alertsEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
        </button>
      </div>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>AI Quality Auto-Verification</span>
        </div>
        <button onClick={() => setAutoVerify(!autoVerify)} className={`flex items-center gap-1 ${autoVerify ? 'text-emerald-600' : 'text-slate-400'}`}>
          {autoVerify ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
        </button>
      </div>
    </>
  );

  const renderBuyerSettings = () => (
    <>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Auto-Bidding Rules</span>
        </div>
        <button className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded transition">Configure</button>
      </div>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>Grade A Lot Availability Alerts</span>
        </div>
        <button onClick={() => setAlertsEnabled(!alertsEnabled)} className={`flex items-center gap-1 ${alertsEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
          {alertsEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
        </button>
      </div>
    </>
  );

  const renderFpoSettings = () => (
    <>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-600" />
          <span>Member Crop Sync Schedule</span>
        </div>
        <button className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded transition">Daily at 08:00 AM</button>
      </div>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-blue-600" />
          <span>Automated Weekly Pool Reports</span>
        </div>
        <button onClick={() => setAutoVerify(!autoVerify)} className={`flex items-center gap-1 ${autoVerify ? 'text-emerald-600' : 'text-slate-400'}`}>
          {autoVerify ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
        </button>
      </div>
    </>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-8">
      
      {/* Top Header & Tab switcher */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Screens 10, 11 & 12 — {currentRole} View
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
            {activeTab === 'analytics' ? `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Analytics` : activeTab === 'profile' ? 'User Profile' : 'App Settings'}
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button onClick={() => setActiveTab('analytics')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            Analytics
          </button>
          <button onClick={() => setActiveTab('profile')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            Profile
          </button>
          <button onClick={() => setActiveTab('settings')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            Settings
          </button>
        </div>
      </div>

      {/* ---------------- ANALYTICS TAB ---------------- */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {['Week', 'Month', 'Season'].map(f => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    timeFilter === f ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={handleCsvExport}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 transition shadow-sm tap-active"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV Report</span>
            </button>
          </div>

          {currentRole === 'farmer' && renderFarmerAnalytics()}
          {currentRole === 'buyer' && renderBuyerAnalytics()}
          {currentRole === 'fpo' && renderFpoAnalytics()}
        </div>
      )}

      {/* ---------------- PROFILE TAB ---------------- */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <h3 className="font-black text-xl text-slate-900">{userProfile.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{userProfile.location}</p>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1 uppercase">
                {currentRole.toUpperCase()} PROFILE
              </span>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs max-w-sm mb-4">
              <span className="text-slate-500 font-bold uppercase block text-[10px]">Contact Mobile</span>
              <span className="font-extrabold text-slate-900 mt-0.5 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> {userProfile.phone}
              </span>
            </div>
            
            {currentRole === 'farmer' && renderFarmerProfile()}
            {currentRole === 'buyer' && renderBuyerProfile()}
            {currentRole === 'fpo' && renderFpoProfile()}
          </div>
        </div>
      )}

      {/* ---------------- SETTINGS TAB ---------------- */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Application Settings</h3>
          
          <div className="divide-y divide-slate-100 text-xs font-semibold">
            {/* Common Settings */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Primary Language</span>
              </div>
              <button onClick={toggleLanguage} className="font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                {lang === 'en' ? 'English (En)' : 'हिंदी (Hindi)'}
              </button>
            </div>
            
            {/* Role specific Settings */}
            {currentRole === 'farmer' && renderFarmerSettings()}
            {currentRole === 'buyer' && renderBuyerSettings()}
            {currentRole === 'fpo' && renderFpoSettings()}

            {/* Common Security */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Supabase Auth Token</span>
              </div>
              <span className="text-slate-500">Valid JWT</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
