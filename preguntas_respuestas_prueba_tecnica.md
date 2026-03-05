# Preguntas y Respuestas de la Prueba Técnica: Gestión de Usuarios

Este documento recopila posibles preguntas para una entrevista técnica sobre el proyecto de Gestión de Usuarios, junto con sus respuestas basadas en la implementación actual.

## Sobre Arquitectura y Diseño Angular

**1. Describe la estructura general del proyecto. ¿Por qué organizar el código en carpetas como `features` y `shared`? ¿Qué tipo de componentes irían en cada una?**

*   **Respuesta:** El proyecto sigue una estructura modular común en Angular.
    *   **`features`:** Contiene módulos o componentes específicos de una funcionalidad concreta de la aplicación. En nuestro caso, tenemos la característica `users`, que agrupa todo lo relacionado con la gestión de usuarios (lista, detalle, formulario). Esto mejora la organización y la mantenibilidad, ya que el código relacionado está agrupado.
    *   **`shared`:** Contiene elementos reutilizables en múltiples características. Aquí irían componentes como `TabsComponent`, `TabComponent`, directivas, pipes o modelos que no son específicos de una sola feature. Esto promueve la reutilización y evita la duplicación de código.
    *   **`core`:** (Aunque no lo usamos extensivamente aquí, es común) Contiene servicios singleton (como `UsuarioService`), modelos base (`usuario.model.ts`), guardias de ruta, interceptores HTTP y lógica fundamental que se carga una sola vez en la aplicación.

**2. Explica el patrón de componentes "Smart/Dumb" (o Contenedor/Presentación). ¿Puedes dar ejemplos de cada tipo en este proyecto? ¿Cuáles son sus beneficios?**

*   **Respuesta:** Este patrón separa los componentes en dos tipos:
    *   **Smart Components (Contenedores):** Se encargan de la lógica, obtener datos (a través de servicios), gestionar el estado y pasar los datos a los componentes tontos. Ejemplos en el proyecto: `UserListComponent`, `UserDetailComponent`, `UserFormComponent`. Estos componentes inyectan servicios, interactúan con el enrutador y manejan la lógica de negocio.
    *   **Dumb Components (Presentacionales):** Su única responsabilidad es mostrar datos recibidos a través de `@Input()` y emitir eventos a través de `@Output()` cuando ocurre una interacción. Son altamente reutilizables y fáciles de probar. Ejemplo: `TabsComponent` y `TabComponent`. Reciben datos (como el título) y emiten eventos (como la selección de una pestaña), pero no saben de dónde vienen los datos ni qué hacer con los eventos.
    *   **Beneficios:** Mayor reutilización, mejor legibilidad, separación clara de responsabilidades y facilita las pruebas (los componentes tontos son muy fáciles de probar aisladamente).

**3. ¿Cómo funciona el enrutamiento (`Routing`) en esta aplicación? ¿Cómo se definen las rutas y cómo se navega entre ellas?**

*   **Respuesta:** El enrutamiento se gestiona mediante el módulo `RouterModule` de Angular.
    *   **Definición:** Las rutas se definen en un archivo de enrutamiento (originalmente `app-routing.module.ts`, aunque lo integramos en `app.module.ts` por simplicidad en un momento dado). Se crea un array de objetos `Routes`, donde cada objeto mapea una URL (`path`) a un componente (`component`). Se usan parámetros de ruta (ej. `:id` en `users/detail/:id`) para pasar información dinámica.
    *   **Navegación:**
        *   **Declarativa:** Se usa la directiva `routerLink` en el HTML (ej. `<a routerLink="/users">Lista</a>`).
        *   **Programática:** Se inyecta el servicio `Router` en los componentes y se usa su método `navigate()` (ej. `this.router.navigate(['/users/edit', userId]);`). También se usa `ActivatedRoute` para leer parámetros de la ruta actual (ej. `this.route.snapshot.paramMap.get('id');`).
    *   **Salida:** El componente asociado a la ruta activa se renderiza dentro del tag `<router-outlet>` en el template principal (`app.component.html`).

**4. Habla sobre la Inyección de Dependencias (DI) en Angular. ¿Cómo se usa en componentes como `UserFormComponent` o `UserDetailComponent` para obtener servicios?**

