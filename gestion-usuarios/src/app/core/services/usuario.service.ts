import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO, TipoUsuario } from '../models';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private mockDataService: MockDataService) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.mockDataService.getUsuarios();
  }

  // Obtener usuarios filtrados por tipo
  getUsuariosPorTipo(tipo: TipoUsuario): Observable<Usuario[]> {
    return this.mockDataService.getUsuarios().pipe(
      map(usuarios => usuarios.filter(u => u.tipo === tipo))
    );
  }

  // Obtener un usuario por ID
  getUsuario(id: string): Observable<Usuario> {
    return this.mockDataService.getUsuarioPorId(id).pipe(
      map(usuario => {
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
        return usuario;
      })
    );
  }

  // Crear un nuevo usuario
  crearUsuario(dto: CrearUsuarioDTO): Observable<Usuario> {
    this.validarUsuario(dto);
    return this.mockDataService.crearUsuario(dto);
  }

  // Actualizar un usuario existente
  actualizarUsuario(id: string, dto: ActualizarUsuarioDTO): Observable<Usuario> {
    if (dto.nif || dto.nombre || dto.primerApellido) {
      this.validarCamposObligatorios(dto);
    }
    if (dto.fechaNacimiento) {
      this.validarFecha(dto.fechaNacimiento);
    }
    return this.mockDataService.actualizarUsuario(id, dto);
  }

  // Eliminar un usuario
  eliminarUsuario(id: string): Observable<void> {
    return this.mockDataService.eliminarUsuario(id);
  }

  // Validaciones de negocio
  private validarUsuario(dto: CrearUsuarioDTO): void {
    this.validarCamposObligatorios(dto);
    if (dto.fechaNacimiento) {
      this.validarFecha(dto.fechaNacimiento);
    }
  }

  private validarCamposObligatorios(dto: Partial<CrearUsuarioDTO>): void {
    // Validar campos obligatorios (marcados con *)
    if (dto.nif !== undefined && !this.validarFormatoNIF(dto.nif)) {
      throw new Error('Formato de NIF inválido. Debe tener 8 números y una letra mayúscula');
    }
    if (dto.nombre !== undefined && dto.nombre.trim() === '') {
      throw new Error('El nombre es obligatorio');
    }
    if (dto.primerApellido !== undefined && dto.primerApellido.trim() === '') {
      throw new Error('El primer apellido es obligatorio');
    }
  }

  private validarFormatoNIF(nif: string): boolean {
    const nifRegex = /^[0-9]{8}[A-Z]$/;
    return nifRegex.test(nif);
  }

  private validarFecha(fecha: string): void {
    // Validar formato YYYY-MM-DD
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
      throw new Error('Formato de fecha inválido. Debe ser YYYY-MM-DD');
    }

    // Validar que sea una fecha válida
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
      throw new Error('La fecha no es válida');
    }

    // Validar que no sea una fecha futura
    if (fechaObj > new Date()) {
      throw new Error('La fecha no puede ser futura');
    }
  }
}
