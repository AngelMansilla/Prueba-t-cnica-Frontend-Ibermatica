import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { MockDataService } from './mock-data.service';
import { TipoUsuario, CrearUsuarioDTO } from '../models';
import { of } from 'rxjs';

describe('UsuarioService', () => {
    let service: UsuarioService;
    let mockDataService: jasmine.SpyObj<MockDataService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MockDataService', [
            'getUsuarios',
            'getUsuarioPorId',
            'crearUsuario',
            'actualizarUsuario',
            'eliminarUsuario'
        ]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UsuarioService,
                { provide: MockDataService, useValue: spy }
            ]
        });

        service = TestBed.inject(UsuarioService);
        mockDataService = TestBed.inject(MockDataService) as jasmine.SpyObj<MockDataService>;
    });

    it('debe crearse correctamente', () => {
        expect(service).toBeTruthy();
    });

    describe('getUsuarios', () => {
        it('debe llamar a mockDataService.getUsuarios', () => {
            mockDataService.getUsuarios.and.returnValue(of([]));
            service.getUsuarios().subscribe();
            expect(mockDataService.getUsuarios).toHaveBeenCalled();
        });
    });

    describe('getUsuariosPorTipo', () => {
        it('debe filtrar los usuarios por tipo correctamente', (done) => {
            const mockUsuarios = [
                { id: '1', tipo: 'DEMANDANTE' as TipoUsuario, nif: '12345678A', nombre: 'Juan', primerApellido: 'G', segundoApellido: 'L', genero: 'M', fechaNacimiento: '1990-01-01' },
                { id: '2', tipo: 'EMPLEADO' as TipoUsuario, nif: '87654321B', nombre: 'Maria', primerApellido: 'R', segundoApellido: 'M', genero: 'F', fechaNacimiento: '1985-01-01' }
            ];
            mockDataService.getUsuarios.and.returnValue(of(mockUsuarios));

            service.getUsuariosPorTipo('DEMANDANTE').subscribe(usuarios => {
                expect(usuarios.length).toBe(1);
                expect(usuarios[0].tipo).toBe('DEMANDANTE');
                done();
            });
        });
    });

    describe('validaciones', () => {
        it('debe fallar si el NIF tiene formato incorrecto', () => {
            const usuarioInvalido: CrearUsuarioDTO = {
                tipo: 'DEMANDANTE',
                nif: '12345678', // Falta letra
                nombre: 'Test',
                primerApellido: 'Apellido',
                segundoApellido: 'Apellido',
                genero: 'M',
                fechaNacimiento: '1990-01-01'
            };

            expect(() => service.crearUsuario(usuarioInvalido)).toThrowError(/Formato de NIF inválido/);
        });

        it('debe fallar si el nombre está vacío', () => {
            const usuarioInvalido: CrearUsuarioDTO = {
                tipo: 'DEMANDANTE',
                nif: '12345678A',
                nombre: ' ',
                primerApellido: 'Apellido',
                segundoApellido: 'Apellido',
                genero: 'M',
                fechaNacimiento: '1990-01-01'
            };

            expect(() => service.crearUsuario(usuarioInvalido)).toThrowError(/nombre es obligatorio/);
        });

        it('debe fallar si la fecha de nacimiento es futura', () => {
            const fechaFutura = new Date();
            fechaFutura.setFullYear(fechaFutura.getFullYear() + 1);
            const fechaStr = fechaFutura.toISOString().split('T')[0];

            const usuarioInvalido: CrearUsuarioDTO = {
                tipo: 'DEMANDANTE',
                nif: '12345678A',
                nombre: 'Test',
                primerApellido: 'Apellido',
                segundoApellido: 'Apellido',
                genero: 'M',
                fechaNacimiento: fechaStr
            };

            expect(() => service.crearUsuario(usuarioInvalido)).toThrowError(/no puede ser futura/);
        });
    });
});
