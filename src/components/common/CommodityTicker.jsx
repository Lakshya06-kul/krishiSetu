import React from 'react';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';

const COMMODITY_PRICES = [
  { id: 1, crop: 'Tomatoes', emoji: '🍅', mandi: 'Coimbatore Mandi', price: '₹34.50/kg', change: '+4.2%', isUp: true },
  { id: 2, crop: 'Nashik Onions', emoji: '🧅', mandi: 'Lasalgaon Mandi', price: '₹28.00/kg', change: '-1.5%', isUp: false },
  { id: 3, crop: 'Potatoes (Jyoti)', emoji: '🥔', mandi: 'Agra Mandi', price: '₹22.50/kg', change: '+2.8%', isUp: true },
  { id: 4, crop: 'Green Chillies', emoji: '🌶️', mandi: 'Guntur Mandi', price: '₹62.00/kg', change: '+5.4%', isUp: true },
  { id: 5, crop: 'Wheat (Sharbati)', emoji: '🌾', mandi: 'Sehore Mandi', price: '₹31.20/kg', change: '+0.9%', isUp: true },
  { id: 6, crop: 'Soybean', emoji: '🌱', mandi: 'Indore Mandi', price: '₹46.80/kg', change: '-2.1%', isUp: false },
  { id: 7, crop: 'Basmati Rice', emoji: '🍚', mandi: 'Karnal Mandi', price: '₹84.00/kg', change: '+3.1%', isUp: true },
  { id: 8, crop: 'Cauliflower', emoji: '🥦', mandi: 'Madurai Mandi', price: '₹26.50/kg', change: '+1.8%', isUp: true },
];

export default function CommodityTicker() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white overflow-hidden py-1.5 select-none relative z-30 shadow-inner">
      <div className="flex items-center">
        
        {/* Static Left Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500/20 text-emerald-400 border-r border-slate-800 text-[10px] font-black tracking-wider uppercase shrink-0 z-10 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
          <span>Live Mandi Rates</span>
        </div>

        {/* Marquee Scrolling Container */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative flex">
          
          {/* Track 1 */}
          <div className="inline-flex items-center gap-6 animate-marquee shrink-0">
            {COMMODITY_PRICES.map((item) => (
              <div
                key={`t1-${item.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold hover:bg-slate-800/60 px-2 py-0.5 rounded-md transition cursor-default"
              >
                <span>{item.emoji}</span>
                <span className="font-bold text-slate-200">{item.crop}</span>
                <span className="text-[11px] text-slate-400">({item.mandi})</span>
                <span className="font-mono font-black text-white">{item.price}</span>
                <span
                  className={`inline-flex items-center text-[11px] font-black px-1.5 py-0.2 rounded ${
                    item.isUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-red-400 bg-red-950/60'
                  }`}
                >
                  {item.isUp ? (
                    <TrendingUp className="w-3 h-3 inline mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 inline mr-0.5" />
                  )}
                  {item.change}
                </span>
                <span className="text-slate-700 mx-1">•</span>
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for Seamless Loop) */}
          <div className="inline-flex items-center gap-6 animate-marquee shrink-0" aria-hidden="true">
            {COMMODITY_PRICES.map((item) => (
              <div
                key={`t2-${item.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold hover:bg-slate-800/60 px-2 py-0.5 rounded-md transition cursor-default"
              >
                <span>{item.emoji}</span>
                <span className="font-bold text-slate-200">{item.crop}</span>
                <span className="text-[11px] text-slate-400">({item.mandi})</span>
                <span className="font-mono font-black text-white">{item.price}</span>
                <span
                  className={`inline-flex items-center text-[11px] font-black px-1.5 py-0.2 rounded ${
                    item.isUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-red-400 bg-red-950/60'
                  }`}
                >
                  {item.isUp ? (
                    <TrendingUp className="w-3 h-3 inline mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 inline mr-0.5" />
                  )}
                  {item.change}
                </span>
                <span className="text-slate-700 mx-1">•</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
