import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, BellRing, Sparkles, Volume2 } from 'lucide-react';
import { playTimerFinish, triggerTimerVibration, triggerHaptic, playTactileTick } from '../utils/audio';

interface RestTimerProps {
  soundEnabled: boolean;
  onTimerComplete?: () => void;
  autoStartSeconds?: number | null;
  onClearAutoStart?: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  soundEnabled,
  onTimerComplete,
  autoStartSeconds,
  onClearAutoStart,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(90);
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Watch for external autostart requests (e.g. user checked a set in workout)
  useEffect(() => {
    if (autoStartSeconds && autoStartSeconds > 0) {
      setTotalSeconds(autoStartSeconds);
      setTimeLeft(autoStartSeconds);
      setIsRunning(true);
      setIsFinished(false);
      if (onClearAutoStart) onClearAutoStart();
    }
  }, [autoStartSeconds, onClearAutoStart]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsFinished(true);
      if (soundEnabled) {
        playTimerFinish();
      }
      triggerTimerVibration();
      if (onTimerComplete) {
        onTimerComplete();
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, timeLeft, soundEnabled, onTimerComplete]);

  const handleStartPreset = (seconds: number) => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(20);
    setTotalSeconds(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleTogglePlay = () => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(20);
    if (timeLeft === 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      setIsFinished(false);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(15);
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    setIsFinished(false);
  };

  const handleAddSeconds = (extra: number) => {
    if (soundEnabled) playTactileTick();
    triggerHaptic(15);
    setTimeLeft((prev) => prev + extra);
    setTotalSeconds((prev) => Math.max(prev, timeLeft + extra));
    setIsFinished(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = totalSeconds > 0 ? (timeLeft / totalSeconds) * 100 : 0;
  const strokeDashoffset = 283 - (283 * progress) / 100;

  return (
    <div className={`rounded-2xl border transition-all duration-300 p-4 ${
      isFinished
        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
        : isRunning
        ? 'bg-[#151f32] border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
        : 'bg-[#151f32] border-[#22324d]'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isRunning ? 'bg-sky-400 animate-ping' : isFinished ? 'bg-emerald-400' : 'bg-slate-500'
          }`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Таймер отдыха между подходами
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              playTimerFinish();
              triggerTimerVibration();
            }}
            className="text-[10px] px-2 py-0.5 rounded-md bg-[#0a0f1d] border border-[#22324d] text-sky-400 hover:text-sky-200 transition-colors flex items-center gap-1"
            title="Проверить звук гонга и вибро-отклик"
          >
            <Volume2 className="w-3 h-3" />
            <span>Тест</span>
          </button>
          <button
            onClick={() => handleAddSeconds(15)}
            className="text-[11px] px-2 py-0.5 rounded-md bg-[#0a0f1d] border border-[#22324d] text-slate-400 hover:text-sky-300 transition-colors"
          >
            +15 сек
          </button>
          <button
            onClick={() => handleAddSeconds(30)}
            className="text-[11px] px-2 py-0.5 rounded-md bg-[#0a0f1d] border border-[#22324d] text-slate-400 hover:text-sky-300 transition-colors"
          >
            +30 сек
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Circular Countdown Progress */}
        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#0a0f1d"
              strokeWidth="7"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={isFinished ? '#22c55e' : isRunning ? '#38bdf8' : '#64748b'}
              strokeWidth="7"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {isFinished ? (
              <div className="flex flex-col items-center animate-bounce">
                <BellRing className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Готов!</span>
              </div>
            ) : (
              <>
                <span className="text-xl font-black font-mono tracking-tight text-white">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">
                  {isRunning ? 'отдых' : 'пауза'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2.5">
          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleStartPreset(90)}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                totalSeconds === 90 && isRunning
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/20'
                  : 'bg-[#0a0f1d] border-[#22324d] text-slate-300 hover:border-sky-500/40 hover:text-white'
              }`}
            >
              <span>90 сек</span>
              <span className="text-[10px] text-slate-500 font-normal">Изоляция</span>
            </button>
            <button
              onClick={() => handleStartPreset(120)}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                totalSeconds === 120 && isRunning
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/20'
                  : 'bg-[#0a0f1d] border-[#22324d] text-slate-300 hover:border-sky-500/40 hover:text-white'
              }`}
            >
              <span>120 сек</span>
              <span className="text-[10px] text-slate-500 font-normal">База</span>
            </button>
          </div>

          {/* Action buttons (Play/Pause, Reset) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/25'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Пауза</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{timeLeft === 0 ? 'Заново' : 'Старт'}</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="py-2 px-3 rounded-xl bg-[#0a0f1d] border border-[#22324d] text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center transition-colors"
              title="Сбросить таймер"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
