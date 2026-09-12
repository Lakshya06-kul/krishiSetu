import React, { useState } from 'react';
import { CheckCircle2, Star, Phone, MessageSquare, MapPin, ShieldCheck, QrCode, ArrowRightLeft, X, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BuyerCard({ buyer, offer, onAccept, onDecline, onSendOffer }) {
  const { lang, currentRole, produceLots, submitCounterOffer, buyerPayAdvance50, disburseEscrowToFarmer } = useApp();
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [counterPrice, setCounterPrice] = useState(offer?.offeredPricePerKg ? offer.offeredPricePerKg + 2 : 33);
  const [counterNote, setCounterNote] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Determine requested crop: from offer direct data or matched lot
  const targetLot = offer?.lotId ? produceLots?.find(l => l.id === offer.lotId) : null;
  const requestedCrop = offer?.crop || targetLot?.crop || 'Agricultural Produce';
  const requestedQuantity = offer?.quantity || targetLot?.quantity || 1000;
  const requestedUnit = offer?.unit || targetLot?.unit || 'kg';

  // Check if counter-offer came from the other party
  const isCounteredByFarmer = offer?.negotiatedBy === 'farmer';
  const isCounteredByBuyer = offer?.negotiatedBy === 'buyer';

  const totalCalculated = offer?.totalAmount || Math.round((offer?.offeredPricePerKg || 30) * requestedQuantity);
  const advanceCalculated = offer?.advanceAmount || Math.round(totalCalculated * 0.5);
  const balanceCalculated = offer?.balanceAmount || (totalCalculated - advanceCalculated);

  const handleSendCounter = (e) => {
    e.preventDefault();
    if (!offer?.id) return;
    submitCounterOffer(offer.id, counterPrice, counterNote);
    setIsNegotiating(false);
  };

  const handleGatewayPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowGatewayModal(false);
      const methodName = paymentMethod === 'upi' ? 'UPI (GPay / PhonePe)' : paymentMethod === 'netbanking' ? 'Net Banking (HDFC/SBI)' : 'Debit/Credit Card';
      buyerPayAdvance50(offer.id, methodName);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-soft hover:shadow-medium transition flex flex-col justify-between relative">
      
      <div>
        {/* Buyer Header */}
        <div className="flex items-center gap-3">
          <img
            src={buyer?.avatar || offer?.buyerAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
            alt="Buyer avatar"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-sm text-slate-900 truncate">
                {buyer?.name || offer?.buyerName}
              </h4>
              {(buyer?.verified || offer?.verified) && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
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

        {/* Counter-Offer Notification Alert Banner for Buyer */}
        {offer && offer.status === 'PENDING' && isCounteredByFarmer && currentRole === 'buyer' && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2 text-amber-900 animate-pulse">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-xs">
              <span className="font-black block">Farmer Counter-Proposed New Rate:</span>
              <span className="font-extrabold text-sm text-amber-950">₹{offer.offeredPricePerKg}/kg</span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                {offer.note || 'Farmer submitted a revised counter-price. You can accept to finalize 50% advance or counter again.'}
              </span>
            </div>
          </div>
        )}

        {/* Counter-Offer Notification Alert Banner for Farmer */}
        {offer && offer.status === 'PENDING' && isCounteredByBuyer && currentRole === 'farmer' && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-300 flex items-start gap-2 text-blue-900">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-xs">
              <span className="font-black block">Buyer Counter-Offer Received:</span>
              <span className="font-extrabold text-sm text-blue-950">₹{offer.offeredPricePerKg}/kg</span>
            </div>
          </div>
        )}

        {/* Requested Crop Highlight Banner */}
        {offer && (
          <div className="mt-3 py-1.5 px-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800">
                {lang === 'hi' ? 'मांग फसल:' : 'Request for:'}
              </span>
              <span className="text-xs font-black text-emerald-900">
                {requestedCrop}
              </span>
            </div>
            {requestedQuantity && (
              <span className="text-[11px] font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-100">
                {requestedQuantity} {requestedUnit}
              </span>
            )}
          </div>
        )}

        {/* Offer Details if offer present */}
        {offer && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {offer.negotiatedBy ? 'Current Rate (Negotiated)' : 'Offer price'}
                </span>
                <span className="text-lg font-black text-slate-900">₹{offer.offeredPricePerKg}/kg</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Transport</span>
                <span className="text-xs font-extrabold text-slate-700">Buyer pickup</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Payment Plan</span>
                <span className="text-xs font-extrabold text-emerald-800">50% Advance Gateway + 50% Gate Receipt</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Deal Value</span>
                <span className="text-xs font-extrabold text-slate-800">₹{totalCalculated.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 mt-1 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Net take-home</span>
              <span className="text-sm font-black text-emerald-700">₹{(offer.offeredPricePerKg - 1.48).toFixed(2)}/kg</span>
            </div>
          </div>
        )}

        {/* 50%-50% Smart Escrow Status Badge when Accepted */}
        {offer && offer.status === 'ACCEPTED' && (
          <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Two-Stage Escrow
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                offer.escrowStatus === 'DISBURSED' 
                  ? 'bg-emerald-200 text-emerald-900' 
                  : offer.escrowStatus === 'ADVANCE_PAID'
                  ? 'bg-blue-200 text-blue-900'
                  : 'bg-amber-200 text-amber-900 animate-pulse'
              }`}>
                {offer.escrowStatus === 'DISBURSED' 
                  ? '100% PAID OUT' 
                  : offer.escrowStatus === 'ADVANCE_PAID' 
                  ? '50% ADVANCE PAID' 
                  : 'AWAITING BUYER 50% PAYMENT'}
              </span>
            </div>

            {/* 50-50 Payment Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full w-1/2 transition-all ${
                    offer.escrowStatus === 'AWAITING_BUYER_DEPOSIT' 
                      ? 'bg-amber-300 animate-pulse' 
                      : 'bg-emerald-600'
                  }`} 
                  title="50% Advance"
                ></div>
                <div 
                  className={`h-full w-1/2 transition-colors duration-300 ${
                    offer.escrowStatus === 'DISBURSED' 
                      ? 'bg-emerald-500' 
                      : offer.escrowStatus === 'ADVANCE_PAID'
                      ? 'bg-blue-300'
                      : 'bg-slate-300'
                  }`} 
                  title="50% Balance on Receipt"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-extrabold">
                <span className={offer.escrowStatus === 'AWAITING_BUYER_DEPOSIT' ? 'text-amber-700' : 'text-emerald-700'}>
                  {offer.escrowStatus === 'AWAITING_BUYER_DEPOSIT'
                    ? `⏳ 50% Adv: ₹${advanceCalculated.toLocaleString('en-IN')} (Pending Gateway)`
                    : `✓ 50% Adv: ₹${advanceCalculated.toLocaleString('en-IN')} (Paid)`}
                </span>
                <span className={offer.escrowStatus === 'DISBURSED' ? 'text-emerald-700' : 'text-slate-600'}>
                  {offer.escrowStatus === 'DISBURSED' 
                    ? `✓ 50% Final: ₹${balanceCalculated.toLocaleString('en-IN')} (Settled)` 
                    : `🔒 50% Bal: ₹${balanceCalculated.toLocaleString('en-IN')} (On Delivery)`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-100">
              <span className="text-slate-600 font-semibold">Total Deal Value:</span>
              <span className="font-black text-slate-900">₹{totalCalculated.toLocaleString('en-IN')}</span>
            </div>
            {offer.paymentGatewayTxn && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Gateway Txn ID:</span>
                <span className="font-mono font-bold text-blue-700">{offer.paymentGatewayTxn}</span>
              </div>
            )}
            {offer.biltyNumber && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">e-Bilty Tracking:</span>
                <span className="font-mono font-bold text-emerald-800">{offer.biltyNumber}</span>
              </div>
            )}
          </div>
        )}

        {offer?.note && (
          <p className="mt-2 text-xs text-slate-600 italic bg-amber-50/60 p-2 rounded-lg border border-amber-100">
            "{offer.note}"
          </p>
        )}

        {/* Live Negotiation Form Drawer */}
        {isNegotiating && (
          <form onSubmit={handleSendCounter} className="mt-3 p-3 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black text-blue-900 flex items-center gap-1">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {lang === 'hi' ? 'जवाबी भाव (Counter-Offer)' : 'Submit Counter-Offer'}
              </h5>
              <button
                type="button"
                onClick={() => setIsNegotiating(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">₹</span>
              <input
                type="number"
                step="0.5"
                min="10"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                className="w-24 px-2 py-1.5 rounded-lg border border-blue-300 bg-white font-black text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-500">/kg</span>
              <button
                type="submit"
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-sm transition"
              >
                {lang === 'hi' ? 'प्रस्ताव भेजें' : 'Counter'}
              </button>
            </div>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'नोट (वैकल्पिक)...' : 'Add negotiation note (optional)...'}
              value={counterNote}
              onChange={(e) => setCounterNote(e.target.value)}
              className="w-full px-2.5 py-1 text-xs rounded-lg border border-blue-200 bg-white text-slate-700 focus:outline-none"
            />
          </form>
        )}
      </div>

      {/* Action Buttons: Context-aware for Farmer and Buyer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
        {offer && offer.status === 'PENDING' ? (
          <div className="flex flex-wrap items-center gap-2">
            {/* If Farmer is viewing */}
            {currentRole === 'farmer' && (
              <>
                <button
                  onClick={() => onAccept(offer.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-[12px] transition tap-active shadow-sm"
                >
                  {lang === 'hi' ? 'स्वीकार करें' : 'Accept Offer'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsNegotiating(!isNegotiating)}
                  className="px-2.5 py-2.5 rounded-[12px] border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition flex items-center gap-1"
                  title="Negotiate Price"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'मोलभाव' : 'Negotiate'}</span>
                </button>
                <button
                  onClick={() => onDecline(offer.id)}
                  className="px-3 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition"
                >
                  {lang === 'hi' ? 'अस्वीकार' : 'Decline'}
                </button>
              </>
            )}

            {/* If Buyer is viewing their sent offer or farmer's counter offer */}
            {currentRole === 'buyer' && (
              <>
                {isCounteredByFarmer ? (
                  <>
                    <button
                      onClick={() => onAccept(offer.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-[12px] transition tap-active shadow-sm"
                    >
                      {lang === 'hi' ? 'स्वीकारें व 50% भुगतान करें' : 'Accept Farmer Rate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNegotiating(!isNegotiating)}
                      className="px-2.5 py-2.5 rounded-[12px] border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition flex items-center gap-1"
                      title="Counter Farmer"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'नया मोलभाव' : 'Counter'}</span>
                    </button>
                    <button
                      onClick={() => onDecline(offer.id)}
                      className="px-3 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition"
                    >
                      {lang === 'hi' ? 'रद्द करें' : 'Decline'}
                    </button>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1">
                      <span>⏳ Awaiting Farmer Response</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsNegotiating(!isNegotiating)}
                      className="px-3 py-1.5 rounded-lg border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition flex items-center gap-1"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Revise Offer</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : offer && offer.status === 'ACCEPTED' ? (
          <div className="w-full flex flex-col gap-2">
            
            {/* Stage 1: Awaiting Buyer's 50% Gateway Payment */}
            {offer.escrowStatus === 'AWAITING_BUYER_DEPOSIT' && (
              <>
                {currentRole === 'buyer' ? (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold block">Farmer accepted your offer!</span>
                        <span>Confirm and deposit 50% advance (₹{advanceCalculated.toLocaleString('en-IN')}) via payment gateway to lock deal.</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGatewayModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 tap-active animate-bounce-subtle"
                    >
                      <span>Pay 50% Advance (₹{advanceCalculated.toLocaleString('en-IN')}) via Gateway</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <span className="animate-spin text-base">⏳</span>
                    <span className="font-bold">
                      {lang === 'hi' 
                        ? 'प्रस्ताव स्वीकृत! खरीदार द्वारा 50% अग्रिम भुगतान गेटवे पर लंबित है।' 
                        : 'Offer accepted! Awaiting buyer to deposit 50% advance via payment gateway.'}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Stage 2: 50% Advance Paid; 50% Remaining in Escrow */}
            {offer.escrowStatus === 'ADVANCE_PAID' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQRModal(true)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'ई-बिल्टी / गेट QR कोड' : 'e-Bilty Gate Pass QR'}</span>
                  </button>

                  {/* ONLY Farmer / Gate is allowed to confirm receipt and release remaining 50% */}
                  {currentRole === 'farmer' ? (
                    <button
                      type="button"
                      onClick={() => disburseEscrowToFarmer(offer.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-3 rounded-xl transition shadow-sm"
                      title="Farmer / Gate releases second half upon crop receipt"
                    >
                      {lang === 'hi' ? 'फसल डिलीवरी व शेष 50% प्राप्त' : 'Verify Delivery & Claim 50%'}
                    </button>
                  ) : null}
                </div>

                {/* Buyer sees clear restriction notice that they cannot disburse remaining 50% themselves */}
                {currentRole === 'buyer' ? (
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>50% Advance Paid.</strong> Remaining 50% (₹{balanceCalculated.toLocaleString('en-IN')}) is locked in escrow and will be automatically disbursed upon Mandi Gate inspection / Farmer receipt.
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>50% Advance Received in Bank (₹{advanceCalculated.toLocaleString('en-IN')}).</strong> Remaining ₹{balanceCalculated.toLocaleString('en-IN')} is secured in smart escrow.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Stage 3: Fully Settled */}
            {offer.escrowStatus === 'DISBURSED' && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowQRModal(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'ई-बिल्टी / रसीद देखें' : 'View Gate Pass & Receipt'}</span>
                </button>
                <div className="w-full text-center text-xs font-black text-emerald-800 bg-emerald-100 py-2 rounded-xl border border-emerald-200">
                  ✓ 100% Settled (50% Advance + 50% Final Settlement Released)
                </div>
              </div>
            )}

          </div>
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

      {/* Payment Gateway Modal (Simulated Razorpay / UPI / NetBanking for Buyer) */}
      {showGatewayModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-slate-200 relative space-y-4 animate-in fade-in zoom-in-95">
            <button
              onClick={() => !isProcessingPayment && setShowGatewayModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">
                  KrishiSetu Secure Payment Gateway
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  50% Advance Escrow Deposit • Order #{offer?.id}
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Crop Lot:</span>
                <span className="font-bold text-slate-900">{requestedCrop} ({requestedQuantity} {requestedUnit})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agreed Total Deal Value:</span>
                <span className="font-bold text-slate-900">₹{totalCalculated.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm">
                <span className="font-black text-blue-900">50% Advance Payable Now:</span>
                <span className="font-black text-blue-700">₹{advanceCalculated.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 italic">
                <span>Remaining 50% (₹{balanceCalculated.toLocaleString('en-IN')}):</span>
                <span>Payable on Gate / Lot Delivery</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                Select Payment Method
              </label>
              
              <div 
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  paymentMethod === 'upi' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-emerald-700 shadow-2xs">
                    UPI
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Instant UPI (GPay / PhonePe / BHIM)</div>
                    <div className="text-[11px] text-slate-500">Zero transaction charges • Instant settlement</div>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="pm" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')} 
                  className="accent-blue-600"
                />
              </div>

              <div 
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  paymentMethod === 'netbanking' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-blue-700 shadow-2xs">
                    NB
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Net Banking</div>
                    <div className="text-[11px] text-slate-500">HDFC, SBI, ICICI, Axis Bank & all major banks</div>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="pm" 
                  checked={paymentMethod === 'netbanking'} 
                  onChange={() => setPaymentMethod('netbanking')} 
                  className="accent-blue-600"
                />
              </div>

              <div 
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  paymentMethod === 'card' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-purple-700 shadow-2xs">
                    CARD
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Corporate & Business Cards</div>
                    <div className="text-[11px] text-slate-500">Visa, Mastercard, RuPay Corporate</div>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="pm" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                  className="accent-blue-600"
                />
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={handleGatewayPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <span>Pay ₹{advanceCalculated.toLocaleString('en-IN')} (50% Advance)</span>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 font-medium">
              🔒 256-bit Bank Grade Encryption • Escrow Protected by KrishiSetu
            </p>
          </div>
        </div>
      )}

      {/* Digital Delivery Receipt & QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-center space-y-4 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-black text-lg text-slate-900">
                Digital e-Bilty Gate Pass
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                KrishiSetu Verified Mandi Gate & Transport Pass
              </p>
            </div>

            {/* Generated QR Code Image Simulation */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KRISHI-BILTY-${offer.biltyNumber || '101'}-LOT-${requestedCrop}-${offer.offeredPricePerKg}`}
                alt="e-Bilty QR"
                className="w-40 h-40 rounded-lg shadow-sm"
              />
              <span className="font-mono text-xs font-black text-slate-800 mt-2">
                {offer.biltyNumber || 'EB-891042'}
              </span>
            </div>

            <div className="text-left text-xs space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-600">
              <div className="flex justify-between">
                <span>Crop Lot:</span>
                <span className="font-bold text-slate-900">{requestedCrop} ({requestedQuantity} {requestedUnit})</span>
              </div>
              <div className="flex justify-between">
                <span>Buyer / Consignee:</span>
                <span className="font-bold text-slate-900">{offer.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Plan:</span>
                <span className="font-bold text-emerald-800">50% Advance + 50% On-Delivery Escrow</span>
              </div>
              <div className="flex justify-between">
                <span>50% Advance Paid:</span>
                <span className="font-bold text-emerald-700">₹{advanceCalculated.toLocaleString('en-IN')} ({offer.escrowStatus === 'AWAITING_BUYER_DEPOSIT' ? 'Pending Gateway' : 'Credited'})</span>
              </div>
              <div className="flex justify-between">
                <span>50% Balance on Receipt:</span>
                <span className={`font-bold ${offer.escrowStatus === 'DISBURSED' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  ₹{balanceCalculated.toLocaleString('en-IN')} {offer.escrowStatus === 'DISBURSED' ? '(Released)' : '(Secured in Escrow)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gate Verification:</span>
                <span className="font-bold text-emerald-600">Tamper-Proof Digital Signature</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-sm"
            >
              Print / Save Gate Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
