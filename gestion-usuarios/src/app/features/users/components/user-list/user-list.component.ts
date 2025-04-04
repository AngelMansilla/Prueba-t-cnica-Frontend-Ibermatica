import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Usuario, TipoUsuario } from '@core/models';
import { UsuarioService } from '@core/services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  private tipoFiltro = new BehaviorSubject<TipoUsuario | null>(null);
  usuarios$: Observable<Usuario[]>;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarios$ = combineLatest([
      this.usuarioService.getUsuarios(),
      this.tipoFiltro
    ]).pipe(
      map(([usuarios, tipo]) => {
        if (!tipo) return usuarios;
        return usuarios.filter(u => u.tipo === tipo);
      })
    );
  }

  ngOnInit(): void {
  }

  onTipoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.tipoFiltro.next(select.value as TipoUsuario || null);
  }

  onNuevoUsuario(): void {
    this.router.navigate(['/users/new']);
  }

  onVerUsuario(usuario: Usuario): void {
    this.router.navigate(['/users/detail', usuario.id]);
  }

  onEditarUsuario(usuario: Usuario): void {
    this.router.navigate(['/users/edit', usuario.id]);
  }

  onEliminarUsuario(usuario: Usuario): void {
    if (confirm(`¿Está seguro de que desea eliminar al usuario ${usuario.nombre}?`)) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe({
        next: () => {
          // El usuario se actualizará automáticamente en la lista
          // gracias al BehaviorSubject en el servicio
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }
}
