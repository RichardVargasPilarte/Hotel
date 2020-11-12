import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../../services/alojamientos.service';
import { Alojamiento } from '../../../Models/alojamientos';
// import { Observable, Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-alojamientos',
  templateUrl: './listado-alojamientos.component.html',
  styleUrls: ['./listado-alojamientos.component.scss']
})

export class ListadoAlojamientosComponent implements OnInit {

  ELEMENT_DATA: Alojamiento[] = [];

  success = false; // variable que funciona como bandera, en caso de que funcione la eliminacion

  displayedColumns: string[] = ['id', 'nombre_al', 'descripcion_al', 'tiempo_estadia', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private alojamientoService: AlojamientosService){ }

  ngOnInit(): void {
    this.CargarDatosAlojamiento(); // Metodo encargado de listar los alojamientos
  }

  CargarDatosAlojamiento(): any {
    // Metodo encargado de listar los alojamientos
    // La propiedad listadoalojamiento, se encarga de consumir los datos de la propiedad
    // alojamientoService que se encarga de traer los alojamientos desde nuestra API
    // y este a su vez accede al método ObternerAlojamientos(), para obtener los datos registrados
    const resp = this.alojamientoService.ObtenerAlojamientos();
    resp.subscribe(report => this.dataSource.data = report as Alojamiento[]);
  }

  eliminarAlojamiento(id: number): any {
    this.alojamientoService.BorrarAlojamiento(id)
      .subscribe(
        data => {
          this.success = true;
          console.log('Se elimino el alojamiento');
          this.CargarDatosAlojamiento();
          console.log(data);
        },
        error => console.log('Hubo un fallo al momento de eliminar el dato' + error)
      );
  }
}
