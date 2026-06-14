import { useState, useEffect } from 'react';
import { UserProfile, FoodEntry, DailyNutrition, NutritionGoals } from '../types';
import { foodDatabase } from '../data/foodDatabase';
import { calculateNutritionGoals } from '../utils/calculations';

export function useNutritionTracker() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<NutritionGoals | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    zinc: 0,
    phosphorus: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB1: 0,
    vitaminB2: 0,
    vitaminB3: 0,
    vitaminB6: 0,
    vitaminB12: 0,
    folate: 0,
    biotin: 0
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('nutritionProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      setGoals(calculateNutritionGoals(profileData));
    }

    const savedEntries = localStorage.getItem('foodEntries');
    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('nutritionProfile', JSON.stringify(profile));
      setGoals(calculateNutritionGoals(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
    calculateDailyNutrition();
  }, [foodEntries, selectedDate]);

  const calculateDailyNutrition = () => {
    const dayEntries = foodEntries.filter(entry => entry.date === selectedDate);
    
    // Si no hay entradas, retornar valores en cero
    if (dayEntries.length === 0) {
      setDailyNutrition({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        zinc: 0,
        phosphorus: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminK: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminB3: 0,
        vitaminB6: 0,
        vitaminB12: 0,
        folate: 0,
        biotin: 0
      });
      return;
    }
    
    const nutrition = dayEntries.reduce((acc, entry) => {
      const food = foodDatabase.find(f => f.id === entry.foodId);
      if (!food) return acc;

      const foodNutrition = entry.cookingState === 'cooked' ? food.nutritionCooked : food.nutritionRaw;
      const multiplier = (entry.quantity || 0) / (food.servingSize || 100);
      
      // Validar que todos los valores sean números válidos
      const safeAdd = (current: number, value: number) => {
        const result = current + (isNaN(value) ? 0 : value);
        return isNaN(result) ? current : result;
      };
      
      return {
        calories: safeAdd(acc.calories, (foodNutrition.calories || 0) * multiplier),
        protein: safeAdd(acc.protein, (foodNutrition.protein || 0) * multiplier),
        carbs: safeAdd(acc.carbs, (foodNutrition.carbs || 0) * multiplier),
        fat: safeAdd(acc.fat, (foodNutrition.fat || 0) * multiplier),
        fiber: safeAdd(acc.fiber, (foodNutrition.fiber || 0) * multiplier),
        sugar: safeAdd(acc.sugar, (foodNutrition.sugar || 0) * multiplier),
        sodium: safeAdd(acc.sodium, (foodNutrition.sodium || 0) * multiplier),
        potassium: safeAdd(acc.potassium, (foodNutrition.potassium || 0) * multiplier),
        calcium: safeAdd(acc.calcium, (foodNutrition.calcium || 0) * multiplier),
        iron: safeAdd(acc.iron, (foodNutrition.iron || 0) * multiplier),
        magnesium: safeAdd(acc.magnesium, (foodNutrition.magnesium || 0) * multiplier),
        zinc: safeAdd(acc.zinc, (foodNutrition.zinc || 0) * multiplier),
        phosphorus: safeAdd(acc.phosphorus, (foodNutrition.phosphorus || 0) * multiplier),
        vitaminA: safeAdd(acc.vitaminA, (foodNutrition.vitaminA || 0) * multiplier),
        vitaminC: safeAdd(acc.vitaminC, (foodNutrition.vitaminC || 0) * multiplier),
        vitaminD: safeAdd(acc.vitaminD, (foodNutrition.vitaminD || 0) * multiplier),
        vitaminE: safeAdd(acc.vitaminE, (foodNutrition.vitaminE || 0) * multiplier),
        vitaminK: safeAdd(acc.vitaminK, (foodNutrition.vitaminK || 0) * multiplier),
        vitaminB1: safeAdd(acc.vitaminB1, (foodNutrition.vitaminB1 || 0) * multiplier),
        vitaminB2: safeAdd(acc.vitaminB2, (foodNutrition.vitaminB2 || 0) * multiplier),
        vitaminB3: safeAdd(acc.vitaminB3, (foodNutrition.vitaminB3 || 0) * multiplier),
        vitaminB6: safeAdd(acc.vitaminB6, (foodNutrition.vitaminB6 || 0) * multiplier),
        vitaminB12: safeAdd(acc.vitaminB12, (foodNutrition.vitaminB12 || 0) * multiplier),
        folate: safeAdd(acc.folate, (foodNutrition.folate || 0) * multiplier),
        biotin: safeAdd(acc.biotin, (foodNutrition.biotin || 0) * multiplier)
      };
    }, {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      potassium: 0,
      calcium: 0,
      iron: 0,
      magnesium: 0,
      zinc: 0,
      phosphorus: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
      vitaminB1: 0,
      vitaminB2: 0,
      vitaminB3: 0,
      vitaminB6: 0,
      vitaminB12: 0,
      folate: 0,
      biotin: 0
    });

    setDailyNutrition(nutrition);
  };

  const addFoodEntry = (entry: Omit<FoodEntry, 'id' | 'date'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      date: selectedDate
    };
    setFoodEntries(prev => [...prev, newEntry]);
  };

  const removeFoodEntry = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const getAvailableDates = () => {
    const dates = [...new Set(foodEntries.map(entry => entry.date))];
    return dates.sort().reverse();
  };

  return {
    profile,
    foodEntries,
    goals,
    dailyNutrition,
    selectedDate,
    setSelectedDate,
    addFoodEntry,
    removeFoodEntry,
    updateProfile,
    getAvailableDates
  };
}