# MacroLift - Aplicación de Nutrición y Fitness

Una aplicación completa de seguimiento nutricional que te ayuda a mantener una alimentación saludable y alcanzar tus objetivos de fitness. Desarrollada con React, TypeScript y Tailwind CSS.

## 🌐 Demo en vivo
[Ver aplicación](https://flourishing-cranachan-4f54c2.netlify.app)

## Características

- ✅ Cálculo de BMR y TDEE con ecuaciones científicas (Mifflin-St Jeor)
- ✅ Seguimiento detallado de macronutrientes y micronutrientes
- ✅ Base de datos extensa de alimentos con información nutricional
- ✅ Registro de comidas por tiempo (desayuno, almuerzo, cena)
- ✅ Centro educativo con información nutricional científicamente respaldada
- ✅ Acceso a trabajo de grado con fundamentos teóricos
- ✅ Interfaz moderna y responsive
- ✅ Almacenamiento local de datos

## 🇨🇴 Alimentos Colombianos

La aplicación incluye una extensa base de datos de alimentos colombianos con información nutricional precisa:

- **Arepas**: Blanca, amarilla, con queso
- **Embutidos**: Salchichas, mortadela, jamones, etc.
- **Bebidas**: Jugos naturales, gaseosas, bebidas energéticas
- **Café**: Negro, con leche
- **Chocolate**: De mesa, negro 70%
- **Pan**: Blanco, integral, de yuca
- **Pasta**: Seca y cocida

## Tecnologías utilizadas

- **React + TypeScript**: Framework principal con tipado estático
- **Tailwind CSS**: Estilos utilitarios para diseño responsive
- **Lucide React**: Iconografía moderna y consistente
- **Vite**: Herramienta de desarrollo rápida
- **LocalStorage**: Persistencia de datos en el navegador

## Instalación y uso

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd macrolift
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 📱 Uso de la aplicación

1. **Configuración inicial**: Completa tu perfil con datos personales y objetivos
2. **Seguimiento diario**: Registra tus comidas y monitorea macronutrientes
3. **Análisis nutricional**: Revisa tu progreso y ajusta tu alimentación
4. **Educación**: Aprende sobre nutrición en el centro educativo

## Funcionalidades principales

### Perfil de usuario
- Configuración de datos personales (edad, peso, altura, género)
- Selección de nivel de actividad física
- Definición de objetivos (perder, mantener o ganar peso)

### Seguimiento nutricional
- Cálculo automático de necesidades calóricas diarias
- Monitoreo de macronutrientes (proteínas, carbohidratos, grasas)
- Seguimiento de micronutrientes y vitaminas
- Visualización de progreso con barras de progreso interactivas

### Registro de comidas
- Base de datos con más de 15 alimentos comunes
- Información nutricional para alimentos crudos y cocidos
- Sistema de porciones intuitivo (gramos, palma, puño, etc.)
- Organización por comidas del día

### Centro educativo
- Información sobre macronutrientes y sus funciones
- Guías sobre micronutrientes esenciales
- Conceptos de hidratación y metabolismo
- Contenido científicamente respaldado

## 🏗️ Arquitectura del proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── UserProfileForm.tsx
│   ├── NutritionDashboard.tsx
│   ├── NutritionTracker.tsx
│   ├── MealLogger.tsx
│   ├── EducationCenter.tsx
│   └── ProfileSettings.tsx
├── data/               # Base de datos de alimentos
│   ├── completeFoodDatabase.ts
│   ├── sportsDatabase.ts
│   └── foodDatabase.ts
├── hooks/              # Hooks personalizados
│   └── useNutritionTracker.ts
├── types/              # Definiciones TypeScript
│   └── index.ts
├── utils/              # Funciones utilitarias
│   └── calculations.ts
└── styles/             # Estilos CSS (Tailwind)
```

## 🧪 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
npm run lint     # Linter de código
```

## Estructura del proyecto

```
src/
├── components/          # Componentes React
├── data/               # Base de datos de alimentos
├── hooks/              # Hooks personalizados
├── types/              # Definiciones de TypeScript
├── utils/              # Funciones utilitarias
└── styles/             # Estilos CSS
```

## Fundamentos científicos

La aplicación utiliza:
- **Ecuación de Mifflin-St Jeor** para cálculo de metabolismo basal
- **Factores de actividad validados** para TDEE
- **Recomendaciones nutricionales** basadas en evidencia científica
- **Base de datos nutricional** con valores precisos

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Fuentes de datos

- **ICBF** (Instituto Colombiano de Bienestar Familiar)
- **Ministerio de Salud de Colombia**
- **USDA** (United States Department of Agriculture)
- **FAO** (Food and Agriculture Organization)
- **Etiquetas nutricionales colombianas**

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactar.

## Contribución

Este proyecto forma parte de un trabajo de grado en nutrición y está abierto a contribuciones que mejoren la precisión científica y la experiencia del usuario.

## Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la comunidad colombiana**