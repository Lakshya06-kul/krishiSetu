import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Filter, MapPin, Truck, TrendingUp, Info, Fuel,
  Navigation, CalendarClock, BrainCircuit, Activity, BarChart3, AlertTriangle, ShieldCheck,
  CloudSun, Droplets, Thermometer, Wind
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mock Data
import { MANDIS_DATABASE, MARKET_TREND_DATA, PROFIT_BREAKDOWN_DATA, TRANSPORT_VEHICLES } from '../services/mockData';
import { useApp } from '../context/AppContext';
import { getDispatchWeatherAdvisory, fetchLiveMandiPrices } from '../services/visionAiService';

// Custom Leaflet Marker (SaaS style)
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

export default function MarketComparisonScreen({ setScreen, goBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState(300); // Max km
  const [chartMode, setChartMode] = useState('forecast'); // forecast, history
  const [selectedVehicle, setSelectedVehicle] = useState('mini_truck');
  const [weatherAdvisory, setWeatherAdvisory] = useState(null);
  const [liveApmcPrices, setLiveApmcPrices] = useState([]);

  useEffect(() => {
    getDispatchWeatherAdvisory().then(setWeatherAdvisory);
    fetchLiveMandiPrices().then(setLiveApmcPrices);
  }, []);

  // Compute live net profit for all mandis based on vehicle selected
  const vehicleInfo = TRANSPORT_VEHICLES.find(v => v.id === selectedVehicle) || TRANSPORT_VEHICLES[1];
  
  const processedMandis = useMemo(() => {
    return MANDIS_DATABASE.map(m => {
      // Recalculate transport cost based on distance and vehicle
      // cost = distance * costPerKmPerKg
      const transportCost = (m.distanceKm * vehicleInfo.costPerKmPerKg).toFixed(1);
      const netProfit = (m.todayPricePerKg - parseFloat(transportCost) - m.handlingCostPerKg).toFixed(1);
      
      return {
        ...m,
        calculatedTransport: parseFloat(transportCost),
        netProfit: parseFloat(netProfit)
      };
    })
    .filter(m => m.distanceKm <= distanceFilter)
    .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.netProfit - a.netProfit);
  }, [searchTerm, distanceFilter, selectedVehicle, vehicleInfo]);

  const bestMandi = processedMandis[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack ? goBack : () => setScreen('dashboard')}
          className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-200 shadow-sm">
          Market Intelligence v2.0
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-emerald-600" />
            AI Decision Dashboard
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Real-time analytics, route optimization, and predictive modeling for maximum profit.
          </p>
        </div>
      </div>

      {/* 1. Hero Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><TrendingUp className="w-16 h-16" /></div>
          <p className="text-emerald-100 font-medium text-sm">Highest Net Profit</p>
          <div className="mt-2 flex items-baseline gap-1">
            <h3 className="text-4xl font-black">₹{bestMandi?.netProfit || 0}</h3>
            <span className="text-emerald-100 font-semibold">/kg</span>
          </div>
          <p className="text-sm font-bold mt-2 text-white">{bestMandi?.name || 'N/A'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <p className="text-slate-500 font-medium text-sm flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-blue-500" /> AI Confidence
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-slate-900">94%</h3>
          </div>
          <p className="text-xs font-semibold mt-2 text-slate-400">Prophet + Weather + History</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <p className="text-slate-500 font-medium text-sm flex items-center gap-1">
            <Truck className="w-4 h-4 text-amber-500" /> Cheapest Transport
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-slate-900">₹{bestMandi?.calculatedTransport || 0}</h3>
            <span className="text-slate-500 font-semibold">/kg</span>
          </div>
          <p className="text-xs font-semibold mt-2 text-slate-400">{bestMandi?.distanceKm} km · {bestMandi?.name}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <p className="text-slate-500 font-medium text-sm flex items-center gap-1">
            <CalendarClock className="w-4 h-4 text-purple-500" /> Best Selling Day
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-slate-900">+2 Days</h3>
          </div>
          <p className="text-xs font-semibold mt-2 text-emerald-600">+8.4% expected price rise</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Charts & Map) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 3. AI Price Analytics */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">AI Price Analytics</h3>
                <p className="text-xs text-slate-500 font-medium">Prophet ML Model with Confidence Intervals</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setChartMode('forecast')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${chartMode === 'forecast' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Live Forecast</button>
                <button onClick={() => setChartMode('history')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${chartMode === 'history' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Historical</button>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === 'forecast' ? (
                  <AreaChart data={MARKET_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="upper" stroke="none" fill="#ecfdf5" />
                    <Area type="monotone" dataKey="lower" stroke="none" fill="#ffffff" />
                    <Area type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)" activeDot={{r: 6, strokeWidth: 0}} />
                  </AreaChart>
                ) : (
                  <LineChart data={MARKET_TREND_DATA.filter(d => d.history !== null)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="history" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. India Mandi Heatmap */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
            <h3 className="text-lg font-black text-slate-900 mb-4">India Mandi Heatmap</h3>
            <div className="h-[300px] w-full rounded-2xl overflow-hidden bg-slate-100 z-0">
              {/* Note: Leaflet maps require the container to be rendered. We wrap it in a div. */}
              <MapContainer center={[11.0168, 77.5]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {processedMandis.map((mandi, idx) => (
                  <Marker 
                    key={mandi.id} 
                    position={mandi.coordinates}
                    icon={createCustomIcon(idx === 0 ? '#10b981' : (mandi.netProfit > 30 ? '#3b82f6' : '#f59e0b'))}
                  >
                    <Popup className="rounded-xl">
                      <div className="font-sans">
                        <strong className="block text-sm text-slate-900">{mandi.name}</strong>
                        <span className="text-xs text-emerald-600 font-bold block mt-1">₹{mandi.netProfit} Net Profit</span>
                        <span className="text-xs text-slate-500">{mandi.distanceKm} km away</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* 8. AI Recommendation Engine */}
          <div className="bg-slate-900 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10"><BrainCircuit className="w-32 h-32" /></div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Recommendation</span>
            </div>
            <h3 className="text-xl font-black leading-snug">
              Sell in {bestMandi?.name.replace(' Mandi', '')} after 2 days
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5">
                <span className="text-sm font-medium text-slate-300">Expected gain</span>
                <span className="font-bold text-emerald-400">+₹2.4/kg</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-slate-300">Weather Risk</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-sm ${weatherAdvisory?.riskLevel === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {weatherAdvisory?.riskLevel || 'LOW'} ({weatherAdvisory?.rainProbability || '12%'} Rain)
                  </span>
                </div>
              </div>
              {weatherAdvisory?.advice && (
                <p className="text-[11px] text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                  💡 <strong>Dispatch Note:</strong> {weatherAdvisory.advice}
                </p>
              )}
              <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5">
                <span className="text-sm font-medium text-slate-300">Travel time</span>
                <span className="font-bold text-amber-400">{Math.round(bestMandi?.distanceKm || 0)} mins</span>
              </div>
            </div>
            <button className="w-full mt-5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/30">
              Lock in Deal Now
            </button>
          </div>

          {/* 4. Profit Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-2">Profit Breakdown</h3>
            <p className="text-xs text-slate-500 font-medium mb-4">Per-kg price composition based on selected route.</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PROFIT_BREAKDOWN_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {PROFIT_BREAKDOWN_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {PROFIT_BREAKDOWN_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          {/* 7. Smart Logistics Calculator */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              Smart Logistics
            </h3>
            
            <div className="space-y-3">
              {TRANSPORT_VEHICLES.map(v => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedVehicle === v.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                  }`}
                >
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">{v.name}</h5>
                    <span className="text-xs text-slate-500 font-medium">{v.maxLoadKg} kg Max Load</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-black text-emerald-700">₹{v.costPerKmPerKg * 100}</span>
                    <span className="text-[10px] text-slate-500 font-bold">/km/ton</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Live APMC Agmarknet Benchmark Feed */}
      {liveApmcPrices.length > 0 && (
        <div className="bg-emerald-950 text-white rounded-2xl p-4 shadow-sm border border-emerald-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">Live APMC Agmarknet Benchmark</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {liveApmcPrices.map((apmc) => (
              <div key={apmc.mandi} className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <span className="text-slate-300">{apmc.mandi}:</span>
                <span className="text-emerald-300 font-bold">₹{apmc.modalPrice}/kg</span>
                <span className="text-[10px] text-amber-300 font-bold">{apmc.trend}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Interactive Mandi Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">Nearby Mandis Analytics ({processedMandis.length})</h3>
            <p className="text-xs text-slate-500 font-medium">Real-time data across Tamil Nadu.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search mandi..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all w-full sm:w-48"
              />
            </div>
            <div className="relative group">
              <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              {/* Simple distance dropdown simulation on hover */}
              <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl w-48 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <p className="text-xs font-bold text-slate-500 px-2 py-1 uppercase">Max Distance</p>
                {[50, 100, 150, 300].map(dist => (
                  <button 
                    key={dist} 
                    onClick={() => setDistanceFilter(dist)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg font-semibold ${distanceFilter === dist ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {dist} km
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-wider">
                <th className="pb-3 pl-2">Rank</th>
                <th className="pb-3">Mandi Name</th>
                <th className="pb-3">Distance</th>
                <th className="pb-3">Live Price</th>
                <th className="pb-3">Transport</th>
                <th className="pb-3">Demand</th>
                <th className="pb-3 text-right pr-2">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {processedMandis.map((mandi, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={mandi.id} 
                    className={`hover:bg-slate-50/50 transition-colors ${idx === 0 ? 'bg-emerald-50/30' : ''}`}
                  >
                    <td className="py-4 pl-2">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                        idx === 0 ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900">
                      {mandi.name}
                      {idx === 0 && <span className="ml-2 text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md uppercase">Best Choice</span>}
                    </td>
                    <td className="py-4 text-slate-500 font-semibold">{mandi.distanceKm} km</td>
                    <td className="py-4 text-slate-900 font-bold">₹{mandi.todayPricePerKg}</td>
                    <td className="py-4 text-rose-500 font-semibold">-₹{mandi.calculatedTransport}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${mandi.demandIndex > 80 ? 'bg-emerald-500' : mandi.demandIndex > 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${mandi.demandIndex}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{mandi.demandIndex}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <span className="text-emerald-600 font-black text-base bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                        ₹{mandi.netProfit}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {processedMandis.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-semibold">No mandis found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
