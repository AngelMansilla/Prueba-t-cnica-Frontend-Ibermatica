import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MockDataService } from './core/services/mock-data.service';
import { UsuarioService } from './core/services/usuario.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    MockDataService,
    UsuarioService
  ]
};
