# Patrones del Sistema: Gestión de Usuarios

## Arquitectura General
- **Frontend:** Aplicación Single Page Application (SPA) desarrollada con Angular.
- **Estructura de Módulos:** Organizada por características (`features`) y elementos compartidos (`shared`).
- **Gestión de Estado:** Principalmente a través de servicios de Angular y comunicación entre componentes (Input/Output).
- **Componentes:** Uso de componentes reutilizables (ej. Tabs, botones) y componentes específicos por característica (lista, detalle, formulario).

## Patrones de Diseño Clave
- **Componentes Inteligentes y Tontos (Smart/Dumb Components):** Separación de responsabilidades entre componentes que manejan lógica y estado (contenedores) y componentes que solo muestran datos (presentacionales).
- **Inyección de Dependencias:** Utilizada extensivamente por Angular para gestionar servicios y dependencias.
- **Formularios Reactivos:** Para la gestión compleja de formularios y validaciones.
- **Servicios:** Para encapsular la lógica de negocio y la comunicación con APIs (aunque actualmente se usa un mock service).
- **Enrutamiento:** Módulo de enrutamiento de Angular para la navegación entre vistas. 