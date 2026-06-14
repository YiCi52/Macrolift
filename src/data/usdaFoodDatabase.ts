import { Food } from '../types';

// Mapeo de nutrientes USDA a nuestra estructura
const nutrientMapping: { [key: string]: keyof any } = {
  '208': 'calories',      // Energy (kcal)
  '203': 'protein',       // Protein
  '205': 'carbs',         // Carbohydrate, by difference
  '204': 'fat',           // Total lipid (fat)
  '291': 'fiber',         // Fiber, total dietary
  '269.3': 'sugar',       // Sugars, Total
  '307': 'sodium',        // Sodium, Na
  '306': 'potassium',     // Potassium, K
  '301': 'calcium',       // Calcium, Ca
  '303': 'iron',          // Iron, Fe
  '304': 'magnesium',     // Magnesium, Mg
  '309': 'zinc',          // Zinc, Zn
  '305': 'phosphorus',    // Phosphorus, P
  '320': 'vitaminA',      // Vitamin A, RAE
  '401': 'vitaminC',      // Vitamin C, total ascorbic acid
  '328': 'vitaminD',      // Vitamin D (D2 + D3)
  '323': 'vitaminE',      // Vitamin E (alpha-tocopherol)
  '430': 'vitaminK',      // Vitamin K (phylloquinone)
  '404': 'vitaminB1',     // Thiamin
  '405': 'vitaminB2',     // Riboflavin
  '406': 'vitaminB3',     // Niacin
  '415': 'vitaminB6',     // Vitamin B-6
  '418': 'vitaminB12',    // Vitamin B-12
  '417': 'folate',        // Folate, total
  '416': 'biotin'         // Biotin
};

// Categorías en español
const categoryMapping: { [key: string]: string } = {
  'Dairy and Egg Products': 'Lácteos y Huevos',
  'Spices and Herbs': 'Especias y Hierbas',
  'Baby Foods': 'Alimentos para Bebés',
  'Fats and Oils': 'Grasas y Aceites',
  'Poultry Products': 'Productos Avícolas',
  'Soups, Sauces, and Gravies': 'Sopas, Salsas y Caldos',
  'Sausages and Luncheon Meats': 'Embutidos y Fiambres',
  'Breakfast Cereals': 'Cereales para Desayuno',
  'Fruits and Fruit Juices': 'Frutas y Jugos',
  'Pork Products': 'Productos de Cerdo',
  'Vegetables and Vegetable Products': 'Vegetales',
  'Nut and Seed Products': 'Frutos Secos y Semillas',
  'Beef Products': 'Productos de Res',
  'Beverages': 'Bebidas',
  'Finfish and Shellfish Products': 'Pescados y Mariscos',
  'Legumes and Legume Products': 'Legumbres',
  'Lamb, Veal, and Game Products': 'Cordero, Ternera y Caza',
  'Baked Products': 'Productos Horneados',
  'Sweets': 'Dulces',
  'Cereal Grains and Pasta': 'Cereales y Pasta',
  'Fast Foods': 'Comida Rápida',
  'Meals, Entrees, and Side Dishes': 'Comidas Preparadas',
  'Snacks': 'Snacks',
  'American Indian/Alaska Native Foods': 'Comidas Nativas Americanas',
  'Restaurant Foods': 'Comida de Restaurante'
};

