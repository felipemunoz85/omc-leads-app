# OMC Leads

Aplicación frontend para gestión de leads de **One Million Copy SAS**. Permite visualizar, filtrar, crear, editar y eliminar leads, con métricas derivadas y un resumen generado con IA.

[Ir a URL en Vercel](https://omc-leads-51g2hwddg-capodiseno-8464s-projects.vercel.app/)

---

## Stack

- **Framework**: Next.js 15 con TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/ui (facilidad en la configuración y uso de componentes, estandarización)
- **Estado global**: Zustand
- **Formularios**: React Hook Form + Zod para validación
- **IA**: Groq + Llama 3.1
- **Íconos**: Lucide React

## Funcionalidades

### Gestión de leads

- Listado con ordenamiento por fecha (más recientes primero)
- Búsqueda por nombre o email
- Filtro por fuente (Instagram, Facebook, Landing page, Referido, Otro)
- Filtro por rango de fechas
- Paginación (5 leads por página)
- Crear, editar y eliminar leads
- Vista de detalle por lead
- Estados de carga (skeleton), vacío y error
- Toasts de confirmación en cada acción

### Métricas

- Total de leads
- Presupuesto promedio
- Leads de los últimos 7 días
- Fuente principal

### Resumen con IA

- Llamado a Groq API (Llama 3.1)
- Genera análisis general, fuente principal y recomendaciones, con base en los filtros activos
- Botón para regenerar el resumen

---

## Instalación

### Requisitos

- Node.js 20.9
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/felipemunoz85/omc-leads-app.git
cd omc-leads-app

# 2. Instalar dependencias, asegurarse de usar Node 20.9
nvm install 20.9.0
nvm use 20.9.0
npm install

# 3. Configurar variables de entorno. Editar .env.local con API key de Groq
cp .env.example .env.local

# 4. Correr el proyecto
npm run dev
```

La aplicación quedará expuesta en [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

```bash
# .env.local
GROQ_API_KEY=api_key
```

Se puede crear una API key gratuita en [console.groq.com](https://console.groq.com).

---

## Cómo probar la app

La app redirige de manera automática a /dashboard.

### Flujo de leads

- La tabla carga con 12 leads de ejemplo ordenados por fecha
- Filtrar por nombre, email, fuente o rango de fechas
- Clic en el ícono de la lupa para ver detalle de un lead.
- El ícono de edición en la tabla permite abrir el modal para editar los detalles del lead
- Eliminar un lead con el ícono de papelera
- El botón **Nuevo lead** permite añadir un nuevo lead al listado.

### Dashboard de métricas

Las métricas se muestran encima de los filtros, actualizándose de forma automática al modificarse los resultados de la bíusqueda.

### Resumen de IA

Al hacer clic en el botón **Ver resumen de IA** se abrirá un drawer que permitirá generar el reporte al hacer clic en **generar resumen**.

El resumen depende de los filtros aplicados; mostrando análisis general, fuente principal y recomendaciones

Al hacer clic en **Regenerar** se envía un nuevo request con una nueva versión del análisis.

---

## Datos mock

El proyecto incluye 12 leads de ejemplo en `src/lib/leadsData.ts` con variedad de fuentes, presupuestos y fechas para probar todos los filtros correctamente.

---

## Decisiones técnicas

**Todo en una misma página (leads, métricas y resumen AI)**
Añadir páginas adicionales para esta información las hacía irrelevantes, se buscó una experiencia unificada en la gestión de los leads.

**Groq sobre OpenAI**
API gratuita con límites generosos, compatible con el formato OpenAI, respuestas más rápidas para esta escala.

**react-markdown para el resumen**
Facilita el parsing de la respuesta del LLM.
