import React from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/cards/StatCard';
import ChartCard from '../components/cards/ChartCard';
import { getCropPriceForecast } from '../services/aiEngine';
import { Users, Truck, Briefcase, Activity, CheckCircle2, TrendingUp } from 'lucide-react';

export default function FPODashboardScreen({ setScreen }) {
  const { userProfile, produceLots, lang, setSelectedLotId } = useApp();
  const priceForecastData = getCropPriceForecast();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {lang === 'hi' ? 'FPO डैशबोर्ड' : 'FPO Dashboard'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {lang === 'hi' ? `${userProfile.fpoName} अवलोकन` : `${userProfile.fpoName} Overview`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {lang === 'hi' 
              ? 'सदस्यों के उत्पादन को प्रबंधित और ट्रैक करें।' 
              : 'Monitor member crop pools, bulk supply, and collective market profits.'}
          </p>
        </div>

        <button
          onClick={() => setScreen('profile')}
          className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm py-3 px-5 rounded-[14px] shadow-md transition tap-active flex items-center gap-2"
        >
          <Briefcase className="w-5 h-5" />
          <span>{lang === 'hi' ? 'रिपोर्ट देखें' : 'View Analytics Report'}</span>
        </button>
      </div>

      {/* 4 Stat Widgets Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title={lang === 'hi' ? 'सक्रिय सदस्य' : 'Active Members'}
          value={`${userProfile.membersCount}`}
          subtitle="Registered farmers"
          icon={Users}
          color="blue"
        />
        <StatCard
          title={lang === 'hi' ? 'पूल की गई मात्रा' : 'Pooled Volume'}
          value="22,000 kg"
          subtitle="Ready for dispatch"
          icon={Truck}
          color="amber"
        />
        <StatCard
          title={lang === 'hi' ? 'औसत गुणवत्ता' : 'Avg. Pool Quality'}
          value="Grade A/B"
          subtitle="Across all lots"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title={lang === 'hi' ? 'समूह राजस्व' : 'Group Revenue'}
          value="₹6.5L"
          subtitle="+15% vs last month"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ChartCard
            title={lang === 'hi' ? 'FPO बाजार रणनीति (Prophet AI)' : 'FPO Bulk Strategy Forecast (Prophet AI)'}
            subtitle="Optimal timing for releasing pooled inventory"
            data={priceForecastData}
            dataKey="price"
            xAxisKey="day"
            height={240}
          />
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
             <div className="bg-amber-100 p-4 rounded-2xl flex-shrink-0">
               <Activity className="w-8 h-8 text-amber-700" />
             </div>
             <div>
               <h3 className="text-lg font-black text-slate-900">Aggregation Insight</h3>
               <p className="text-sm text-slate-600 font-medium">Consolidate member tomato lots for dispatch to Madurai Mandi. Transporting via heavy duty truck saves ₹1.2/kg for the group.</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900">Recent Member Uploads</h4>
              <span className="text-xs text-slate-500 font-semibold">{produceLots.length} New</span>
            </div>
            <div className="space-y-3">
              {produceLots.slice(0,4).map(lot => (
                <div
                  key={lot.id}
                  onClick={() => { setSelectedLotId(lot.id); setScreen('market_comparison'); }}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-200 transition cursor-pointer flex items-center gap-3"
                >
                  <img src={lot.images[0]} alt={lot.crop} className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{lot.crop}</h5>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Grade {lot.grade}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{lot.quantity} {lot.unit} • By {lot.farmerName}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setScreen('profile')} className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition">
              Manage Full Pool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
