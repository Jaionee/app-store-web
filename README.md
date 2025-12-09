# App Store Web - Proyecto Unificado

## Descripción General

Este es un proyecto web que funciona como una tienda de aplicaciones (App Store) construida con React, TypeScript y Vite. La aplicación principal muestra un catálogo de mini aplicaciones web, y cada una de estas mini apps está integrada como una ruta interna usando React Router, permitiendo navegación sin recargas de página (SPA - Single Page Application).

## Tecnologías Principales

- **React 19.2.0** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite 7.2.4** - Build tool y dev server
- **React Router DOM 7.10.1** - Enrutamiento SPA
- **Recharts 3.5.1** - Gráficos para QuantumTrade

## Estructura del Proyecto

```
d:\app-store-web\
├── src/
│   ├── components/          # Componentes compartidos de la app principal
│   │   ├── AppCard.tsx      # Tarjeta de presentación de cada app
│   │   ├── AppGrid.tsx      # Grid que muestra todas las apps disponibles
│   │   ├── Footer.tsx       # Footer de la página principal
│   │   ├── Hero.tsx         # Sección hero de la landing page
│   │   └── Navbar.tsx       # Barra de navegación
│   │
│   ├── pages/               # Páginas/rutas de la aplicación
│   │   ├── Home.tsx         # Página principal (landing page)
│   │   ├── CryptoTracker.tsx       # Wrapper para crypto tracker
│   │   ├── SubscriptionTracker.tsx # Wrapper para subscription tracker
│   │   └── QuantumTrade.tsx        # Wrapper para quantum trade
│   │
│   ├── features/            # Mini aplicaciones integradas
│   │   ├── crypto-tracker/
│   │   │   ├── components/  # Componentes específicos de crypto tracker
│   │   │   ├── services/    # Servicios API (CoinGecko)
│   │   │   ├── types.ts     # Tipos TypeScript
│   │   │   ├── App.tsx      # Componente principal
│   │   │   └── index.css    # Estilos específicos
│   │   │
│   │   ├── subscription-tracker/
│   │   │   ├── components/  # Componentes de subscription tracker
│   │   │   ├── types.ts     # Tipos TypeScript
│   │   │   ├── App.tsx      # Componente principal
│   │   │   └── index.css    # Estilos específicos
│   │   │
│   │   └── quantum-trade/
│   │       ├── components/  # Componentes de quantum trade
│   │       ├── utils/       # Utilidades (algoritmos, datos de mercado)
│   │       ├── App.tsx      # Componente principal
│   │       └── index.css    # Estilos específicos
│   │
│   ├── App.tsx              # Configuración de React Router
│   ├── main.tsx             # Entry point de la aplicación
│   └── index.css            # Estilos globales
│
├── public/                  # Archivos estáticos
├── index.html               # HTML principal con SEO meta tags
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración de TypeScript
├── vite.config.ts           # Configuración de Vite
└── README.md                # Este archivo
```

## Mini Aplicaciones Integradas

### 1. CryptoTrack (`/crypto-tracker`)
**Descripción:** Rastreador de portafolio de criptomonedas en tiempo real con tema Bitcoin.

**Características:**
- Agregar/eliminar activos cripto
- Seguimiento de precios en tiempo real (API CoinGecko)
- Cálculo de ganancias/pérdidas
- Persistencia en localStorage
- Auto-refresh cada 60 segundos

**Tecnologías:** React, TypeScript, CoinGecko API

### 2. SubTracker (`/subscription-tracker`)
**Descripción:** Gestor de gastos recurrentes y suscripciones.

**Características:**
- Agregar/eliminar suscripciones
- Cálculo de gasto mensual total
- Soporte para ciclos mensuales y anuales
- Persistencia en localStorage
- Interfaz intuitiva con tarjetas

**Tecnologías:** React, TypeScript

### 3. QuantumTrade (`/quantum-trade`)
**Descripción:** Plataforma de trading con algoritmos cuánticos (simulados).

**Características:**
- Optimización de portafolio usando Simulated Annealing
- Visualización en tiempo real del proceso de optimización
- Selección de múltiples activos (hasta 5)
- Gráficos interactivos con Recharts
- Cálculo de riesgo/retorno

