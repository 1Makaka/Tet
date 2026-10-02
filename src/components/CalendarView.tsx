import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Check, 
  Flame, 
  Dumbbell, 
  Sparkles,
  Trophy,
  RotateCcw,
  Clock,
  Moon,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface CalendarViewProps {
  programStartDate: string;
  completedDays: Record<number, boolean>;
  completedDates: Record<string, boolean>;
  onSetStartDate: (date: string) => void;
  onToggleDate: (dateStr: string, dayNum: number) => void;
  soundEnabled: boolean;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  programStartDate,
  completedDays,
  completedDates,
  onSetStartDate,
  onToggleDate,
  soundEnabled,
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'grid90'>('month');

  // Currently viewed month
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  // Selected date for day detail card (defaults to today)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const startObj = new Date(programStartDate || todayStr);
  startObj.setHours(0, 0, 0, 0);

  // Month navigation
  const handlePrevMonth = () => {
    if (soundEnabled) playTactileTick();
    setViewDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  };

  const handleNextMonth = () => {
    if (soundEnabled) playTactileTick();
    setViewDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  const handleJumpToday = () => {
    if (soundEnabled) playTactileTick();
    const now = new Date();
    now.setDate(1);
    setViewDate(now);
    setSelectedDateStr(todayStr);
  };

  // Month information
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(viewDate);

  // Days in month calculation (Monday is 0, Sunday is 6)
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Helper to get day number in 90-day course
  const getCourseDayNum = (dStr: string): number => {
    const d = new Date(dStr);
    d.setHours(0, 0, 0, 0);
    const diff = Math.floor((d.getTime() - startObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  // Helper to determine scheduled workout for day of week
  const getScheduledWorkout = (dStr: string) => {
    const d = new Date(dStr);
    const dayOfWeek = d.getDay(); // 0 is Sun, 1 is Mon...
    if (dayOfWeek === 1) return { 
      title: 'Пн: День А (База)', 
      subtitle: 'Сплит-присед, жим с пола, тяга к поясу, махи, бицепс',
      isWorkout: true, 
      color: 'text-purple-400' 
    };
    if (dayOfWeek === 3) return { 
      title: 'Ср: День Б (Задняя цепь)', 
      subtitle: 'Румынская тяга, армейский жим, отжимания, французский жим',
      isWorkout: true, 
      color: 'text-purple-400' 
    };
    if (dayOfWeek === 5) return { 
      title: 'Пт: День В (Объем и руки)', 
      subtitle: 'Кубковые приседания, мостик со штангой, узкие отжимания, молот, планка',
      isWorkout: true, 
      color: 'text-purple-400' 
    };
    return { 
      title: 'Восстановление & Сон 8ч', 
      subtitle: 'Суперкомпенсация, профицит 2840 ккал, 3000 мл воды',
      isWorkout: false, 
      color: 'text-slate-400' 
    };
  };

  // Check if date is completed
  const isDateCompleted = (dStr: string) => {
    if (completedDates && completedDates[dStr] !== undefined) return completedDates[dStr];
    const dNum = getCourseDayNum(dStr);
    return !!completedDays[dNum];
  };

  // Active streak calculation
  let activeStreak = 0;
  const curDayNumber = Math.min(90, Math.max(1, getCourseDayNum(todayStr)));

  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(startObj);
    checkDate.setDate(checkDate.getDate() + (curDayNumber - 1 - i));
    const cStr = checkDate.toISOString().split('T')[0];
    if (isDateCompleted(cStr)) {
      activeStreak++;
    } else if (i === 0) {
      // If today is not marked yet, keep checking from yesterday
      continue;
    } else {
      break;
    }
  }

  // Completed in current month count
  let monthCompletedCount = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (isDateCompleted(dStr)) monthCompletedCount++;
  }

  // Total completed in course
  const totalCompletedCount = Object.keys(completedDays).filter(k => completedDays[Number(k)]).length;
  const coursePercent = Math.min(100, Math.round((totalCompletedCount / 90) * 100));

  const handleDayClick = (dStr: string) => {
    setSelectedDateStr(dStr);
    if (soundEnabled) playTactileTick();
    triggerHaptic(15);
  };

  const handleToggleSelectedDate = () => {
    const isDone = isDateCompleted(selectedDateStr);
    const dayNum = getCourseDayNum(selectedDateStr);
    if (soundEnabled) {
      if (!isDone) {
        playGoalAccomplished();
      } else {
        playTactileTick();
      }
    }
    triggerHaptic(isDone ? 20 : 40);
    onToggleDate(selectedDateStr, dayNum);
  };

  const selectedDayNum = getCourseDayNum(selectedDateStr);
  const selectedWorkout = getScheduledWorkout(selectedDateStr);
  const isSelectedCompleted = isDateCompleted(selectedDateStr);

  const selectedDateFormatted = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(selectedDateStr));

  return (
    <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-4">
      {/* Top Banner with Streak & View Mode Toggle */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Flame className="w-5 h-5 fill-current animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold text-white tracking-tight">Календарь дисциплины</h3>
              <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded font-mono">
                {activeStreak} {activeStreak === 1 ? 'день' : activeStreak < 5 ? 'дня' : 'дней'} стрика 🔥
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              День {curDayNumber} из 90 · Закрыто в месяце: <strong className="text-emerald-400">{monthCompletedCount} из {daysInMonth}</strong>
            </p>
          </div>
        </div>

        {/* View mode toggle (Month vs 90 days) */}
        <div className="flex items-center gap-1 bg-[#0a0f1d] p-1 rounded-xl border border-[#22324d] flex-shrink-0">
          <button
            onClick={() => setViewMode('month')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === 'month'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => setViewMode('grid90')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === 'grid90'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            90 дней
          </button>
        </div>
      </div>

      {viewMode === 'month' ? (
        <>
          {/* Calendar Month Navigation Header */}
          <div className="bg-[#0a0f1d] rounded-2xl p-2.5 border border-[#22324d] flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-xl bg-[#151f32] border border-[#22324d] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/40 transition-colors"
              title="Предыдущий месяц"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white capitalize font-mono">
                {monthName}
              </span>
              <button
                onClick={handleJumpToday}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-lg transition-colors"
              >
                Сегодня
              </button>
            </div>

            <button
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-xl bg-[#151f32] border border-[#22324d] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/40 transition-colors"
              title="Следующий месяц"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday columns (Monday to Sunday) */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((wd, i) => (
              <span
                key={wd}
                className={`text-[10px] font-bold uppercase tracking-wider py-1 ${
                  i === 0 || i === 2 || i === 4 ? 'text-purple-400' : 'text-slate-400'
                }`}
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Leading days from previous month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => {
              const prevDayNum = prevMonthDays - firstDayOfWeek + 1 + i;
              return (
                <div
                  key={`prev-${i}`}
                  className="h-11 rounded-xl bg-[#0a0f1d]/30 border border-[#22324d]/20 text-slate-600 flex flex-col items-center justify-center text-[10px] select-none pointer-events-none"
                >
                  <span>{prevDayNum}</span>
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDateStr;
              const isDone = isDateCompleted(dateStr);
              const workoutInfo = getScheduledWorkout(dateStr);

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(dateStr)}
                  className={`h-12 rounded-xl border flex flex-col items-center justify-between p-1 transition-all select-none relative ${
                    isDone
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm shadow-emerald-500/10'
                      : isToday
                      ? 'bg-[#0a0f1d] border-sky-400 text-sky-300 ring-2 ring-sky-400/30 font-bold'
                      : isSelected
                      ? 'bg-[#151f32] border-sky-500 text-white font-semibold'
                      : 'bg-[#0a0f1d] border-[#22324d] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between w-full px-0.5">
                    <span className="text-[11px] font-mono leading-none">{day}</span>
                    {workoutInfo.isWorkout && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_4px_rgba(192,132,252,0.8)]" title={workoutInfo.title} />
                    )}
                  </div>

                  <div className="w-full flex items-center justify-center">
                    {isDone ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : isToday ? (
                      <span className="text-[8px] font-bold text-sky-400 uppercase tracking-tighter">сегодня</span>
                    ) : workoutInfo.isWorkout ? (
                      <Dumbbell className="w-3 h-3 text-purple-400/60" />
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date Detail Card */}
          <div className="bg-[#0a0f1d] rounded-2xl p-4 border border-[#22324d] space-y-3 shadow-inner">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] text-sky-400 uppercase font-mono font-bold block">
                  {selectedDayNum > 0 ? `День ${selectedDayNum} из 90` : 'До старта программы'}
                </span>
                <h4 className="text-sm font-bold text-white capitalize mt-0.5">
                  {selectedDateFormatted}
                </h4>
                <div className="mt-1">
                  <p className={`text-xs font-bold flex items-center gap-1.5 ${selectedWorkout.color}`}>
                    {selectedWorkout.isWorkout && <Dumbbell className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span>{selectedWorkout.title}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {selectedWorkout.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggleSelectedDate}
                className={`py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md flex-shrink-0 ${
                  isSelectedCompleted
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isSelectedCompleted ? 'День закрыт ✓' : 'Отметить день'}</span>
              </button>
            </div>

            {/* Start date configuration row */}
            <div className="pt-2 border-t border-[#22324d]/60 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Дата старта курса:</span>
              <input
                type="date"
                value={programStartDate}
                onChange={(e) => onSetStartDate(e.target.value)}
                className="bg-[#151f32] border border-[#22324d] text-white text-[11px] px-2 py-1 rounded-lg focus:outline-none focus:border-sky-400 font-mono"
              />
            </div>
          </div>
        </>
      ) : (
        /* Full 90-Day Grid Progression */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Прогресс курса:</span>
            <span className="font-mono font-bold text-sky-400">
              {coursePercent}% ({totalCompletedCount} из 90)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#0a0f1d] overflow-hidden p-[1px] border border-[#22324d]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-sky-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${Math.max(2, coursePercent)}%` }}
            />
          </div>

          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: 90 }, (_, i) => i + 1).map((dNum) => {
              const isDone = !!completedDays[dNum];
              const isToday = dNum === curDayNumber;

              return (
                <button
                  key={dNum}
                  onClick={() => {
                    const checkDate = new Date(startObj);
                    checkDate.setDate(checkDate.getDate() + (dNum - 1));
                    const dStr = checkDate.toISOString().split('T')[0];
                    onToggleDate(dStr, dNum);
                    if (soundEnabled) playTactileTick();
                  }}
                  className={`h-7 rounded-lg border text-[10px] font-mono font-bold flex items-center justify-center transition-all select-none ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/20'
                      : isToday
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-2 ring-sky-400/40'
                      : 'bg-[#0a0f1d] border-[#22324d] text-slate-400 hover:border-slate-500'
                  }`}
                  title={`День ${dNum}`}
                >
                  {isDone ? '✓' : dNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
