import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'emerald' }) {
  const isPositive = trend >= 0;

  const colorStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100'
  };

  return (
    <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-soft hover:shadow-medium transition tap-active flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${colorStyles[color] || colorStyles.emerald}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{value}</span>
          {trend !== undefined && (
            <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {isPositive ? `+${trend}%` : `${trend}%`}
            </span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-slate-500 mt-1 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}
