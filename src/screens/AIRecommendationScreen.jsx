import React from 'react';
import { useApp } from '../context/AppContext';
import RecommendationCard from '../components/cards/RecommendationCard';
import ChartCard from '../components/cards/ChartCard';
import { getCropPriceForecast } from '../services/aiEngine';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, TrendingUp, Truck, Coins, Info, HelpCircle } from 'lucide-react';

export default function AIRecommendationScreen({ setScreen, goBack }) {
  const { recommendation, llmAdvice, selectedLot, lang } = useApp();

  const priceForecastData = getCropPriceForecast();
  const bestMandi = recommendation?.bestMandi;

  if (!bestMandi) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack ? goBack : () => setScreen('dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'पीछे जाएँ' : 'Back'}</span>
        </button>
      </div>
      
      {/* Top Header */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Screen 6 — Core USP Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AI Net Profit Recommendation Engine
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Unlike ordinary mandi apps that show prices only, AgriLink AI computes net profit by deducting transport & handling while adding certified quality premiums.
        </p>
      </div>

      {/* Hero Card */}
      <RecommendationCard
        recommendation={recommendation}
        llmAdvice={llmAdvice}
        onViewDetails={() => {}}
      />

      {/* Net Profit Mathematical Breakdown Table */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Coins className="w-5 h-5 text-emerald-600" />
          <span>Net Profit Formula Breakdown</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                <th className="pb-3">Profit Factor</th>
                <th className="pb-3 text-right">Value per kg</th>
                <th className="pb-3 text-right">Total (1,000 kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              <tr>
                <td className="py-3 text-slate-900 font-extrabold">Day +2 Forecast Price</td>
                <td className="py-3 text-right text-emerald-700 font-extrabold">₹{bestMandi.forecastPrice}/kg</td>
                <td className="py-3 text-right text-slate-900 font-bold">₹{(bestMandi.forecastPrice * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3 text-emerald-800 font-bold">Quality Grade A Bonus</td>
                <td className="py-3 text-right text-emerald-700 font-extrabold">+₹{bestMandi.qualityBonus}/kg</td>
                <td className="py-3 text-right text-emerald-700 font-bold">+₹{(bestMandi.qualityBonus * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">Transport Cost (42 km)</td>
                <td className="py-3 text-right text-rose-600 font-bold">-₹{bestMandi.transportCostPerKg}/kg</td>
                <td className="py-3 text-right text-rose-600 font-bold">-₹{(bestMandi.transportCostPerKg * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">Mandi Handling Expense</td>
                <td className="py-3 text-right text-rose-600 font-bold">-₹{bestMandi.handlingCostPerKg}/kg</td>
                <td className="py-3 text-right text-rose-600 font-bold">-₹{(bestMandi.handlingCostPerKg * 1000).toLocaleString()}</td>
              </tr>
              <tr className="bg-emerald-50/80 font-black text-sm">
                <td className="py-4 text-emerald-950 rounded-l-xl pl-3">Final Net Profit</td>
                <td className="py-4 text-right text-emerald-800 font-black text-base">₹{bestMandi.netProfitPerKg}/kg</td>
                <td className="py-4 text-right text-emerald-900 font-black text-base rounded-r-xl pr-3">
                  ₹{bestMandi.totalNetProfit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "Why AI Recommends This" LLM Explanation Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[24px] p-6 sm:p-8 shadow-large space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h4 className="font-extrabold text-base text-white">Why AI Recommends This Decision</h4>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {llmAdvice?.body}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Historical Arrival</span>
            <span className="text-xs font-bold text-emerald-400">14.5 Tons (-18% lower supply)</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Distance Route</span>
            <span className="text-xs font-bold text-emerald-400">NH-544 (42 km, 50 mins)</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Confidence Level</span>
            <span className="text-xs font-bold text-amber-400">84% Prophet ML Score</span>
          </div>
        </div>
      </div>

      {/* Action Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => setScreen('market_comparison')}
          className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-extrabold py-3.5 px-5 rounded-[14px] shadow-sm transition tap-active flex items-center justify-center gap-2 text-sm"
        >
          <span>Compare All 5 Mandis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScreen('marketplace')}
          className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-5 rounded-[14px] shadow-md transition tap-active flex items-center justify-center gap-2 text-sm"
        >
          <span>View Verified Buyers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
