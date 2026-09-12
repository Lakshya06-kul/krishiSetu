import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import SplashAuthScreen from './screens/SplashAuthScreen';
import FarmerDashboardScreen from './screens/FarmerDashboardScreen';
import CreateLotScreen from './screens/CreateLotScreen';
import BuyerDashboardScreen from './screens/BuyerDashboardScreen';
import FPODashboardScreen from './screens/FPODashboardScreen';
import AIRecommendationScreen from './screens/AIRecommendationScreen';
import MarketComparisonScreen from './screens/MarketComparisonScreen';
import BuyerMarketplaceScreen from './screens/BuyerMarketplaceScreen';
import AnalyticsProfileScreen from './screens/AnalyticsProfileScreen';
import LogisticsScreen from './screens/LogisticsScreen';
import AIChatScreen from './screens/AIChatScreen';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import OfflineBanner from './components/common/OfflineBanner';
import VoiceFAB from './components/common/VoiceFAB';
import CommodityTicker from './components/common/CommodityTicker';

function MainApp() {
  const { currentRole, toastMessage } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screenHistory, setScreenHistory] = useState(['dashboard']);
  const activeScreen = screenHistory[screenHistory.length - 1] || 'dashboard';

  const navigateTo = (newScreen) => {
    if (newScreen === activeScreen) return;
    setScreenHistory((prev) => [...prev, newScreen]);
  };

  const goBack = () => {
    setScreenHistory((prev) => {
      if (prev.length <= 1) return ['dashboard'];
      return prev.slice(0, -1);
    });
  };

  const resetToDashboard = () => {
    setScreenHistory(['dashboard']);
  };

  if (!isAuthenticated) {
    return <SplashAuthScreen onComplete={() => setIsAuthenticated(true)} />;
  }

  const renderScreen = () => {
    const screenProps = { setScreen: navigateTo, goBack };
    switch (activeScreen) {
      case 'dashboard':
        if (currentRole === 'buyer') return <BuyerDashboardScreen {...screenProps} />;
        if (currentRole === 'fpo') return <FPODashboardScreen {...screenProps} />;
        return <FarmerDashboardScreen {...screenProps} />;
      case 'create_lot':
        return <CreateLotScreen {...screenProps} />;
      case 'ai_recommendation':
        return <AIRecommendationScreen {...screenProps} />;
      case 'market_comparison':
        return <MarketComparisonScreen {...screenProps} />;
      case 'marketplace':
        return <BuyerMarketplaceScreen {...screenProps} />;
      case 'profile':
        return <AnalyticsProfileScreen {...screenProps} />;
      case 'logistics':
        return <LogisticsScreen {...screenProps} />;
      case 'ai_chat':
        return <AIChatScreen {...screenProps} />;
      default:
        if (currentRole === 'buyer') return <BuyerDashboardScreen {...screenProps} />;
        if (currentRole === 'fpo') return <FPODashboardScreen {...screenProps} />;
        return <FarmerDashboardScreen {...screenProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      <OfflineBanner />

      {/* Sticky Header + Live Mandi Ribbon */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <Header 
          currentScreen={activeScreen} 
          setScreen={navigateTo} 
          goBack={goBack} 
          canGoBack={screenHistory.length > 1 || activeScreen !== 'dashboard'} 
        />
        <CommodityTicker />
      </div>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 animate-bounce">
          <div className="bg-slate-900 text-white text-xs font-extrabold px-4 py-3 rounded-2xl shadow-large border border-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Screen Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {renderScreen()}
      </main>

      <VoiceFAB onOpenAssistant={() => navigateTo('ai_chat')} />

      {/* Mobile Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} setScreen={navigateTo} />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