// Unidades específicas por tipo de alimento
const getCustomUnits = (description: string, category: string) => {
  const desc = description.toLowerCase();
  const units = [];

  // Huevos
  if (desc.includes('egg') || desc.includes('huevo')) {
    units.push(
      { name: '1 huevo pequeño', weight: 40, isDefault: false },
      { name: '1 huevo mediano', weight: 50, isDefault: true },
      { name: '1 huevo grande', weight: 60, isDefault: false },
      { name: '1 huevo extra grande', weight: 70, isDefault: false }
    );
  }

  // Frutas
  if (category === 'Frutas y Jugos' || desc.includes('apple') || desc.includes('banana') || desc.includes('orange')) {
    if (desc.includes('apple') || desc.includes('manzana')) {
      units.push(
        { name: '1 manzana pequeña', weight: 120, isDefault: false },
        { name: '1 manzana mediana', weight: 150, isDefault: true },
        { name: '1 manzana grande', weight: 200, isDefault: false }
      );
    }
    if (desc.includes('banana') || desc.includes('plátano')) {
      units.push(
        { name: '1 plátano pequeño', weight: 90, isDefault: false },
        { name: '1 plátano mediano', weight: 120, isDefault: true },
        { name: '1 plátano grande', weight: 150, isDefault: false }
      );
    }
    if (desc.includes('orange') || desc.includes('naranja')) {
      units.push(
        { name: '1 naranja mediana', weight: 130, isDefault: true },
        { name: '1 naranja grande', weight: 180, isDefault: false }
      );
    }
  }

  // Panes y productos horneados
  if (category === 'Productos Horneados' || desc.includes('bread') || desc.includes('pan')) {
    units.push(
      { name: '1 rebanada', weight: 25, isDefault: true },
      { name: '1 pieza pequeña', weight: 40, isDefault: false },
      { name: '1 pieza mediana', weight: 60, isDefault: false }
    );
  }

  // Lácteos
  if (category === 'Lácteos y Huevos') {
    if (desc.includes('milk') || desc.includes('leche')) {
      units.push(
        { name: '1 vaso (250ml)', weight: 250, isDefault: true },
        { name: '1 taza (240ml)', weight: 240, isDefault: false }
      );
    }
    if (desc.includes('yogurt') || desc.includes('yogur')) {
      units.push(
        { name: '1 envase individual', weight: 125, isDefault: true },
        { name: '1 taza', weight: 240, isDefault: false }
      );
    }
    if (desc.includes('cheese') || desc.includes('queso')) {
      units.push(
        { name: '1 rebanada', weight: 20, isDefault: true },
        { name: '1 cubo pequeño', weight: 15, isDefault: false },
        { name: '1 porción', weight: 30, isDefault: false }
      );
    }
  }

  // Carnes y pescados
  if (category === 'Productos Avícolas' || category === 'Productos de Res' || category === 'Pescados y Mariscos') {
    units.push(
      { name: '1 porción pequeña', weight: 85, isDefault: false },
      { name: '1 porción mediana', weight: 120, isDefault: true },
      { name: '1 porción grande', weight: 150, isDefault: false },
      { name: '1 filete', weight: 200, isDefault: false }
    );
  }

  // Vegetales
  if (category === 'Vegetales') {
    if (desc.includes('tomato') || desc.includes('tomate')) {
      units.push(
        { name: '1 tomate pequeño', weight: 80, isDefault: false },
        { name: '1 tomate mediano', weight: 120, isDefault: true },
        { name: '1 tomate grande', weight: 180, isDefault: false }
      );
    }
    if (desc.includes('carrot') || desc.includes('zanahoria')) {
      units.push(
        { name: '1 zanahoria mediana', weight: 80, isDefault: true },
        { name: '1 zanahoria grande', weight: 120, isDefault: false }
      );
    }
  }

  // Frutos secos
  if (category === 'Frutos Secos y Semillas') {
    units.push(
      { name: '1 puñado pequeño', weight: 15, isDefault: false },
      { name: '1 puñado mediano', weight: 30, isDefault: true },
      { name: '1 porción (1 oz)', weight: 28, isDefault: false }
    );
  }

  return units;
};

// Función para convertir datos USDA a nuestra estructura
export function convertUSDAFood(usdaFood: any): Food {
  const nutrients: any = {
    calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0,
    sodium: 0, potassium: 0, calcium: 0, iron: 0, magnesium: 0,
    zinc: 0, phosphorus: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0,
    vitaminE: 0, vitaminK: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0,
    vitaminB6: 0, vitaminB12: 0, folate: 0, biotin: 0
  };

  // Mapear nutrientes
  usdaFood.foodNutrients?.forEach((nutrient: any) => {
    const nutrientNumber = nutrient.nutrient.number;
    const mappedKey = nutrientMapping[nutrientNumber];
    
    if (mappedKey && nutrient.amount !== undefined) {
      let value = nutrient.amount;
      
      // Convertir unidades si es necesario
      if (nutrient.nutrient.unitName === 'µg') {
        value = value / 1000; // Convertir µg a mg
      }
      
      nutrients[mappedKey] = value;
    }
  });

  // Traducir nombre
  const translatedName = translateFoodName(usdaFood.description);
  
  // Obtener categoría en español
  const categoryKey = usdaFood.foodCategory?.description || 'Otros';
  const spanishCategory = categoryMapping[categoryKey] || 'Otros';

  // Obtener unidades personalizadas
  const customUnits = getCustomUnits(usdaFood.description, spanishCategory);

  // Crear ID único
  const id = `usda_${usdaFood.fdcId}`;

  return {
    id,
    name: translatedName,
    category: spanishCategory,
    nutritionRaw: nutrients,
    nutritionCooked: estimateCookedNutrition(nutrients), // Estimamos valores cocidos
    servingSize: 100,
    unit: 'g',
    customUnits: customUnits.length > 0 ? customUnits : undefined,
    source: 'USDA'
  };
}

