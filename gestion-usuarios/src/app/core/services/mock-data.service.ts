import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';
import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '../models';

interface DataResponse {
  usuarios: Usuario[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Almacena los datos de los usuarios
  private usuarios = new BehaviorSubject<Usuario[]>([]);
  // Indica si los datos se han cargado
  private dataLoaded = false;

  // Inyecta el servicio HttpClient
  constructor(private http: HttpClient) {
    this.cargarDatos();
  }

  // Cargar datos de usuarios desde el archivo JSON
  private cargarDatos(): void {
    if (!this.dataLoaded) {
      this.http.get<DataResponse>('assets/data/usuarios.json')
        .subscribe({
          next: (data) => {
            this.usuarios.next(data.usuarios);
            this.dataLoaded = true;
          },
          error: (error) => {
            console.error('Error al cargar usuarios:', error);
            // Si hay error, inicializar con array vacío
            this.usuarios.next([]);
            this.dataLoaded = true;
          }
        });
    }
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    if (!this.dataLoaded) {
      this.cargarDatos();
    }
    return this.usuarios.asObservable();
  }

  // Obtener usuario por ID
  getUsuarioPorId(id: string): Observable<Usuario | undefined> {
    return this.usuarios.pipe(
      map(usuarios => usuarios.find(u => u.id === id))
    );
  }

  // Crear nuevo usuario
  crearUsuario(dto: CrearUsuarioDTO): Observable<Usuario> {
    const nuevoUsuario = {
      ...dto,
      id: crypto.randomUUID()
    } as Usuario;

    const usuarios = [...this.usuarios.getValue(), nuevoUsuario];
    this.usuarios.next(usuarios);

    return of(nuevoUsuario);
  }

  // Actualizar usuario
  actualizarUsuario(id: string, dto: ActualizarUsuarioDTO): Observable<Usuario> {
    const usuarios = this.usuarios.getValue();
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    const usuarioActualizado = {
      ...usuarios[index],
      ...dto
    } as Usuario;

    usuarios[index] = usuarioActualizado;
    this.usuarios.next(usuarios);

    return of(usuarioActualizado);
  }

  // Eliminar usuario
  eliminarUsuario(id: string): Observable<void> {
    const usuarios = this.usuarios.getValue();
    const usuariosFiltrados = usuarios.filter(u => u.id !== id);

    if (usuarios.length === usuariosFiltrados.length) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    this.usuarios.next(usuariosFiltrados);
    return of(void 0);
  }
}
