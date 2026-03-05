# Gestión de Usuarios - Prueba Técnica

Este proyecto es una aplicación de gestión de usuarios (CRUD) desarrollada con **Angular 19**, diseñada para demostrar habilidades en arquitectura de frontend, manejo de estado reactivo y diseño modular.

## 🚀 Tecnologías Utilizadas

- **Angular 19**: Framework principal para la construcción de la SPA.
- **RxJS**: Gestión de flujos de datos asíncronos y estado reactivo.
- **Angular Material & CDK**: Componentes de UI y utilidades (Tabs, Icons).
- **SCSS**: Preprocesador de CSS con arquitectura de variables y mixins.
- **Reactive Forms**: Gestión avanzada de formularios con validaciones dinámicas.

## 🏗️ Arquitectura

La aplicación sigue los principios de **Clean Architecture** y patrones de diseño modernos en Angular:

- **Smart/Dumb Components**: Separación clara entre componentes de lógica (contenedores) y componentes de presentación.
- **Core Module**: Servicios singleton, modelos globales y utilidades transversales.
- **Features**: Organización por módulos funcionales (e.g., `users`), facilitando la escalabilidad y el lazy loading.
- **Shared**: Componentes reutilizables, directivas y pipes compartidos por toda la aplicación.

## ✨ Funcionalidades

- **CRUD de Usuarios**:
  - Listado con refresco reactivo.
  - Creación y edición con formularios dinámicos.
  - Eliminación con confirmación.
- **Formularios Dinámicos**: Gestión de arrays de controles para formación y experiencia laboral.
- **Navegación Fluida**: Uso de `RouterModule` con parámetros de ruta y lazy loading.
- **Manejo de Estado**: Uso de `BehaviorSubject` en servicios para mantener la sincronía de datos sin necesidad de librerías externas complejas.

## 🛠️ Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:4200/`.

3. Ejecutar tests unitarios:
   ```bash
   npm test
   ```

## 📝 Decisiones de Diseño

- **Lazy Loading**: Las rutas de funcionalidades se cargan bajo demanda para optimizar el tiempo de carga inicial.
- **Encapsulación de Estilos**: Uso de SCSS a nivel de componente combinado con estilos globales para consistencia visual.
- **Validaciones**: Implementación de validaciones personalizadas en el lado del cliente y lógica de negocio centralizada en servicios.
