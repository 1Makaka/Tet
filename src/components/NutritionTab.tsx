import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  Fish, 
  Utensils, 
  Info,
  Scale,
  Flame,
  Check,
  RefreshCw,
  Egg,
  Wheat,
  Drumstick
} from 'lucide-react';
import { INITIAL_MEALS, DAILY_TARGET_MACROS } from '../data/initialData';
import { Meal } from '../types';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface NutritionTabProps {
  completedMeals: Record<string, boolean>;
  lunchProteinSwap: 'chicken' | 'tuna' | 'eggs';
  lunchCarbSwap: 'rice' | 'pasta' | 'buckwheat';
  onSelectProteinSwap: (type: 'chicken' | 'tuna' | 'eggs') => void;
  onSelectCarbSwap: (type: 'rice' | 'pasta' | 'buckwheat') => void;
  onToggleMeal: (mealId: string) => void;
  soundEnabled: boolean;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({
  completedMeals,
  lunchProteinSwap,
  lunchCarbSwap,
  onSelectProteinSwap,
  onSelectCarbSwap,
  onToggleMeal,
  soundEnabled,
}) => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({
    breakfast: true,
    lunch: true,
    dinner: true,
  });

  const toggleExpand = (mealId: string) => {
    if (soundEnabled) playTactileTick();
    setExpandedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }));
  };

  const handleMealCheck = (mealId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!completedMeals[mealId] && soundEnabled) {
      playGoalAccomplished();
    } else if (soundEnabled) {
      playTactileTick();
    }
    triggerHaptic(30);
    onToggleMeal(mealId);
  };

  // Dynamic protein details based on swap
  const proteinSwapData = {
    chicken: {
      name: 'Куриное филе (Hähnchenbrustfilet)',
      grams: '200 г сырого',
      measure: '1/5 лотка 1 кг (кусок ровно с ладонь)',
      recipe: 'Филе нарезать соломкой, обжарить с овощами 8-10 минут на 1 ст. л. масла.',
      cal: 220,
      p: 44,
      f: 4,
    },
    tuna: {
      name: 'Тунец в собственном соку (Thunfisch)',
      grams: '130 г рыбы (чистый вес)',
      measure: '1 банка 185г (слить рассол и промыть холодной водой!)',
      recipe: 'Открыть банку, промыть от рассола под краном (минус 40% соли), смешать с горячим рисом и овощами.',
      cal: 150,
      p: 33,
      f: 1,
    },
    eggs: {
      name: 'Куриные яйца цельные (Eier Kl. M)',
      grams: '4 шт. (~200 г)',
      measure: '4 цельных яйца вкрутую или глазунья',
      recipe: 'Сварить 4 яйца вкрутую (8-9 минут) или поджарить скрэмбл на 1 ст. л. масла.',
      cal: 280,
      p: 28,
      f: 20,
    },
  }[lunchProteinSwap];

  // Dynamic carb details based on swap
  const carbSwapData = {
    rice: {
      name: 'Рис длиннозерный (Reis Langkorn)',
      grams: '130 г сухой',
      measure: '~2/3 кружки 250 мл (на выходе ~350 г гарнира)',
      recipe: 'Залить 2 объёмами кипятка, варить 12-15 мин под крышкой.',
      cal: 460,
      c: 100,
    },
    pasta: {
      name: 'Макароны твердых сортов (Penne)',
      grams: '120 г сухих',
      measure: 'Чуть меньше 1/4 пачки 500г',
      recipe: 'Варить в кипящей подсоленной воде 8-9 минут аль денте.',
      cal: 430,
      c: 90,
    },
    buckwheat: {
      name: 'Гречневая крупа сухая (Buchweizen)',
      grams: '120 г сухой',
      measure: '~1/2 кружки 250 мл',
      recipe: 'Залить водой 1:2, варить 15 минут до полного впитывания воды.',
      cal: 390,
      c: 75,
    },
  }[lunchCarbSwap];

  return (
    <div className="space-y-4 pb-20 pt-2 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#151f32] to-[#0d1624] border border-[#22324d] p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Рацион: 3 приема без перекусов
              </h2>
              <p className="text-xs text-slate-400">
                Максимальный анаболизм, стабильный инсулин и покой ЖКТ
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg">
            2840 ккал
          </span>
        </div>

        {/* Macro targets ribbon */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-[#22324d] text-center">
          <div className="bg-[#0a0f1d] rounded-xl p-1.5 border border-[#22324d]/60">
            <span className="text-[10px] text-slate-400 block">Калории</span>
            <span className="text-xs font-mono font-bold text-white">2840</span>
          </div>
          <div className="bg-[#0a0f1d] rounded-xl p-1.5 border border-[#22324d]/60">
            <span className="text-[10px] text-sky-400 block">Белки</span>
            <span className="text-xs font-mono font-bold text-sky-300">160 г</span>
          </div>
          <div className="bg-[#0a0f1d] rounded-xl p-1.5 border border-[#22324d]/60">
            <span className="text-[10px] text-amber-400 block">Жиры</span>
            <span className="text-xs font-mono font-bold text-amber-300">64 г</span>
          </div>
          <div className="bg-[#0a0f1d] rounded-xl p-1.5 border border-[#22324d]/60">
            <span className="text-[10px] text-emerald-400 block">Углеводы</span>
            <span className="text-xs font-mono font-bold text-emerald-300">398 г</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-sky-300 bg-sky-950/30 border border-sky-500/20 rounded-xl p-2.5">
          <Scale className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span>
            <strong>Без кухонных весов!</strong> Точные бытовые мерки: кружки, ложки и доли упаковок.
          </span>
        </div>
      </div>

      {/* 3 Meals Accordion Cards (CLEAN & COMPACT, NO BIG PICTURES) */}
      <div className="space-y-3">
        {INITIAL_MEALS.map((meal, index) => {
          const isDone = completedMeals[meal.id];
          const isExpanded = !!expandedMeals[meal.id];

          return (
            <div
              key={meal.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isDone
                  ? 'card-glass-nutrition-done'
                  : 'card-glass-nutrition'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(meal.id)}
                className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
              >
                <div className="flex items-center gap-3">
                  {/* Custom Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => handleMealCheck(meal.id, e)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'border-2 border-[#334b73] text-transparent hover:border-sky-400'
                    }`}
                    title={isDone ? 'Отмечено как съеденное' : 'Отметить как съеденное'}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider font-mono">
                        Прием #{index + 1}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          Съедено
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold mt-0.5 ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {meal.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-sky-400 block">
                      {meal.calories} ккал
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Б:{meal.macros.protein}г · Ж:{meal.macros.fat}г · У:{meal.macros.carbs}г
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-[#0a0f1d] border border-[#22324d] flex items-center justify-center text-slate-400">
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#22324d]/60 space-y-3.5 bg-[#101726]/40">
                  {/* One-Click Product Substitution Module for Lunch */}
                  {meal.id === 'lunch' && (
                    <div className="p-3 rounded-2xl bg-[#0a0f1d] border border-[#22324d] space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Кнопка «Замена продуктов» (пересчет в 1 клик):</span>
                      </div>

                      {/* Protein Swapper */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Источник белка:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectProteinSwap('chicken');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchProteinSwap === 'chicken'
                                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <Drumstick className="w-3 h-3" />
                            <span>Курица</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectProteinSwap('tuna');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchProteinSwap === 'tuna'
                                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <Fish className="w-3 h-3" />
                            <span>Тунец</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectProteinSwap('eggs');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchProteinSwap === 'eggs'
                                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <Egg className="w-3 h-3" />
                            <span>Яйца (4 шт)</span>
                          </button>
                        </div>
                      </div>

                      {/* Carb Swapper */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Сложные углеводы:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectCarbSwap('rice');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchCarbSwap === 'rice'
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <span>Рис</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectCarbSwap('pasta');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchCarbSwap === 'pasta'
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <span>Макароны</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) playTactileTick();
                              onSelectCarbSwap('buckwheat');
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                              lunchCarbSwap === 'buckwheat'
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                                : 'bg-[#151f32] text-slate-300 hover:text-white border border-[#22324d]'
                            }`}
                          >
                            <span>Гречка</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ingredients Table with Household Measures */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Точные граммовки и мерки:
                    </span>
                    <div className="divide-y divide-[#22324d]/60 rounded-xl bg-[#0a0f1d] border border-[#22324d] overflow-hidden">
                      {meal.ingredients.map((ing) => {
                        let displayName = ing.name;
                        let displayGrams = ing.grams;
                        let displayMeasure = ing.measure;

                        if (meal.id === 'lunch') {
                          if (ing.id === 'chicken') {
                            displayName = proteinSwapData.name;
                            displayGrams = proteinSwapData.grams;
                            displayMeasure = proteinSwapData.measure;
                          } else if (ing.id === 'rice') {
                            displayName = carbSwapData.name;
                            displayGrams = carbSwapData.grams;
                            displayMeasure = carbSwapData.measure;
                          }
                        }

                        return (
                          <div key={ing.id} className="p-2.5 flex items-start justify-between gap-2 text-xs">
                            <div>
                              <div className="font-semibold text-slate-200">
                                {displayName}
                              </div>
                              <div className="text-[11px] text-sky-400 font-medium mt-0.5">
                                📏 {displayMeasure}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-mono font-bold text-slate-300">
                                {displayGrams}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step by step recipe instructions */}
                  <div className="bg-[#0a0f1d]/80 rounded-xl p-3 border border-[#22324d] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Быстрое приготовление:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pl-0.5">
                      {meal.id === 'lunch'
                        ? `1. ${carbSwapData.recipe}\n2. ${proteinSwapData.recipe}\n3. Десерт: 200 г нежирного творога (Magerquark) выложить в пиалу, добавить 100 мл молока и размятый банан. Взбить вилкой за 30 секунд до нежного крема.`
                        : meal.recipe}
                    </p>
                  </div>

                  {/* Special Note / Anti-Bloating tip */}
                  {meal.specialNote && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                      <p className="leading-snug">{meal.specialNote}</p>
                    </div>
                  )}

                  {/* Button to toggle eaten */}
                  <button
                    type="button"
                    onClick={(e) => handleMealCheck(meal.id, e)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isDone
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Прием съеден (отменить)' : 'Отметить как съеденное'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
