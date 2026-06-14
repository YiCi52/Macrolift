import React, { useState } from 'react';
import { User, Scale, Ruler, Calendar, Activity, Target, Clock, Save, X, Trophy, Dumbbell } from 'lucide-react';
import { UserProfile } from '../types';
import { calculateBMR, calculateTDEE, getActivityLevelText } from '../utils/calculations';
import { getSportsByCategory } from '../data/sportsDatabase';

interface ProfileSettingsProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export function ProfileSettings({ profile, onSave, onClose }: ProfileSettingsProps) {
  const sportCategories = getSportsByCategory();
  
  const [formData, setFormData] = useState({
    age: profile.age.toString(),
    height: profile.height.toString(),
    weight: profile.weight.toString(),
    targetWeight: profile.targetWeight?.toString() || '',
    targetDate: profile.targetDate || '',
    gender: profile.gender,
    activityLevel: profile.activityLevel,
    goal: profile.goal,
    sportType: profile.sportType || '',
    trainingDays: profile.trainingDays?.toString() || '',
    trainingIntensity: profile.trainingIntensity || 'moderate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseFloat(formData.weight);
    const targetWeight = formData.targetWeight ? parseFloat(formData.targetWeight) : undefined;
    
    const bmr = calculateBMR(weight, height, age, formData.gender);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    
    const updatedProfile: UserProfile = {
      age,
      height,
      weight,
      targetWeight,
      targetDate: formData.targetDate || undefined,
      gender: formData.gender,
      activityLevel: formData.activityLevel,
      sportType: formData.sportType || undefined,
      trainingDays: formData.trainingDays ? parseInt(formData.trainingDays) : undefined,
      trainingIntensity: formData.trainingIntensity,
      bmr,
      tdee,
      goal: formData.goal
    };
    
    onSave(updatedProfile);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 2);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Configuración del Perfil</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Edad
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                  min="16"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Género
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Ruler className="w-4 h-4 inline mr-2" />
                  Estatura (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                  min="120"
                  max="250"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Scale className="w-4 h-4 inline mr-2" />
                  Peso Actual (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                  min="30"
                  max="200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Nivel de Actividad */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Actividad Física y Deporte
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Activity className="w-4 h-4 inline mr-2" />
                ¿Qué tan activo eres?
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
              >
                {[0, 1, 2, 3, 4].map(level => (
                  <option key={level} value={level}>
                    {getActivityLevelText(level)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Trophy className="w-4 h-4 inline mr-2" />
                Deporte específico
              </label>
              <select
                value={formData.sportType}
                onChange={(e) => setFormData({ ...formData, sportType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
              >
                <option value="none">No hago ningún deporte o actividad física</option>
                {Object.entries(sportCategories).map(([category, sports]) => (
                  <optgroup key={category} label={category}>
                    {sports.map(sport => (
                      <option key={sport.id} value={sport.id} disabled={sport.id === 'none'}>
                        {sport.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {formData.sportType && formData.sportType !== 'none' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Dumbbell className="w-4 h-4 inline mr-2" />
                    Días de entrenamiento/semana
                  </label>
                  <select
                    value={formData.trainingDays}
                    onChange={(e) => setFormData({ ...formData, trainingDays: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">1 día</option>
                    <option value="2">2 días</option>
                    <option value="3">3 días</option>
                    <option value="4">4 días</option>
                    <option value="5">5 días</option>
                    <option value="6">6 días</option>
                    <option value="7">7 días</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Intensidad
                  </label>
                  <select
                    value={formData.trainingIntensity}
                    onChange={(e) => setFormData({ ...formData, trainingIntensity: e.target.value as any })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                  >
                    <option value="low">Baja</option>
                    <option value="moderate">Moderada</option>
                    <option value="high">Alta</option>
                    <option value="elite">Elite</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Objetivo de Peso */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Objetivo de Peso
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de objetivo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'lose', label: 'Perder peso', color: 'bg-red-900 border-red-700 text-red-300' },
                  { value: 'maintain', label: 'Mantener', color: 'bg-purple-900 border-purple-700 text-purple-300' },
                  { value: 'gain', label: 'Ganar peso', color: 'bg-pink-900 border-pink-700 text-pink-300' }
                ].map(goal => (
                  <label key={goal.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="goal"
                      value={goal.value}
                      checked={formData.goal === goal.value}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all duration-200 ${
                      formData.goal === goal.value ? goal.color : 'bg-gray-700 border-gray-600 text-gray-300'
                    }`}>
                      {goal.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {formData.goal !== 'maintain' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Peso Objetivo (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.targetWeight}
                    onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                    min="30"
                    max="200"
                    required={formData.goal !== 'maintain'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Fecha Objetivo
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                    min={getMinDate()}
                    max={getMaxDate()}
                    required={formData.goal !== 'maintain'}
                  />
                </div>
              </div>
            )}

            {formData.targetWeight && formData.weight && formData.targetDate && formData.goal !== 'maintain' && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Vista previa del objetivo:</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Peso actual: {formData.weight} kg</p>
                  <p>• Peso objetivo: {formData.targetWeight} kg</p>
                  <p>• Diferencia: {Math.abs(parseFloat(formData.targetWeight) - parseFloat(formData.weight)).toFixed(1)} kg</p>
                  <p>• Tiempo disponible: {Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 7))} semanas</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors duration-200 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}