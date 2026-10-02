import { AppState } from '../types';

const STORAGE_KEY = 'lean_bulk_pro_state_v2';

export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function getDefaultState(): AppState {
  const today = getTodayDateString();
  return {
    currentWeight: 57.0,
    targetWeight: 67.0,
    startWeight: 57.0,
    weightHistory: [
      { date: today, weight: 57.0, note: 'Старт программы LEAN BULK PRO' },
    ],
    programStartDate: today,
    completedDays: {},
    completedDates: {},
    completedMeals: {
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    useTunaAlternative: false,
    lunchProteinSwap: 'chicken',
    lunchCarbSwap: 'rice',
    workoutProgress: {},
    workoutReps: {},
    workoutPRs: {},
    groceryItems: {},
    customGroceryPrices: {},
    waterGlasses: 0,
    soundEnabled: true,
    activeTab: 'dashboard',
    lastActiveDate: today,
  };
}

export function loadAppState(): AppState {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultState(),
      ...parsed,
    };
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return getDefaultState();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}
