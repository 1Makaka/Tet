export interface MacroNutrients {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Ingredient {
  id: string;
  name: string;
  grams: string;
  measure: string;
  alternative?: string;
}

export interface Meal {
  id: string;
  title: string;
  subtitle: string;
  calories: number;
  macros: MacroNutrients;
  ingredients: Ingredient[];
  recipe: string;
  specialNote?: string;
  hasTunaAlternative?: boolean;
}

export interface ExerciseSet {
  id: number;
  completed: boolean;
  reps?: string;
  weight?: string;
}

export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  setsCount: number;
  targetReps: string;
  safetyTip: string;
  safetyRules: [string, string]; // 2 key back safety rules
  movementSvgType: string;
  sets: ExerciseSet[];
}

export interface WorkoutDay {
  id: string;
  dayShort: string;
  dayFull: string;
  title: string;
  description: string;
  exercises: Exercise[];
}

export interface GroceryItem {
  id: string;
  name: string;
  russianName: string;
  germanName: string;
  quantity: string;
  defaultPrice: number;
  category: 'meat' | 'dairy' | 'carbs' | 'veggies' | 'other';
  iconKey: string;
  completed: boolean;
}

export interface WeightRecord {
  date: string;
  weight: number;
  note?: string;
}

export interface AppState {
  currentWeight: number;
  targetWeight: number;
  startWeight: number;
  weightHistory: WeightRecord[];
  // 90-Day Discipline & Streak Tracker
  programStartDate: string;
  completedDays: Record<number, boolean>; // dayNumber (1-90) -> boolean
  completedDates: Record<string, boolean>; // 'YYYY-MM-DD' -> boolean
  // Nutrition & Meals
  completedMeals: Record<string, boolean>;
  useTunaAlternative: boolean;
  lunchProteinSwap: 'chicken' | 'tuna' | 'eggs';
  lunchCarbSwap: 'rice' | 'pasta' | 'buckwheat';
  // Workout
  workoutProgress: Record<string, boolean[]>; // exerciseId -> array of completed set booleans
  workoutReps: Record<string, number[]>; // exerciseId -> array of actual reps logged per set
  workoutPRs: Record<string, number>; // exerciseId -> best record reps
  // Grocery with custom prices
  groceryItems: Record<string, boolean>;
  customGroceryPrices: Record<string, number>;
  // Hydration
  waterGlasses: number; // 0 to 12
  soundEnabled: boolean;
  activeTab: 'dashboard' | 'nutrition' | 'workout' | 'grocery' | 'water';
  lastActiveDate: string;
}
