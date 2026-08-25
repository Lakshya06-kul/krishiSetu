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

function MainApp() {
  const { currentRole, toastMessage } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');

  if (!isAuthenticated) {
    return <SplashAuthScreen onComplete={() => setIsAuthenticated(true)} />;
  }

    const renderScreen = () => {
      switch (activeScreen) {
        case 'dashboard':
          if (currentRole === 'buyer') return <BuyerDashboardScreen setScreen={setActiveScreen} />;
          if (currentRole === 'fpo') return <FPODashboardScreen setScreen={setActiveScreen} />;
          return <FarmerDashboardScreen setScreen={setActiveScreen} />;
        case 'create_lot':
          return <CreateLotScreen setScreen={setActiveScreen} />;
        case 'ai_recommendation':
          return <AIRecommendationScreen setScreen={setActiveScreen} />;
        case 'market_comparison':
          return <MarketComparisonScreen setScreen={setActiveScreen} />;
        case 'marketplace':
          return <BuyerMarketplaceScreen setScreen={setActiveScreen} />;
        case 'profile':
          return <AnalyticsProfileScreen setScreen={setActiveScreen} />;
        case 'logistics':
          return <LogisticsScreen setScreen={setActiveScreen} />;
        case 'ai_chat':
          return <AIChatScreen setScreen={setActiveScreen} />;
        default:
          if (currentRole === 'buyer') return <BuyerDashboardScreen setScreen={setActiveScreen} />;
          if (currentRole === 'fpo') return <FPODashboardScreen setScreen={setActiveScreen} />;
          return <FarmerDashboardScreen setScreen={setActiveScreen} />;
      }
    };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-900 selection:bg-emerald-500 selection:text-white pt-10">
      
      <OfflineBanner />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 animate-bounce">
          <div className="bg-slate-900 text-white text-xs font-extrabold px-4 py-3 rounded-2xl shadow-large border border-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main App Header */}
      <Header currentScreen={activeScreen} setScreen={setActiveScreen} />

      {/* Main Screen Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {renderScreen()}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} setScreen={setActiveScreen} />

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