**Tecnologías:** React, TypeScript, Recharts, Algoritmos de optimización

## Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página principal con grid de apps |
| `/crypto-tracker` | CryptoTracker | App de seguimiento de criptomonedas |
| `/subscription-tracker` | SubscriptionTracker | App de gestión de suscripciones |
| `/quantum-trade` | QuantumTrade | App de trading cuántico |

## Navegación SPA

La aplicación usa **React Router** para navegación sin recargas de página:

1. El usuario hace clic en el botón "Live" de cualquier app en la página principal
2. React Router cambia la URL y renderiza el componente correspondiente
3. No hay recarga de página, manteniendo el estado de la aplicación
4. El botón "atrás" del navegador funciona correctamente

## Configuración de Desarrollo

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:5173/`

### Build de Producción
```bash
npm run build
```

### Preview de Producción
```bash
npm preview
```

## Dependencias Principales

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.10.1",
  "recharts": "^3.5.1"
}
```

## Características Técnicas

### Imports y Módulos
- Todos los imports usan **rutas relativas simples**
- No se requieren alias de Vite ni path mappings de TypeScript
- Estructura modular con separación clara de responsabilidades

### Estilos
- Cada mini app tiene sus propios estilos en `index.css`
- Los estilos se importan junto con el componente de la app
- Variables CSS para temas consistentes
- Diseño responsive

### TypeScript
- Tipado estricto habilitado
- Interfaces bien definidas para props y datos
- Type safety en toda la aplicación

### Persistencia
- CryptoTracker y SubscriptionTracker usan `localStorage`
- Los datos persisten entre sesiones del navegador

## SEO y Metadata

El archivo `index.html` incluye:
- Meta tags optimizados para SEO
- Open Graph tags para redes sociales
- Twitter Card tags
- Structured Data (JSON-LD)
- PWA meta tags

## Arquitectura de Componentes

### Página Principal (Home)
```
Home
├── Navbar
├── Hero
├── AppGrid
│   └── AppCard (x N apps)
└── Footer
```

### Mini Apps
Cada mini app es autónoma y sigue su propia estructura:
```
MiniApp
├── App.tsx (componente principal)
├── components/ (componentes específicos)
├── services/ o utils/ (lógica de negocio)
├── types.ts (definiciones de tipos)
└── index.css (estilos)
```

## Flujo de Datos

1. **Home Page:** Muestra lista de apps desde `AppGrid.tsx`
2. **Click en "Live":** React Router navega a la ruta de la mini app
3. **Mini App:** Se renderiza el componente wrapper que importa y muestra la app
4. **Navegación:** El usuario puede volver usando el botón atrás del navegador

## Notas de Implementación

### Por qué esta estructura

Inicialmente, las mini apps estaban en carpetas separadas fuera de `src/`, lo que causaba problemas con:
- Resolución de módulos en Vite
- Configuraciones complejas de alias
- Imports que no funcionaban correctamente

**Solución:** Migrar todo a `src/features/` con imports relativos simples.

### Ventajas de la estructura actual

✅ **Simplicidad:** No requiere configuraciones complejas de alias  
✅ **Mantenibilidad:** Todo el código está en un solo lugar  
✅ **TypeScript:** Funciona sin configuraciones especiales  
✅ **Escalabilidad:** Fácil agregar nuevas mini apps  
✅ **Debugging:** Más fácil rastrear imports y dependencias

## Próximos Pasos Sugeridos

1. **Testing:** Agregar tests unitarios y de integración
2. **CI/CD:** Configurar pipeline de deployment
3. **Más Apps:** Agregar nuevas mini aplicaciones
4. **Estado Global:** Considerar Context API o Zustand si se necesita estado compartido
5. **Optimización:** Code splitting por ruta para mejor performance

## Contribución

Para agregar una nueva mini app:

1. Crear carpeta en `src/features/nueva-app/`
2. Crear `App.tsx` con el componente principal
3. Crear `index.css` con estilos específicos
4. Crear wrapper en `src/pages/NuevaApp.tsx`
5. Agregar ruta en `src/App.tsx`
6. Agregar entrada en `AppGrid.tsx`

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia especificada en el repositorio.
