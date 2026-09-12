import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_PROFILES, INITIAL_PRODUCE_LOTS, INITIAL_BUYER_OFFERS, getCropImages } from '../services/mockData';
import { calculateNetProfitRecommendations, generateLLMExplanation } from '../services/aiEngine';
import i18n from '../i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in user & role ('farmer' | 'buyer' | 'fpo')
  const [currentRole, setCurrentRole] = useState('farmer');
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILES.farmer);

  // App Language ('en' | 'hi')
  const [lang, setLang] = useState('en');

  // Produce lots state
  const [produceLots, setProduceLots] = useState(INITIAL_PRODUCE_LOTS);

  // Buyer offers state
  const [buyerOffers, setBuyerOffers] = useState(INITIAL_BUYER_OFFERS);

  // Active Toast / Alert state
  const [toastMessage, setToastMessage] = useState(null);

  // Selected Lot for Detail / AI view
  const [selectedLotId, setSelectedLotId] = useState('lot_101');

  // Update profile whenever role switches
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    setUserProfile(INITIAL_USER_PROFILES[newRole] || INITIAL_USER_PROFILES.farmer);
    showToast(`Switched view to ${newRole.toUpperCase()} mode`);
  };



  const setLanguage = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    const langNames = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', te: 'తెలుగు', mr: 'मराठी', kn: 'ಕನ್ನಡ', pa: 'ਪੰਜਾਬੀ' };
    showToast(`Language set to ${langNames[newLang] || newLang}`);
  };

  const toggleLanguage = () => {
    const langs = ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'pa'];
    const nextIdx = (langs.indexOf(lang) + 1) % langs.length;
    setLanguage(langs[nextIdx]);
  };

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add new produce lot
  const addProduceLot = (newLot) => {
    const fallbackImages = getCropImages(newLot.crop);
    const resolvedImages = (newLot.images && newLot.images.length > 0) ? newLot.images : fallbackImages;

    const createdLot = {
      id: `lot_${Date.now().toString().slice(-4)}`,
      farmerId: userProfile.id,
      farmerName: userProfile.name,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      ...newLot,
      images: resolvedImages
    };
    setProduceLots(prev => [createdLot, ...prev]);
    setSelectedLotId(createdLot.id);
    showToast(lang === 'hi' ? 'फसल की खेप सफलतापूर्वक जोड़ी गई!' : 'Produce lot listed successfully!');
    return createdLot;
  };

  // Send Buyer Offer
  const sendBuyerOffer = (offerData) => {
    const newOffer = {
      id: `off_${Date.now().toString().slice(-4)}`,
      buyerId: userProfile.id,
      buyerName: userProfile.name,
      buyerAvatar: userProfile.avatar,
      verified: true,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      ...offerData
    };
    setBuyerOffers(prev => [newOffer, ...prev]);
    showToast(lang === 'hi' ? 'खरीदार की पेशकश भेजी गई!' : 'Offer submitted to farmer!');
  };

  // Accept/Reject Offer by Farmer or Buyer
  const updateOfferStatus = (offerId, newStatus) => {
    setBuyerOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const total = off.totalAmount || Math.round((off.offeredPricePerKg || 30) * (off.quantity || 1000));
        const advance50 = Math.round(total * 0.5);
        const balance50 = total - advance50;

        if (newStatus === 'ACCEPTED') {
          // When Farmer accepts, order enters AGREED state awaiting buyer's 50% gateway payment
          return {
            ...off,
            status: 'ACCEPTED',
            escrowStatus: 'AWAITING_BUYER_DEPOSIT',
            escrowStage: 'AWAITING_ADVANCE',
            totalAmount: total,
            advanceAmount: advance50,
            balanceAmount: balance50,
            acceptedAt: new Date().toISOString(),
            biltyNumber: off.biltyNumber || `EB-${Date.now().toString().slice(-6)}`
          };
        }
        return { ...off, status: newStatus };
      }
      return off;
    }));
    
    if (newStatus === 'ACCEPTED') {
      showToast(lang === 'hi' 
        ? 'प्रस्ताव स्वीकृत! खरीदार को 50% अग्रिम भुगतान गेटवे द्वारा करने की सूचना दी गई।' 
        : 'Offer accepted! Awaiting buyer to confirm and pay 50% advance via payment gateway.');
    } else {
      showToast(lang === 'hi' ? 'प्रस्ताव अस्वीकृत।' : 'Offer Declined.');
    }
  };

  // Buyer completes 50% Advance Payment via Gateway (Razorpay/UPI)
  const buyerPayAdvance50 = (offerId, paymentMethod = 'UPI / NetBanking') => {
    setBuyerOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const total = off.totalAmount || Math.round((off.offeredPricePerKg || 30) * (off.quantity || 1000));
        const advance50 = Math.round(total * 0.5);
        const balance50 = total - advance50;
        return {
          ...off,
          status: 'ACCEPTED',
          escrowStatus: 'ADVANCE_PAID',
          escrowStage: '50_PERCENT_PAID',
          totalAmount: total,
          advanceAmount: advance50,
          balanceAmount: balance50,
          advancePaidAt: new Date().toISOString(),
          paymentGatewayTxn: `TXN-${Date.now().toString().slice(-8)}`,
          paymentMethod
        };
      }
      return off;
    }));
    showToast(lang === 'hi' 
      ? 'भुगतान सफल! 50% अग्रिम राशि किसान को स्थानांतरित, शेष 50% एस्क्रो में सुरक्षित।' 
      : 'Payment Successful! 50% advance transferred to farmer; remaining 50% locked in escrow.');
  };

  // Submit Counter-Offer during negotiation (either farmer or buyer)
  const submitCounterOffer = (offerId, newPrice, note = '') => {
    setBuyerOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const targetLot = produceLots.find(l => l.id === off.lotId);
        const quantity = off.quantity || targetLot?.quantity || 1000;
        const total = Math.round(Number(newPrice) * quantity);
        return {
          ...off,
          offeredPricePerKg: Number(newPrice),
          totalAmount: total,
          advanceAmount: Math.round(total * 0.5),
          balanceAmount: total - Math.round(total * 0.5),
          status: 'PENDING',
          escrowStatus: 'IN_NEGOTIATION',
          negotiatedBy: currentRole,
          lastNegotiatedAt: new Date().toISOString(),
          note: note || (currentRole === 'farmer' 
            ? `Farmer counter-offered rate of ₹${newPrice}/kg` 
            : `Buyer counter-offered rate of ₹${newPrice}/kg`)
        };
      }
      return off;
    }));

    showToast(lang === 'hi' 
      ? `नया जवाबी प्रस्ताव (₹${newPrice}/kg) भेजा गया!` 
      : `Counter-offer of ₹${newPrice}/kg submitted!`);
  };

  // Farmer / Mandi Gate confirms lot receipt & releases remaining 50% smart escrow balance to farmer
  // Note: Buyer is strictly NOT allowed to disburse the final 50% on their own
  const disburseEscrowToFarmer = (offerId) => {
    if (currentRole === 'buyer') {
      showToast('Action Restricted: Only Mandi Gate Operator or Farmer Delivery Receipt can release final 50% escrow.', 'warning');
      return;
    }

    setBuyerOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        return {
          ...off,
          escrowStatus: 'DISBURSED',
          escrowStage: '100_PERCENT_COMPLETED',
          finalPaidAt: new Date().toISOString()
        };
      }
      return off;
    }));
    showToast(lang === 'hi' ? 'फसल प्राप्ति सत्यापित! शेष 50% भुगतान किसान को स्थानांतरित।' : 'Lot delivery verified at gate! Remaining 50% balance disbursed to farmer.');
  };

  // Selected Lot Details & AI Calculations
  const selectedLot = produceLots.find(l => l.id === selectedLotId) || produceLots[0];
  
  const recommendation = selectedLot ? calculateNetProfitRecommendations(
    selectedLot.crop,
    selectedLot.quantity,
    selectedLot.qualityBonus || 1.5,
    selectedLot.location
  ) : null;

  const llmAdvice = recommendation ? generateLLMExplanation(recommendation, selectedLot?.crop, lang) : null;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        switchRole,
        userProfile,
        lang,
        setLanguage,
        toggleLanguage,
        produceLots,
        addProduceLot,
        buyerOffers,
        sendBuyerOffer,
        updateOfferStatus,
        submitCounterOffer,
        buyerPayAdvance50,
        disburseEscrowToFarmer,
        selectedLotId,
        setSelectedLotId,
        selectedLot,
        recommendation,
        llmAdvice,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
