import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@core/models';
import { UsuarioService } from '@core/services/usuario.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  usuario: Usuario | null = null;
  error: string | null = null;
  loading = true;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarUsuario(id);
    } else {
      this.router.navigate(['/users']);
    }
  }

  private cargarUsuario(id: string): void {
    this.loading = true;
    this.error = null;

    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        this.error = 'No se pudo cargar el usuario. Por favor, inténtelo de nuevo.';
        this.loading = false;
      }
    });
  }

  onEdit(): void {
    if (this.usuario) {
      this.router.navigate(['/users/edit', this.usuario.id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}
