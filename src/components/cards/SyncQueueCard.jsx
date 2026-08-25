import React, { useEffect, useState } from 'react';
import { getQueue } from '../../utils/offlineQueue';
import { CloudUpload } from 'lucide-react';

const SyncQueueCard = () => {
  const [queueCount, setQueueCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchQueue = async () => {
      const items = await getQueue();
      setQueueCount(items.length);
    };
    fetchQueue();

    const handleOnline = () => {
      setIsOnline(true);
      fetchQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(fetchQueue, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (queueCount === 0 || !isOnline) return null;

  return (
    <div className="bg-green-100 border border-green-200 rounded-xl p-4 flex items-center justify-between mb-4 mx-4 shadow-sm relative z-40">
      <div className="flex flex-col">
        <span className="text-green-800 font-semibold">{queueCount} pending uploads</span>
        <span className="text-green-600 text-xs">Ready to sync now that you're back online</span>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium hover:bg-green-700 transition">
        <CloudUpload size={16} />
        <span>Sync Now</span>
      </button>
    </div>
  );
};

export default SyncQueueCard;
