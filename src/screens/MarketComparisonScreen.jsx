import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ChartCard from '../components/cards/ChartCard';
import MarketCard from '../components/cards/MarketCard';
import { getCropPriceForecast } from '../services/aiEngine';
import { TRANSPORT_VEHICLES } from '../services/mockData';
import { Truck, MapPin, Navigation, ArrowLeft, Fuel, Info, CheckCircle2 } from 'lucide-react';

export default function MarketComparisonScreen({ setScreen }) {
  const { recommendation, lang } = useApp();

  const [selectedVehicle, setSelectedVehicle] = useState('mini_truck');
  const priceForecastData = getCropPriceForecast();
  const allMandis = recommendation?.allMandis || [];

  const vehicleInfo = TRANSPORT_VEHICLES.find(v => v.id === selectedVehicle) || TRANSPORT_VEHICLES[1];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setScreen('dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Screen 7 — Market Comparison
        </span>
      </div>

      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          5-Mandi Net Profit Comparison
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Comparing nearby markets by deducting Google Maps route logistics cost from forecast prices.
        </p>
      </div>

      {/* Main Table Design */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <th className="pb-3">Rank & Mandi</th>
                <th className="pb-3">Distance</th>
                <th className="pb-3">Forecast</th>
                <th className="pb-3">Transport</th>
                <th className="pb-3 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {allMandis.map((mandi, idx) => (
                <tr key={mandi.id} className={idx === 0 ? 'bg-emerald-50/70 font-extrabold' : ''}>
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                        idx === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-extrabold text-slate-900">{mandi.name}</span>
                        {idx === 0 && (
                          <span className="ml-1.5 text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded-full">
                            BEST
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">{mandi.distanceKm} km</td>
                  <td className="py-3.5 text-slate-900 font-bold">₹{mandi.forecastPrice}/kg</td>
                  <td className="py-3.5 text-rose-600 font-bold">-₹{mandi.transportCostPerKg}/kg</td>
                  <td className="py-3.5 text-right pr-2 text-emerald-700 font-black text-base">
                    ₹{mandi.netProfitPerKg}/kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7-Day Trend Chart */}
      <ChartCard
        title="7-Day Market Price Trend Forecast (Prophet Model)"
        subtitle="Visualizing price growth over the next 7 days"
        data={priceForecastData}
        dataKey="price"
        xAxisKey="day"
        height={240}
      />

      {/* Logistics Intelligence Calculator (Module 7) */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-base text-slate-900">
            Module 7 — Logistics Intelligence Calculator
          </h3>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Select vehicle type to automatically adjust route transport cost per kg.
        </p>

        {/* Vehicle Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TRANSPORT_VEHICLES.map(v => (
            <div
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition text-center tap-active ${
                selectedVehicle === v.id
                  ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <h5 className="font-extrabold text-xs text-slate-900">{v.name}</h5>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                Max Load: {v.maxLoadKg} kg
              </span>
              <span className="text-xs font-black text-emerald-700 block mt-1">
                Base ₹{v.baseFee} + ₹{v.costPerKmPerKg * 100}/km/ton
              </span>
            </div>
          ))}
        </div>

        {/* Route Details Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-amber-500" />
            <span>Estimated Fuel Expense for 42 km route: <strong className="text-slate-900">₹480</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-500" />
            <span>Travel Duration: <strong className="text-slate-900">42 mins</strong></span>
          </div>
          <span className="text-emerald-700 font-extrabold">Calculated Transport: ₹2.6/kg</span>
        </div>
      </div>

    </div>
  );
}
