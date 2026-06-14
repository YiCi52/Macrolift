export interface SportProfile {
  id: string;
  name: string;
  category: string;
  description: string;
  proteinMultiplier: number; // g/kg peso corporal
  carbMultiplier: number; // g/kg peso corporal
  fatPercentage: number; // % de calorías totales
  calorieAdjustment: number; // % adicional sobre TDEE
  hydrationMultiplier: number; // ml/kg peso corporal
  keyNutrients: string[];
}

export const sportsDatabase: SportProfile[] = [
  {
    id: 'powerlifting',
    name: 'Powerlifting',
    category: 'Fuerza',
    description: 'Entrenamiento de fuerza máxima en sentadilla, press banca y peso muerto',
    proteinMultiplier: 2.8, // 2.5-3.0g/kg
    carbMultiplier: 6.5, // 6-7g/kg
    fatPercentage: 25,
    calorieAdjustment: 15, // +15% sobre TDEE
    hydrationMultiplier: 40,
    keyNutrients: ['Creatina', 'Zinc', 'Magnesio', 'Vitamina D'],
  },
  {
    id: 'bodybuilding',
    name: 'Fisioculturismo',
    category: 'Estética',
    description: 'Desarrollo muscular y definición corporal',
    proteinMultiplier: 3.0, // 2.8-3.2g/kg
    carbMultiplier: 5.5, // 4-7g/kg según fase
    fatPercentage: 20,
    calorieAdjustment: 10,
    hydrationMultiplier: 45,
    keyNutrients: ['Proteína completa', 'BCAA', 'Glutamina', 'Vitaminas B'],
  },
  {
    id: 'crossfit',
    name: 'CrossFit',
    category: 'Funcional',
    description: 'Entrenamiento funcional de alta intensidad',
    proteinMultiplier: 2.5,
    carbMultiplier: 7.0, // Alto por intensidad
    fatPercentage: 25,
    calorieAdjustment: 20,
    hydrationMultiplier: 50,
    keyNutrients: ['Electrolitos', 'Antioxidantes', 'Vitamina C', 'Hierro'],
  },
  {
    id: 'swimming',
    name: 'Natación',
    category: 'Resistencia',
    description: 'Deporte acuático de resistencia cardiovascular',
    proteinMultiplier: 2.2,
    carbMultiplier: 8.0, // Muy alto por gasto energético
    fatPercentage: 25,
    calorieAdjustment: 25,
    hydrationMultiplier: 55,
    keyNutrients: ['Hierro', 'Vitamina B12', 'Magnesio', 'Potasio'],
  },
  {
    id: 'running',
    name: 'Running/Atletismo',
    category: 'Resistencia',
    description: 'Carreras de media y larga distancia',
    proteinMultiplier: 2.0,
    carbMultiplier: 8.5, // Máximo para resistencia
    fatPercentage: 20,
    calorieAdjustment: 20,
    hydrationMultiplier: 50,
    keyNutrients: ['Hierro', 'Vitaminas B', 'Antioxidantes', 'Electrolitos'],
  },
  {
    id: 'cycling',
    name: 'Ciclismo',
    category: 'Resistencia',
    description: 'Ciclismo de ruta y montaña',
    proteinMultiplier: 2.2,
    carbMultiplier: 8.0,
    fatPercentage: 25,
    calorieAdjustment: 22,
    hydrationMultiplier: 55,
    keyNutrients: ['Sodio', 'Potasio', 'Magnesio', 'Vitamina E'],
  },
  {
    id: 'soccer',
    name: 'Fútbol',
    category: 'Deportes de equipo',
    description: 'Deporte de equipo con sprints y resistencia',
    proteinMultiplier: 2.3,
    carbMultiplier: 6.5,
    fatPercentage: 25,
    calorieAdjustment: 15,
    hydrationMultiplier: 45,
    keyNutrients: ['Potasio', 'Sodio', 'Vitamina C', 'Hierro'],
  },
  {
    id: 'basketball',
    name: 'Baloncesto',
    category: 'Deportes de equipo',
    description: 'Deporte de alta intensidad con saltos y sprints',
    proteinMultiplier: 2.4,
    carbMultiplier: 6.0,
    fatPercentage: 25,
    calorieAdjustment: 18,
    hydrationMultiplier: 45,
    keyNutrients: ['Calcio', 'Vitamina D', 'Potasio', 'Magnesio'],
  },
  {
    id: 'tennis',
    name: 'Tenis',
    category: 'Deportes de raqueta',
    description: 'Deporte de explosividad y resistencia intermitente',
    proteinMultiplier: 2.2,
    carbMultiplier: 6.0,
    fatPercentage: 25,
    calorieAdjustment: 15,
    hydrationMultiplier: 50,
    keyNutrients: ['Potasio', 'Magnesio', 'Vitamina C', 'Sodio'],
  },
  {
    id: 'martial-arts',
    name: 'Artes Marciales/MMA',
    category: 'Combate',
    description: 'Deportes de combate con alta demanda física',
    proteinMultiplier: 2.6,
    carbMultiplier: 6.0,
    fatPercentage: 25,
    calorieAdjustment: 18,
    hydrationMultiplier: 50,
    keyNutrients: ['Hierro', 'Zinc', 'Vitaminas B', 'Antioxidantes'],
  },
  {
    id: 'casual',
    name: 'Actividad física casual',
    category: 'General',
    description: 'Ejercicio ocasional, caminatas, gym casual sin deporte específico',
    proteinMultiplier: 2.2,
    carbMultiplier: 4.5,
    fatPercentage: 25,
    calorieAdjustment: 0,
    hydrationMultiplier: 35,
    keyNutrients: ['Vitaminas generales', 'Minerales básicos'],
  },
  {
    id: 'none',
    name: 'No hago ningún deporte o actividad física',
    category: 'General',
    description: 'Estilo de vida sedentario, sin ejercicio regular',
    proteinMultiplier: 2.0,
    carbMultiplier: 4.0,
    fatPercentage: 25,
    calorieAdjustment: 0,
    hydrationMultiplier: 30,
    keyNutrients: ['Vitaminas básicas', 'Minerales esenciales'],
  }
];

export const getSportProfile = (sportId: string): SportProfile | null => {
  return sportsDatabase.find(sport => sport.id === sportId) || null;
};

export const getSportsByCategory = () => {
  const categories: { [key: string]: SportProfile[] } = {};
  sportsDatabase.forEach(sport => {
    if (!categories[sport.category]) {
      categories[sport.category] = [];
    }
    categories[sport.category].push(sport);
  });
  return categories;
};