import React, { useState, useEffect } from 'react';
import { UserProfileForm } from './components/UserProfileForm';
import { NutritionDashboard } from './components/NutritionDashboard';
import { useNutritionTracker } from './hooks/useNutritionTracker';

function App() {
  const nutrition = useNutritionTracker();

  // Si no hay perfil, mostrar formulario de perfil
  if (!nutrition.profile) {
    return <UserProfileForm onComplete={nutrition.updateProfile} />;
  }

  // Mostrar dashboard principal
  return (
    <div className="min-h-screen">
      <NutritionDashboard nutrition={nutrition} />
    </div>
  );
}

export default App;