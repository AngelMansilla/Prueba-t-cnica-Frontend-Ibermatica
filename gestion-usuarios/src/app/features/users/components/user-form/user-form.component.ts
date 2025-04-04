import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, TipoUsuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '@core/models';
import { UsuarioService } from '@core/services/usuario.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditing = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nif: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      tipo: ['DEMANDANTE', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        puerta: [''],
        codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        ciudad: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.userId = id;
      this.cargarUsuario(id);
    }
  }

  cargarUsuario(id: string): void {
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        if (usuario) {
          this.userForm.patchValue(usuario);
        } else {
          this.router.navigate(['/users']);
        }
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isEditing && this.userId) {
        const updateDto: ActualizarUsuarioDTO = {
          ...userData
        };

        this.usuarioService.actualizarUsuario(this.userId, updateDto).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar el usuario');
          }
        });
      } else {
        const createDto: CrearUsuarioDTO = {
          ...userData
        };

        this.usuarioService.crearUsuario(createDto).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => {
            console.error('Error al crear usuario:', error);
            alert('Error al crear el usuario');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
