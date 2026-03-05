# Contexto Técnico: Gestión de Usuarios

## Tecnologías Principales
- **Framework:** Angular (versión específica por determinar, probablemente >= 16)
- **Lenguaje:** TypeScript
- **Estilos:** SCSS (Sass)
- **Gestor de Paquetes:** npm
- **CLI:** Angular CLI (`ng`)

## Configuración del Desarrollo
- **Entorno:** Node.js
- **Servidor de Desarrollo:** `ng serve`
- **Build:** `ng build`

## Dependencias Clave (Iniciales)
- `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`
- `rxjs`

## Dependencias Potenciales (A considerar)
- Librería de componentes UI (ej. Angular Material, NG-ZORRO, PrimeNG) - *Se decidió no usar Material Design por simplicidad.*
- Librería para manejo de estado (ej. NgRx, Akita)

## Restricciones Técnicas
- Inicialmente, los datos provienen de un servicio mock (`mock-usuario.service.ts`). Eventualmente se conectará a una API real.
- El diseño se está implementando con SCSS personalizado, sin una librería de componentes externa por ahora. 