import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/cards/StatCard';
import MarketCard from '../components/cards/MarketCard';
import BuyerCard from '../components/cards/BuyerCard';
import { 
  Store, ShoppingCart, TrendingDown, ArrowRight, PackageSearch, Activity, 
  CheckCircle2, XCircle, ArrowRightLeft, Clock, Wallet, ShieldAlert, CreditCard
} from 'lucide-react';

export default function BuyerDashboardScreen({ setScreen }) {
  const { userProfile, produceLots, buyerOffers, updateOfferStatus, recommendation, lang, setSelectedLotId } = useApp();
  
  // Tab state: 'ALL' | 'ACCEPTED' | 'NEGOTIATION' | 'DECLINED'
  const [offerTab, setOfferTab] = useState('ALL');

  // Filter offers belonging to current buyer
  const myOffers = buyerOffers.filter(o => o.buyerId === userProfile.id || o.buyerName === userProfile.name || o.buyerId === 'usr_buyer_1');
  
  const acceptedOffers = myOffers.filter(o => o.status === 'ACCEPTED');
  const negotiationOffers = myOffers.filter(o => o.status === 'PENDING');
  const declinedOffers = myOffers.filter(o => o.status === 'DECLINED');

  // Filtered by selected tab
  const tabFilteredOffers = myOffers.filter(o => {
    if (offerTab === 'ACCEPTED') return o.status === 'ACCEPTED';
    if (offerTab === 'NEGOTIATION') return o.status === 'PENDING';
    if (offerTab === 'DECLINED') return o.status === 'DECLINED';
    return true; // 'ALL'
  });

  // Calculate Advance and Pending Amounts
  // 1. Advance already deposited via gateway:
  const depositedAdvanceOffers = acceptedOffers.filter(o => o.escrowStatus === 'ADVANCE_PAID' || o.escrowStatus === 'DISBURSED');
  const totalAdvancePaid = depositedAdvanceOffers.reduce((sum, o) => {
    const total = o.totalAmount || Math.round((o.offeredPricePerKg || 30) * (o.quantity || 1000));
    return sum + (o.advanceAmount || Math.round(total * 0.5));
  }, 0);

  // Advance awaiting payment gateway deposit by buyer:
  const awaitingDepositOffers = acceptedOffers.filter(o => o.escrowStatus === 'AWAITING_BUYER_DEPOSIT');
  const awaitingAdvanceDeposit = awaitingDepositOffers.reduce((sum, o) => {
    const total = o.totalAmount || Math.round((o.offeredPricePerKg || 30) * (o.quantity || 1000));
    return sum + (o.advanceAmount || Math.round(total * 0.5));
  }, 0);

  // Advance committed in pending negotiation proposals:
  const pendingAdvanceToCommit = negotiationOffers.reduce((sum, o) => {
    const total = o.totalAmount || Math.round((o.offeredPricePerKg || 30) * (o.quantity || 1000));
    return sum + Math.round(total * 0.5);
  }, 0);

  // 2. Pending 50% balance payments (strictly released on gate delivery):
  const pendingBalanceOnDelivery = acceptedOffers
    .filter(o => o.escrowStatus !== 'DISBURSED')
    .reduce((sum, o) => {
      const total = o.totalAmount || Math.round((o.offeredPricePerKg || 30) * (o.quantity || 1000));
      return sum + (o.balanceAmount || (total - Math.round(total * 0.5)));
    }, 0);

  const completedFinalPaid = acceptedOffers
    .filter(o => o.escrowStatus === 'DISBURSED')
    .reduce((sum, o) => {
      const total = o.totalAmount || Math.round((o.offeredPricePerKg || 30) * (o.quantity || 1000));
      return sum + (o.balanceAmount || (total - Math.round(total * 0.5)));
    }, 0);

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
              ? 'सर्वोत्तम कीमतों पर एआई-प्रमाणित फसल खरीदें और 50%-50% एस्क्रो पेमेंट्स ट्रैक करें।' 
              : 'Procure AI-graded produce with automated 50% advance and 50% delivery escrow.'}
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

      {/* Payment Milestones Financial Bar: Advance vs Pending on Delivery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-[20px] p-4 sm:p-5 shadow-soft">
          <div className="flex items-center justify-between opacity-90 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'hi' ? '50% अग्रिम भुगतान किया' : '50% Advance Deposited'}
            </span>
            <Wallet className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black">
            ₹{totalAdvancePaid.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] opacity-80 mt-1 font-medium">
            {depositedAdvanceOffers.length} {lang === 'hi' ? 'सौदों में भुगतान जमा' : 'deals paid via gateway'}
            {awaitingAdvanceDeposit > 0 && ` • ₹${awaitingAdvanceDeposit.toLocaleString('en-IN')} awaiting payment`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-[20px] p-4 sm:p-5 shadow-soft">
          <div className="flex items-center justify-between opacity-90 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'hi' ? '50% शेष डिलीवरी पर देय' : 'Pending 50% on Delivery'}
            </span>
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black">
            ₹{pendingBalanceOnDelivery.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] opacity-80 mt-1 font-medium">
            {lang === 'hi' ? 'फसल प्राप्ति व गेट पास सत्यापन पर देय' : 'Held in escrow • Release after gate inspection'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[20px] p-4 sm:p-5 shadow-soft">
          <div className="flex items-center justify-between opacity-90 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'सक्रिय मोलभाव' : 'In Negotiation'}
            </span>
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black">
            {negotiationOffers.length} {lang === 'hi' ? 'प्रस्ताव' : 'Lots'}
          </div>
          <p className="text-[11px] opacity-80 mt-1 font-medium">
            ₹{pendingAdvanceToCommit.toLocaleString('en-IN')} advance commitment in pipeline
          </p>
        </div>

        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'पूर्ण भुगतान' : 'Fully Settled Deals'}
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ₹{completedFinalPaid.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            100% completed & gate passes cleared
          </p>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Categorized Offers Tabs (Accepted, Declined, In Negotiation) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-soft space-y-4">
            
            {/* Tab Header & Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  <span>{lang === 'hi' ? 'प्रस्ताव एवं मोलभाव प्रबंधन' : 'Offer & Negotiation Hub'}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'hi' ? 'स्वीकृत, बातचीत और अस्वीकृत सौदों को ट्रैक करें।' : 'Track accepted deals, ongoing negotiations, and declined proposals.'}
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOfferTab('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    offerTab === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({myOffers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setOfferTab('ACCEPTED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    offerTab === 'ACCEPTED' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accepted ({acceptedOffers.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOfferTab('NEGOTIATION')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    offerTab === 'NEGOTIATION' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-amber-700'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Negotiation ({negotiationOffers.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOfferTab('DECLINED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    offerTab === 'DECLINED' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-red-700'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Declined ({declinedOffers.length})</span>
                </button>
              </div>
            </div>

            {/* List of Offers */}
            {tabFilteredOffers.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full mx-auto flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <p className="text-sm font-extrabold text-slate-700">No offers found in this tab.</p>
                <p className="text-xs text-slate-500">
                  {offerTab === 'NEGOTIATION' 
                    ? 'No pending negotiations right now.' 
                    : offerTab === 'ACCEPTED' 
                    ? 'Accepted orders with 50% advance will show up here.'
                    : 'Browse produce lots and submit your purchase bids.'}
                </p>
                <button
                  onClick={() => setScreen('marketplace')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Browse Lots in Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {tabFilteredOffers.map(offer => (
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

          {/* AI Procurement Tip & Top Mandis */}
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
             <div className="bg-blue-100 p-4 rounded-2xl flex-shrink-0">
               <TrendingDown className="w-8 h-8 text-blue-700" />
             </div>
             <div>
               <h3 className="text-base font-black text-slate-900">AI Procurement Tip</h3>
               <p className="text-xs text-slate-600 font-medium mt-0.5">
                 Tomato rates at {recommendation?.bestMandi?.name || 'Coimbatore'} are projected to peak in 48 hours. Closing pending counter-offers now locks in current ₹32.5/kg rates before wholesale mandi surge.
               </p>
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

        {/* Right Sidebar: Marketplace Discoveries */}
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-900">Marketplace Discoveries</h4>
              <span className="text-xs text-slate-500 font-semibold">{produceLots.length} Matches</span>
            </div>
            <div className="space-y-3">
              {produceLots.slice(0, 4).map(lot => (
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
              View All Lots in Marketplace
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
