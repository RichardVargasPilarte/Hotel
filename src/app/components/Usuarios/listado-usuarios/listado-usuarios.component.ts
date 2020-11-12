import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../Models/usuarios';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {
  ELEMENT_DATA: Usuario[] = [];

  success = false; // variable que funciona como bandera, en caso de que funcione la eliminacion

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'username',
    'tipo_usuario', 'estado', 'telefono'];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.CargarDatosUsuarios(); // Metodo encargado de listar los usuarios
  }

  CargarDatosUsuarios(): any {
    // Metodo encargado de listar los usuarios
    // La propiedad listadousuarios, se encarga de consumir los datos de la propiedad
    // usuariosServicio que se encarga de traer los usuarios desde nuestra API
    // y este a su vez accede al método ObtenerUsuarios(), para obtener los datos registrados
    const resp = this.usuariosServicio.ObtenerUsuarios();
    resp.subscribe(report => this.dataSource.data = report as Usuario[]);
  }

  eliminarUsuario(id: number): any {
    this.usuariosServicio.BorrarUsuario(id)
      .subscribe(
        data => {
          this.success = true;
          console.log('Se elimino el usuario');
          this.CargarDatosUsuarios();
          console.log(data);
        },
        error => console.log('Hubo un fallo al momento de eliminar el dato' + error)
      );
  }
}
