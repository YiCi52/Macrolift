import React, { useState } from 'react';
import { User, Scale, Ruler, Calendar, Activity, Target, Clock, Trophy, Dumbbell } from 'lucide-react';
import { UserProfile } from '../types';
import { calculateBMR, calculateTDEE, getActivityLevelText } from '../utils/calculations';
import { getSportsByCategory } from '../data/sportsDatabase';

interface UserProfileFormProps {
  onComplete: (profile: UserProfile) => void;
}

export function UserProfileForm({ onComplete }: UserProfileFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    targetWeight: '',
    targetDate: '',
    gender: 'male' as 'male' | 'female',
    activityLevel: 0,
    goal: 'maintain' as 'lose' | 'maintain' | 'gain',
    sportType: '',
    trainingDays: '',
    trainingIntensity: 'moderate' as 'low' | 'moderate' | 'high' | 'elite'
  });

  const sportCategories = getSportsByCategory();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseFloat(formData.weight);
    const targetWeight = formData.targetWeight ? parseFloat(formData.targetWeight) : undefined;
    
    const bmr = calculateBMR(weight, height, age, formData.gender);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    
    const profile: UserProfile = {
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
    
    onComplete(profile);
    setLoading(false);
  };

  const isStep1Valid = formData.age && formData.height && formData.weight;
  const isStep2Valid = true; // Siempre válido ya que activityLevel tiene valor por defecto
  const isStep3Valid = true; // Deporte es opcional
  const isStep4Valid = formData.goal === 'maintain' || (formData.targetWeight && formData.targetDate);

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Mínimo 1 semana
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 2); // Máximo 2 años
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">MacroLift</h1>
          <p className="text-gray-300">Paso {step} de 4</p>
        </div>

        {/* Indicador de progreso */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Información Básica</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Edad
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="25"
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Ruler className="w-4 h-4 inline mr-2" />
                    Estatura (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="170"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="70.5"
                    min="30"
                    max="200"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Nivel de Actividad</h2>
              
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

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Información sobre niveles de actividad:</h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <strong>Sedentario:</strong> Trabajo de oficina, poco ejercicio</li>
                  <li>• <strong>Ligero:</strong> Ejercicio ligero 1-3 días/semana</li>
                  <li>• <strong>Moderado:</strong> Ejercicio moderado 3-5 días/semana</li>
                  <li>• <strong>Activo:</strong> Ejercicio intenso 6-7 días/semana</li>
                  <li>• <strong>Muy activo:</strong> Ejercicio muy intenso + trabajo físico</li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Deporte y Entrenamiento</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Trophy className="w-4 h-4 inline mr-2" />
                  ¿Practicas algún deporte específico?
                </label>
                <select
                  value={formData.sportType}
                  onChange={(e) => setFormData({ ...formData, sportType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="">Actividad casual / No específico</option>
                  {Object.entries(sportCategories).map(([category, sports]) => (
                    <optgroup key={category} label={category}>
                      {sports.map(sport => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {formData.sportType && formData.sportType !== 'casual' && (
                <>
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
                        Intensidad de entrenamiento
                      </label>
                      <select
                        value={formData.trainingIntensity}
                        onChange={(e) => setFormData({ ...formData, trainingIntensity: e.target.value as any })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white"
                      >
                        <option value="low">Baja (recreativo)</option>
                        <option value="moderate">Moderada (amateur)</option>
                        <option value="high">Alta (competitivo)</option>
                        <option value="elite">Elite (profesional)</option>
                      </select>
                    </div>
                  </div>

                  {formData.sportType && (
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        Información del deporte seleccionado:
                      </h3>
                      <div className="text-xs text-gray-400 space-y-1">
                        {(() => {
                          const sport = Object.values(sportCategories).flat().find(s => s.id === formData.sportType);
                          return sport && sport.id !== 'casual' && sport.id !== 'none' ? (
                            <>
                              <p>• <strong>{sport.name}:</strong> {sport.description}</p>
                              <p>• <strong>Proteína:</strong> {sport.proteinMultiplier}g/kg peso corporal</p>
                              <p>• <strong>Carbohidratos:</strong> {sport.carbMultiplier}g/kg peso corporal</p>
                              <p>• <strong>Hidratación:</strong> {sport.hydrationMultiplier}ml/kg peso corporal</p>
                             <p>• <strong>Ajuste calórico:</strong> +{sport.calorieAdjustment}% sobre TDEE</p>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">💡 Información:</h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Si no practicas un deporte específico, selecciona "No hago ningún deporte"</li>
                  <li>• Los deportes específicos tienen requerimientos nutricionales únicos</li>
                  <li>• La intensidad afecta las necesidades calóricas y de recuperación</li>
                  <li>• Puedes cambiar esta configuración más tarde en tu perfil</li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Objetivo de Peso</h2>
              
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
                <>
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
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="65.0"
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

                  {formData.targetWeight && formData.weight && formData.targetDate && (
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Vista previa del objetivo:</h3>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Peso actual: {formData.weight} kg</p>
                        <p>• Peso objetivo: {formData.targetWeight} kg</p>
                        <p>• Diferencia: {Math.abs(parseFloat(formData.targetWeight) - parseFloat(formData.weight)).toFixed(1)} kg</p>
                        <p>• Tiempo disponible: {Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 7))} semanas</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex justify-between space-x-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-3 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Anterior
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid) ||
                  (step === 3 && !isStep3Valid)
                }
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStep4Valid || loading}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Comenzar seguimiento'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}