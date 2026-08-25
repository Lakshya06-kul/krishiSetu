import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-orange-500 text-white px-4 py-2 flex items-center justify-center space-x-2 fixed top-0 w-full z-50">
      <WifiOff size={16} />
      <span className="text-sm font-medium">Offline Mode - Changes will be saved locally</span>
    </div>
  );
};

export default OfflineBanner;
