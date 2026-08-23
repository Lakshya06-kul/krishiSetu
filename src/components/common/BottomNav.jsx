import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Package, Truck, Store, BarChart3 } from 'lucide-react';

export default function BottomNav({ activeScreen, setScreen }) {
  const { lang, buyerOffers, currentRole } = useApp();

  const pendingOffersCount = buyerOffers.filter(o => o.status === 'PENDING').length;

  const navItems = [
    { id: 'dashboard', label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: Home },
    { id: 'create_lot', label: lang === 'hi' ? 'फसल जोड़ें' : 'Produce', icon: Package },
    { id: 'logistics', label: lang === 'hi' ? 'लॉजिस्टिक्स' : 'Logistics', icon: Truck, badge: 'NEW' },
    { id: 'marketplace', label: lang === 'hi' ? 'खरीदार' : 'Buyers', icon: Store, count: pendingOffersCount },
    { id: 'profile', label: lang === 'hi' ? 'प्रोफ़ाइल' : 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 md:hidden">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition tap-active relative ${
                isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-emerald-600' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-gradient-to-r from-amber-500 to-emerald-600 text-white text-[9px] font-black px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
