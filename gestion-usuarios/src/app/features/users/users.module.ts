import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '@shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDeleteDialogComponent } from './components/user-delete-dialog/user-delete-dialog.component';

// Definición de las rutas para el módulo de usuarios
const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'new', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: 'detail/:id', component: UserDetailComponent }
];

// Decorador que define el módulo de usuarios
@NgModule({
  declarations: [
    // Declaración de los componentes del módulo
    UserListComponent,
    UserFormComponent,
    UserDetailComponent,
    UserDeleteDialogComponent
  ],
  imports: [
    // Importación de los módulos necesarios
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class UsersModule { }
