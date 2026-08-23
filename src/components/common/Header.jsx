import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, Globe, Bell, TrendingUp, TrendingDown, ShoppingBag, Package, Bot } from 'lucide-react';

const ROLE_NOTIFICATIONS = {
  farmer: [
    { id: 1, type: 'price_up', message: 'Tomato prices at Coimbatore Mandi increased by ₹2/kg today.', time: '10 mins ago', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 2, type: 'order', message: 'Priya Foods initiated an order to buy 1000kg Tomatoes.', time: '1 hour ago', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 3, type: 'price_down', message: 'Potato prices dropped slightly at Madurai Mandi.', time: '3 hours ago', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-100' }
  ],
  buyer: [
    { id: 4, type: 'order', message: 'Your order for 1500kg Onions from Ramesh Kumar is confirmed.', time: '20 mins ago', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 5, type: 'price_up', message: 'Nashik Onions are seeing a price hike in Salem Mandi.', time: '2 hours ago', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' }
  ],
  fpo: [
    { id: 6, type: 'alert', message: '3 new farmers joined Kongu FPO pool today.', time: '1 hour ago', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 7, type: 'price_up', message: 'Bulk Tomato prices are peaking. Good time to dispatch.', time: '4 hours ago', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' }
  ]
};

export default function Header({ currentScreen, setScreen }) {
  const { currentRole, switchRole, userProfile, lang, toggleLanguage, buyerOffers } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  const activeNotifs = ROLE_NOTIFICATIONS[currentRole] || [];
  const pendingOffersCount = buyerOffers.filter(o => o.status === 'PENDING').length;
  // Combine real pending offers count with mock notification count just for badge visuals
  const badgeCount = pendingOffersCount + activeNotifs.length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setScreen('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-black text-xl">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">AgriLink</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {lang === 'hi' ? 'किसानों के लिए स्मार्ट बिक्री' : 'Smarter Selling for Farmers'}
            </p>
          </div>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition"
            >
              <Bell className="w-4 h-4" />
              {badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {badgeCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">Notifications</h4>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{activeNotifs.length} New</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {activeNotifs.map(notif => {
                    const Icon = notif.icon;
                    return (
                      <div key={notif.id} className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer flex gap-3">
                        <div className={`mt-0.5 p-2 rounded-full ${notif.bg} flex-shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 ${notif.color}`} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 leading-tight">{notif.message}</p>
                          <span className="text-[10px] text-slate-500 font-medium mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    );
                  })}
                  {activeNotifs.length === 0 && (
                    <div className="px-4 py-6 text-center text-xs text-slate-500">No new notifications.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* AI Chat Button */}
          <button
            onClick={() => setScreen('ai_chat')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-bold shadow-md transition"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span>Ask AI</span>
          </button>

          {/* Role Pill Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => switchRole('farmer')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                currentRole === 'farmer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Farmer
            </button>
            <button
              onClick={() => switchRole('buyer')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                currentRole === 'buyer' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => switchRole('fpo')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                currentRole === 'fpo' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FPO
            </button>
          </div>

          {/* User Profile Avatar */}
          <div 
            onClick={() => setScreen('profile')}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer"
          >
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <span className="hidden md:inline text-xs font-semibold text-slate-800">
              {userProfile.name.split(' ')[0]}
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}
