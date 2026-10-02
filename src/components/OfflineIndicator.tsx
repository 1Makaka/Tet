import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-xl bg-amber-500/95 text-slate-950 px-4 py-2.5 font-semibold text-xs shadow-2xl backdrop-blur-md border border-amber-300">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
        <span>Офлайн режим — все данные сохраняются локально</span>
      </div>
    </div>
  );
};