*   **Respuesta:** La Inyección de Dependencias es un patrón de diseño fundamental en Angular. Permite que una clase reciba las dependencias que necesita (otros objetos o servicios) desde una fuente externa (el inyector de Angular) en lugar de crearlas ella misma.
    *   **Uso:** En los componentes, se declaran las dependencias como parámetros privados en el constructor. Angular inspecciona el constructor, identifica los tipos de las dependencias (ej. `UsuarioService`, `Router`, `FormBuilder`) y, si están registrados en el inyector (normalmente a nivel de módulo o con `providedIn: 'root'` en el servicio), instancia y "inyecta" esos servicios al componente cuando este se crea.
    *   **Ejemplo (`UserFormComponent`):**
        ```typescript
        constructor(
          private fb: FormBuilder, // Inyecta FormBuilder
          private userService: UsuarioService, // Inyecta UsuarioService
          private router: Router, // Inyecta Router
          private route: ActivatedRoute // Inyecta ActivatedRoute
        ) { /* ... */ }
        ```

**5. ¿Qué es un Servicio en Angular y cuál es el propósito del `UsuarioService` en este proyecto? ¿Por qué es una buena práctica encapsular la lógica de datos en servicios?**

*   **Respuesta:** Un Servicio en Angular es una clase (generalmente marcada con `@Injectable`) diseñada para encapsular lógica de negocio, acceso a datos o funcionalidades reutilizables que no están directamente ligadas a la vista.
    *   **Propósito de `UsuarioService`:** Centraliza toda la lógica relacionada con la obtención y manipulación de datos de usuarios. Contiene métodos como `getUsuarios()`, `getUsuario(id)`, `createUser(user)`, `updateUser(id, user)` (y eventualmente `deleteUser(id)`). Actualmente interactúa con un mock, pero está preparado para interactuar con una API real.
    *   **Buena Práctica:** Encapsular esta lógica en servicios:
        *   **Reutilización:** La misma lógica de datos puede ser usada por múltiples componentes sin duplicación.
        *   **Separación de Responsabilidades:** Los componentes se centran en la presentación y la interacción del usuario, mientras que los servicios manejan los datos.
        *   **Mantenibilidad:** Si la forma de obtener datos cambia (ej. cambiar de mock a API real), solo necesitas modificar el servicio, no todos los componentes que lo usan.
        *   **Testeabilidad:** Los servicios se pueden probar de forma aislada más fácilmente.

## Sobre Formularios Reactivos

**6. ¿Por qué elegiste (o por qué se usarían) Formularios Reactivos para el `UserFormComponent` en lugar de Formularios por Plantilla (Template-Driven)? ¿Cuáles son sus ventajas en este caso?**

*   **Respuesta:** Se eligieron Formularios Reactivos porque ofrecen un control más explícito y programático sobre el modelo del formulario, lo cual es beneficioso para escenarios complejos como el nuestro:
    *   **Complejidad:** El formulario tiene lógica condicional (mostrar estudios/experiencia), arrays dinámicos y validaciones que son más fáciles de manejar programáticamente.
    *   **Modelo de Datos Explícito:** El `FormGroup`, `FormControl` y `FormArray` se definen en el componente TypeScript, creando un modelo claro y síncrono con el formulario.
    *   **Validación Dinámica y Compleja:** Es más sencillo añadir, quitar o modificar validadores de forma programática según el estado de otros controles (ej. si cambia el tipo de usuario).
    *   **Testeabilidad:** El modelo del formulario y su lógica se pueden probar unitariamente sin depender del DOM.
    *   **Escalabilidad:** Son más adecuados para formularios grandes y complejos que pueden evolucionar.
    *   **Desventaja de Template-Driven:** Aunque más simples para formularios básicos, la lógica y el estado residen principalmente en la plantilla, lo que puede volverse difícil de manejar y probar en casos complejos.

**7. Explica cómo se utilizan `FormGroup`, `FormControl` y `FormArray` en el `UserFormComponent`. Específicamente, ¿cómo se gestionaron los arrays dinámicos para "Estudios" y "Experiencia Laboral"?**