// Función para traducir nombres de alimentos
function translateFoodName(description: string): string {
  const translations: { [key: string]: string } = {
    'Hummus, commercial': 'Hummus comercial',
    'Chicken, broilers or fryers, breast, meat only, cooked, roasted': 'Pechuga de pollo, cocida, asada',
    'Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled': 'Carne molida de res, 85% magra, hamburguesa, cocida',
    'Milk, reduced fat, fluid, 2% milkfat, with added vitamin A and vitamin D': 'Leche reducida en grasa, 2%',
    'Egg, whole, cooked, hard-boiled': 'Huevo entero, cocido, duro',
    'Apple, raw, with skin': 'Manzana cruda, con piel',
    'Banana, raw': 'Plátano crudo',
    'Broccoli, raw': 'Brócoli crudo',
    'Rice, white, long-grain, regular, cooked': 'Arroz blanco, grano largo, cocido',
    'Bread, white, commercially prepared': 'Pan blanco comercial',
    'Salmon, Atlantic, farmed, cooked, dry heat': 'Salmón atlántico, de granja, cocido'
  };

  return translations[description] || description;
}

// Función para estimar valores nutricionales cocidos
function estimateCookedNutrition(rawNutrition: any): any {
  const cooked = { ...rawNutrition };
  
  // Ajustes generales para cocción (pérdida de agua, concentración de nutrientes)
  const adjustments = {
    calories: 1.1,      // Ligero aumento por concentración
    protein: 1.0,       // Se mantiene
    carbs: 1.0,         // Se mantiene
    fat: 1.0,           // Se mantiene
    fiber: 0.9,         // Ligera pérdida
    vitaminC: 0.7,      // Pérdida significativa
    vitaminB1: 0.8,     // Pérdida moderada
    vitaminB2: 0.9,     // Pérdida ligera
    folate: 0.8,        // Pérdida moderada
    potassium: 0.9      // Ligera pérdida por lixiviación
  };

  Object.keys(adjustments).forEach(key => {
    if (cooked[key] !== undefined) {
      cooked[key] = cooked[key] * adjustments[key as keyof typeof adjustments];
    }
  });

  return cooked;
}

// Base de datos expandida con alimentos USDA comunes
export const expandedFoodDatabase: Food[] = [
  // Ejemplo de cómo se vería un alimento USDA convertido
  {
    id: 'usda_321358',
    name: 'Hummus comercial',
    category: 'Legumbres',
    nutritionRaw: {
      calories: 229,
      protein: 7.35,
      carbs: 14.9,
      fat: 17.1,
      fiber: 5.4,
      sugar: 0.34,
      sodium: 438,
      potassium: 289,
      calcium: 41,
      iron: 2.41,
      magnesium: 71.1,
      zinc: 1.38,
      phosphorus: 166,
      vitaminA: 1,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 1.74,
      vitaminK: 17.2,
      vitaminB1: 0.15,
      vitaminB2: 0.115,
      vitaminB3: 0.948,
      vitaminB6: 0.143,
      vitaminB12: 0,
      folate: 36,
      biotin: 0
    },
    nutritionCooked: {
      calories: 252,
      protein: 7.35,
      carbs: 14.9,
      fat: 17.1,
      fiber: 4.86,
      sugar: 0.34,
      sodium: 438,
      potassium: 260,
      calcium: 41,
      iron: 2.41,
      magnesium: 71.1,
      zinc: 1.38,
      phosphorus: 166,
      vitaminA: 1,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 1.74,
      vitaminK: 17.2,
      vitaminB1: 0.12,
      vitaminB2: 0.104,
      vitaminB3: 0.948,
      vitaminB6: 0.143,
      vitaminB12: 0,
      folate: 28.8,
      biotin: 0
    },
    servingSize: 100,
    unit: 'g',
    customUnits: [
      { name: '2 cucharadas', weight: 34, isDefault: true },
      { name: '1 cucharada', weight: 17, isDefault: false },
      { name: '1 porción (1/4 taza)', weight: 60, isDefault: false }
    ],
    source: 'USDA'
  }
];