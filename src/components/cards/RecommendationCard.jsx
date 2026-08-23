import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, ShieldCheck, MapPin, Calendar, Coins } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RecommendationCard({ recommendation, llmAdvice, onViewDetails }) {
  const { lang } = useApp();

  if (!recommendation) return null;

  const { bestMandi, extraEarnings, recommendedDaysWait, confidence } = recommendation;

  return (
    <div className="relative overflow-hidden rounded-[24px] ai-gradient-card p-5 sm:p-6 shadow-medium border border-emerald-500/30">
      
      {/* Decorative background glow circle */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>{lang === 'hi' ? 'AI सर्वश्रेष्ठ विकल्प' : 'AI Best Choice'}</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-100 bg-emerald-900/40 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
          {confidence}% {lang === 'hi' ? 'विश्वास' : 'Confidence'}
        </span>
      </div>

      {/* Main Title & Actionable Advisory */}
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
        {llmAdvice?.title || `Sell in ${bestMandi.name} after ${recommendedDaysWait} days`}
      </h3>

      {/* Net Profit Big Highlight */}
      <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-emerald-100 font-medium block uppercase tracking-wider">
            {lang === 'hi' ? 'अनुमानित शुद्ध लाभ' : 'Expected Net Profit'}
          </span>
          <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1">
            ₹{bestMandi.netProfitPerKg}
            <span className="text-sm font-semibold text-emerald-200">/kg</span>
          </div>
        </div>

        {/* Extra earnings Pill */}
        {extraEarnings > 0 && (
          <div className="bg-amber-400/90 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <Coins className="w-4 h-4 text-amber-900" />
            <span>
              +{lang === 'hi' ? `₹${extraEarnings.toLocaleString('hi-IN')} अतिरिक्त` : `₹${extraEarnings.toLocaleString('en-IN')} Extra`}
            </span>
          </div>
        )}
      </div>

      {/* Explanatory Body */}
      <p className="mt-3 text-xs sm:text-sm text-emerald-50 leading-relaxed font-normal opacity-95">
        {llmAdvice?.body}
      </p>

      {/* CTA Button */}
      <button
        onClick={onViewDetails}
        className="mt-5 w-full bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-sm py-3 px-4 rounded-[14px] flex items-center justify-center gap-2 shadow-md transition tap-active group"
      >
        <span>{lang === 'hi' ? 'विस्तृत AI विश्लेषण देखें' : 'View Full AI Breakdown'}</span>
        <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition" />
      </button>

    </div>
  );
}
