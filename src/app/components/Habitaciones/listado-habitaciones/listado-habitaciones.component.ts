import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../../../services/habitaciones.service';
import { AlojamientosService } from '../../../services/alojamientos.service';
import { Habitacion } from '../../../Models/habitaciones';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listado-habitaciones',
  templateUrl: './listado-habitaciones.component.html',
  styleUrls: ['./listado-habitaciones.component.scss']
})
export class ListadoHabitacionesComponent implements OnInit {
  ELEMENT_DATA: Habitacion[] = [];

  success = false;

  displayedColumns: string[] = ['id', 'nombre_hab', 'nombre_al', 'numero_personas', 'precio', 'activo', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private habitacionservice: HabitacionesService,
              private alojamientoService: AlojamientosService) { }

  ngOnInit(): void {
    this.datoshabitacion();
  }

  // Metodo encargado de listar las habitaciones
  datoshabitacion(): void {
    const resp = this.habitacionservice.ListadoHabitaciones();
    resp.subscribe(report => this.dataSource.data = report as Habitacion[]);
  }

  // Metodo encargado de eliminar las habitaciones mediante su Id
  eliminarhabitacion(id: number): any {
    // La propiedad alojamientoService, se encarga de acceder al metodo BorrarHabitacion
    // que se encuentra en habitaciones.service.ts, y recibe un id para eliminar una habitacion
    // mediante habitacionservice que se encarga de llamar al metodo eliminar de nuestra API

    this.habitacionservice.BorrarHabitacion(id)
      .subscribe(
        data => {
          this.success = true;
          console.log('Se elimino la habitación');
          this.datoshabitacion();
          console.log(data);
        },
        error => console.log('Hubo un fallo al momento de eliminar el dato' + error)
      );
  }
}

