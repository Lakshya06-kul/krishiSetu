import React from 'react';
import { useApp } from '../context/AppContext';
import { Truck, MapPin, Navigation, ArrowLeft, Fuel } from 'lucide-react';
import { TRANSPORT_VEHICLES } from '../services/mockData';

export default function LogisticsScreen({ setScreen, goBack }) {
  const { lang } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack ? goBack : () => setScreen('dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'वापस जाएं' : 'Back'}</span>
        </button>
      </div>

      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'hi' ? 'लॉजिस्टिक्स और परिवहन' : 'Logistics & Transport'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'hi' 
                ? 'अपनी उपज के लिए सबसे अच्छा परिवहन विकल्प चुनें।' 
                : 'Select the best transport option for your produce.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRANSPORT_VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-500 hover:shadow-md transition">
              <h3 className="font-extrabold text-sm text-slate-900 mb-2">{vehicle.name}</h3>
              <ul className="text-xs space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Max Load:</span> <span className="font-bold">{vehicle.maxLoadKg} kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Base Fee:</span> <span className="font-bold">₹{vehicle.baseFee}</span>
                </li>
                <li className="flex justify-between">
                  <span>Cost/km/ton:</span> <span className="font-bold">₹{vehicle.costPerKmPerKg * 100}</span>
                </li>
              </ul>
              <button className="mt-4 w-full bg-white border border-emerald-600 text-emerald-700 font-bold text-xs py-2 rounded-lg hover:bg-emerald-50 transition">
                {lang === 'hi' ? 'चुनें' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
