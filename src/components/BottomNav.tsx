import React from 'react';
import { LayoutDashboard, UtensilsCrossed, Dumbbell, ShoppingCart, Droplets } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export type TabType = 'dashboard' | 'nutrition' | 'workout' | 'grocery' | 'water';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingMealsCount: number;
  pendingWaterCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  pendingMealsCount,
  pendingWaterCount,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Главная',
      icon: LayoutDashboard,
      badge: 0,
    },
    {
      id: 'nutrition' as TabType,
      label: 'Рацион',
      icon: UtensilsCrossed,
      badge: pendingMealsCount,
    },
    {
      id: 'workout' as TabType,
      label: 'Тренировка',
      icon: Dumbbell,
      badge: 0,
    },
    {
      id: 'grocery' as TabType,
      label: 'Закупка',
      icon: ShoppingCart,
      badge: 0,
    },
    {
      id: 'water' as TabType,
      label: 'Вода',
      icon: Droplets,
      badge: pendingWaterCount > 0 ? pendingWaterCount : 0,
    },
  ];

  const handleTabClick = (tabId: TabType) => {
    triggerHaptic(15);
    onChangeTab(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#0a0f1d]/95 backdrop-blur-xl border-t border-[#22324d]">
      <div className="max-w-md mx-auto grid grid-cols-5 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 font-normal'
              }`}
            >
              {/* Active neon pill indicator */}
              {isActive && (
                <span className="absolute -top-2 w-8 h-1 bg-sky-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-sky-400' : 'text-slate-400'}`} />
                {tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-sky-500 text-[9px] font-bold text-slate-950 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-full ${isActive ? 'text-sky-400 font-medium' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
