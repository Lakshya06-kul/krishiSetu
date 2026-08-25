import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_PROFILES, INITIAL_PRODUCE_LOTS, INITIAL_BUYER_OFFERS } from '../services/mockData';
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



  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    i18n.changeLanguage(nextLang);
    showToast(nextLang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है' : 'Language set to English');
  };

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add new produce lot
  const addProduceLot = (newLot) => {
    const createdLot = {
      id: `lot_${Date.now().toString().slice(-4)}`,
      farmerId: userProfile.id,
      farmerName: userProfile.name,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      ...newLot
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

  // Accept/Reject Offer by Farmer
  const updateOfferStatus = (offerId, newStatus) => {
    setBuyerOffers(prev => prev.map(off => off.id === offerId ? { ...off, status: newStatus } : off));
    showToast(newStatus === 'ACCEPTED' ? 'Offer Accepted! Direct transaction initiated.' : 'Offer Declined.');
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
        toggleLanguage,
        produceLots,
        addProduceLot,
        buyerOffers,
        sendBuyerOffer,
        updateOfferStatus,
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
