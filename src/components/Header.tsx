import React from 'react';
import { Volume2, VolumeX, RotateCcw, Flame } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenResetModal: () => void;
  caloriesConsumed: number;
  totalCalories: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenResetModal,
  caloriesConsumed,
  totalCalories,
}) => {
  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const progressPercent = Math.min(100, Math.round((caloriesConsumed / totalCalories) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[#22324d] px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-sky-400 animate-pulse-subtle" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold tracking-tight text-white font-mono">
                LEAN BULK <span className="text-sky-400">PRO</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 capitalize">
              {todayStr} · {progressPercent}% закрыто
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Выключить звук' : 'Включить звук'}
            className="w-8 h-8 rounded-lg bg-[#151f32] border border-[#22324d] flex items-center justify-center text-slate-300 hover:text-sky-400 transition-colors shadow-sm"
            title={soundEnabled ? 'Звук включен' : 'Звук отключен'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            onClick={onOpenResetModal}
            aria-label="Сброс дня"
            className="h-8 px-2.5 rounded-lg bg-[#151f32] border border-[#22324d] flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors shadow-sm"
            title="Сбросить отметки дня"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сброс</span>
          </button>
        </div>
      </div>
    </header>
  );
};
