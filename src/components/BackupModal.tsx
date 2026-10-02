import React, { useRef, useState } from 'react';
import { Download, Upload, ShieldCheck, X, FileText, Check, AlertCircle } from 'lucide-react';
import { AppState } from '../types';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: AppState;
  onImportState: (newState: AppState) => void;
  soundEnabled: boolean;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  currentState,
  onImportState,
  soundEnabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    if (soundEnabled) playGoalAccomplished();
    triggerHaptic(40);

    const now = new Date().toISOString().split('T')[0];
    const dataStr = JSON.stringify(currentState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lean-bulk-pro-backup-${now}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setImportStatus('Резервная копия успешно экспортирована!');
    setTimeout(() => setImportStatus(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Validation check
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('Некорректный формат JSON');
        }

        // Merge safely
        const restoredState: AppState = {
          ...currentState,
          ...parsed,
        };

        onImportState(restoredState);

        if (soundEnabled) playGoalAccomplished();
        triggerHaptic(50);

        setImportStatus('Все данные успешно восстановлены из резервной копии!');
        setErrorMessage(null);
        setTimeout(() => {
          setImportStatus(null);
          onClose();
        }, 1800);
      } catch (err) {
        setErrorMessage('Ошибка чтения файла. Убедитесь, что это корректный JSON бэкап LEAN BULK PRO.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-2xl bg-[#151f32] border border-[#22324d] p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Бэкап базы данных</h3>
              <p className="text-xs text-slate-400">Экспорт & Импорт всех отметок</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-[#0a0f1d] p-3 rounded-xl border border-[#22324d]">
          Сохраняйте файл бэкапа, чтобы ваши <strong>стрики</strong>, <strong>повторения в подходах</strong>, <strong>ценники продуктов</strong> и <strong>история веса</strong> никогда не стерлись при очистке кэша браузера.
        </p>

        {importStatus && (
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-2 pt-1">
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт данных в JSON файл</span>
          </button>

          {/* Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl bg-[#0a0f1d] hover:bg-[#1a2538] border border-[#22324d] text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>Импорт из JSON файла</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
