export interface UserProfile {
  age: number;
  height: number;
  weight: number;
  targetWeight?: number;
  targetDate?: string;
  gender: 'male' | 'female';
  activityLevel: number;
  sportType?: string;
  trainingDays?: number;
  trainingIntensity?: 'low' | 'moderate' | 'high' | 'elite';
  bmr: number;
  tdee: number;
  goal: 'lose' | 'maintain' | 'gain';
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
  phosphorus: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB6: number;
  vitaminB12: number;
  folate: number;
  biotin: number;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  nutritionRaw: NutritionData;
  nutritionCooked: NutritionData;
  servingSize: number;
  unit: string;
  customUnits?: {
    name: string;
    weight: number;
    isDefault?: boolean;
  }[];
  source?: string;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  quantity: number;
  unit: string;
  meal: 'breakfast' | 'lunch' | 'dinner';
  date: string;
  cookingState: 'raw' | 'cooked';
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
  phosphorus: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB6: number;
  vitaminB12: number;
  folate: number;
  biotin: number;
}

export interface WeightGoalInfo {
  weightToLose: number;
  weightToGain: number;
  weeksToGoal: number;
  dailyCalorieAdjustment: number;
  recommendedRate: string;
  isHealthyRate: boolean;
}