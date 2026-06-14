import { UserProfile, NutritionGoals, WeightGoalInfo } from '../types';
import { getSportProfile } from '../data/sportsDatabase';

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Ecuación de Mifflin-St Jeor
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
  return bmr * multipliers[activityLevel];
}

export function calculateWeightGoalInfo(profile: UserProfile): WeightGoalInfo | null {
  if (!profile.targetWeight || !profile.targetDate) {
    return null;
  }

  const currentWeight = profile.weight;
  const targetWeight = profile.targetWeight;
  const weightDifference = targetWeight - currentWeight;
  
  const today = new Date();
  const targetDate = new Date(profile.targetDate);
  const timeDifference = targetDate.getTime() - today.getTime();
  const weeksToGoal = Math.ceil(timeDifference / (1000 * 3600 * 24 * 7));

  if (weeksToGoal <= 0) {
    return null;
  }

  // 1 kg de grasa = aproximadamente 7700 calorías
  const totalCaloriesNeeded = Math.abs(weightDifference) * 7700;
  const dailyCalorieAdjustment = totalCaloriesNeeded / (weeksToGoal * 7);

  // Tasas recomendadas: 0.5-1 kg por semana para pérdida, 0.25-0.5 kg para ganancia
  const weeklyWeightChange = Math.abs(weightDifference) / weeksToGoal;
  const isLosing = weightDifference < 0;
  const isHealthyRate = isLosing 
    ? weeklyWeightChange <= 1 && weeklyWeightChange >= 0.25
    : weeklyWeightChange <= 0.5 && weeklyWeightChange >= 0.25;

  let recommendedRate = '';
  if (isLosing) {
    if (weeklyWeightChange > 1) {
      recommendedRate = 'Muy rápido - considera reducir el déficit calórico';
    } else if (weeklyWeightChange < 0.25) {
      recommendedRate = 'Muy lento - puedes aumentar el déficit calórico';
    } else {
      recommendedRate = 'Ritmo saludable y sostenible';
    }
  } else {
    if (weeklyWeightChange > 0.5) {
      recommendedRate = 'Muy rápido - considera reducir el superávit calórico';
    } else if (weeklyWeightChange < 0.25) {
      recommendedRate = 'Muy lento - puedes aumentar el superávit calórico';
    } else {
      recommendedRate = 'Ritmo saludable y sostenible';
    }
  }

  return {
    weightToLose: isLosing ? Math.abs(weightDifference) : 0,
    weightToGain: !isLosing ? weightDifference : 0,
    weeksToGoal,
    dailyCalorieAdjustment: isLosing ? -dailyCalorieAdjustment : dailyCalorieAdjustment,
    recommendedRate,
    isHealthyRate
  };
}

export function calculateNutritionGoals(profile: UserProfile): NutritionGoals {
  let calorieGoal = profile.tdee;
  
  // Validar que los valores del perfil sean números válidos
  if (!profile.tdee || isNaN(profile.tdee) || !profile.weight || isNaN(profile.weight)) {
    // Valores por defecto si hay problemas con el perfil
    return {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 67,
      fiber: 25,
      sodium: 2300
    };
  }
  
  // Obtener perfil deportivo si existe
  const sportProfile = profile.sportType ? getSportProfile(profile.sportType) : null;
  
  // Si hay un objetivo de peso específico, usar ese cálculo
  const weightGoalInfo = calculateWeightGoalInfo(profile);
  if (weightGoalInfo) {
    calorieGoal = profile.tdee + weightGoalInfo.dailyCalorieAdjustment;
  } else {
    // Aplicar ajuste deportivo si existe
    if (sportProfile) {
      calorieGoal = profile.tdee * (1 + sportProfile.calorieAdjustment / 100);
    } else {
      // Usar el método tradicional si no hay objetivo específico
      switch (profile.goal) {
        case 'lose':
          calorieGoal = profile.tdee - 500; // Déficit de 500 calorías
          break;
        case 'gain':
          calorieGoal = profile.tdee + 500; // Superávit de 500 calorías
          break;
        default:
          calorieGoal = profile.tdee;
      }
    }
  }

  // Asegurar que las calorías no sean demasiado bajas
  const minimumCalories = profile.bmr * 1.2;
  calorieGoal = Math.max(calorieGoal, minimumCalories);

  // Calcular macronutrientes según deporte o método tradicional
  let proteinGoal, fatGoal, carbsGoal;
  
  if (sportProfile) {
    // Usar multiplicadores específicos del deporte
    proteinGoal = profile.weight * sportProfile.proteinMultiplier;
    fatGoal = calorieGoal * (sportProfile.fatPercentage / 100) / 9;
    
    // Si hay multiplicador de carbohidratos específico, usarlo
    if (sportProfile.carbMultiplier) {
      carbsGoal = profile.weight * sportProfile.carbMultiplier;
      // Ajustar calorías si es necesario para que coincidan los macros
      const calculatedCalories = (proteinGoal * 4) + (fatGoal * 9) + (carbsGoal * 4);
      if (Math.abs(calculatedCalories - calorieGoal) > 200) {
        // Si la diferencia es muy grande, ajustar carbohidratos
        carbsGoal = (calorieGoal - (proteinGoal * 4) - (fatGoal * 9)) / 4;
      }
    } else {
      carbsGoal = (calorieGoal - (proteinGoal * 4) - (fatGoal * 9)) / 4;
    }
  } else {
    // Método tradicional
    proteinGoal = profile.weight * 2.2; // 2.2g por kg de peso
    fatGoal = calorieGoal * 0.25 / 9; // 25% de calorías de grasa
    carbsGoal = (calorieGoal - (proteinGoal * 4) - (fatGoal * 9)) / 4;
  }

  return {
    calories: Math.round(calorieGoal),
    protein: Math.round(proteinGoal),
    carbs: Math.round(carbsGoal),
    fat: Math.round(fatGoal),
    fiber: 25, // Recomendación general
    sodium: 2300 // Límite recomendado en mg
  };
}

export function getActivityLevelText(level: number): string {
  const levels = [
    'Sedentario (poco o nada de ejercicio)',
    'Ligero (ejercicio ligero 1-3 días/semana)',
    'Moderado (ejercicio moderado 3-5 días/semana)',
    'Activo (ejercicio intenso 6-7 días/semana)',
    'Muy activo (ejercicio muy intenso, trabajo físico)'
  ];
  return levels[level];
}

export function getSportNutritionInfo(profile: UserProfile) {
  // Siempre calcular hidratación, incluso sin deporte específico
  const sportProfile = profile.sportType ? getSportProfile(profile.sportType) : getSportProfile('casual');
  if (!sportProfile) return null;
  
  const hydrationGoal = profile.weight * sportProfile.hydrationMultiplier;
  
  return {
    sport: sportProfile,
    dailyHydration: Math.round(hydrationGoal),
    hasSpecificSport: !!profile.sportType && profile.sportType !== 'none' && profile.sportType !== 'casual'
  };
}