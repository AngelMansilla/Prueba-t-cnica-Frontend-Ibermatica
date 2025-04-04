import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '../models';

interface DataResponse {
  usuarios: Usuario[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private usuarios = new BehaviorSubject<Usuario[]>([
    {
      id: "1",
      tipo: "DEMANDANTE",
      nif: "12345678A",
      nombre: "Juan",
      primerApellido: "García",
      segundoApellido: "López",
      genero: "M",
      fechaNacimiento: "1990-01-15"
    },
    {
      id: "2",
      tipo: "EMPLEADO",
      nif: "87654321B",
      nombre: "María",
      primerApellido: "Rodríguez",
      segundoApellido: "Martínez",
      genero: "F",
      fechaNacimiento: "1985-03-22"
    }
  ]);

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios.asObservable();
  }

  // Obtener usuario por ID
  getUsuarioPorId(id: string): Observable<Usuario | undefined> {
    const usuarios = this.usuarios.getValue();
    const usuario = usuarios.find(u => u.id === id);
    return of(usuario);
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
      throw new Error('Usuario no encontrado');
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
      throw new Error('Usuario no encontrado');
    }

    this.usuarios.next(usuariosFiltrados);
    return of(void 0);
  }
}
