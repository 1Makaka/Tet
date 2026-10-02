import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { DashboardTab } from './components/DashboardTab';
import { NutritionTab } from './components/NutritionTab';
import { WorkoutTab } from './components/WorkoutTab';
import { GroceryTab } from './components/GroceryTab';
import { HydrationTab } from './components/HydrationTab';
import { WeightModal } from './components/WeightModal';
import { ResetModal } from './components/ResetModal';
import { BackupModal } from './components/BackupModal';
import { INITIAL_MEALS, GROCERY_ITEMS } from './data/initialData';
import { AppState } from './types';
import { loadAppState, saveAppState, getTodayDateString } from './utils/storage';
import { triggerHaptic, playTactileTick, playGoalAccomplished } from './utils/audio';

export default function App() {
  const [state, setState] = useState<AppState>(loadAppState);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  // Sync to localStorage on every state change
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Check if date changed to trigger automatic new day rollover
  useEffect(() => {
    const today = getTodayDateString();
    if (state.lastActiveDate && state.lastActiveDate !== today) {
      setState((prev) => ({
        ...prev,
        completedMeals: { breakfast: false, lunch: false, dinner: false },
        waterGlasses: 0,
        workoutProgress: {},
        lastActiveDate: today,
      }));
    }
  }, [state.lastActiveDate]);

  // Sound toggle
  const handleToggleSound = useCallback(() => {
    setState((prev) => {
      const nextSound = !prev.soundEnabled;
      return { ...prev, soundEnabled: nextSound };
    });
  }, []);

  // Tab change
  const handleChangeTab = useCallback((tab: TabType) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 90-Day Calendar & Date handlers
  const handleSetStartDate = useCallback((date: string) => {
    setState((prev) => ({
      ...prev,
      programStartDate: date,
    }));
  }, []);

  const handleToggleDate = useCallback((dateStr: string, dayNum: number) => {
    setState((prev) => {
      const isDateDone = prev.completedDates && prev.completedDates[dateStr] !== undefined
        ? !prev.completedDates[dateStr]
        : !prev.completedDays[dayNum];

      return {
        ...prev,
        completedDates: {
          ...(prev.completedDates || {}),
          [dateStr]: isDateDone,
        },
        completedDays: {
          ...prev.completedDays,
          [dayNum]: isDateDone,
        },
      };
    });
  }, []);

  // Meal toggle
  const handleToggleMeal = useCallback((mealId: string) => {
    setState((prev) => {
      const isCurrentlyDone = !!prev.completedMeals[mealId];
      const nextDone = !isCurrentlyDone;
      return {
        ...prev,
        completedMeals: {
          ...prev.completedMeals,
          [mealId]: nextDone,
        },
      };
    });
  }, []);

  // One-click meal swaps
  const handleSelectProteinSwap = useCallback((type: 'chicken' | 'tuna' | 'eggs') => {
    setState((prev) => ({
      ...prev,
      lunchProteinSwap: type,
    }));
  }, []);

  const handleSelectCarbSwap = useCallback((type: 'rice' | 'pasta' | 'buckwheat') => {
    setState((prev) => ({
      ...prev,
      lunchCarbSwap: type,
    }));
  }, []);

  // Workout set toggle
  const handleToggleSet = useCallback((exerciseId: string, setIndex: number, setsCount: number) => {
    setState((prev) => {
      const currentSets = prev.workoutProgress[exerciseId] || Array(setsCount).fill(false);
      const updatedSets = [...currentSets];
      while (updatedSets.length < setsCount) {
        updatedSets.push(false);
      }
      updatedSets[setIndex] = !updatedSets[setIndex];

      return {
        ...prev,
        workoutProgress: {
          ...prev.workoutProgress,
          [exerciseId]: updatedSets,
        },
      };
    });
  }, []);

  // Workout Reps progression & PR tracker
  const handleUpdateReps = useCallback((exerciseId: string, setIndex: number, reps: number) => {
    setState((prev) => {
      const currentReps = prev.workoutReps[exerciseId] || [];
      const updatedReps = [...currentReps];
      while (updatedReps.length <= setIndex) {
        updatedReps.push(0);
      }
      updatedReps[setIndex] = reps;

      const currentPR = prev.workoutPRs[exerciseId] || 0;
      const newPR = Math.max(currentPR, reps);

      return {
        ...prev,
        workoutReps: {
          ...prev.workoutReps,
          [exerciseId]: updatedReps,
        },
        workoutPRs: {
          ...prev.workoutPRs,
          [exerciseId]: newPR,
        },
      };
    });
  }, []);

  // Reset workout for day
  const handleResetDayWorkout = useCallback((exerciseIds: string[]) => {
    setState((prev) => {
      const nextProgress = { ...prev.workoutProgress };
      exerciseIds.forEach((id) => {
        delete nextProgress[id];
      });
      return {
        ...prev,
        workoutProgress: nextProgress,
      };
    });
  }, []);

  // Grocery toggles & custom price inputs
  const handleToggleGroceryItem = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      groceryItems: {
        ...prev.groceryItems,
        [itemId]: !prev.groceryItems[itemId],
      },
    }));
  }, []);

  const handleUpdatePrice = useCallback((itemId: string, newPrice: number) => {
    setState((prev) => ({
      ...prev,
      customGroceryPrices: {
        ...prev.customGroceryPrices,
        [itemId]: Math.max(0, Math.round(newPrice * 100) / 100),
      },
    }));
  }, []);

  const handleResetPricesToDefault = useCallback(() => {
    if (state.soundEnabled) playTactileTick();
    triggerHaptic(20);
    setState((prev) => ({
      ...prev,
      customGroceryPrices: {},
    }));
  }, [state.soundEnabled]);

  const handleResetGrocery = useCallback(() => {
    if (state.soundEnabled) playTactileTick();
    triggerHaptic(20);
    setState((prev) => ({
      ...prev,
      groceryItems: {},
    }));
  }, [state.soundEnabled]);

  const handleCheckAllGrocery = useCallback(() => {
    if (state.soundEnabled) playGoalAccomplished();
    triggerHaptic(40);
    const allChecked: Record<string, boolean> = {};
    GROCERY_ITEMS.forEach((item) => {
      allChecked[item.id] = true;
    });
    setState((prev) => ({
      ...prev,
      groceryItems: allChecked,
    }));
  }, [state.soundEnabled]);

  // Water glasses
  const handleSetWaterGlasses = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      waterGlasses: count,
    }));
  }, []);

  // Weight save
  const handleSaveWeight = useCallback((newWeight: number) => {
    const today = getTodayDateString();
    setState((prev) => {
      const updatedHistory = [...prev.weightHistory];
      const todayIdx = updatedHistory.findIndex((r) => r.date === today);
      if (todayIdx >= 0) {
        updatedHistory[todayIdx] = { ...updatedHistory[todayIdx], weight: newWeight };
      } else {
        updatedHistory.push({ date: today, weight: newWeight });
      }

      return {
        ...prev,
        currentWeight: newWeight,
        weightHistory: updatedHistory,
      };
    });
  }, []);

  // Reset Day confirmation
  const handleConfirmResetDay = useCallback(() => {
    if (state.soundEnabled) playGoalAccomplished();
    triggerHaptic(50);
    setState((prev) => ({
      ...prev,
      completedMeals: {
        breakfast: false,
        lunch: false,
        dinner: false,
      },
      waterGlasses: 0,
      workoutProgress: {},
    }));
  }, [state.soundEnabled]);

  // Database Backup Import
  const handleImportState = useCallback((importedState: AppState) => {
    setState(importedState);
  }, []);

  // Counts for badges
  const caloriesConsumed = INITIAL_MEALS.reduce((acc, meal) => {
    return state.completedMeals[meal.id] ? acc + meal.calories : acc;
  }, 0);

  const pendingMealsCount = 3 - Object.values(state.completedMeals).filter(Boolean).length;
  const pendingWaterCount = 12 - state.waterGlasses;

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Mobile Header */}
      <Header
        soundEnabled={state.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        caloriesConsumed={caloriesConsumed}
        totalCalories={2840}
      />

      {/* Main Content Area (Mobile Container max-w-md centered) */}
      <main className="flex-1 w-full max-w-md mx-auto px-3 py-2">
        {state.activeTab === 'dashboard' && (
          <DashboardTab
            state={state}
            onNavigateTab={handleChangeTab}
            onOpenWeightModal={() => setIsWeightModalOpen(true)}
            onToggleMeal={handleToggleMeal}
            onSetStartDate={handleSetStartDate}
            onToggleDate={handleToggleDate}
          />
        )}

        {state.activeTab === 'nutrition' && (
          <NutritionTab
            completedMeals={state.completedMeals}
            lunchProteinSwap={state.lunchProteinSwap || 'chicken'}
            lunchCarbSwap={state.lunchCarbSwap || 'rice'}
            onSelectProteinSwap={handleSelectProteinSwap}
            onSelectCarbSwap={handleSelectCarbSwap}
            onToggleMeal={handleToggleMeal}
            soundEnabled={state.soundEnabled}
          />
        )}

        {state.activeTab === 'workout' && (
          <WorkoutTab
            workoutProgress={state.workoutProgress}
            workoutReps={state.workoutReps || {}}
            workoutPRs={state.workoutPRs || {}}
            onToggleSet={handleToggleSet}
            onUpdateReps={handleUpdateReps}
            onResetDayWorkout={handleResetDayWorkout}
            soundEnabled={state.soundEnabled}
          />
        )}

        {state.activeTab === 'grocery' && (
          <GroceryTab
            groceryItems={state.groceryItems}
            customPrices={state.customGroceryPrices}
            onToggleItem={handleToggleGroceryItem}
            onUpdatePrice={handleUpdatePrice}
            onResetGrocery={handleResetGrocery}
            onResetPricesToDefault={handleResetPricesToDefault}
            onCheckAllGrocery={handleCheckAllGrocery}
            soundEnabled={state.soundEnabled}
          />
        )}

        {state.activeTab === 'water' && (
          <HydrationTab
            glassesCount={state.waterGlasses}
            onSetGlasses={handleSetWaterGlasses}
            soundEnabled={state.soundEnabled}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={state.activeTab}
        onChangeTab={handleChangeTab}
        pendingMealsCount={pendingMealsCount}
        pendingWaterCount={pendingWaterCount}
      />

      {/* Modals */}
      <WeightModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        currentWeight={state.currentWeight}
        startWeight={state.startWeight}
        targetWeight={state.targetWeight}
        onSaveWeight={handleSaveWeight}
        soundEnabled={state.soundEnabled}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmResetDay}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        currentState={state}
        onImportState={handleImportState}
        soundEnabled={state.soundEnabled}
      />
    </div>
  );
}
