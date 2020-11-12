import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../Models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.scss']
})
export class FormularioUsuariosComponent implements OnInit {
  usuarios: Usuario = new Usuario();
  success = false;
  datos: any;
  usuariosId: number;
  activo = [
    { id: 1, name: 'SI' },
    { id: 2, name: 'NO' }
  ];

  cargo_usuario = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Supervisor' },
    { id: 3, name: 'Recepcionista' },
  ];

  panelOpenState = false;

  constructor(private formBuilder: FormBuilder,
              private usuarioServicio: UsuariosService,
              private router: Router,
              private activatedRouted: ActivatedRoute) { }

  usuariosForms = this.formBuilder.group({
    id: new FormControl(null),
    first_name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    tipo_usuario: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    eliminado: new FormControl('NO')
  });

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(
      params => {
        this.usuariosId = Number(params.get('id'));
      }
    );
    console.log(this.activo);
    console.log(this.cargo_usuario);
    this.ObtenerDatos();
  }

  // Metodo encargado de cargar los datos al momento de actualizar
  ObtenerDatos(): void {
    this.usuarioServicio.ObtenerUnUsuario(this.usuariosId).subscribe(
      data => {
        console.log(data);
        this.usuariosForms.setValue(data);
      }
    );
  }

  // Metodo encargado de llamar al metodo guardar y actualizar
  onSubmit(): any {
    console.log(this.usuariosForms.value);
    this.GuardarUsuarios();
  }

  // Metodo encargado de guardar y actualizar los usuarios
  GuardarUsuarios(): void {
    // Metodo encargado de guardar
    // En caso que usuariosId sea igual a cero, se procede a crear el registro
    if (this.usuariosId === null) {
      console.log(this.usuariosForms.value);
      this.usuarioServicio.Agregar(this.usuariosForms.value)
        .subscribe(
          data => {
            this.success = true;
            console.log('Se creo un nuevo usuario');
            console.log(data);
            this.router.navigate(['Usuarios/Listado']);
          },
          error => console.log('Hubo un error al registrar el nuevo usuario' + error),
        );
      // Metodo encargado de actualizar
      // En caso que usuariosId sea distinto a cero, se procede a
      // actualizar el registro según el id que posea
    } else if (this.usuariosId !== null) {
      this.usuarioServicio.ActualizarUsuario(this.usuariosId,
        this.usuariosForms.value).subscribe(
          data => {
            this.datos = data;
            this.usuariosForms.patchValue({
              first_name: this.datos.first_name,
              last_name: this.datos.last_name,
              password: this.datos.password,
              username: this.datos.username,
              email: this.datos.email,
              direccion: this.datos.direccion,
              tipo_usuario: this.datos.tipo_usuario,
              estado: this.datos.estado,
              telefono: this.datos.telefono,
            });
            this.router.navigate(['Usuarios/Listado']);
          },
          error => console.log('Hubo un error al actualizar el usuario' + error),
        );
    }
  }
}
