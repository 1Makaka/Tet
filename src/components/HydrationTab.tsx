import React from 'react';
import { 
  Droplet, 
  Droplets, 
  Plus, 
  Minus, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Moon, 
  Zap, 
  Waves
} from 'lucide-react';
import { ANTI_BLOATING_TIPS } from '../data/initialData';
import { playWaterGulp, playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface HydrationTabProps {
  glassesCount: number; // 0 to 12
  onSetGlasses: (count: number) => void;
  soundEnabled: boolean;
}

export const HydrationTab: React.FC<HydrationTabProps> = ({
  glassesCount,
  onSetGlasses,
  soundEnabled,
}) => {
  const TOTAL_GLASSES = 12;
  const GLASS_VOLUME = 250; // ml
  const currentVolume = glassesCount * GLASS_VOLUME;
  const targetVolume = TOTAL_GLASSES * GLASS_VOLUME; // 3000 ml
  const progressPercent = Math.min(100, Math.round((currentVolume / targetVolume) * 100));

  const handleToggleGlass = (index: number) => {
    // If clicking on the exact current count, deselect it
    let newCount: number;
    if (glassesCount === index + 1) {
      newCount = index;
    } else {
      newCount = index + 1;
    }

    if (soundEnabled) {
      if (newCount > glassesCount) {
        playWaterGulp();
        if (newCount === TOTAL_GLASSES) {
          setTimeout(() => playGoalAccomplished(), 200);
        }
      } else {
        playTactileTick();
      }
    }
    triggerHaptic(20);
    onSetGlasses(newCount);
  };

  const handleAdd = () => {
    if (glassesCount < TOTAL_GLASSES) {
      const next = glassesCount + 1;
      if (soundEnabled) playWaterGulp();
      triggerHaptic(20);
      onSetGlasses(next);
      if (next === TOTAL_GLASSES && soundEnabled) {
        setTimeout(() => playGoalAccomplished(), 200);
      }
    }
  };

  const handleSubtract = () => {
    if (glassesCount > 0) {
      if (soundEnabled) playTactileTick();
      triggerHaptic(15);
      onSetGlasses(glassesCount - 1);
    }
  };

  const handleReset = () => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(20);
    onSetGlasses(0);
  };

  return (
    <div className="space-y-4 pb-20 pt-2 animate-in fade-in duration-300">
      {/* Hydration Hero Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#151f32] via-[#0f213b] to-[#0a182d] border border-cyan-500/30 p-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Droplets className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Водный баланс & Анти-Отеки
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                Цель: 3000 мл (12 стаканов по 250 мл)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xl font-black font-mono text-cyan-400 block tracking-tight">
              {currentVolume} <span className="text-xs text-slate-400 font-normal">/ 3000 мл</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">
              {progressPercent}% выполнено
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 space-y-1 relative z-10">
          <div className="w-full h-3 rounded-full bg-[#0a0f1d] overflow-hidden p-[1px] border border-[#22324d]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
              style={{ width: `${Math.max(3, progressPercent)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
            <span>Выпито: {glassesCount} стаканов</span>
            <span>Осталось: {Math.max(0, targetVolume - currentVolume)} мл</span>
          </div>
        </div>

        {/* Quick buttons */}
        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#22324d]/80 relative z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSubtract}
              disabled={glassesCount === 0}
              className="px-3 py-1.5 rounded-xl bg-[#0a0f1d] border border-[#22324d] text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1"
            >
              <Minus className="w-3.5 h-3.5" />
              <span>-250 мл</span>
            </button>
            <button
              onClick={handleAdd}
              disabled={glassesCount >= TOTAL_GLASSES}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-md shadow-cyan-500/20 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+250 мл</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0a0f1d] border border-[#22324d] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Сброс воды</span>
          </button>
        </div>
      </div>

      {/* 12 Interactive Glasses Grid */}
      <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            12 стаканов по 250 мл (нажми, чтобы заполнить)
          </h3>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold">
            {glassesCount} / 12
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: TOTAL_GLASSES }).map((_, index) => {
            const isFilled = index < glassesCount;
            const glassMl = (index + 1) * 250;
            const isCriticalCutoff = index >= 9; // glasses 10, 11, 12 near 18:30 cutoff

            return (
              <button
                key={index}
                onClick={() => handleToggleGlass(index)}
                className={`relative group rounded-2xl border p-2 flex flex-col items-center justify-between h-20 transition-all select-none overflow-hidden ${
                  isFilled
                    ? 'bg-gradient-to-t from-cyan-950/80 via-cyan-900/30 to-[#151f32] border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.25)] scale-102'
                    : 'bg-[#0a0f1d] border-[#22324d] hover:border-cyan-500/40 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Liquid visual fill inside glass */}
                {isFilled && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-cyan-500/15 border-t border-cyan-400/40 pointer-events-none" />
                )}

                <div className="flex items-center justify-between w-full">
                  <span className={`text-[9px] font-mono font-bold ${isFilled ? 'text-cyan-300' : 'text-slate-500'}`}>
                    #{index + 1}
                  </span>
                  {isCriticalCutoff && (
                    <span className="text-[8px] text-amber-400 font-mono" title="Рекомендуется выпить до 18:30">
                      до 18:30
                    </span>
                  )}
                </div>

                <div className="my-1 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isFilled
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/40 scale-110'
                      : 'bg-[#151f32] text-slate-500 group-hover:text-cyan-400'
                  }`}>
                    <Droplet className={`w-4 h-4 ${isFilled ? 'fill-current' : ''}`} />
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-medium ${isFilled ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                  {glassMl} мл
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daylight Timeline Guide Card */}
      <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Таймлайн: 80% воды строго до 18:30
            </h3>
            <p className="text-[11px] text-slate-400">
              2400 мл в светлое время суток = ночной покой почек и свежее лицо утром
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
          <div className="bg-[#0a0f1d] p-2 rounded-xl border border-[#22324d]">
            <span className="text-[10px] text-sky-400 font-bold block">08:00 – 11:00</span>
            <span className="text-white font-semibold">1000 мл</span>
            <span className="text-[9px] text-slate-500 block">Запуск ЖКТ</span>
          </div>
          <div className="bg-[#0a0f1d] p-2 rounded-xl border border-[#22324d]">
            <span className="text-[10px] text-sky-400 font-bold block">11:00 – 15:30</span>
            <span className="text-white font-semibold">1000 мл</span>
            <span className="text-[9px] text-slate-500 block">Пик активности</span>
          </div>
          <div className="bg-[#0a0f1d] p-2 rounded-xl border border-cyan-500/30">
            <span className="text-[10px] text-amber-400 font-bold block">15:30 – 18:30</span>
            <span className="text-white font-semibold">400 мл</span>
            <span className="text-[9px] text-amber-400 block">СТОП-линия</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300">
          ⚠️ <strong>После 19:00:</strong> не пить стаканами! Только 2-3 маленьких глотка при сильной жажде. Вся вода, выпитая на ночь, задерживается в подкожной клетчатке век и щек.
        </div>
      </div>

      {/* 4 Anti-Oedema Golden Rules */}
      <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Памятка против отеков (Чистое лицо & Рельеф)
            </h3>
            <p className="text-[11px] text-slate-400">4 научных правила против задержки подкожной воды</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {ANTI_BLOATING_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="p-3 rounded-xl bg-[#0a0f1d] border border-[#22324d] space-y-1 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-mono flex items-center justify-center">
                    {tip.id}
                  </span>
                  {tip.title}
                </h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {tip.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
