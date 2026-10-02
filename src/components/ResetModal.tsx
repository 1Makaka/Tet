import React from 'react';
import { RotateCcw, AlertTriangle, X, Check } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-2xl bg-[#151f32] border border-[#22324d] p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Сброс дня?</h3>
              <p className="text-xs text-slate-400">Начать новый день с чистым чеклистом</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-300 space-y-2 bg-[#0a0f1d] p-3 rounded-xl border border-[#22324d]/60">
          <p className="font-semibold text-sky-400">Что сбросится:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            <li>Отметки 3 приемов пищи (КБЖУ)</li>
            <li>Выпитая вода (12 стаканов)</li>
            <li>Отмеченные подходы тренировки</li>
          </ul>
          <p className="font-semibold text-emerald-400 pt-1">Что сохранится:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            <li>История и прогресс веса (57 → 67 кг)</li>
            <li>Список покупок в магазине (Lidl / Aldi)</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-[#22324d] bg-[#151f32] text-xs font-semibold text-slate-300 hover:bg-[#22324d] transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-sky-500/25 flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Сбросить</span>
          </button>
        </div>
      </div>
    </div>
  );
};
