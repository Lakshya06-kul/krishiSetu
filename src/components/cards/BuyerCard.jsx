import React from 'react';
import { CheckCircle2, Star, Phone, MessageSquare, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BuyerCard({ buyer, offer, onAccept, onDecline, onSendOffer }) {
  const { lang, currentRole } = useApp();

  return (
    <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-soft hover:shadow-medium transition flex flex-col justify-between">
      
      <div>
        {/* Buyer Header */}
        <div className="flex items-center gap-3">
          <img
            src={buyer?.avatar || offer?.buyerAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
            alt="Buyer avatar"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-sm text-slate-900">
                {buyer?.name || offer?.buyerName}
              </h4>
              {(buyer?.verified || offer?.verified) && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
              <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {buyer?.rating || 4.8}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3 h-3" />
                12 km away
              </span>
            </div>
          </div>
        </div>

        {/* Offer Details if offer present */}
        {offer && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Offer price</span>
                <span className="text-lg font-black text-slate-900">₹{offer.offeredPricePerKg}/kg</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Transport</span>
                <span className="text-xs font-extrabold text-slate-700">Buyer pickup</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Payment</span>
                <span className="text-xs font-extrabold text-slate-700">T+0 Escrow</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Distance</span>
                <span className="text-xs font-extrabold text-slate-700">28 km</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 mt-1 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Net take-home</span>
              <span className="text-sm font-black text-emerald-700">₹{(offer.offeredPricePerKg - 1.48).toFixed(2)}/kg</span>
            </div>
          </div>
        )}

        {offer?.note && (
          <p className="mt-2 text-xs text-slate-600 italic bg-amber-50/60 p-2 rounded-lg border border-amber-100">
            "{offer.note}"
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        {offer && offer.status === 'PENDING' && currentRole === 'farmer' ? (
          <>
            <button
              onClick={() => onAccept(offer.id)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-[12px] transition tap-active shadow-sm"
            >
              {lang === 'hi' ? 'स्वीकार करें' : 'Accept Offer'}
            </button>
            <button
              onClick={() => onDecline(offer.id)}
              className="px-3 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition"
            >
              {lang === 'hi' ? 'अस्वीकार करें' : 'Decline'}
            </button>
          </>
        ) : offer && offer.status === 'ACCEPTED' ? (
          <span className="w-full text-center text-xs font-extrabold text-emerald-700 bg-emerald-100 py-2 rounded-xl">
            ✓ Transaction Confirmed
          </span>
        ) : (
          <button
            onClick={onSendOffer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3 rounded-[12px] transition tap-active flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'प्रस्ताव भेजें' : 'Send Purchase Offer'}</span>
          </button>
        )}
      </div>

    </div>
  );
}
