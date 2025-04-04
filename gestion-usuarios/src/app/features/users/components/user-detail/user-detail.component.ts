import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@core/models';
import { UsuarioService } from '@core/services/usuario.service';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { TabComponent } from '@shared/components/tabs/tab.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, TabsComponent, TabComponent]
})
export class UserDetailComponent implements OnInit {
  usuario?: Usuario;
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getUsuario(id).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuario = usuario;
          } else {
            this.error = 'Usuario no encontrado';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el usuario';
          this.loading = false;
        }
      });
    }
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