*   **Respuesta:**
    *   **`FormGroup`:** Representa una colección de controles de formulario. El formulario principal (`userForm`) es un `FormGroup`. También se usa para agrupar controles relacionados, como `direccion`.
    *   **`FormControl`:** Representa un control individual de entrada (input, select, etc.). Cada campo como `nif`, `nombre`, `tipo` es un `FormControl`.
    *   **`FormArray`:** Representa una colección de controles de formulario cuyo número puede variar dinámicamente. Lo usamos para `estudios` y `experienciaLaboral`. Cada elemento dentro del `FormArray` es un `FormGroup` que representa un estudio o una experiencia laboral individual.
    *   **Gestión de Arrays Dinámicos:**
        *   Se definen como `FormArray` vacíos al inicializar el formulario.
        *   Se crean métodos (`createEstudioFormGroup`, `createExperienciaFormGroup`) que devuelven un nuevo `FormGroup` con los controles necesarios para un ítem.
        *   Se usan métodos (`agregarEstudio`, `agregarExperiencia`) que llaman a los métodos de creación y luego usan `.push()` en el `FormArray` correspondiente para añadir el nuevo grupo.
        *   Se usan métodos (`eliminarEstudio`, `eliminarExperiencia`) que usan `.removeAt(index)` en el `FormArray` para quitar un ítem.
        *   En el template, se itera sobre los `controls` del `FormArray` usando `*ngFor` y se asigna el `formGroupName` correspondiente al índice.

**8. ¿Cómo implementaste las validaciones en el formulario (ej. campos requeridos)? ¿Cómo se muestra el feedback de error al usuario?**

*   **Respuesta:**
    *   **Implementación:** Las validaciones se añaden al definir los `FormControl` usando el array de validadores (`Validators`) del módulo `@angular/forms`. Ejemplo: `nif: ['', Validators.required]`. Se pueden añadir múltiples validadores.
    *   **Feedback al Usuario:** En el template HTML:
        *   Se usa `*ngIf` para mostrar un mensaje de error condicionalmente.
        *   Se accede al estado del control a través del `FormGroup` (ej. `userForm.get('nif')`).
        *   Se comprueban las propiedades del control:
            *   `errors?.[nombre_error]`: Verifica si existe un error específico (ej. `errors?.['required']`).
            *   `touched` o `dirty`: Se comprueba si el usuario ha interactuado con el campo (`touched`) o si ha cambiado su valor (`dirty`) para evitar mostrar errores prematuramente.
        *   Se puede añadir una clase CSS (ej. `error-message`) para estilizar el mensaje.
        *   El botón de envío (`submit`) se deshabilita si el formulario no es válido usando `[disabled]="userForm.invalid"`.

**9. ¿Cómo se maneja el estado de edición (`editMode`) en el formulario? ¿Cómo se cargan los datos iniciales al editar un usuario existente (`patchValue`)?**

*   **Respuesta:**
    *   **Manejo de `editMode`:**
        *   Se define una propiedad booleana `editMode` en el componente, inicializada a `false`.
        *   En `ngOnInit`, se comprueba si existe un parámetro `id` en la ruta (`ActivatedRoute`). Si existe, `editMode` se establece a `true`.
        *   La propiedad `editMode` se usa en el template (`*ngIf` o interpolación `{{ }}`) para cambiar textos (ej. título "Editar Usuario" vs. "Nuevo Usuario", texto del botón "Guardar Cambios" vs. "Crear Usuario").
        *   También se usa en el método `onSubmit` para decidir si llamar a `userService.updateUser()` o `userService.createUser()`.
    *   **Carga de Datos (`patchValue`)**:
        *   Si `editMode` es `true`, se llama a `userService.getUserById(userId)`.
        *   Dentro del `.subscribe()`, una vez que se reciben los datos del usuario (`user`), se utiliza el método `this.userForm.patchValue(user)`.
        *   `patchValue` actualiza los valores de los `FormControl` del `FormGroup` que coinciden por nombre con las propiedades del objeto `user`. Es seguro porque ignora las propiedades del objeto que no tienen un control correspondiente en el formulario.
        *   Para los `FormArray` (estudios/experiencia), se implementó un método `loadArrays(user)` que itera sobre los arrays del objeto `user` y crea y añade los `FormGroup` correspondientes al `FormArray` del formulario, usando `patchValue` en cada grupo individual.

## Sobre Componentes y Comunicación

