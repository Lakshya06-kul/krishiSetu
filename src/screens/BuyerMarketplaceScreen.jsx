import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BuyerCard from '../components/cards/BuyerCard';
import QualityBadge from '../components/cards/QualityBadge';
import { Store, Filter, Search, CheckCircle2, ShieldCheck, Star, MapPin, Send, X, ArrowLeft } from 'lucide-react';
import { getCropImages } from '../services/mockData';

export default function BuyerMarketplaceScreen({ setScreen, goBack }) {
  const { produceLots, buyerOffers, sendBuyerOffer, updateOfferStatus, currentRole, lang } = useApp();

  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Send Offer modal state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedLotForOffer, setSelectedLotForOffer] = useState(null);
  const [offeredPrice, setOfferedPrice] = useState(32.5);
  const [offerNote, setOfferNote] = useState('We accept Grade-A tomatoes with immediate UPI payout.');

  // Filter produce lots
  const filteredLots = produceLots.filter(lot => {
    const matchesCrop = selectedCropFilter === 'ALL' || lot.crop.toLowerCase().includes(selectedCropFilter.toLowerCase());
    const matchesGrade = selectedGradeFilter === 'ALL' || lot.grade === selectedGradeFilter;
    const matchesSearch = lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) || lot.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesGrade && matchesSearch;
  });

  const handleOpenOfferModal = (lot) => {
    setSelectedLotForOffer(lot);
    setOfferedPrice(32.5);
    setIsOfferModalOpen(true);
  };

  const handleSendOfferSubmit = (e) => {
    e.preventDefault();
    if (!selectedLotForOffer) return;

    sendBuyerOffer({
      lotId: selectedLotForOffer.id,
      crop: selectedLotForOffer.crop,
      quantity: selectedLotForOffer.quantity,
      unit: selectedLotForOffer.unit || 'kg',
      offeredPricePerKg: Number(offeredPrice),
      totalAmount: Math.round(Number(offeredPrice) * selectedLotForOffer.quantity),
      note: offerNote
    });

    setIsOfferModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-8">
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

      {/* Header Banner */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Screens 8 & 9 — Buyer Linkage
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
            Verified Buyer Marketplace
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Direct farmer-to-buyer transactions without commission agents or middlemen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">View Mode:</span>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 uppercase">
            {currentRole.toUpperCase()} MODE
          </span>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by crop, farmer, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Crop Filter Pill selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'Tomatoes', 'Onions', 'Potatoes'].map(cropName => (
              <button
                key={cropName}
                onClick={() => setSelectedCropFilter(cropName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCropFilter === cropName
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cropName}
              </button>
            ))}
          </div>

          {/* Grade Filter */}
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
          >
            <option value="ALL">All Grades</option>
            <option value="A">Grade A Only</option>
            <option value="B">Grade B Only</option>
          </select>

        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredLots.map(lot => (
          <div key={lot.id} className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-soft hover:shadow-medium transition space-y-4 flex flex-col justify-between">
            
            <div>
              {/* Lot Image Carousel / Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-100">
                <img
                  src={lot.images?.[0] || getCropImages(lot.crop)[0]}
                  alt={lot.crop}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getCropImages(lot.crop)[0];
                  }}
                />
                <div className="absolute top-3 left-3">
                  <QualityBadge
                    grade={lot.grade}
                    confidence={lot.qualityConfidence}
                    qualityBonus={lot.qualityBonus}
                  />
                </div>
                <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                  {lot.quantity} {lot.unit}
                </span>
              </div>

              {/* Lot Info */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-slate-900">{lot.crop}</h3>
                  <span className="text-xs text-slate-500 font-medium">Harvested: {lot.harvestDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Farmer: <strong>{lot.farmerName}</strong> ({lot.location})</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{lot.qualityNotes}"
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              {currentRole === 'buyer' ? (
                <>
                  <button
                    className="w-12 h-11 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition tap-active shadow-sm"
                    title="Add to Shopping List"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                  </button>
                  <button
                    onClick={() => handleOpenOfferModal(lot)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-sm transition tap-active flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Purchase Offer to Farmer</span>
                  </button>
                </>
              ) : (
                <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>AI Quality Verified</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    +{lot.qualityBonus || 1.5}/kg Premium Eligible
                  </span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Offers & Negotiation Section: Visible to Farmers and Buyers */}
      {currentRole === 'farmer' ? (
        <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <span>Direct Offers Received from Verified Buyers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {buyerOffers.map(offer => (
              <BuyerCard
                key={offer.id}
                offer={offer}
                onAccept={(id) => updateOfferStatus(id, 'ACCEPTED')}
                onDecline={(id) => updateOfferStatus(id, 'DECLINED')}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" />
              <span>My Sent Offers & Farmer Counter-Bids</span>
            </h3>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              {buyerOffers.filter(o => o.buyerId === 'usr_buyer_1').length} Active Bids
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {buyerOffers.filter(o => o.buyerId === 'usr_buyer_1').map(offer => (
              <BuyerCard
                key={offer.id}
                offer={offer}
                onAccept={(id) => updateOfferStatus(id, 'ACCEPTED')}
                onDecline={(id) => updateOfferStatus(id, 'DECLINED')}
              />
            ))}
          </div>
        </div>
      )}

      {/* Send Offer Modal Dialog */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-large border border-slate-200 space-y-4 relative">
            <button
              onClick={() => setIsOfferModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-lg text-slate-900">
              Send Offer for {selectedLotForOffer?.crop}
            </h3>

            <form onSubmit={handleSendOfferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Offered Price (per kg)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 font-extrabold text-base text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Calculated Total Valuation
                </label>
                <div className="p-3 bg-emerald-50 rounded-xl font-black text-lg text-emerald-800 text-center">
                  ₹{(Number(offeredPrice) * (selectedLotForOffer?.quantity || 1000)).toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Note to Farmer
                </label>
                <textarea
                  rows={2}
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                />
              </div>

              {/* Escrow Guarantee Banner */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-extrabold block">50% Advance + 50% On-Delivery Escrow</span>
                  <span className="text-[11px] text-slate-600">50% is paid upfront to the farmer upon offer acceptance; the remaining 50% balance is released automatically upon delivery inspection.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Deposit to Escrow & Send Offer</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
