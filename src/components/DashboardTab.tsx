import React from 'react';
import { 
  Flame, 
  TrendingUp, 
  Utensils, 
  Droplet, 
  Dumbbell, 
  CheckCircle2, 
  ChevronRight, 
  Scale, 
  Sparkles,
  Zap,
  Calendar
} from 'lucide-react';
import { DAILY_TARGET_MACROS, INITIAL_MEALS } from '../data/initialData';
import { AppState } from '../types';
import { TabType } from './BottomNav';
import { CalendarView } from './CalendarView';

interface DashboardTabProps {
  state: AppState;
  onNavigateTab: (tab: TabType) => void;
  onOpenWeightModal: () => void;
  onToggleMeal: (mealId: string) => void;
  onSetStartDate: (date: string) => void;
  onToggleDate: (dateStr: string, dayNum: number) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  state,
  onNavigateTab,
  onOpenWeightModal,
  onToggleMeal,
  onSetStartDate,
  onToggleDate,
}) => {
  // Consumed macros from checked meals
  const consumedMacros = INITIAL_MEALS.reduce(
    (acc, meal) => {
      if (state.completedMeals[meal.id]) {
        acc.calories += meal.calories;
        acc.protein += meal.macros.protein;
        acc.fat += meal.macros.fat;
        acc.carbs += meal.macros.carbs;
      }
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  const calProgress = Math.min(100, Math.round((consumedMacros.calories / DAILY_TARGET_MACROS.calories) * 100));
  const proteinProgress = Math.min(100, Math.round((consumedMacros.protein / DAILY_TARGET_MACROS.protein) * 100));
  const fatProgress = Math.min(100, Math.round((consumedMacros.fat / DAILY_TARGET_MACROS.fat) * 100));
  const carbsProgress = Math.min(100, Math.round((consumedMacros.carbs / DAILY_TARGET_MACROS.carbs) * 100));

  // Weight goal
  const startWeight = state.startWeight || 57.0;
  const targetWeight = state.targetWeight || 67.0;
  const currentWeight = state.currentWeight || 57.0;
  const gainedKg = Math.round((currentWeight - startWeight) * 10) / 10;
  const remainingKg = Math.max(0, Math.round((targetWeight - currentWeight) * 10) / 10);
  const weightProgress = Math.min(100, Math.max(0, Math.round((gainedKg / (targetWeight - startWeight)) * 100)));

  const mealsDone = Object.values(state.completedMeals).filter(Boolean).length;
  const waterDoneMl = state.waterGlasses * 250;
  const waterProgress = Math.min(100, Math.round((waterDoneMl / 3000) * 100));

  return (
    <div className="space-y-4 pb-20 pt-2 animate-in fade-in duration-300">
      {/* Real Interactive Monthly Calendar & Discipline Tracker */}
      <CalendarView
        programStartDate={state.programStartDate}
        completedDays={state.completedDays}
        completedDates={state.completedDates || {}}
        onSetStartDate={onSetStartDate}
        onToggleDate={onToggleDate}
        soundEnabled={state.soundEnabled}
      />

      {/* Hero: Target Banner / Weight Progress */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#151f32] via-[#121c2e] to-[#0d1624] border border-[#22324d] p-4 shadow-xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 fill-current" /> LEAN BULK PRO
              </span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-[11px] font-semibold text-emerald-400">Профицит +350 ккал</span>
            </div>
            <h2 className="text-lg font-black text-white mt-1 tracking-tight">
              Цель: 57.0 кг → 67.0 кг
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              +10 кг сухой мышечной массы без жира и отеков лица
            </p>
          </div>
          <button
            onClick={onOpenWeightModal}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#0a0f1d] border border-[#22324d] hover:border-sky-400/50 transition-colors shadow-inner"
            title="Записать утренний вес"
          >
            <Scale className="w-4 h-4 text-sky-400 mb-0.5" />
            <span className="text-[10px] font-medium text-slate-400">Вес</span>
            <span className="text-xs font-mono font-bold text-white">{currentWeight.toFixed(1)}</span>
          </button>
        </div>

        {/* Weight Progress Bar */}
        <div className="mt-4 pt-3 border-t border-[#22324d]/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Прогресс цели:</span>
              <span className="font-bold text-white font-mono">{startWeight} кг → {targetWeight} кг</span>
            </div>
            <span className="font-bold text-sky-400 font-mono text-[11px]">{weightProgress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#0a0f1d] overflow-hidden p-[1px] border border-[#22324d]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              style={{ width: `${Math.max(4, weightProgress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              {gainedKg >= 0 ? `+${gainedKg}` : gainedKg} кг набрано
            </span>
            <span>Осталось набрать: <strong className="text-slate-200">{remainingKg} кг</strong></span>
          </div>
        </div>
      </div>

      {/* Main Calories & Macros Widget */}
      <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Суточный прогресс КБЖУ</h3>
              <p className="text-[11px] text-slate-400">Цель: строго 2840 ккал</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base font-black font-mono text-sky-400">
              {consumedMacros.calories}{' '}
              <span className="text-xs text-slate-400 font-normal">/ {DAILY_TARGET_MACROS.calories} ккал</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              {DAILY_TARGET_MACROS.calories - consumedMacros.calories > 0
                ? `Осталось: ${DAILY_TARGET_MACROS.calories - consumedMacros.calories} ккал`
                : 'Калораж полностью закрыт!'}
            </div>
          </div>
        </div>

        {/* Calories Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Энергетический баланс</span>
            <span className="font-mono font-bold text-white">{calProgress}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#0a0f1d] overflow-hidden p-[1px] border border-[#22324d]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                calProgress >= 100 
                  ? 'bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                  : 'bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
              }`}
              style={{ width: `${Math.max(2, calProgress)}%` }}
            />
          </div>
        </div>

        {/* 3 Macro Cards (Protein, Fats, Carbs) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {/* Protein */}
          <div className="rounded-xl bg-[#0a0f1d] border border-[#22324d] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-semibold">Белки</span>
              <span className="text-[10px] text-sky-400 font-bold">{proteinProgress}%</span>
            </div>
            <div className="my-1.5">
              <span className="text-base font-black font-mono text-white">
                {consumedMacros.protein}
              </span>
              <span className="text-[11px] text-slate-500 font-mono"> / {DAILY_TARGET_MACROS.protein}г</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#151f32] overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-300"
                style={{ width: `${proteinProgress}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-500 mt-1">2.8 г/кг веса</span>
          </div>

          {/* Fats */}
          <div className="rounded-xl bg-[#0a0f1d] border border-[#22324d] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-semibold">Жиры</span>
              <span className="text-[10px] text-amber-400 font-bold">{fatProgress}%</span>
            </div>
            <div className="my-1.5">
              <span className="text-base font-black font-mono text-white">
                {consumedMacros.fat}
              </span>
              <span className="text-[11px] text-slate-500 font-mono"> / {DAILY_TARGET_MACROS.fat}г</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#151f32] overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${fatProgress}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-500 mt-1">Гормоны & связки</span>
          </div>

          {/* Carbs */}
          <div className="rounded-xl bg-[#0a0f1d] border border-[#22324d] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-semibold">Углеводы</span>
              <span className="text-[10px] text-emerald-400 font-bold">{carbsProgress}%</span>
            </div>
            <div className="my-1.5">
              <span className="text-base font-black font-mono text-white">
                {consumedMacros.carbs}
              </span>
              <span className="text-[11px] text-slate-500 font-mono"> / {DAILY_TARGET_MACROS.carbs}г</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#151f32] overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${carbsProgress}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-500 mt-1">Топливо мышц</span>
          </div>
        </div>
      </div>

      {/* Quick Status Cards Grid (Meals, Hydration) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Meals Summary */}
        <div 
          onClick={() => onNavigateTab('nutrition')}
          className="rounded-2xl bg-[#151f32] border border-[#22324d] p-3.5 cursor-pointer hover:border-sky-500/40 transition-all flex flex-col justify-between group shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold font-mono text-sky-400">{mealsDone}/3</span>
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
              Рацион дня
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {mealsDone === 3 ? 'Все 3 приема закрыты' : '3 плотных приема пищи'}
            </p>
          </div>
          <div className="w-full h-1 rounded-full bg-[#0a0f1d] mt-2 overflow-hidden">
            <div
              className="h-full bg-sky-400 rounded-full"
              style={{ width: `${(mealsDone / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Water Summary */}
        <div 
          onClick={() => onNavigateTab('water')}
          className="rounded-2xl bg-[#151f32] border border-[#22324d] p-3.5 cursor-pointer hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Droplet className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-bold font-mono text-cyan-400">{waterDoneMl} мл</span>
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
              Вода & Отеки
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Цель: 3000 мл (до 18:30)
            </p>
          </div>
          <div className="w-full h-1 rounded-full bg-[#0a0f1d] mt-2 overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${waterProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Meal Completion Checklist on Dashboard */}
      <div className="rounded-2xl bg-[#151f32] border border-[#22324d] p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Чеклист приемов пищи на сегодня
          </h3>
          <button 
            onClick={() => onNavigateTab('nutrition')}
            className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-0.5 font-medium"
          >
            Рецепты <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {INITIAL_MEALS.map((meal) => {
            const isDone = state.completedMeals[meal.id];
            return (
              <div
                key={meal.id}
                onClick={() => onToggleMeal(meal.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : 'bg-[#0a0f1d] border-[#22324d] hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-[#334b73] text-transparent hover:border-sky-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current stroke-emerald-500 text-slate-950" />
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {meal.title.split(':')[0]}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      {meal.title.split(':')[1]?.trim() || meal.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-sky-400">{meal.calories} ккал</span>
                  <p className="text-[10px] text-slate-400">Б:{meal.macros.protein}г · У:{meal.macros.carbs}г</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Body Workout Banner */}
      <div 
        onClick={() => onNavigateTab('workout')}
        className="rounded-2xl bg-gradient-to-r from-[#121c2e] to-[#151f32] border border-[#22324d] p-4 cursor-pointer hover:border-sky-500/40 transition-all flex items-center justify-between group shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                Full Body Программа
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-[10px] text-slate-400">Схемы биомеханики + таймер</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5 group-hover:text-purple-300 transition-colors">
              Пн (База) · Ср (Задняя цепь) · Пт (Объем)
            </h4>
            <p className="text-[10px] text-slate-400">
              Векторные схемы движений + 2 правила защиты спины
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* Grocery budget banner */}
      <div 
        onClick={() => onNavigateTab('grocery')}
        className="rounded-xl bg-[#0a0f1d] border border-[#22324d] p-3 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Калькулятор цен: <strong className="text-white">настраивай ценники</strong> под свой магазин
        </span>
        <ChevronRight className="w-4 h-4 text-slate-500" />
      </div>
    </div>
  );
};
