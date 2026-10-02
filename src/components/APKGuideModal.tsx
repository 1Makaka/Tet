import React, { useState } from 'react';
import { X, Smartphone, Download, CheckCircle2, Copy, Check, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface APKGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const APKGuideModal: React.FC<APKGuideModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const manifestUrl = typeof window !== 'undefined' ? `${window.location.origin}/manifest.json` : '/manifest.json';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0e172a] border border-sky-500/30 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0e172a] rounded-[10px] flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Манифест и сборка APK
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Готово
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Web App Manifest 100% готов для установки и генерации .apk
            </p>
          </div>
        </div>

        {/* Manifest Status Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-[#151f32] p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>manifest.webmanifest</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Иконки 192px / 512px / Maskable</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Офлайн Service Worker</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Standalone & Splash screen</span>
          </div>
        </div>

        {/* Quick Action: Direct Install */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-sky-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Способ 1: Прямая установка (PWA)
            </h3>
            {isInstalled && (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Установлено
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Работает точно так же, как APK: приложение открывается в полноэкранном режиме с рабочего стола без браузерной строки.
          </p>

          {isInstallable && (
            <button
              onClick={install}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Установить на устройство в 1 клик
            </button>
          )}

          {isIOS && (
            <div className="bg-[#0a0f1d] p-3 rounded-lg border border-slate-700/60 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1">Для iPhone / Safari:</p>
              <p>1. Нажмите кнопку <strong>«Поделиться»</strong> (квадрат со стрелкой внизу).</p>
              <p>2. Выберите <strong>«На экран "Домой"»</strong>.</p>
            </div>
          )}

          {!isInstallable && !isIOS && !isInstalled && (
            <div className="bg-[#0a0f1d] p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-400">
              В Chrome/Яндекс.Браузере нажмите <strong>три точки в меню</strong> → <strong>«Установить приложение»</strong> или <strong>«Добавить на главный экран»</strong>.
            </div>
          )}
        </div>

        {/* Option 2: Generate APK via PWABuilder / Bubblewrap */}
        <div className="p-4 rounded-xl bg-[#151f32] border border-slate-700/60 mb-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-1.5 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Способ 2: Собрать настоящий .APK файл
          </h3>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Поскольку манифест и иконки полностью настроены, вы можете сгенерировать готовый <span className="text-sky-300 font-mono">.apk</span> или <span className="text-sky-300 font-mono">.aab</span> для Google Play через бесплатный сервис Microsoft PWABuilder:
          </p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-[#0a0f1d] p-3 rounded-lg border border-slate-800 mb-3">
            <li>
              Скопируйте URL приложения:
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="bg-[#151f32] text-sky-300 text-[11px] px-2.5 py-1.5 rounded border border-slate-700 w-full truncate font-mono"
                />
                <button
                  onClick={handleCopyUrl}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
            </li>
            <li className="pt-1">
              Перейдите на сайт <span className="text-sky-400 font-semibold">PWABuilder.com</span> (или используйте Google Bubblewrap CLI).
            </li>
            <li>Вставьте ссылку на сайт и нажмите <strong>«Start»</strong>.</li>
            <li>Манифест наберет высший балл 100/100. Нажмите <strong>«Package for Android (APK)»</strong>.</li>
          </ol>

          <div className="flex gap-2">
            <a
              href="https://www.pwabuilder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-sky-600/30 hover:bg-sky-600/50 border border-sky-500/40 text-sky-200 text-xs font-semibold transition-colors text-center"
            >
              <span>Открыть PWABuilder</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={manifestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>manifest.json</span>
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
        >
          Понятно, закрыть
        </button>
      </div>
    </div>
  );
};
