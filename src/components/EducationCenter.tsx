import React, { useState } from 'react';
import { Book, ChevronRight, Heart, Zap, Shield, Eye, Atom, Droplets } from 'lucide-react';

export function EducationCenter() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

  const topics = [
    {
      id: 'macronutrients',
      title: 'Macronutrientes',
      icon: Zap,
      color: 'bg-purple-900 border-purple-700',
      description: 'Proteínas, carbohidratos y grasas: los pilares de la nutrición',
      content: {
        proteins: {
          title: 'Proteínas',
          description: 'Las proteínas son macronutrientes esenciales para el crecimiento, reparación y mantenimiento de los tejidos corporales.',
          functions: [
            'Construcción y reparación de músculos',
            'Producción de enzimas y hormonas',
            'Mantenimiento del sistema inmunológico',
            'Transporte de nutrientes'
          ],
          sources: ['Carnes magras', 'Pescado', 'Huevos', 'Legumbres', 'Frutos secos', 'Lácteos'],
          dailyNeeds: 'Se recomienda 0.8-2.2g por kg de peso corporal según el nivel de actividad'
        },
        carbs: {
          title: 'Carbohidratos',
          description: 'Los carbohidratos son la principal fuente de energía para el cuerpo y el cerebro.',
          functions: [
            'Provisión de energía inmediata',
            'Combustible para el cerebro',
            'Mantenimiento de la función muscular',
            'Regulación del metabolismo'
          ],
          sources: ['Cereales integrales', 'Frutas', 'Verduras', 'Legumbres', 'Tubérculos'],
          dailyNeeds: '45-65% de las calorías totales diarias'
        },
        fats: {
          title: 'Grasas',
          description: 'Las grasas son nutrientes esenciales para múltiples funciones corporales.',
          functions: [
            'Absorción de vitaminas liposolubles',
            'Producción de hormonas',
            'Aislamiento térmico',
            'Protección de órganos'
          ],
          sources: ['Aceite de oliva', 'Aguacate', 'Frutos secos', 'Pescado graso', 'Semillas'],
          dailyNeeds: '20-35% de las calorías totales diarias'
        }
      }
    },
    {
      id: 'micronutrients',
      title: 'Micronutrientes',
      icon: Atom,
      color: 'bg-pink-900 border-pink-700',
      description: 'Vitaminas y minerales esenciales para el funcionamiento óptimo del organismo',
      content: {
        vitamins: {
          title: 'Vitaminas',
          description: 'Compuestos orgánicos esenciales que el cuerpo necesita en pequeñas cantidades para funcionar correctamente.',
          subcategories: {
            liposoluble: {
              title: 'Vitaminas Liposolubles (A, D, E, K)',
              description: 'Se almacenan en el tejido graso y se absorben junto con las grasas dietéticas.',
              vitamins: {
                'A': {
                  name: 'Vitamina A (Retinol)',
                  functions: [
                    'Esencial para la visión nocturna y la salud ocular',
                    'Mantenimiento de la piel y mucosas',
                    'Función inmunológica',
                    'Crecimiento y desarrollo celular',
                    'Reproducción y desarrollo fetal'
                  ],
                  sources: [
                    'Hígado, pescado graso',
                    'Huevos, lácteos',
                    'Zanahorias, batatas',
                    'Espinacas, brócoli',
                    'Mango, melón'
                  ],
                  deficiency: [
                    'Ceguera nocturna',
                    'Piel seca y escamosa',
                    'Mayor susceptibilidad a infecciones',
                    'Retraso en el crecimiento'
                  ],
                  excess: [
                    'Náuseas y vómitos',
                    'Dolor de cabeza',
                    'Problemas hepáticos',
                    'Defectos de nacimiento'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '400 μg',
                    'Bebés (7-12 meses)': '500 μg',
                    'Niños (1-3 años)': '300 μg',
                    'Niños (4-8 años)': '400 μg',
                    'Niños (9-13 años)': '600 μg',
                    'Adolescentes (14-18 años)': '900 μg (H), 700 μg (M)',
                    'Adultos (19+ años)': '900 μg (H), 700 μg (M)',
                    'Embarazadas': '770 μg',
                    'Lactantes': '1300 μg'
                  },
                  absorption: 'Se absorbe mejor con grasas. Los carotenoides se convierten en vitamina A en el intestino.'
                },
                'D': {
                  name: 'Vitamina D (Calciferol)',
                  functions: [
                    'Absorción de calcio y fósforo',
                    'Salud ósea y dental',
                    'Función inmunológica',
                    'Regulación del crecimiento celular',
                    'Función muscular'
                  ],
                  sources: [
                    'Exposición solar (principal)',
                    'Pescados grasos (salmón, atún)',
                    'Huevos (yema)',
                    'Alimentos fortificados',
                    'Suplementos'
                  ],
                  deficiency: [
                    'Raquitismo en niños',
                    'Osteomalacia en adultos',
                    'Debilidad muscular',
                    'Mayor riesgo de fracturas',
                    'Fatiga y depresión'
                  ],
                  excess: [
                    'Hipercalcemia',
                    'Náuseas y vómitos',
                    'Debilidad',
                    'Problemas renales'
                  ],
                  dailyNeeds: {
                    'Bebés (0-12 meses)': '10 μg (400 UI)',
                    'Niños (1-18 años)': '15 μg (600 UI)',
                    'Adultos (19-70 años)': '15 μg (600 UI)',
                    'Adultos (71+ años)': '20 μg (800 UI)',
                    'Embarazadas/Lactantes': '15 μg (600 UI)'
                  },
                  absorption: 'Síntesis cutánea por exposición solar. Mejor absorción con grasas.'
                },
                'E': {
                  name: 'Vitamina E (Tocoferol)',
                  functions: [
                    'Potente antioxidante',
                    'Protección de membranas celulares',
                    'Función inmunológica',
                    'Prevención de la oxidación de grasas',
                    'Salud cardiovascular'
                  ],
                  sources: [
                    'Aceites vegetales',
                    'Frutos secos y semillas',
                    'Germen de trigo',
                    'Vegetales de hoja verde',
                    'Aguacate'
                  ],
                  deficiency: [
                    'Debilidad muscular',
                    'Problemas de coordinación',
                    'Daño a los nervios',
                    'Problemas de visión'
                  ],
                  excess: [
                    'Interferencia con coagulación',
                    'Aumento del riesgo de sangrado',
                    'Náuseas'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '4 mg',
                    'Bebés (7-12 meses)': '5 mg',
                    'Niños (1-3 años)': '6 mg',
                    'Niños (4-8 años)': '7 mg',
                    'Niños (9-13 años)': '11 mg',
                    'Adolescentes/Adultos (14+ años)': '15 mg',
                    'Lactantes': '19 mg'
                  },
                  absorption: 'Se absorbe mejor con grasas. Sensible a la luz y el calor.'
                },
                'K': {
                  name: 'Vitamina K (Filoquinona)',
                  functions: [
                    'Coagulación sanguínea',
                    'Metabolismo óseo',
                    'Regulación del calcio',
                    'Salud cardiovascular',
                    'Función cerebral'
                  ],
                  sources: [
                    'Vegetales de hoja verde',
                    'Brócoli, coles de Bruselas',
                    'Aceites vegetales',
                    'Carne, huevos',
                    'Productos fermentados'
                  ],
                  deficiency: [
                    'Sangrado excesivo',
                    'Moretones fáciles',
                    'Debilidad ósea',
                    'Calcificación arterial'
                  ],
                  excess: [
                    'Raramente tóxico',
                    'Posible interferencia con anticoagulantes'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '2 μg',
                    'Bebés (7-12 meses)': '2.5 μg',
                    'Niños (1-3 años)': '30 μg',
                    'Niños (4-8 años)': '55 μg',
                    'Niños (9-13 años)': '60 μg',
                    'Adolescentes (14-18 años)': '75 μg',
                    'Adultos (19+ años)': '120 μg (H), 90 μg (M)',
                    'Embarazadas/Lactantes': '90 μg'
                  },
                  absorption: 'Producida por bacterias intestinales. Se absorbe mejor con grasas.'
                }
              }
            },
            hidrosoluble: {
              title: 'Vitaminas Hidrosolubles (Complejo B y C)',
              description: 'Se disuelven en agua y no se almacenan en el cuerpo, requieren reposición regular.',
              vitamins: {
                'B1': {
                  name: 'Vitamina B1 (Tiamina)',
                  functions: [
                    'Metabolismo de carbohidratos',
                    'Función nerviosa',
                    'Función muscular',
                    'Función cardíaca',
                    'Crecimiento y desarrollo'
                  ],
                  sources: [
                    'Cereales integrales',
                    'Legumbres',
                    'Carne de cerdo',
                    'Semillas de girasol',
                    'Levadura nutricional'
                  ],
                  deficiency: [
                    'Beriberi',
                    'Fatiga y debilidad',
                    'Problemas nerviosos',
                    'Confusión mental'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '0.2 mg',
                    'Bebés (7-12 meses)': '0.3 mg',
                    'Niños (1-3 años)': '0.5 mg',
                    'Niños (4-8 años)': '0.6 mg',
                    'Niños (9-13 años)': '0.9 mg',
                    'Adolescentes (14-18 años)': '1.2 mg (H), 1.0 mg (M)',
                    'Adultos (19+ años)': '1.2 mg (H), 1.1 mg (M)',
                    'Embarazadas': '1.4 mg',
                    'Lactantes': '1.4 mg'
                  }
                },
                'B2': {
                  name: 'Vitamina B2 (Riboflavina)',
                  functions: [
                    'Metabolismo energético',
                    'Salud ocular',
                    'Función celular',
                    'Antioxidante',
                    'Metabolismo de otras vitaminas'
                  ],
                  sources: [
                    'Lácteos',
                    'Huevos',
                    'Vegetales de hoja verde',
                    'Carne magra',
                    'Almendras'
                  ],
                  deficiency: [
                    'Grietas en labios y boca',
                    'Dermatitis',
                    'Fatiga',
                    'Sensibilidad a la luz'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '0.3 mg',
                    'Bebés (7-12 meses)': '0.4 mg',
                    'Niños (1-3 años)': '0.5 mg',
                    'Niños (4-8 años)': '0.6 mg',
                    'Niños (9-13 años)': '0.9 mg',
                    'Adolescentes (14-18 años)': '1.3 mg (H), 1.0 mg (M)',
                    'Adultos (19+ años)': '1.3 mg (H), 1.1 mg (M)',
                    'Embarazadas': '1.4 mg',
                    'Lactantes': '1.6 mg'
                  }
                },
                'B3': {
                  name: 'Vitamina B3 (Niacina)',
                  functions: [
                    'Metabolismo energético',
                    'Función del sistema nervioso',
                    'Salud de la piel',
                    'Síntesis de hormonas',
                    'Reparación del ADN'
                  ],
                  sources: [
                    'Carne, pescado, aves',
                    'Cereales integrales',
                    'Legumbres',
                    'Frutos secos',
                    'Café'
                  ],
                  deficiency: [
                    'Pelagra',
                    'Dermatitis',
                    'Diarrea',
                    'Demencia'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '2 mg',
                    'Bebés (7-12 meses)': '4 mg',
                    'Niños (1-3 años)': '6 mg',
                    'Niños (4-8 años)': '8 mg',
                    'Niños (9-13 años)': '12 mg',
                    'Adolescentes (14-18 años)': '16 mg (H), 14 mg (M)',
                    'Adultos (19+ años)': '16 mg (H), 14 mg (M)',
                    'Embarazadas': '18 mg',
                    'Lactantes': '17 mg'
                  }
                },
                'B6': {
                  name: 'Vitamina B6 (Piridoxina)',
                  functions: [
                    'Metabolismo de proteínas',
                    'Función cerebral',
                    'Síntesis de neurotransmisores',
                    'Función inmunológica',
                    'Formación de glóbulos rojos'
                  ],
                  sources: [
                    'Pescado, aves',
                    'Plátanos',
                    'Papas',
                    'Garbanzos',
                    'Cereales fortificados'
                  ],
                  deficiency: [
                    'Anemia',
                    'Dermatitis',
                    'Confusión',
                    'Depresión'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '0.1 mg',
                    'Bebés (7-12 meses)': '0.3 mg',
                    'Niños (1-3 años)': '0.5 mg',
                    'Niños (4-8 años)': '0.6 mg',
                    'Niños (9-13 años)': '1.0 mg',
                    'Adolescentes (14-18 años)': '1.3 mg (H), 1.2 mg (M)',
                    'Adultos (19-50 años)': '1.3 mg',
                    'Adultos (51+ años)': '1.7 mg (H), 1.5 mg (M)',
                    'Embarazadas': '1.9 mg',
                    'Lactantes': '2.0 mg'
                  }
                },
                'B12': {
                  name: 'Vitamina B12 (Cobalamina)',
                  functions: [
                    'Formación de glóbulos rojos',
                    'Función neurológica',
                    'Síntesis de ADN',
                    'Metabolismo de grasas y proteínas',
                    'Función cognitiva'
                  ],
                  sources: [
                    'Carne, pescado, aves',
                    'Lácteos',
                    'Huevos',
                    'Alimentos fortificados',
                    'Suplementos (veganos)'
                  ],
                  deficiency: [
                    'Anemia megaloblástica',
                    'Fatiga extrema',
                    'Problemas neurológicos',
                    'Depresión'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '0.4 μg',
                    'Bebés (7-12 meses)': '0.5 μg',
                    'Niños (1-3 años)': '0.9 μg',
                    'Niños (4-8 años)': '1.2 μg',
                    'Niños (9-13 años)': '1.8 μg',
                    'Adolescentes/Adultos (14+ años)': '2.4 μg',
                    'Embarazadas': '2.6 μg',
                    'Lactantes': '2.8 μg'
                  }
                },
                'C': {
                  name: 'Vitamina C (Ácido Ascórbico)',
                  functions: [
                    'Síntesis de colágeno',
                    'Potente antioxidante',
                    'Absorción de hierro',
                    'Función inmunológica',
                    'Cicatrización de heridas'
                  ],
                  sources: [
                    'Cítricos',
                    'Fresas, kiwi',
                    'Pimientos',
                    'Brócoli',
                    'Tomates'
                  ],
                  deficiency: [
                    'Escorbuto',
                    'Fatiga',
                    'Sangrado de encías',
                    'Cicatrización lenta'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '40 mg',
                    'Bebés (7-12 meses)': '50 mg',
                    'Niños (1-3 años)': '15 mg',
                    'Niños (4-8 años)': '25 mg',
                    'Niños (9-13 años)': '45 mg',
                    'Adolescentes (14-18 años)': '75 mg (H), 65 mg (M)',
                    'Adultos (19+ años)': '90 mg (H), 75 mg (M)',
                    'Embarazadas': '85 mg',
                    'Lactantes': '120 mg',
                    'Fumadores': '+35 mg adicionales'
                  }
                },
                'Folato': {
                  name: 'Folato (Ácido Fólico)',
                  functions: [
                    'Síntesis de ADN',
                    'Formación de glóbulos rojos',
                    'Desarrollo fetal',
                    'Función cerebral',
                    'Metabolismo de aminoácidos'
                  ],
                  sources: [
                    'Vegetales de hoja verde',
                    'Legumbres',
                    'Cereales fortificados',
                    'Cítricos',
                    'Aguacate'
                  ],
                  deficiency: [
                    'Anemia megaloblástica',
                    'Defectos del tubo neural',
                    'Fatiga',
                    'Problemas de memoria'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '65 μg',
                    'Bebés (7-12 meses)': '80 μg',
                    'Niños (1-3 años)': '150 μg',
                    'Niños (4-8 años)': '200 μg',
                    'Niños (9-13 años)': '300 μg',
                    'Adolescentes/Adultos (14+ años)': '400 μg',
                    'Embarazadas': '600 μg',
                    'Lactantes': '500 μg'
                  }
                }
              }
            }
          }
        },
        minerals: {
          title: 'Minerales',
          description: 'Elementos inorgánicos esenciales que el cuerpo necesita para múltiples funciones vitales.',
          subcategories: {
            macrominerals: {
              title: 'Macrominerales',
              description: 'Minerales que el cuerpo necesita en cantidades mayores (más de 100mg/día).',
              minerals: {
                'Calcio': {
                  functions: [
                    'Formación y mantenimiento de huesos y dientes',
                    'Contracción muscular',
                    'Coagulación sanguínea',
                    'Transmisión nerviosa',
                    'Regulación hormonal'
                  ],
                  sources: [
                    'Lácteos (leche, yogur, queso)',
                    'Vegetales de hoja verde',
                    'Sardinas con huesos',
                    'Almendras',
                    'Tofu fortificado'
                  ],
                  deficiency: [
                    'Osteoporosis',
                    'Raquitismo en niños',
                    'Calambres musculares',
                    'Entumecimiento en dedos'
                  ],
                  excess: [
                    'Cálculos renales',
                    'Interferencia con absorción de otros minerales',
                    'Estreñimiento'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '200 mg',
                    'Bebés (7-12 meses)': '260 mg',
                    'Niños (1-3 años)': '700 mg',
                    'Niños (4-8 años)': '1000 mg',
                    'Niños (9-13 años)': '1300 mg',
                    'Adolescentes (14-18 años)': '1300 mg',
                    'Adultos (19-50 años)': '1000 mg',
                    'Adultos (51+ años)': '1200 mg',
                    'Embarazadas/Lactantes (≤18 años)': '1300 mg',
                    'Embarazadas/Lactantes (19+ años)': '1000 mg'
                  },
                  absorption: 'Mejor absorción con vitamina D. Inhibida por oxalatos y fitatos.'
                },
                'Fósforo': {
                  functions: [
                    'Formación de huesos y dientes',
                    'Almacenamiento de energía (ATP)',
                    'Función celular',
                    'Equilibrio ácido-base',
                    'Síntesis de proteínas'
                  ],
                  sources: [
                    'Carnes, pescado, aves',
                    'Lácteos',
                    'Frutos secos',
                    'Cereales integrales',
                    'Legumbres'
                  ],
                  deficiency: [
                    'Debilidad ósea',
                    'Fatiga',
                    'Pérdida de apetito',
                    'Dolor óseo'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '100 mg',
                    'Bebés (7-12 meses)': '275 mg',
                    'Niños (1-3 años)': '460 mg',
                    'Niños (4-8 años)': '500 mg',
                    'Niños (9-18 años)': '1250 mg',
                    'Adultos (19+ años)': '700 mg',
                    'Embarazadas/Lactantes': '700 mg'
                  }
                },
                'Magnesio': {
                  functions: [
                    'Función muscular y nerviosa',
                    'Regulación del ritmo cardíaco',
                    'Metabolismo energético',
                    'Síntesis de proteínas',
                    'Control de glucosa'
                  ],
                  sources: [
                    'Vegetales de hoja verde',
                    'Frutos secos y semillas',
                    'Cereales integrales',
                    'Legumbres',
                    'Chocolate negro'
                  ],
                  deficiency: [
                    'Calambres musculares',
                    'Fatiga',
                    'Arritmias cardíacas',
                    'Pérdida de apetito'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '30 mg',
                    'Bebés (7-12 meses)': '75 mg',
                    'Niños (1-3 años)': '80 mg',
                    'Niños (4-8 años)': '130 mg',
                    'Niños (9-13 años)': '240 mg',
                    'Adolescentes (14-18 años)': '410 mg (H), 360 mg (M)',
                    'Adultos (19-30 años)': '400 mg (H), 310 mg (M)',
                    'Adultos (31+ años)': '420 mg (H), 320 mg (M)',
                    'Embarazadas': '350-400 mg',
                    'Lactantes': '310-360 mg'
                  }
                },
                'Potasio': {
                  functions: [
                    'Equilibrio de fluidos',
                    'Función muscular',
                    'Transmisión nerviosa',
                    'Regulación de la presión arterial',
                    'Función cardíaca'
                  ],
                  sources: [
                    'Plátanos',
                    'Papas',
                    'Tomates',
                    'Naranjas',
                    'Espinacas'
                  ],
                  deficiency: [
                    'Debilidad muscular',
                    'Fatiga',
                    'Calambres',
                    'Arritmias cardíacas'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '400 mg',
                    'Bebés (7-12 meses)': '860 mg',
                    'Niños (1-3 años)': '2000 mg',
                    'Niños (4-8 años)': '2300 mg',
                    'Niños (9-13 años)': '2500 mg (H), 2300 mg (M)',
                    'Adolescentes (14-18 años)': '3000 mg (H), 2300 mg (M)',
                    'Adultos (19+ años)': '3400 mg (H), 2600 mg (M)',
                    'Embarazadas/Lactantes': '2900 mg'
                  }
                },
                'Sodio': {
                  functions: [
                    'Equilibrio de fluidos',
                    'Transmisión nerviosa',
                    'Contracción muscular',
                    'Regulación de la presión arterial'
                  ],
                  sources: [
                    'Sal de mesa',
                    'Alimentos procesados',
                    'Quesos',
                    'Embutidos',
                    'Salsas'
                  ],
                  excess: [
                    'Hipertensión arterial',
                    'Retención de líquidos',
                    'Sobrecarga cardíaca',
                    'Pérdida de calcio'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '120 mg',
                    'Bebés (7-12 meses)': '370 mg',
                    'Niños (1-3 años)': '1000 mg',
                    'Niños (4-8 años)': '1200 mg',
                    'Niños (9-13 años)': '1500 mg',
                    'Adolescentes/Adultos (14+ años)': '1500 mg',
                    'Límite máximo': '2300 mg (1 cucharadita de sal)'
                  }
                }
              }
            },
            microminerals: {
              title: 'Oligoelementos',
              description: 'Minerales que el cuerpo necesita en pequeñas cantidades (menos de 100mg/día).',
              minerals: {
                'Hierro': {
                  functions: [
                    'Transporte de oxígeno (hemoglobina)',
                    'Metabolismo energético',
                    'Función inmunológica',
                    'Desarrollo cognitivo',
                    'Síntesis de colágeno'
                  ],
                  sources: [
                    'Carnes rojas',
                    'Pescado, aves',
                    'Legumbres',
                    'Espinacas',
                    'Cereales fortificados'
                  ],
                  deficiency: [
                    'Anemia ferropénica',
                    'Fatiga extrema',
                    'Palidez',
                    'Uñas quebradizas',
                    'Síndrome de piernas inquietas'
                  ],
                  excess: [
                    'Hemocromatosis',
                    'Daño hepático',
                    'Problemas cardíacos',
                    'Diabetes'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '0.27 mg',
                    'Bebés (7-12 meses)': '11 mg',
                    'Niños (1-3 años)': '7 mg',
                    'Niños (4-8 años)': '10 mg',
                    'Niños (9-13 años)': '8 mg',
                    'Adolescentes (14-18 años)': '11 mg (H), 15 mg (M)',
                    'Adultos (19-50 años)': '8 mg (H), 18 mg (M)',
                    'Adultos (51+ años)': '8 mg',
                    'Embarazadas': '27 mg',
                    'Lactantes': '9-10 mg'
                  },
                  absorption: 'Hierro hemo (carnes) se absorbe mejor. Vitamina C mejora absorción.'
                },
                'Zinc': {
                  functions: [
                    'Función inmunológica',
                    'Cicatrización de heridas',
                    'Síntesis de proteínas',
                    'Función reproductiva',
                    'Sentido del gusto y olfato'
                  ],
                  sources: [
                    'Carnes rojas',
                    'Mariscos (ostras)',
                    'Semillas de calabaza',
                    'Legumbres',
                    'Frutos secos'
                  ],
                  deficiency: [
                    'Retraso en cicatrización',
                    'Pérdida de apetito',
                    'Problemas inmunológicos',
                    'Pérdida de cabello'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '2 mg',
                    'Bebés (7-12 meses)': '3 mg',
                    'Niños (1-3 años)': '3 mg',
                    'Niños (4-8 años)': '5 mg',
                    'Niños (9-13 años)': '8 mg',
                    'Adolescentes (14-18 años)': '11 mg (H), 9 mg (M)',
                    'Adultos (19+ años)': '11 mg (H), 8 mg (M)',
                    'Embarazadas': '11-12 mg',
                    'Lactantes': '12-13 mg'
                  }
                },
                'Selenio': {
                  functions: [
                    'Función antioxidante',
                    'Función tiroidea',
                    'Función inmunológica',
                    'Reproducción',
                    'Síntesis de ADN'
                  ],
                  sources: [
                    'Nueces de Brasil',
                    'Mariscos',
                    'Carnes',
                    'Huevos',
                    'Cereales integrales'
                  ],
                  deficiency: [
                    'Debilidad muscular',
                    'Problemas cardíacos',
                    'Problemas tiroideos',
                    'Infertilidad'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '15 μg',
                    'Bebés (7-12 meses)': '20 μg',
                    'Niños (1-3 años)': '20 μg',
                    'Niños (4-8 años)': '30 μg',
                    'Niños (9-13 años)': '40 μg',
                    'Adolescentes/Adultos (14+ años)': '55 μg',
                    'Embarazadas': '60 μg',
                    'Lactantes': '70 μg'
                  }
                },
                'Yodo': {
                  functions: [
                    'Síntesis de hormonas tiroideas',
                    'Regulación del metabolismo',
                    'Desarrollo cerebral',
                    'Crecimiento',
                    'Regulación de temperatura'
                  ],
                  sources: [
                    'Sal yodada',
                    'Mariscos',
                    'Algas marinas',
                    'Lácteos',
                    'Huevos'
                  ],
                  deficiency: [
                    'Bocio',
                    'Hipotiroidismo',
                    'Retraso mental (cretinismo)',
                    'Fatiga'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '110 μg',
                    'Bebés (7-12 meses)': '130 μg',
                    'Niños (1-8 años)': '90 μg',
                    'Niños (9-13 años)': '120 μg',
                    'Adolescentes/Adultos (14+ años)': '150 μg',
                    'Embarazadas': '220 μg',
                    'Lactantes': '290 μg'
                  }
                },
                'Cobre': {
                  functions: [
                    'Formación de glóbulos rojos',
                    'Mantenimiento de vasos sanguíneos',
                    'Función inmunológica',
                    'Metabolismo del hierro',
                    'Síntesis de colágeno'
                  ],
                  sources: [
                    'Mariscos',
                    'Frutos secos',
                    'Semillas',
                    'Chocolate negro',
                    'Vísceras'
                  ],
                  deficiency: [
                    'Anemia',
                    'Problemas óseos',
                    'Problemas cardiovasculares',
                    'Pérdida de pigmentación'
                  ],
                  dailyNeeds: {
                    'Bebés (0-6 meses)': '200 μg',
                    'Bebés (7-12 meses)': '220 μg',
                    'Niños (1-3 años)': '340 μg',
                    'Niños (4-8 años)': '440 μg',
                    'Niños (9-13 años)': '700 μg',
                    'Adolescentes/Adultos (14+ años)': '900 μg',
                    'Embarazadas': '1000 μg',
                    'Lactantes': '1300 μg'
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      id: 'hydration',
      title: 'Hidratación',
      icon: Droplets,
      color: 'bg-blue-900 border-blue-700',
      description: 'La importancia del agua para la salud y el rendimiento',
      content: {
        importance: {
          title: 'Importancia de la hidratación',
          description: 'El agua representa aproximadamente el 60% del peso corporal y es esencial para la vida.',
          functions: [
            'Regulación de la temperatura corporal',
            'Transporte de nutrientes',
            'Eliminación de desechos',
            'Lubricación de articulaciones',
            'Mantenimiento de la presión arterial'
          ]
        },
        needs: {
          title: 'Necesidades hídricas por edad',
          description: 'Las necesidades de agua varían significativamente según la edad, actividad y condiciones ambientales.',
          dailyNeeds: {
            'Bebés (0-6 meses)': '0.7 L (principalmente leche materna/fórmula)',
            'Bebés (7-12 meses)': '0.8 L (incluye leche + agua)',
            'Niños (1-3 años)': '1.3 L',
            'Niños (4-8 años)': '1.7 L',
            'Niños (9-13 años)': '2.4 L (H), 2.1 L (M)',
            'Adolescentes (14-18 años)': '3.3 L (H), 2.3 L (M)',
            'Adultos (19+ años)': '3.7 L (H), 2.7 L (M)',
            'Embarazadas': '3.0 L',
            'Lactantes': '3.8 L'
          },
          factors: [
            'Edad y sexo',
            'Nivel de actividad física',
            'Clima y temperatura',
            'Estado de salud',
            'Embarazo y lactancia',
            'Altitud',
            'Consumo de cafeína y alcohol'
          ],
          signs: {
            dehydration: [
              'Sed',
              'Orina oscura',
              'Fatiga',
              'Mareos',
              'Piel seca'
            ],
            overhydration: [
              'Náuseas',
              'Dolor de cabeza',
              'Confusión',
              'Calambres musculares'
            ]
          }
        }
      }
    },
    {
      id: 'metabolism',
      title: 'Metabolismo',
      icon: Eye,
      color: 'bg-green-900 border-green-700',
      description: 'Cómo el cuerpo procesa y utiliza la energía',
      content: {
        bmr: {
          title: 'Metabolismo Basal (BMR)',
          description: 'La cantidad mínima de energía necesaria para mantener las funciones vitales en reposo.',
          factors: [
            'Edad: disminuye con la edad',
            'Sexo: generalmente mayor en hombres',
            'Peso y composición corporal',
            'Genética',
            'Hormonas tiroideas'
          ]
        },
        tdee: {
          title: 'Gasto Energético Total (TDEE)',
          description: 'La cantidad total de calorías que quemas en un día.',
          components: [
            'Metabolismo basal (60-75%)',
            'Actividad física (15-30%)',
            'Efecto térmico de los alimentos (8-10%)',
            'Termogénesis sin ejercicio (15-20%)'
          ]
        }
      }
    }
  ];

  const selectedTopicData = topics.find(t => t.id === selectedTopic);

  const renderVitaminDetail = (vitaminKey: string, vitamin: any) => (
    <div key={vitaminKey} className="bg-gray-700 rounded-lg p-6 space-y-4">
      <h4 className="text-lg font-semibold text-white">{vitamin.name}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium text-pink-300 mb-2">Funciones principales:</h5>
          <ul className="space-y-1">
            {vitamin.functions.map((func: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {func}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-pink-300 mb-2">Fuentes alimentarias:</h5>
          <ul className="space-y-1">
            {vitamin.sources.map((source: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {source}</li>
            ))}
          </ul>
        </div>
      </div>

      {vitamin.deficiency && (
        <div>
          <h5 className="font-medium text-red-300 mb-2">Síntomas de deficiencia:</h5>
          <ul className="space-y-1">
            {vitamin.deficiency.map((symptom: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {symptom}</li>
            ))}
          </ul>
        </div>
      )}

      {vitamin.excess && (
        <div>
          <h5 className="font-medium text-yellow-300 mb-2">Riesgos por exceso:</h5>
          <ul className="space-y-1">
            {vitamin.excess.map((risk: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {risk}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="p-3 bg-purple-900 bg-opacity-50 rounded-lg">
          <h5 className="font-medium text-purple-200 mb-2">Necesidades diarias por edad:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {Object.entries(vitamin.dailyNeeds).map(([age, need]) => (
              <div key={age} className="text-purple-200">
                <strong>{age}:</strong> {need}
              </div>
            ))}
          </div>
        </div>
        {vitamin.absorption && (
          <div className="p-3 bg-blue-900 bg-opacity-50 rounded-lg">
            <p className="text-sm text-blue-200">
              <strong>Absorción:</strong> {vitamin.absorption}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMineralDetail = (mineralKey: string, mineral: any) => (
    <div key={mineralKey} className="bg-gray-700 rounded-lg p-6 space-y-4">
      <h4 className="text-lg font-semibold text-white">{mineralKey}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium text-indigo-300 mb-2">Funciones principales:</h5>
          <ul className="space-y-1">
            {mineral.functions.map((func: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {func}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-indigo-300 mb-2">Fuentes alimentarias:</h5>
          <ul className="space-y-1">
            {mineral.sources.map((source: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {source}</li>
            ))}
          </ul>
        </div>
      </div>

      {mineral.deficiency && (
        <div>
          <h5 className="font-medium text-red-300 mb-2">Síntomas de deficiencia:</h5>
          <ul className="space-y-1">
            {mineral.deficiency.map((symptom: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {symptom}</li>
            ))}
          </ul>
        </div>
      )}

      {mineral.excess && (
        <div>
          <h5 className="font-medium text-yellow-300 mb-2">Riesgos por exceso:</h5>
          <ul className="space-y-1">
            {mineral.excess.map((risk: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">• {risk}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="p-3 bg-purple-900 bg-opacity-50 rounded-lg">
          <h5 className="font-medium text-purple-200 mb-2">Necesidades diarias por edad:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {Object.entries(mineral.dailyNeeds).map(([age, need]) => (
              <div key={age} className="text-purple-200">
                <strong>{age}:</strong> {need}
              </div>
            ))}
          </div>
        </div>
        {mineral.absorption && (
          <div className="p-3 bg-blue-900 bg-opacity-50 rounded-lg">
            <p className="text-sm text-blue-200">
              <strong>Absorción:</strong> {mineral.absorption}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Book className="w-6 h-6 text-pink-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Centro Educativo</h2>
        </div>
        <p className="text-gray-300">
          Aprende sobre nutrición y alimentación saludable con información científicamente respaldada.
        </p>
      </div>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${topic.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <topic.icon className="w-8 h-8 mr-3 text-gray-300" />
                  <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-300">{topic.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <selectedTopicData.icon className="w-8 h-8 mr-3 text-gray-300" />
                <h2 className="text-2xl font-bold text-white">{selectedTopicData.title}</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setSelectedSubtopic(null);
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                Volver
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {selectedTopic === 'macronutrients' && (
              <div className="space-y-8">
                {Object.entries(selectedTopicData.content).map(([key, nutrient]) => (
                  <div key={key} className="border-l-4 border-pink-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{nutrient.title}</h3>
                    <p className="text-gray-300 mb-4">{nutrient.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-white mb-2">Funciones principales:</h4>
                        <ul className="space-y-1">
                          {nutrient.functions.map((func: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {func}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Fuentes alimentarias:</h4>
                        <ul className="space-y-1">
                          {nutrient.sources.map((source: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {source}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <strong>Recomendación diaria:</strong> {nutrient.dailyNeeds}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedTopic === 'micronutrients' && (
              <div className="space-y-8">
                {!selectedSubtopic ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(selectedTopicData.content).map(([key, section]) => (
                      <div
                        key={key}
                        onClick={() => setSelectedSubtopic(key)}
                        className="border-2 border-pink-700 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg bg-pink-900 bg-opacity-30"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-gray-300">{section.description}</p>
                      </div>
                    ))}
                  </div>
                ) : selectedSubtopic === 'vitamins' ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        {selectedTopicData.content[selectedSubtopic].title}
                      </h3>
                      <button
                        onClick={() => setSelectedSubtopic(null)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        Volver a micronutrientes
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      {selectedTopicData.content[selectedSubtopic].description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {Object.entries(selectedTopicData.content[selectedSubtopic].subcategories).map(([subKey, subcategory]) => (
                        <div
                          key={subKey}
                          onClick={() => setSelectedSubtopic(`vitamins-${subKey}`)}
                          className="border-2 border-purple-700 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg bg-purple-900 bg-opacity-30"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-white">{subcategory.title}</h4>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                          <p className="text-gray-300">{subcategory.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedSubtopic === 'minerals' ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        {selectedTopicData.content[selectedSubtopic].title}
                      </h3>
                      <button
                        onClick={() => setSelectedSubtopic(null)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        Volver a micronutrientes
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      {selectedTopicData.content[selectedSubtopic].description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {Object.entries(selectedTopicData.content[selectedSubtopic].subcategories).map(([subKey, subcategory]) => (
                        <div
                          key={subKey}
                          onClick={() => setSelectedSubtopic(`minerals-${subKey}`)}
                          className="border-2 border-indigo-700 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg bg-indigo-900 bg-opacity-30"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-white">{subcategory.title}</h4>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                          <p className="text-gray-300">{subcategory.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedSubtopic.startsWith('vitamins-') ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        {selectedTopicData.content.vitamins.subcategories[selectedSubtopic.replace('vitamins-', '')].title}
                      </h3>
                      <button
                        onClick={() => setSelectedSubtopic('vitamins')}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        Volver a vitaminas
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      {selectedTopicData.content.vitamins.subcategories[selectedSubtopic.replace('vitamins-', '')].description}
                    </p>
                    
                    <div className="space-y-6">
                      {Object.entries(selectedTopicData.content.vitamins.subcategories[selectedSubtopic.replace('vitamins-', '')].vitamins).map(([vitKey, vitamin]) =>
                        renderVitaminDetail(vitKey, vitamin)
                      )}
                    </div>
                  </div>
                ) : selectedSubtopic.startsWith('minerals-') ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        {selectedTopicData.content.minerals.subcategories[selectedSubtopic.replace('minerals-', '')].title}
                      </h3>
                      <button
                        onClick={() => setSelectedSubtopic('minerals')}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        Volver a minerales
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      {selectedTopicData.content.minerals.subcategories[selectedSubtopic.replace('minerals-', '')].description}
                    </p>
                    
                    <div className="space-y-6">
                      {Object.entries(selectedTopicData.content.minerals.subcategories[selectedSubtopic.replace('minerals-', '')].minerals).map(([minKey, mineral]) =>
                        renderMineralDetail(minKey, mineral)
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            
            {selectedTopic === 'hydration' && (
              <div className="space-y-8">
                {Object.entries(selectedTopicData.content).map(([key, section]) => (
                  <div key={key} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                    <p className="text-gray-300 mb-4">{section.description}</p>
                    
                    {section.functions && (
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Funciones:</h4>
                        <ul className="space-y-1">
                          {section.functions.map((func: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {func}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {section.dailyNeeds && (
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Necesidades diarias de agua:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(section.dailyNeeds).map(([age, need]) => (
                            <div key={age} className="text-gray-300 text-sm">
                              <strong>{age}:</strong> {need}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {section.factors && (
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Factores que influyen:</h4>
                        <ul className="space-y-1">
                          {section.factors.map((factor: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {section.signs && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-red-900 bg-opacity-30 rounded-lg">
                          <h5 className="font-medium text-red-300 mb-2">Signos de deshidratación:</h5>
                          <ul className="space-y-1">
                            {section.signs.dehydration.map((sign: string, idx: number) => (
                              <li key={idx} className="text-gray-300 text-sm">• {sign}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 bg-yellow-900 bg-opacity-30 rounded-lg">
                          <h5 className="font-medium text-yellow-300 mb-2">Signos de sobrehidratación:</h5>
                          <ul className="space-y-1">
                            {section.signs.overhydration.map((sign: string, idx: number) => (
                              <li key={idx} className="text-gray-300 text-sm">• {sign}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedTopic === 'metabolism' && (
              <div className="space-y-8">
                {Object.entries(selectedTopicData.content).map(([key, section]) => (
                  <div key={key} className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                    <p className="text-gray-300 mb-4">{section.description}</p>
                    
                    {section.factors && (
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Factores que influyen:</h4>
                        <ul className="space-y-1">
                          {section.factors.map((factor: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {section.components && (
                      <div className="mb-4">
                        <h4 className="font-medium text-white mb-2">Componentes:</h4>
                        <ul className="space-y-1">
                          {section.components.map((component: string, idx: number) => (
                            <li key={idx} className="text-gray-300 text-sm">• {component}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}