**10. Describe cómo funciona el componente reutilizable `TabsComponent`. ¿Qué propósito tiene `@ContentChildren` y `QueryList`? ¿Cómo se comunica el `TabsComponent` con los `TabComponent` individuales?**

*   **Respuesta:**
    *   **Funcionamiento:** `TabsComponent` actúa como un contenedor para uno o más componentes `TabComponent`. Muestra una cabecera con botones (uno por cada `TabComponent` hijo) y un área de contenido donde solo se muestra el contenido del `TabComponent` activo.
    *   **`@ContentChildren(TabComponent)`:** Es un decorador que permite al `TabsComponent` obtener una referencia a todos los componentes `TabComponent` que se proyectan dentro de su etiqueta `<ng-content>` en el template padre.
    *   **`QueryList<TabComponent>`:** Es el tipo de la propiedad decorada con `@ContentChildren`. Es una colección dinámica que se actualiza si los hijos cambian. Permite iterar sobre los `TabComponent` hijos (ej. `this.tabs.forEach(...)`).
    *   **Comunicación:**
        *   **Tabs -> Tab:** `TabsComponent` itera sobre la `QueryList` de `tabs`. Cuando se hace clic en un botón de pestaña, llama a su método `selectTab`. Este método establece la propiedad `active` del `TabComponent` seleccionado a `true` y la de todos los demás a `false`.
        *   **Tab -> Tabs:** La comunicación es implícita. `TabComponent` tiene una propiedad `@Input() title` para recibir el título y una propiedad `active` que controla su visibilidad (usando `*ngIf="active"` en su propio template o el template del padre). `TabsComponent` gestiona qué `TabComponent` está activo.

**11. ¿Cómo se resolvió el problema de que al hacer clic en una pestaña se enviaba el formulario?**

*   **Respuesta:** Se abordó en el `TabsComponent`:
    1.  **`type="button"`:** Se añadió `type="button"` a los elementos `<button>` de las pestañas en el template. Esto evita que actúen como botones de envío (`submit`) por defecto cuando están dentro de un formulario.
    2.  **Prevención de Eventos:** En el método `selectTab(tab, event)` del componente TypeScript, se añadió código para manejar el evento de clic: `event.preventDefault()` (evita la acción por defecto) y `event.stopPropagation()` (evita que el evento "suba" al formulario y dispare `ngSubmit`).

**12. ¿Cómo se pasan datos entre componentes en Angular? Menciona ejemplos del proyecto.**

*   **Respuesta:** Hay varias formas:
    *   **De Padre a Hijo (`@Input`):** Un componente padre puede pasar datos a un hijo vinculando una propiedad del padre a una propiedad del hijo decorada con `@Input()`. Ejemplo: `TabsComponent` podría pasar datos a `TabComponent` si fuera necesario (aunque en nuestro caso, la comunicación principal es a través de la activación).
    *   **De Hijo a Padre (`@Output` y `EventEmitter`):** Un componente hijo puede emitir eventos usando una propiedad decorada con `@Output()` (que suele ser un `EventEmitter`). El padre escucha estos eventos y reacciona. Ejemplo: Si un botón dentro de `UserDetailComponent` fuera un componente separado, podría emitir un evento `editRequest` al `UserDetailComponent` padre.
    *   **Servicios:** Los componentes pueden compartir datos o estado inyectando el mismo servicio singleton. Es útil para comunicación entre componentes no relacionados directamente. Ejemplo: `UserListComponent` y `UserFormComponent` podrían comunicarse a través de `UsuarioService` si fuera necesario (aunque aquí usamos más el enrutamiento).
    *   **Enrutamiento:** Se pueden pasar datos simples como parámetros de ruta (ej. el `id` del usuario en `/users/detail/:id`, leído con `ActivatedRoute`) o datos más complejos usando el estado de la navegación (`router.navigate(['/ruta'], { state: { data: ... } })`). Usamos parámetros de ruta para el ID.

## Sobre Asincronía y Datos (RxJS)

**13. ¿Cómo se manejan las operaciones asíncronas, como obtener la lista de usuarios o los detalles de un usuario del `UsuarioService`? Explica qué son los `Observables` y cómo se usa `.subscribe()`.**

