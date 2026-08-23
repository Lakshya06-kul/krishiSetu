import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ChartCard({ title, subtitle, data, dataKey = 'price', xAxisKey = 'day', height = 220 }) {
  return (
    <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-extrabold text-sm text-slate-900">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>
        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
          Live AI Forecast
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 11, fill: '#64748B' }} 
              axisLine={{ stroke: '#E2E8F0' }} 
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748B' }} 
              axisLine={{ stroke: '#E2E8F0' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '12px',
                color: '#FFF',
                border: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
              }}
              formatter={(val) => [`₹${val}/kg`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#16A34A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
              dot={{ r: 4, fill: '#16A34A', strokeWidth: 2, stroke: '#FFF' }}
              activeDot={{ r: 6, fill: '#15803D' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center text-[11px] font-medium text-slate-500">
        Chart.js / Prophet ML algorithm forecast model (+2 days peak recommendation)
      </div>
    </div>
  );
}
