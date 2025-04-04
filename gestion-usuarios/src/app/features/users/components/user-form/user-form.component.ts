import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  userId: string | null = null;

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
      }),
      estudios: this.fb.array([]),
      experienciaLaboral: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.editMode = true;
      this.usuarioService.getUsuario(this.userId).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.userForm.patchValue(usuario);
            this.loadArrays(usuario);
          }
        },
        error: () => this.router.navigate(['/users'])
      });
    }
  }

  get estudiosArray() {
    return this.userForm.get('estudios') as FormArray;
  }

  get experienciaArray() {
    return this.userForm.get('experienciaLaboral') as FormArray;
  }

  onTipoChange() {
    const tipo = this.userForm.get('tipo')?.value;
    // Limpiar los arrays existentes
    while (this.estudiosArray.length) {
      this.estudiosArray.removeAt(0);
    }
    while (this.experienciaArray.length) {
      this.experienciaArray.removeAt(0);
    }
  }

  createEstudioFormGroup() {
    return this.fb.group({
      nombreInstitucion: ['', Validators.required],
      titulacion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  createExperienciaFormGroup() {
    return this.fb.group({
      nombreEmpresa: ['', Validators.required],
      puestoTrabajo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  agregarEstudio() {
    this.estudiosArray.push(this.createEstudioFormGroup());
  }

  agregarExperiencia() {
    this.experienciaArray.push(this.createExperienciaFormGroup());
  }

  eliminarEstudio(index: number) {
    this.estudiosArray.removeAt(index);
  }

  eliminarExperiencia(index: number) {
    this.experienciaArray.removeAt(index);
  }

  loadArrays(user: Usuario) {
    if (user.tipo === 'DEMANDANTE' && user.estudios) {
      user.estudios.forEach(estudio => {
        const estudioGroup = this.createEstudioFormGroup();
        estudioGroup.patchValue(estudio);
        this.estudiosArray.push(estudioGroup);
      });
    } else if (user.tipo === 'EMPLEADO' && user.experienciaLaboral) {
      user.experienciaLaboral.forEach(experiencia => {
        const experienciaGroup = this.createExperienciaFormGroup();
        experienciaGroup.patchValue(experiencia);
        this.experienciaArray.push(experienciaGroup);
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
