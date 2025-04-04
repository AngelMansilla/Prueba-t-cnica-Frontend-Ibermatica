import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockDataService } from './services/mock-data.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MockDataService,
    UsuarioService
  ]
})
export class CoreModule { }
