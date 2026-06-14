import React, { useState } from 'react';
import { Calendar, Target, Plus, Settings } from 'lucide-react';
import { NutritionTracker } from './NutritionTracker';
import { MealLogger } from './MealLogger';
import { EducationCenter } from './EducationCenter';
import { ProfileSettings } from './ProfileSettings';

interface NutritionDashboardProps {
  nutrition: any;
}

export function NutritionDashboard({ nutrition }: NutritionDashboardProps) {
  const [activeTab, setActiveTab] = useState('tracker');
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const tabs = [
    { id: 'tracker', label: 'Seguimiento', icon: Target },
    { id: 'meals', label: 'Comidas', icon: Plus },
    { id: 'education', label: 'Educación', icon: Target }
  ];

  const handleProfileSave = (updatedProfile: any) => {
    nutrition.updateProfile(updatedProfile);
    setShowProfileSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">MacroLift</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                <Calendar className="w-4 h-4 inline mr-1" />
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <button
                onClick={() => setShowProfileSettings(true)}
                className="flex items-center px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                title="Configurar perfil"
              >
                <Settings className="w-4 h-4 mr-2" />
                Mi Perfil
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg shadow-lg p-1 border border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'tracker' && <NutritionTracker nutrition={nutrition} />}
          {activeTab === 'meals' && <MealLogger nutrition={nutrition} />}
          {activeTab === 'education' && <EducationCenter />}
        </div>
      </div>

      {/* Modal de configuración de perfil */}
      {showProfileSettings && nutrition.profile && (
        <ProfileSettings
          profile={nutrition.profile}
          onSave={handleProfileSave}
          onClose={() => setShowProfileSettings(false)}
        />
      )}
    </div>
  );
}