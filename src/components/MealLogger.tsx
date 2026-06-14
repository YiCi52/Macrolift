import React, { useState } from 'react';
import { Plus, Search, X, Coffee, Sun, Moon } from 'lucide-react';
import { foodDatabase, portionSizes, searchFoods } from '../data/foodDatabase';

interface MealLoggerProps {
  nutrition: any;
}

export function MealLogger({ nutrition }: MealLoggerProps) {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('100');
  const [unit, setUnit] = useState('g');
  const [cookingState, setCookingState] = useState<'raw' | 'cooked'>('raw');

  const { foodEntries, addFoodEntry, removeFoodEntry, selectedDate } = nutrition;

  const meals = [
    { id: 'breakfast', name: 'Desayuno', icon: Coffee, color: 'bg-purple-900 border-purple-700' },
    { id: 'lunch', name: 'Almuerzo', icon: Sun, color: 'bg-pink-900 border-pink-700' },
    { id: 'dinner', name: 'Cena', icon: Moon, color: 'bg-gray-800 border-gray-600' }
  ];

  const dayEntries = foodEntries.filter((entry: any) => entry.date === selectedDate);

  const filteredFoods = searchFoods(searchTerm);

  const handleAddFood = () => {
    if (selectedFood && selectedMeal && quantity) {
      const food = foodDatabase.find(f => f.id === selectedFood);
      let quantityInGrams = parseFloat(quantity);
      
      // Si es una unidad personalizada, usar su peso
      if (food?.customUnits && unit !== 'g') {
        const customUnit = food.customUnits.find(u => u.name === unit);
        if (customUnit) {
          quantityInGrams = customUnit.weight * parseFloat(quantity);
        }
      } else if (unit !== 'g' && portionSizes[unit as keyof typeof portionSizes]) {
        quantityInGrams = portionSizes[unit as keyof typeof portionSizes] * parseFloat(quantity);
      }
      
      addFoodEntry({
        foodId: selectedFood,
        meal: selectedMeal,
        quantity: quantityInGrams,
        unit: unit === 'g' ? 'g' : unit,
        cookingState: cookingState
      });
      
      setSelectedFood(null);
      setSelectedMeal(null);
      setQuantity('100');
      setUnit('g');
      setCookingState('raw');
      setSearchTerm('');
    }
  };

  const getMealEntries = (mealType: string) => {
    return dayEntries.filter((entry: any) => entry.meal === mealType);
  };

  const getFoodDetails = (foodId: string) => {
    const food = foodDatabase.find(food => food.id === foodId);
    if (!food) {
      console.warn(`Food with id ${foodId} not found in database`);
      return null;
    }
    return food;
  };

  const calculateEntryNutrition = (entry: any) => {
    const food = getFoodDetails(entry.foodId);
    if (!food) {
      console.warn(`Cannot calculate nutrition for entry ${entry.id}: food not found`);
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }
    
    const nutrition = entry.cookingState === 'cooked' ? food.nutritionCooked : food.nutritionRaw;
    if (!nutrition) {
      console.warn(`Nutrition data missing for food ${food.name} in ${entry.cookingState} state`);
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }
    
    const multiplier = entry.quantity / food.servingSize;
    
    return {
      calories: Math.round((nutrition.calories || 0) * multiplier),
      protein: Math.round((nutrition.protein || 0) * multiplier),
      carbs: Math.round((nutrition.carbs || 0) * multiplier),
      fat: Math.round((nutrition.fat || 0) * multiplier)
    };
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

  return (
    <div className="space-y-6">
      {/* Indicador de fecha */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
        <h2 className="text-xl font-bold text-white text-center">
          Registro de comidas - {formatDate(selectedDate)}
        </h2>
      </div>

      {/* Comidas del día */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => {
          const mealEntries = getMealEntries(meal.id);
          const totalCalories = mealEntries.reduce((sum: number, entry: any) => {
            const nutrition = calculateEntryNutrition(entry);
            return sum + nutrition.calories;
          }, 0);

          return (
            <div key={meal.id} className={`border-2 rounded-xl p-6 ${meal.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <meal.icon className="w-6 h-6 mr-2 text-gray-300" />
                  <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedMeal(meal.id as any)}
                  className="p-2 bg-gray-700 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 text-gray-300" />
                </button>
              </div>
              
              <div className="space-y-2">
                {mealEntries.length === 0 ? (
                  <p className="text-gray-400 text-sm">No hay alimentos registrados</p>
                ) : (
                  mealEntries.map((entry: any) => {
                    const food = getFoodDetails(entry.foodId);
                    if (!food) {
                      return (
                        <div key={entry.id} className="bg-red-900 rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-white">Alimento no encontrado</p>
                              <p className="text-sm text-red-300">ID: {entry.foodId}</p>
                            </div>
                            <button
                              onClick={() => removeFoodEntry(entry.id)}
                              className="p-1 text-red-400 hover:bg-red-800 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    }
                    
                    const nutrition = calculateEntryNutrition(entry);
                    
                    return (
                      <div key={entry.id} className="bg-gray-700 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">{food?.name}</p>
                            <p className="text-sm text-gray-300">
                              {Math.round(entry.quantity)}g • {entry.cookingState === 'cooked' ? 'Cocido' : 'Crudo'} • {nutrition.calories} kcal
                            </p>
                          </div>
                          <button
                            onClick={() => removeFoodEntry(entry.id)}
                            className="p-1 text-red-400 hover:bg-red-900 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <p className="text-sm font-medium text-white">
                  Total: {totalCalories} kcal
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para agregar alimento */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Agregar alimento a {meals.find(m => m.id === selectedMeal)?.name}
                </h2>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="p-2 text-gray-400 hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar alimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
                {filteredFoods.map((food) => {
                  const nutrition = cookingState === 'cooked' ? food.nutritionCooked : food.nutritionRaw;
                  if (!nutrition) {
                    return (
                      <div
                        key={food.id}
                        className="p-3 rounded-lg border border-red-600 bg-red-900 bg-opacity-30"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">{food.name}</p>
                            <p className="text-sm text-red-400">Sin datos nutricionales disponibles</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div
                      key={food.id}
                      onClick={() => setSelectedFood(food.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedFood === food.id
                          ? 'border-pink-500 bg-pink-900 bg-opacity-30'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">{food.name}</p>
                          <p className="text-sm text-gray-400">{food.category}</p>
                          <p className="text-sm text-gray-400">
                            {Math.round(nutrition.calories || 0)} kcal • {Math.round(nutrition.protein || 0)}g proteína • {Math.round(nutrition.carbs || 0)}g carbohidratos • {Math.round(nutrition.fat || 0)}g grasa
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedFood && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Unidad
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    >
                      <option value="g">Gramos</option>
                      {(() => {
                        const food = foodDatabase.find(f => f.id === selectedFood);
                        if (food?.customUnits) {
                          return food.customUnits.map(customUnit => (
                            <option key={customUnit.name} value={customUnit.name}>
                              {customUnit.name} ({customUnit.weight}g)
                            </option>
                          ));
                        }
                        return null;
                      })()}
                      <option value="palma">Palma (85g)</option>
                      <option value="puño">Puño (30g)</option>
                      <option value="cucharada">Cucharada (15g)</option>
                      <option value="cucharadita">Cucharadita (5g)</option>
                      <option value="taza">Taza (240ml)</option>
                      <option value="onza">Onza (28g)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estado
                    </label>
                    <select
                      value={cookingState}
                      onChange={(e) => setCookingState(e.target.value as 'raw' | 'cooked')}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    >
                      <option value="raw">Crudo</option>
                      <option value="cooked">Cocido</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddFood}
                  disabled={!selectedFood || !quantity}
                  className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Agregar alimento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}