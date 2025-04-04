import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, TipoUsuario } from '@core/models';
import { UsuarioService } from '@core/services/usuario.service';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { TabComponent } from '@shared/components/tabs/tab.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsComponent,
    TabComponent
  ]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  editMode = false;
  userId?: string;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nif: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)]],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      tipo: ['DEMANDANTE', Validators.required],
      genero: [''],
      fechaNacimiento: [''],
      direccion: this.fb.group({
        calle: [''],
        numero: [''],
        puerta: [''],
        codigoPostal: [''],
        ciudad: ['']
      })
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.userId) {
      this.editMode = true;
      this.usuarioService.getUsuario(this.userId).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.userForm.patchValue(usuario);
          }
        },
        error: () => this.router.navigate(['/users'])
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.editMode && this.userId) {
        this.usuarioService.actualizarUsuario(this.userId, userData).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => console.error('Error al actualizar usuario:', error)
        });
      } else {
        this.usuarioService.crearUsuario(userData).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => console.error('Error al crear usuario:', error)
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
