import React, { useState } from 'react';
import { X, Plus, Minus, Scale, Check, TrendingUp } from 'lucide-react';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface WeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeight: number;
  startWeight: number;
  targetWeight: number;
  onSaveWeight: (newWeight: number) => void;
  soundEnabled: boolean;
}

export const WeightModal: React.FC<WeightModalProps> = ({
  isOpen,
  onClose,
  currentWeight,
  startWeight,
  targetWeight,
  onSaveWeight,
  soundEnabled,
}) => {
  const [weight, setWeight] = useState<number>(currentWeight);

  if (!isOpen) return null;

  const handleAdjust = (delta: number) => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(15);
    setWeight((prev) => Math.round((prev + delta) * 10) / 10);
  };

  const handleSave = () => {
    if (soundEnabled) playGoalAccomplished();
    triggerHaptic(50);
    onSaveWeight(weight);
    onClose();
  };

  const totalGoalDelta = targetWeight - startWeight; // 10 kg
  const currentGained = Math.round((weight - startWeight) * 10) / 10;
  const remaining = Math.max(0, Math.round((targetWeight - weight) * 10) / 10);
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentGained / totalGoalDelta) * 100)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-2xl bg-[#151f32] border border-[#22324d] p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Взвешивание</h3>
              <p className="text-xs text-slate-400">Утром натощак после туалета</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Counter Display */}
        <div className="bg-[#0a0f1d] rounded-2xl p-5 border border-[#22324d] flex flex-col items-center justify-center">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Текущий вес
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white font-mono tracking-tight">
              {weight.toFixed(1)}
            </span>
            <span className="text-lg font-bold text-sky-400 font-mono">кг</span>
          </div>

          <div className="flex items-center gap-2 mt-4 w-full">
            <button
              onClick={() => handleAdjust(-0.5)}
              className="flex-1 py-1.5 rounded-lg bg-[#151f32] border border-[#22324d] text-xs font-semibold text-slate-300 hover:text-white"
            >
              -0.5
            </button>
            <button
              onClick={() => handleAdjust(-0.1)}
              className="w-10 h-10 rounded-xl bg-[#151f32] border border-[#22324d] flex items-center justify-center text-slate-200 hover:text-white hover:border-sky-500/40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAdjust(0.1)}
              className="w-10 h-10 rounded-xl bg-[#151f32] border border-[#22324d] flex items-center justify-center text-slate-200 hover:text-white hover:border-sky-500/40"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAdjust(0.5)}
              className="flex-1 py-1.5 rounded-lg bg-[#151f32] border border-[#22324d] text-xs font-semibold text-slate-300 hover:text-white"
            >
              +0.5
            </button>
          </div>
        </div>

        {/* Bulk progress preview */}
        <div className="bg-[#151f32]/60 rounded-xl p-3 border border-[#22324d]/80 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span>Прогресс цели 57 → 67 кг:</span>
            <span className="font-bold text-sky-400 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0a0f1d] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
            <span className="text-emerald-400 font-semibold">
              {currentGained >= 0 ? `+${currentGained}` : currentGained} кг набрано
            </span>
            <span>Осталось: {remaining} кг</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Сохранить результат</span>
        </button>
      </div>
    </div>
  );
};
