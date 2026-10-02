import React, { useState } from 'react';
import { 
  Dumbbell, 
  ShieldCheck, 
  Check, 
  RotateCcw, 
  Timer as TimerIcon,
  ShieldAlert,
  Flame,
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import { WORKOUT_DAYS } from '../data/initialData';
import { RestTimer } from './RestTimer';
import { ExerciseIllustration } from './ExerciseIllustration';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface WorkoutTabProps {
  workoutProgress: Record<string, boolean[]>; // exerciseId -> array of completed booleans
  workoutReps: Record<string, number[]>; // exerciseId -> array of actual reps logged per set
  workoutPRs: Record<string, number>; // exerciseId -> personal record
  onToggleSet: (exerciseId: string, setIndex: number, setsCount: number) => void;
  onUpdateReps: (exerciseId: string, setIndex: number, reps: number) => void;
  onResetDayWorkout: (exerciseIds: string[]) => void;
  soundEnabled: boolean;
}

export const WorkoutTab: React.FC<WorkoutTabProps> = ({
  workoutProgress,
  workoutReps,
  workoutPRs,
  onToggleSet,
  onUpdateReps,
  onResetDayWorkout,
  soundEnabled,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('monday');
  const [autoTimerSeconds, setAutoTimerSeconds] = useState<number | null>(null);

  const currentDay = WORKOUT_DAYS.find((d) => d.id === selectedDayId) || WORKOUT_DAYS[0];

  const handleSetClick = (exerciseId: string, setIndex: number, totalSets: number, isCurrentlyCompleted: boolean) => {
    if (soundEnabled && !isCurrentlyCompleted) {
      playTactileTick();
    }
    triggerHaptic(25);
    onToggleSet(exerciseId, setIndex, totalSets);

    // Auto-trigger timer: 120s for compound base lifts, 90s for isolation
    if (!isCurrentlyCompleted) {
      const isBaseLift = ['ex_floor_press', 'ex_romanian_dl', 'ex_overhead_press', 'ex_bent_row', 'ex_split_squat'].includes(exerciseId);
      setAutoTimerSeconds(isBaseLift ? 120 : 90);
    }
  };

  const handleRepsChange = (exerciseId: string, setIndex: number, valueStr: string) => {
    const parsed = parseInt(valueStr, 10);
    const validReps = isNaN(parsed) ? 0 : Math.max(0, Math.min(99, parsed));
    onUpdateReps(exerciseId, setIndex, validReps);

    const currentPR = workoutPRs[exerciseId] || 0;
    if (validReps > currentPR && soundEnabled) {
      playGoalAccomplished();
    }
  };

  const totalSetsToday = currentDay.exercises.reduce((sum, ex) => sum + ex.setsCount, 0);
  const completedSetsToday = currentDay.exercises.reduce((sum, ex) => {
    const sets = workoutProgress[ex.id] || [];
    return sum + sets.filter(Boolean).length;
  }, 0);

  return (
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-300">
      {/* Rest Timer Widget with Sound and Vibration */}
      <RestTimer
        soundEnabled={soundEnabled}
        autoStartSeconds={autoTimerSeconds}
        onClearAutoStart={() => setAutoTimerSeconds(null)}
      />

      {/* Equipment info banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#121c2e] to-[#151f32] border border-[#22324d] p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Инвентарь в подвале</h3>
            <p className="text-[10px] text-slate-400">Штанга 30 кг · 2 гантели по 10 кг · Собственный вес</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
          {completedSetsToday} / {totalSetsToday} подходов
        </span>
      </div>

      {/* Day Selector Tabs (Пн, Ср, Пт) */}
      <div className="grid grid-cols-3 gap-2 bg-[#0a0f1d] p-1.5 rounded-2xl border border-[#22324d]">
        {WORKOUT_DAYS.map((day) => {
          const isSelected = day.id === selectedDayId;
          const daySets = day.exercises.reduce((acc, ex) => {
            const arr = workoutProgress[ex.id] || [];
            return acc + arr.filter(Boolean).length;
          }, 0);
          const dayTotal = day.exercises.reduce((acc, ex) => acc + ex.setsCount, 0);
          const isDone = daySets === dayTotal && dayTotal > 0;

          return (
            <button
              key={day.id}
              onClick={() => {
                if (soundEnabled) playTactileTick();
                triggerHaptic(15);
                setSelectedDayId(day.id);
              }}
              className={`py-2 px-2 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white bg-[#151f32]/40'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs">{day.dayShort}</span>
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-[10px] block truncate ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                {day.title.replace('День ', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day Header Info */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-bold text-white">
            {currentDay.dayFull}: {currentDay.title}
          </h2>
          <p className="text-[11px] text-slate-400">{currentDay.description}</p>
        </div>
        <button
          onClick={() => {
            if (soundEnabled) playTactileTick();
            onResetDayWorkout(currentDay.exercises.map((e) => e.id));
          }}
          className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#151f32] border border-[#22324d] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Сбросить день</span>
        </button>
      </div>

      {/* Exercises List with Progression Inputs, PRs, Diagrams & Safety Rules */}
      <div className="space-y-4">
        {currentDay.exercises.map((exercise, index) => {
          const currentSets = workoutProgress[exercise.id] || [];
          const repsArray = workoutReps[exercise.id] || [];
          const isExerciseCompleted =
            currentSets.length === exercise.setsCount && currentSets.every(Boolean);

          const personalRecord = workoutPRs[exercise.id] || 0;

          // Parse target baseline from targetReps string (e.g. "8-10" -> 10)
          const targetNum = parseInt(exercise.targetReps.split('-')[1] || exercise.targetReps.split(' ')[0], 10) || 10;

          return (
            <div
              key={exercise.id}
              className={`rounded-2xl border transition-all p-4 shadow-lg space-y-3.5 ${
                isExerciseCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-[#151f32] border-[#22324d]'
              }`}
            >
              {/* Exercise Header + PR Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider font-mono">
                      #{index + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-[#0a0f1d] px-1.5 py-0.5 rounded border border-[#22324d]">
                      {exercise.equipment}
                    </span>
                    {/* PR badge */}
                    {personalRecord > 0 && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        <span>Рекорд: {personalRecord} повт.</span>
                      </span>
                    )}
                  </div>
                  <h4 className={`text-sm font-bold mt-1 ${isExerciseCompleted ? 'line-through text-slate-300' : 'text-white'}`}>
                    {exercise.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    План: <strong className="text-sky-400">{exercise.setsCount} подхода</strong> по{' '}
                    <strong className="text-white">{exercise.targetReps}</strong>
                  </p>
                </div>

                {isExerciseCompleted && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" /> Выполнено
                  </span>
                )}
              </div>

              {/* Vector SVG Movement Technique Illustration */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  Схема биомеханики & траектория:
                </span>
                <ExerciseIllustration type={exercise.movementSvgType} />
              </div>

              {/* 2 Main Back Safety Rules */}
              <div className="bg-[#0a0f1d] p-3 rounded-xl border border-[#22324d] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>2 правила безопасности спины:</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 pl-1">
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-snug">{exercise.safetyRules[0]}</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-snug">{exercise.safetyRules[1]}</p>
                  </div>
                </div>
              </div>

              {/* Progression: Sets & Reps Inputs with Previous Record Tracker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Прогрессия повторений (вбивай факт):
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Цель: {exercise.targetReps}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: exercise.setsCount }).map((_, setIdx) => {
                    const isSetDone = !!currentSets[setIdx];
                    const recordedRep = repsArray[setIdx] !== undefined ? repsArray[setIdx] : targetNum;
                    const isNewPR = recordedRep > personalRecord && recordedRep > targetNum;

                    return (
                      <div
                        key={setIdx}
                        className={`rounded-xl border p-2 flex flex-col items-center justify-between gap-1.5 transition-all ${
                          isSetDone
                            ? 'bg-emerald-950/40 border-emerald-500/50'
                            : 'bg-[#0a0f1d] border-[#22324d]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono text-slate-400 font-bold">
                            Сет {setIdx + 1}
                          </span>
                          {isNewPR && (
                            <span className="text-[8px] font-bold text-amber-400 font-mono">
                              PR!
                            </span>
                          )}
                        </div>

                        {/* Interactive Reps Input */}
                        <div className="flex items-baseline gap-1 my-0.5">
                          <input
                            type="number"
                            min="0"
                            max="99"
                            value={recordedRep}
                            onChange={(e) => handleRepsChange(exercise.id, setIdx, e.target.value)}
                            className={`w-9 text-center font-mono font-black text-sm bg-transparent border-b ${
                              isSetDone
                                ? 'text-emerald-300 border-emerald-500/60'
                                : 'text-white border-[#334b73] focus:border-sky-400'
                            } focus:outline-none`}
                            title="Количество повторений в подходе"
                          />
                          <span className="text-[9px] text-slate-500">повт</span>
                        </div>

                        {/* Complete Checkbox Button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleSetClick(
                              exercise.id,
                              setIdx,
                              exercise.setsCount,
                              isSetDone
                            )
                          }
                          className={`w-full py-1 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                            isSetDone
                              ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                              : 'bg-[#151f32] text-slate-400 hover:text-white border border-[#22324d]'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{isSetDone ? 'Готово' : 'Закрыть'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