*   **Respuesta:** Las operaciones asíncronas (como llamadas HTTP, aunque aquí simuladas) se manejan principalmente con **Observables** de la librería RxJS.
    *   **Observables:** Representan un flujo (stream) de datos que pueden llegar a lo largo del tiempo. Pueden emitir cero, uno o múltiples valores, y pueden completarse o emitir un error. Los métodos de `UsuarioService` (ej. `getUsuarios()`, `getUsuario(id)`) devuelven Observables.
    *   **`.subscribe()`:** Para obtener los datos emitidos por un Observable, un componente necesita "suscribirse" a él usando el método `.subscribe()`. Este método acepta opcionalmente hasta tres funciones callback:
        *   `next`: Se ejecuta cada vez que el Observable emite un nuevo valor. Aquí recibimos los datos (ej. la lista de usuarios o el usuario individual) y actualizamos las propiedades del componente.
        *   `error`: Se ejecuta si el Observable emite un error. Aquí manejamos el error (ej. mostrando un mensaje al usuario).
        *   `complete`: Se ejecuta cuando el Observable termina de emitir valores y no emitirá más.
    *   **Ejemplo (`UserDetailComponent`):**
        ```typescript
        this.usuarioService.getUsuario(id).subscribe({
          next: (usuario) => { this.usuario = usuario; /*...*/ }, // Maneja el dato
          error: (err) => { this.error = '...'; /*...*/ } // Maneja el error
        });
        ```
    *   **Importante:** Es crucial desuscribirse de los Observables cuando el componente se destruye para evitar fugas de memoria (aunque para Observables que se completan solos como los de `HttpClient` no siempre es estrictamente necesario, es buena práctica usar operadores como `takeUntil` o el pipe `async` en el template).

**14. Actualmente se usa un servicio mock. ¿Qué cambios harías para conectar la aplicación a una API REST real?**

*   **Respuesta:**
    1.  **Importar `HttpClientModule`:** Asegurarse de que `HttpClientModule` esté importado en el módulo raíz (`AppModule`) o en el módulo donde se provee el servicio.
    2.  **Inyectar `HttpClient`:** Inyectar el servicio `HttpClient` de `@angular/common/http` en el constructor del `UsuarioService`.
    3.  **Definir URL Base:** Probablemente definir una URL base para la API en las variables de entorno (`environment.ts`).
    4.  **Modificar Métodos del Servicio:** Reemplazar la lógica mock con llamadas HTTP usando `HttpClient`:
        *   `getUsuarios()`: Usaría `this.http.get<Usuario[]>(`${this.apiUrl}/users`)`.
        *   `getUsuario(id)`: Usaría `this.http.get<Usuario>(`${this.apiUrl}/users/${id}`)`.
        *   `createUser(user)`: Usaría `this.http.post<Usuario>(`${this.apiUrl}/users`, user)`.
        *   `updateUser(id, user)`: Usaría `this.http.put<Usuario>(`${this.apiUrl}/users/${id}`, user)`.
        *   `deleteUser(id)`: Usaría `this.http.delete<void>(`${this.apiUrl}/users/${id}`)`.
    5.  **Manejo de Errores:** Implementar un manejo de errores más robusto para las llamadas HTTP, posiblemente usando el operador `catchError` de RxJS y/o un interceptor HTTP.
    6.  **Modelos:** Asegurarse de que los modelos locales (`Usuario`, `Direccion`, etc.) coincidan con la estructura de datos devuelta por la API.

**15. ¿Cómo gestionarías los estados de carga (`loading`) y error al obtener datos del servicio?**

*   **Respuesta:**
    1.  **Propiedades en el Componente:** Añadir propiedades booleanas/string al componente, como `loading = false;` y `error: string | null = null;`.
    2.  **Actualizar Estado:**
        *   Antes de iniciar la llamada asíncrona (antes de `.subscribe()`), establecer `this.loading = true;` y `this.error = null;`.
        *   En el callback `next` de `.subscribe()`, establecer `this.loading = false;` después de procesar los datos.
        *   En el callback `error` de `.subscribe()`, establecer `this.loading = false;` y `this.error = 'Mensaje de error apropiado';`.
        *   (Opcional) En el callback `complete`, también establecer `this.loading = false;`.
    3.  **Feedback en el Template:** Usar `*ngIf` en el template para mostrar/ocultar elementos según el estado:
        *   Mostrar un indicador de carga (spinner, mensaje) cuando `loading` es `true`.
        *   Mostrar un mensaje de error cuando `error` tiene un valor.
        *   Mostrar el contenido principal solo cuando `!loading` y `!error`.
    *   **Ejemplo (`UserDetailComponent`):** Ya implementamos esto añadiendo `loading` y `error` y usándolos en el template con `*ngIf`.

