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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getUsuario(id).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuario = usuario;
          } else {
            this.router.navigate(['/users']);
          }
        },
        error: () => this.router.navigate(['/users'])
      });
    }
  }

  onVolver(): void {
    this.router.navigate(['/users']);
  }
}
