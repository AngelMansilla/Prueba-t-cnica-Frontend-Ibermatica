import { Direccion } from './direccion.model';
import { Estudio, ExperienciaLaboral } from './formacion.model';

// Tipo de usuario
export type TipoUsuario = 'DEMANDANTE' | 'EMPLEADO';

// Interface base para usuarios
export interface UsuarioBase {
  id: string;
  nif: string;           // * Obligatorio
  nombre: string;        // * Obligatorio
  primerApellido: string;// * Obligatorio
  segundoApellido?: string;
  genero?: 'M' | 'F' | 'OTRO';
  fechaNacimiento?: string; // Formato YYYY-MM-DD
  direccion?: Direccion;
  tipo: TipoUsuario;
}

// Interface específica para Demandantes
export interface Demandante extends UsuarioBase {
  tipo: 'DEMANDANTE';
  estudios?: Estudio[];
}

// Interface específica para Empleados
export interface Empleado extends UsuarioBase {
  tipo: 'EMPLEADO';
  experienciaLaboral?: ExperienciaLaboral[];
}

// Tipo unión para cualquier tipo de usuario
export type Usuario = Demandante | Empleado;

// DTOs para crear/actualizar usuarios
export interface CrearUsuarioDTO extends Omit<UsuarioBase, 'id'> {
  estudios?: Estudio[];
  experienciaLaboral?: ExperienciaLaboral[];
}

export interface ActualizarUsuarioDTO extends Partial<CrearUsuarioDTO> {
  id: string;
}