## Sobre Estilos (SCSS)

**16. ¿Qué ventajas ofrece usar SCSS sobre CSS plano? ¿Utilizaste alguna característica específica de SCSS como variables, anidamiento o mixins?**

*   **Respuesta:** SCSS (Sassy CSS) es un preprocesador de CSS que añade funcionalidades no disponibles en CSS estándar, haciendo los estilos más mantenibles y organizados.
    *   **Ventajas:** Variables, anidamiento, mixins, herencia, funciones, parciales (`_`), importaciones, etc.
    *   **Características Usadas:**
        *   **Variables:** Definimos variables para colores, espaciado, tipografía, etc., en `styles/abstracts/_variables.scss` (ej. `$primary-color`, `$spacing-md`). Esto permite cambios globales fáciles y consistencia.
        *   **Anidamiento:** Usamos anidamiento para escribir selectores CSS de forma más estructurada y legible, reflejando la jerarquía del HTML (ej. estilos dentro de `.user-form-container`).
        *   **Parciales e Importación:** Dividimos los estilos en archivos parciales (ej. `_variables.scss`, `_mixins.scss`) y los importamos en un archivo principal (`styles.scss`) usando `@import`. Esto mejora la organización.
        *   **(Opcional - Mixins):** Podríamos haber usado mixins (aunque no recuerdo si lo hicimos extensivamente) para encapsular bloques de estilos reutilizables (ej. un mixin para estilos de botones).

**17. ¿Cómo se estructuraron los estilos globales y los estilos específicos de los componentes?**

*   **Respuesta:**
    *   **Estilos Globales:** Se definen en `src/styles.scss`. Este archivo importa parciales como variables (`_variables.scss`) y puede contener estilos base para elementos HTML (body, h1, etc.), clases de utilidad (ej. `.container`, `.btn-primary`), o reseteos de CSS. Estos estilos afectan a toda la aplicación.
    *   **Estilos Específicos:** Cada componente Angular tiene su propio archivo SCSS (ej. `user-form.component.scss`). Los estilos definidos aquí están encapsulados (por defecto) para afectar solo al template de ese componente específico. Esto evita colisiones de nombres y hace que los estilos del componente sean autocontenidos y fáciles de razonar. Angular logra esta encapsulación añadiendo atributos únicos a los elementos del componente y modificando los selectores CSS.

## Sobre Próximos Pasos y Mejoras

**18. Si la lista de usuarios creciera mucho, ¿qué estrategias implementarías para mejorar el rendimiento?**

*   **Respuesta:**
    *   **Paginación:** La estrategia más común. En lugar de cargar todos los usuarios a la vez, se solicitarían y mostrarían por "páginas" (ej. 10 o 20 usuarios a la vez). Esto requiere cambios tanto en el backend (para soportar paginación) como en el frontend (componente de paginación, actualizar llamadas al servicio con parámetros de página y tamaño).
    *   **Scroll Infinito:** Similar a la paginación, pero se cargan más datos automáticamente a medida que el usuario hace scroll hacia abajo.
    *   **Virtual Scrolling:** Librerías como el CDK de Angular Material ofrecen "virtual scrolling". Solo se renderizan en el DOM los elementos de la lista que son visibles en la pantalla en un momento dado. A medida que el usuario hace scroll, los elementos que salen de la vista se eliminan del DOM y los nuevos que entran se añaden. Reduce drásticamente la carga en el DOM para listas muy largas.
    *   **`trackBy` en `*ngFor`:** Al iterar con `*ngFor`, proporcionar una función `trackBy` que devuelva un identificador único para cada elemento. Esto ayuda a Angular a optimizar las actualizaciones del DOM, ya que puede identificar qué elementos han cambiado, sido añadidos o eliminados, en lugar de volver a renderizar toda la lista si los datos cambian. Ejemplo: `*ngFor="let user of users; trackBy: trackByUser"` donde `trackByUser(index, user) { return user.id; }`.
    *   **Filtrado/Búsqueda en Backend:** Asegurarse de que cualquier filtrado o búsqueda se realice en el backend si la lista es muy grande, para no enviar miles de registros al frontend innecesariamente.

