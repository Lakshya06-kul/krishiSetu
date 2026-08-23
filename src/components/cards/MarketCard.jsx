import React from 'react';
import { MapPin, Truck, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MarketCard({ mandi, rank, isBest, onClick }) {
  const { lang } = useApp();

  return (
    <div
      onClick={onClick}
      className={`rounded-[20px] p-4 border transition cursor-pointer tap-active ${
        isBest
          ? 'bg-gradient-to-r from-emerald-50 to-green-50/60 border-emerald-300 shadow-medium ring-2 ring-emerald-500/20'
          : 'bg-white border-slate-200/80 shadow-soft hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-base text-slate-900">
              {lang === 'hi' ? mandi.nameHi || mandi.name : mandi.name}
            </h4>
            {isBest && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {lang === 'hi' ? 'सर्वश्रेष्ठ' : 'Best'}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {mandi.distanceKm} km away
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              -₹{mandi.transportCostPerKg}/kg transport
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Net Profit</span>
          <div className="text-xl font-black text-slate-900">
            ₹{mandi.netProfitPerKg}
            <span className="text-xs text-slate-500 font-normal">/kg</span>
          </div>
        </div>
      </div>

      {/* Metric details row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
        <div className="text-slate-600">
          <span>{lang === 'hi' ? 'पूर्वानुमान मूल्य: ' : 'Forecast Price: '}</span>
          <span className="font-bold text-slate-900">₹{mandi.forecastPrice}/kg</span>
        </div>
        <div className="flex items-center text-emerald-600 font-bold hover:underline">
          <span>{lang === 'hi' ? 'विवरण' : 'Compare'}</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </div>
  );
}
