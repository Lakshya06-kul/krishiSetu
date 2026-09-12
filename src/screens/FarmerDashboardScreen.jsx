import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import RecommendationCard from '../components/cards/RecommendationCard';
import StatCard from '../components/cards/StatCard';
import ChartCard from '../components/cards/ChartCard';
import MarketCard from '../components/cards/MarketCard';
import BuyerCard from '../components/cards/BuyerCard';
import { useTranslation } from 'react-i18next';
import { getCropPriceForecast } from '../services/aiEngine';
import { getDispatchWeatherAdvisory } from '../services/visionAiService';
import { getCropImages } from '../services/mockData';
import { PlusCircle, Wallet, Store, Package, Sparkles, MapPin, ArrowRight, CloudSun, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function FarmerDashboardScreen({ setScreen }) {
  const { userProfile, produceLots, buyerOffers, recommendation, llmAdvice, lang, updateOfferStatus, selectedLotId, setSelectedLotId } = useApp();
  const { t } = useTranslation();
  const [weatherAlert, setWeatherAlert] = useState(null);

  useEffect(() => {
    getDispatchWeatherAdvisory().then(setWeatherAlert);
  }, []);

  const priceForecastData = getCropPriceForecast();
  const pendingOffers = buyerOffers.filter(o => o.status === 'PENDING');

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Weather Dispatch Advisory Strip */}
      {weatherAlert && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 rounded-2xl p-3.5 px-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
              <CloudSun className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 tracking-tight">
                  {lang === 'hi' ? 'मौसम आधारित प्रेषण सलाह' : 'Weather-Triggered Dispatch Advisory'}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {weatherAlert.temperature} • Rain Risk {weatherAlert.rainProbability}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {weatherAlert.advice}
              </p>
            </div>
          </div>
          <button
            onClick={() => setScreen('market_comparison')}
            className="text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition shadow-xs"
          >
            {lang === 'hi' ? 'मार्ग विश्लेषण देखें' : 'View Route Risk'}
          </button>
        </div>
      )}
      
      {/* Welcome Header */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('Farmer Dashboard')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {t('Welcome Back!')}, {userProfile.name}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {lang === 'hi' 
              ? 'आपकी फसल का बाजार विश्लेषण और सर्वोत्तम बिक्री सलाह यहाँ उपलब्ध है।' 
              : 'Real-time MANDI prices, AI quality grading, and net profit optimization.'}
          </p>
        </div>

        {/* Primary CTA: Upload Produce */}
        <button
          onClick={() => setScreen('create_lot')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-5 rounded-[14px] shadow-md transition tap-active flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{t('Upload Produce Lot')}</span>
        </button>
      </div>

      {/* AI Recommendation Hero Card (Core USP - Section 1.5) */}
      <RecommendationCard
        recommendation={recommendation}
        llmAdvice={llmAdvice}
        onViewDetails={() => setScreen('ai_recommendation')}
      />

      {/* 4 Stat Widgets Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title={lang === 'hi' ? 'अनुमानित आय' : "Today's Earnings"}
          value={`₹${(recommendation?.bestMandi?.totalNetProfit || 31400).toLocaleString()}`}
          subtitle="AI computed Net Profit"
          icon={Wallet}
          trend={12.5}
          color="emerald"
        />
        <StatCard
          title={lang === 'hi' ? 'सर्वश्रेष्ठ मंडी' : 'Best Market Today'}
          value={recommendation?.bestMandi?.name.split(' ')[0] || 'Coimbatore'}
          subtitle={`Net +₹${recommendation?.bestMandi?.netProfitPerKg || 31.4}/kg`}
          icon={MapPin}
          color="blue"
        />
        <StatCard
          title={lang === 'hi' ? 'सक्रिय फसल खेप' : 'Active Produce Lots'}
          value={`${produceLots.length} Lots`}
          subtitle="Ready for selling"
          icon={Package}
          color="amber"
        />
        <StatCard
          title={lang === 'hi' ? 'लंबित प्रस्ताव' : 'Buyer Offers'}
          value={`${pendingOffers.length} Pending`}
          subtitle="Awaiting response"
          icon={Store}
          color="purple"
        />
      </div>

      {/* 2 Column Layout for Charts & Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Price Trend Chart (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <ChartCard
            title={lang === 'hi' ? '7-दिवसीय मूल्य पूर्वानुमान (Prophet AI)' : '7-Day Market Price Trend Forecast'}
            subtitle="Comparing Coimbatore vs Madurai vs Salem mandi prices"
            data={priceForecastData}
            dataKey="price"
            xAxisKey="day"
            height={240}
          />

          {/* Top Mandis Ranking Preview */}
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-base text-slate-900">
                {lang === 'hi' ? 'निकटतम मंडियों की तुलना' : 'Nearby Mandis Net Profit Ranking'}
              </h4>
              <button
                onClick={() => setScreen('market_comparison')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center"
              >
                <span>Compare All 5 Mandis</span>
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

        {/* Right Sidebar: Active Lots & Pending Buyer Offers */}
        <div className="space-y-4">
          
          {/* Active Produce Lots Widget */}
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900">My Uploaded Lots</h4>
              <span className="text-xs text-slate-500 font-semibold">{produceLots.length} Active</span>
            </div>

            <div className="space-y-3">
              {produceLots.map(lot => (
                <div
                  key={lot.id}
                  onClick={() => setSelectedLotId(lot.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer tap-active flex items-center gap-3 ${
                    lot.id === selectedLotId ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <img
                    src={lot.images?.[0] || getCropImages(lot.crop)[0]}
                    alt={lot.crop}
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200"
                    onError={(e) => {
                      e.currentTarget.src = getCropImages(lot.crop)[0];
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{lot.crop}</h5>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Grade {lot.grade}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lot.quantity} {lot.unit} • {lot.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Buyer Offers Widget */}
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900">Buyer Offers ({pendingOffers.length})</h4>
              <button onClick={() => setScreen('marketplace')} className="text-xs font-bold text-blue-600">
                View All
              </button>
            </div>

            {pendingOffers.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No pending buyer offers right now.</p>
            ) : (
              <div className="space-y-3">
                {pendingOffers.map(offer => (
                  <BuyerCard
                    key={offer.id}
                    offer={offer}
                    onAccept={(id) => updateOfferStatus(id, 'ACCEPTED')}
                    onDecline={(id) => updateOfferStatus(id, 'DECLINED')}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
