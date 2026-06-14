// Re-exportar la base de datos completa como la principal
export { 
  completeFoodDatabase as foodDatabase,
  searchFoods,
  getFoodsByCategory,
  getAllCategories,
  getFoodById,
  databaseStats
} from './completeFoodDatabase';

// Mantener las porciones existentes para compatibilidad
export const portionSizes = {
  'palma': 85, // gramos
  'puño': 30, // gramos
  'cucharada': 15, // gramos/ml
  'cucharadita': 5, // gramos/ml
  'taza': 240, // ml
  'onza': 28, // gramos
  'gramos': 1,
  'ml': 1
};