**19. ¿Cómo implementarías la funcionalidad de "Eliminar Usuario"? ¿Qué consideraciones tendrías?**

*   **Respuesta:**
    1.  **Añadir Método al Servicio:** Crear un método `deleteUser(id: string)` en `UsuarioService` que realice la llamada HTTP DELETE a la API (`this.http.delete(...)`).
    2.  **Añadir Botón/Acción en la Lista:** En `UserListComponent`, añadir un botón o icono de "Eliminar" para cada usuario en la lista.
    3.  **Implementar Método en Componente:** Crear un método en `UserListComponent`, por ejemplo `onDeleteUser(id: string)`.
    4.  **Confirmación:** **¡Muy importante!** Antes de llamar al servicio, mostrar un diálogo de confirmación al usuario (ej. "¿Estás seguro de que deseas eliminar a este usuario? Esta acción no se puede deshacer."). Esto evita eliminaciones accidentales. Se podría usar `window.confirm()` para algo simple, o un componente de diálogo modal para una mejor UX.
    5.  **Llamar al Servicio:** Si el usuario confirma, llamar a `this.usuarioService.deleteUser(id).subscribe(...)`.
    6.  **Actualizar Lista:** En el `next` callback de `subscribe`, actualizar la lista de usuarios local para reflejar la eliminación (eliminando el usuario del array `this.usuarios`). Esto da feedback inmediato al usuario sin necesidad de recargar toda la lista desde el servidor (aunque también se podría optar por recargar).
    7.  **Feedback/Manejo de Errores:** Mostrar una notificación (ej. "Usuario eliminado correctamente") o manejar posibles errores de la llamada al servicio.

**20. ¿Qué tipo de pruebas (unitarias, de integración, e2e) añadirías a este proyecto y por qué? ¿Qué herramientas usarías?**

*   **Respuesta:**
    *   **Pruebas Unitarias:**
        *   **Qué:** Probar unidades aisladas de código (clases, métodos, componentes tontos).
        *   **Por qué:** Aseguran que cada pieza funciona correctamente por sí sola. Son rápidas de ejecutar y ayudan a prevenir regresiones al refactorizar.
        *   **Ejemplos:** Probar métodos del `UsuarioService` (usando mocks para `HttpClient`), probar la lógica del `FormGroup` en `UserFormComponent`, probar que un componente tonto renderiza los `@Input` correctamente y emite `@Output`.
        *   **Herramientas:** Jasmine (framework de pruebas) y Karma (test runner), que vienen por defecto con Angular CLI. Se usaría `TestBed` para configurar el entorno de pruebas de Angular.
    *   **Pruebas de Integración:**
        *   **Qué:** Probar la interacción entre varias unidades (ej. un componente y su template, un componente y un servicio).
        *   **Por qué:** Verifican que las diferentes partes de la aplicación colaboran correctamente.
        *   **Ejemplos:** Probar que al hacer clic en un botón del `UserDetailComponent` se llama al método correcto del componente y se inicia la navegación; probar que el `UserFormComponent` carga datos del `UsuarioService` y actualiza el formulario.
        *   **Herramientas:** También Jasmine y Karma con `TestBed`. La diferencia con las unitarias suele estar en el alcance y en si se usan mocks o instancias reales de las dependencias (con moderación).
    *   **Pruebas End-to-End (E2E):**
        *   **Qué:** Simulan flujos de usuario completos en un navegador real, interactuando con la aplicación como lo haría un usuario final.
        *   **Por qué:** Verifican que los flujos de trabajo críticos funcionen de principio a fin en un entorno lo más parecido posible al real.
        *   **Ejemplos:** Probar el flujo completo de crear un nuevo usuario (navegar al formulario, rellenarlo, enviarlo, verificar que aparece en la lista). Probar el flujo de edición.
        *   **Herramientas:** Protractor (históricamente con Angular, aunque ahora menos recomendado) o alternativas más modernas como Cypress o Playwright. 