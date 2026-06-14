import React from 'react';
import { Target, Zap, Dumbbell, Droplets, Shield, Eye, Calendar, ChevronLeft, ChevronRight, TrendingDown, TrendingUp, Clock } from 'lucide-react';
import { calculateWeightGoalInfo, getSportNutritionInfo } from '../utils/calculations';

interface NutritionTrackerProps {
  nutrition: any;
}

export function NutritionTracker({ nutrition }: NutritionTrackerProps) {
  const { profile, goals, selectedDate, setSelectedDate, dailyNutrition, getAvailableDates } = nutrition;
  
  if (!profile || !goals) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No hay datos disponibles</h3>
        <p className="text-gray-400">Completa tu perfil para ver tu seguimiento nutricional</p>
      </div>
    );
  }

  const weightGoalInfo = calculateWeightGoalInfo(profile);
  const sportInfo = getSportNutritionInfo(profile);

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-gradient-to-r from-pink-500 to-purple-500';
    if (percentage >= 75) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    return 'bg-gradient-to-r from-gray-600 to-gray-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Hoy';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const changeDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const macros = [
    {
      name: 'Calorías',
      current: Math.round(dailyNutrition.calories || 0),
      goal: goals.calories,
      unit: 'kcal',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      name: 'Proteínas',
      current: Math.round(dailyNutrition.protein || 0),
      goal: goals.protein,
      unit: 'g',
      icon: Dumbbell,
      color: 'text-red-400'
    },
    {
      name: 'Carbohidratos',
      current: Math.round(dailyNutrition.carbs || 0),
      goal: goals.carbs,
      unit: 'g',
      icon: Droplets,
      color: 'text-blue-400'
    },
    {
      name: 'Grasas',
      current: Math.round(dailyNutrition.fat || 0),
      goal: goals.fat,
      unit: 'g',
      icon: Shield,
      color: 'text-green-400'
    }
  ];

  const micronutrients = [
    { name: 'Fibra', current: Math.round(dailyNutrition.fiber || 0), goal: 25, unit: 'g' },
    { name: 'Sodio', current: Math.round(dailyNutrition.sodium || 0), goal: 2300, unit: 'mg' },
    { name: 'Potasio', current: Math.round(dailyNutrition.potassium || 0), goal: 3500, unit: 'mg' },
    { name: 'Calcio', current: Math.round(dailyNutrition.calcium || 0), goal: 1000, unit: 'mg' },
    { name: 'Hierro', current: Math.round(dailyNutrition.iron || 0), goal: 18, unit: 'mg' },
    { name: 'Magnesio', current: Math.round(dailyNutrition.magnesium || 0), goal: 400, unit: 'mg' },
    { name: 'Zinc', current: Math.round((dailyNutrition.zinc || 0) * 100) / 100, goal: 11, unit: 'mg' },
    { name: 'Fósforo', current: Math.round(dailyNutrition.phosphorus || 0), goal: 700, unit: 'mg' }
  ];

  const vitamins = [
    { name: 'Vitamina A', current: Math.round(dailyNutrition.vitaminA || 0), goal: 900, unit: 'μg' },
    { name: 'Vitamina C', current: Math.round(dailyNutrition.vitaminC || 0), goal: 90, unit: 'mg' },
    { name: 'Vitamina D', current: Math.round((dailyNutrition.vitaminD || 0) * 10) / 10, goal: 15, unit: 'μg' },
    { name: 'Vitamina E', current: Math.round((dailyNutrition.vitaminE || 0) * 10) / 10, goal: 15, unit: 'mg' },
    { name: 'Vitamina K', current: Math.round(dailyNutrition.vitaminK || 0), goal: 120, unit: 'μg' },
    { name: 'Vitamina B1', current: Math.round((dailyNutrition.vitaminB1 || 0) * 1000) / 1000, goal: 1.2, unit: 'mg' },
    { name: 'Vitamina B2', current: Math.round((dailyNutrition.vitaminB2 || 0) * 1000) / 1000, goal: 1.3, unit: 'mg' },
    { name: 'Vitamina B3', current: Math.round((dailyNutrition.vitaminB3 || 0) * 10) / 10, goal: 16, unit: 'mg' },
    { name: 'Vitamina B6', current: Math.round((dailyNutrition.vitaminB6 || 0) * 1000) / 1000, goal: 1.3, unit: 'mg' },
    { name: 'Vitamina B12', current: Math.round((dailyNutrition.vitaminB12 || 0) * 100) / 100, goal: 2.4, unit: 'μg' },
    { name: 'Folato', current: Math.round(dailyNutrition.folate || 0), goal: 400, unit: 'μg' },
    { name: 'Biotina', current: Math.round((dailyNutrition.biotin || 0) * 10) / 10, goal: 30, unit: 'μg' }
  ];

  return (
    <div className="space-y-6">
      {/* Selector de fecha */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Seguimiento Nutricional</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeDate('prev')}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium min-w-[80px] text-center">
                {formatDate(selectedDate)}
              </span>
            </div>
            <button
              onClick={() => changeDate('next')}
              disabled={selectedDate >= new Date().toISOString().split('T')[0]}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
        
        {/* Historial de fechas disponibles */}
        {getAvailableDates().length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Días con registros:</p>
            <div className="flex flex-wrap gap-2">
              {getAvailableDates().slice(0, 10).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    selectedDate === date
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Información deportiva específica */}
      {sportInfo && (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl shadow-lg p-6 border border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-blue-300 mr-2" />
              <h3 className="text-lg font-semibold text-white">Nutrición Deportiva - {sportInfo.sport.name}</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{sportInfo.dailyHydration}ml</div>
              <div className="text-sm text-gray-300">Hidratación diaria</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{Math.round(((goals.calories - profile.tdee) / profile.tdee) * 100)}%</div>
              <div className="text-sm text-gray-300">Ajuste calórico</div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <h4 className="font-medium text-purple-300 mb-2">Nutrientes clave para {sportInfo.sport.name}:</h4>
            <div className="flex flex-wrap gap-1">
              {sportInfo.sport.keyNutrients.map((nutrient, idx) => (
                <span key={idx} className="px-2 py-1 bg-purple-900 bg-opacity-50 rounded text-xs text-purple-200">
                  {nutrient}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Objetivo de peso */}
      {weightGoalInfo && (
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl shadow-lg p-6 border border-purple-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-purple-300 mr-2" />
              <h3 className="text-lg font-semibold text-white">Objetivo de Peso</h3>
            </div>
            <div className="flex items-center space-x-2">
              {weightGoalInfo.weightToLose > 0 ? (
                <TrendingDown className="w-5 h-5 text-red-400" />
              ) : (
                <TrendingUp className="w-5 h-5 text-green-400" />
              )}
              <span className="text-white font-medium">
                {weightGoalInfo.weightToLose > 0 ? 'Perder' : 'Ganar'} {Math.abs(weightGoalInfo.weightToLose || weightGoalInfo.weightToGain)} kg
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{profile.weight} kg</div>
              <div className="text-sm text-gray-300">Peso actual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{profile.targetWeight} kg</div>
              <div className="text-sm text-gray-300">Peso objetivo</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-300 mr-1" />
                <div className="text-2xl font-bold text-yellow-300">{weightGoalInfo.weeksToGoal}</div>
              </div>
              <div className="text-sm text-gray-300">Semanas restantes</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-black bg-opacity-30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Ajuste calórico diario:</span>
              <span className={`font-medium ${weightGoalInfo.dailyCalorieAdjustment < 0 ? 'text-red-300' : 'text-green-300'}`}>
                {weightGoalInfo.dailyCalorieAdjustment > 0 ? '+' : ''}{Math.round(weightGoalInfo.dailyCalorieAdjustment)} kcal
              </span>
            </div>
            <div className="text-xs text-gray-400">
              <span className={`inline-block px-2 py-1 rounded ${weightGoalInfo.isHealthyRate ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                {weightGoalInfo.recommendedRate}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Resumen del perfil */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">
          Tu Perfil Nutricional
          {profile.sportType && profile.sportType !== 'casual' && (
            <span className="text-sm font-normal text-gray-400 ml-2">
              ({sportInfo?.sport.name})
            </span>
          )}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{profile.weight} kg</div>
            <div className="text-sm text-gray-400">Peso actual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(profile.bmr)}</div>
            <div className="text-sm text-gray-400">BMR (kcal/día)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{Math.round(profile.tdee)}</div>
            <div className="text-sm text-gray-400">TDEE (kcal/día)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{goals.calories}</div>
            <div className="text-sm text-gray-400">
              Meta diaria
              {sportInfo && (
                <div className="text-xs text-blue-300">
                  (+{Math.round(((goals.calories - profile.tdee) / profile.tdee) * 100)}% TDEE)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrientes */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">Macronutrientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {macros.map((macro) => {
            const percentage = Math.min((macro.current / macro.goal) * 100, 100);
            return (
              <div key={macro.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <macro.icon className={`w-5 h-5 ${macro.color} mr-2`} />
                    <span className="font-medium text-white">{macro.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {macro.current}/{macro.goal} {macro.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(macro.current, macro.goal)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  {Math.round(percentage)}% del objetivo
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Micronutrientes */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">Minerales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {micronutrients.map((micro) => {
            const percentage = Math.min((micro.current / micro.goal) * 100, 100);
            return (
              <div key={micro.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{micro.name}</span>
                  <span className="text-xs text-gray-400">
                    {micro.current}/{micro.goal} {micro.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(micro.current, micro.goal)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  {Math.round(percentage)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vitaminas */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">Vitaminas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitamins.map((vitamin) => {
            const percentage = Math.min((vitamin.current / vitamin.goal) * 100, 100);
            return (
              <div key={vitamin.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{vitamin.name}</span>
                  <span className="text-xs text-gray-400">
                    {vitamin.current}/{vitamin.goal} {vitamin.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(vitamin.current, vitamin.goal)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  {Math.round(percentage)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}