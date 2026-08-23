import React from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/cards/StatCard';
import MarketCard from '../components/cards/MarketCard';
import BuyerCard from '../components/cards/BuyerCard';
import { Store, ShoppingCart, TrendingDown, ArrowRight, PackageSearch, Activity } from 'lucide-react';

export default function BuyerDashboardScreen({ setScreen }) {
  const { userProfile, produceLots, buyerOffers, recommendation, lang, setSelectedLotId } = useApp();

  const myOffers = buyerOffers.filter(o => o.buyerId === userProfile.id);
  const acceptedOffers = myOffers.filter(o => o.status === 'ACCEPTED');

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {lang === 'hi' ? 'खरीदार डैशबोर्ड' : 'Buyer Dashboard'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {lang === 'hi' ? `वापसी पर स्वागत है, ${userProfile.company}!` : `Welcome back, ${userProfile.company}!`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {lang === 'hi' 
              ? 'सर्वोत्तम कीमतों पर एआई-प्रमाणित फसल खरीदें।' 
              : 'Procure AI-graded produce at the lowest landed cost directly from farmers.'}
          </p>
        </div>

        <button
          onClick={() => setScreen('marketplace')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 px-5 rounded-[14px] shadow-md transition tap-active flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{lang === 'hi' ? 'बाज़ार ब्राउज़ करें' : 'Browse Marketplace'}</span>
        </button>
      </div>

      {/* 4 Stat Widgets Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title={lang === 'hi' ? 'कुल खर्च' : 'Total Spend'}
          value="₹2,10,000"
          subtitle="This season"
          icon={TrendingDown}
          color="blue"
        />
        <StatCard
          title={lang === 'hi' ? 'सक्रिय खरीद' : 'Active Orders'}
          value={`${acceptedOffers.length} Lots`}
          subtitle="In transit/processed"
          icon={PackageSearch}
          color="emerald"
        />
        <StatCard
          title={lang === 'hi' ? 'लंबित प्रस्ताव' : 'Pending Offers'}
          value={`${myOffers.filter(o => o.status === 'PENDING').length} Sent`}
          subtitle="Waiting for farmer"
          icon={Store}
          color="amber"
        />
        <StatCard
          title={lang === 'hi' ? 'बाजार की स्थिति' : 'Market Pulse'}
          value="High Supply"
          subtitle="Good time to buy"
          icon={Activity}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
             <div className="bg-blue-100 p-4 rounded-2xl flex-shrink-0">
               <TrendingDown className="w-8 h-8 text-blue-700" />
             </div>
             <div>
               <h3 className="text-lg font-black text-slate-900">AI Procurement Tip</h3>
               <p className="text-sm text-slate-600 font-medium">Tomato prices at {recommendation?.bestMandi?.name || 'Coimbatore'} are forecasted to drop by 4% tomorrow. Delay bulk buying if possible.</p>
             </div>
          </div>

          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-base text-slate-900">
                {lang === 'hi' ? 'सर्वोत्तम खरीद बाजार' : 'Top Sourcing Mandis'}
              </h4>
              <button
                onClick={() => setScreen('market_comparison')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center"
              >
                <span>Compare Logistics</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {recommendation?.allMandis?.slice(0, 3).map((mandi, idx) => (
                <MarketCard
                  key={mandi.id}
                  mandi={mandi}
                  rank={idx + 1}
                  isBest={idx === 0}
                  onClick={() => setScreen('market_comparison')}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900">Marketplace Discoveries</h4>
              <span className="text-xs text-slate-500 font-semibold">{produceLots.length} Matches</span>
            </div>
            <div className="space-y-3">
              {produceLots.slice(0,3).map(lot => (
                <div
                  key={lot.id}
                  onClick={() => { setSelectedLotId(lot.id); setScreen('marketplace'); }}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition cursor-pointer flex items-center gap-3"
                >
                  <img src={lot.images[0]} alt={lot.crop} className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{lot.crop}</h5>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Grade {lot.grade}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{lot.quantity} {lot.unit} • {lot.farmerName}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setScreen('marketplace')} className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition">
              View All Lots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
