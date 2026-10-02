import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenAPKGuide: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenAPKGuide }) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  return (
    <div className="flex items-center gap-1.5">
      {/* If installable via browser prompt */}
      {isInstallable && !isInstalled && (
        <button
          onClick={install}
          aria-label="Установить PWA"
          className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white flex items-center gap-1.5 text-[11px] font-bold shadow-md shadow-sky-500/20 transition-all active:scale-95"
          title="Установить приложение на устройство"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Установить</span>
        </button>
      )}

      {/* APK / PWA Info & Download Helper Modal trigger */}
      <button
        onClick={onOpenAPKGuide}
        aria-label="Сборка APK и PWA Манифест"
        className="h-8 px-2 rounded-lg bg-[#151f32] border border-sky-500/30 hover:border-sky-400/60 flex items-center gap-1 text-[11px] font-medium text-sky-300 hover:text-white transition-colors shadow-sm"
        title="Информация о манифесте и сборке APK"
      >
        <Smartphone className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline">APK / PWA</span>
        <span className="sm:hidden">APK</span>
      </button>

      {/* iOS Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0e172a] border border-slate-700 p-5 shadow-2xl text-slate-100">
            <h3 className="text-base font-bold text-white mb-2">Установка на iPhone / iPad</h3>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              1. Нажмите иконку <strong>«Поделиться»</strong> в нижней панели Safari.<br />
              2. Пролистайте вниз и выберите <strong>«На экран "Домой"»</strong>.<br />
              3. Приложение появится на рабочем столе как полноценная программа.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-2 w-full rounded-xl bg-sky-600 py-2 text-xs font-semibold text-white hover:bg-sky-500"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
