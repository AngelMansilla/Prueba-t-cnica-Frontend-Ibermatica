# Prueba Técnica Frontend — Gestión de Usuarios

Aplicación SPA de gestión de usuarios desarrollada con **Angular 19** y **Angular Material**, como resolución de una prueba técnica aplicando buenas prácticas de arquitectura frontend.
Stack: Angular 19 · TypeScript · Angular Material/CDK · RxJS · Karma/Jasmine.

---

## Qué hace la aplicación

- Listado de usuarios con filtrado por tipo
- Alta, edición y eliminación de usuarios
- Formulario reactivo con subformulario de dirección reutilizable
- Componente de tabs personalizado independiente del enrutador
- Datos servidos desde un mock service (sin backend)

## Arquitectura

Estructura modular por features siguiendo la separación `core / features / shared`:

```
src/app/
├── core/
│   ├── models/          # Usuario, Dirección, Formación
│   └── services/        # UsuarioService, MockDataService
├── features/
│   └── users/
│       └── components/  # user-list, user-form, user-detail, user-delete-dialog
└── shared/
    └── components/      # tabs, address-form
```

## Decisiones técnicas destacadas

- **Lazy loading** en el módulo de usuarios
- **Formularios reactivos** con validación y subformularios anidados (`ControlContainer`)
- **Servicio desacoplado**: `UsuarioService` expone observables; los componentes no manipulan estado directamente
- **Componente Tabs propio** sin dependencia de routing, con propagación de eventos controlada
- **Tests unitarios** con Karma/Jasmine cubriendo servicio y componente raíz

## Instalación y arranque

```bash
cd gestion-usuarios
npm install
ng serve
```

Accede en `http://localhost:4200`

## Tests

```bash
ng test
```

## Build de producción

```bash
ng build
```
