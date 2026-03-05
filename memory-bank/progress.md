# Progreso del Proyecto: Gestión de Usuarios

## Funcionalidades Completadas
- **Listado Básico de Usuarios:** Se muestra una lista inicial de usuarios.
- **Navegación:** Funciona la navegación entre la lista, el detalle y el formulario.
- **Formulario de Creación/Edición:**
    - Se pueden introducir datos básicos del usuario.
    - Se pueden introducir datos de dirección.
    - Se pueden añadir/eliminar estudios (para Demandantes).
    - Se pueden añadir/eliminar experiencias laborales (para Empleados).
    - Validación básica de campos requeridos.
- **Vista de Detalle:**
    - Muestra datos básicos del usuario.
    - Muestra la dirección.
    - Muestra estudios o experiencia laboral según el tipo de usuario.
    - Botones "Editar" y "Volver" funcionales.
- **Componente de Pestañas (Tabs):** Reutilizable y funcional.

## Funcionalidades Pendientes
- **Paginación/Filtros:** En la lista de usuarios.
- **Eliminación de Usuarios:** Implementar la funcionalidad de eliminar.
- **Mejoras de UI/UX:** Refinar estilos, manejo de estados de carga/error más robusto.
- **Pruebas Unitarias/Integración:** Añadir pruebas.
- **Conexión a API Real:** Reemplazar el servicio mock.

## Estado Actual
- **CRUD:** Crear, Leer y Actualizar están parcialmente implementados. Eliminar está pendiente.
- **UI:** Funcional pero básica, necesita refinamiento.
- **Errores:** Se han corregido varios errores relacionados con formularios y visualización de detalles.

## Problemas Conocidos
- Potenciales mejoras en la validación de formularios (ej. formato NIF, fechas).
- Falta de feedback visual claro en algunas operaciones (ej. al guardar). 