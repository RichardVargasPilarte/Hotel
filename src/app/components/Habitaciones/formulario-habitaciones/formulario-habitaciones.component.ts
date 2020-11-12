import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HabitacionesService } from '../../../services/habitaciones.service';
import { AlojamientosService } from '../../../services/alojamientos.service';
import { Habitacion } from '../../../Models/habitaciones';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-habitaciones',
  templateUrl: './formulario-habitaciones.component.html',
  styleUrls: ['./formulario-habitaciones.component.scss']
})
export class FormularioHabitacionesComponent implements OnInit {

  habitaciones: Habitacion = new Habitacion();
  AlojamientosCargados = null;
  success = false;
  datos: any;
  habitacionesId: number;
  EstadoHabitaciones: string[] = ['Disponible', 'Reservada', 'Fuera de Servicio'];

  constructor(private formBuilder: FormBuilder,
              private habitacionServicio: HabitacionesService,
              public alojamientoServicio: AlojamientosService,
              private router: Router,
              private activatedRouted: ActivatedRoute) { }

  HabitacionesForms = this.formBuilder.group({
    id: new FormControl(null),
    nombre_hab: new FormControl('', [Validators.required, Validators.minLength(5)]),
    descripcion_hab: new FormControl('', [Validators.required, Validators.minLength(15)]),
    precio: new FormControl('', [Validators.required, Validators.minLength(2)]),
    activo: new FormControl('', Validators.required),
    numero_personas: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nombre_al: new FormControl('', Validators.required),
    eliminado: new FormControl('NO')
  });

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(
      params => {
        this.habitacionesId = Number(params.get('id'));
      }
    );
    console.log(this.EstadoHabitaciones);
    this.CargarDatosAlojamiento();
    this.ObtenerDatos();
  }

  // Metodo encargado de cargar los datos al momento de actualizar
  ObtenerDatos(): void {
    this.habitacionServicio.ObtenerUnaHabitacion(this.habitacionesId).subscribe(
      data => {
        console.log(data);
        this.HabitacionesForms.setValue(data);
      }
    );
  }

  // Metodo encargado de llamar al metodo guardar y actualizar
  onSubmit(): any {
    console.log(this.HabitacionesForms.value);
    this.GuardarHabitacion();
  }

  // Metodo encargado de guardar y actualizar las habitaciones
  GuardarHabitacion(): void {
    // Metodo encargado de guardar
    // En caso que habitacionesId sea igual a cero, se procede a crear el registro
    if (this.habitacionesId === null) {
      console.log(this.HabitacionesForms.value);
      this.habitacionServicio.Agregar(this.HabitacionesForms.value)
        .subscribe(
          data => {
            this.success = true;
            console.log('Se creo una habitacion nueva');
            console.log(data);
            this.router.navigate(['Habitaciones/Listado']);
          },
          error => console.log('Hubo un error al registrar la habitacion' + error),
        );
      // Metodo encargado de actualizar
      // En caso que habitacionesId sea distinto a cero, se procede a
      // actualizar el registro según el id que posea
    } else if (this.habitacionesId !== null) {
      this.habitacionServicio.ActualizarHabitacion(this.habitacionesId,
        this.HabitacionesForms.value).subscribe(
          data => {
            this.datos = data;
            this.HabitacionesForms.patchValue({
              nombre_hab: this.datos.nombre_hab,
              descripcion_hab: this.datos.descripcion_hab,
              precio: this.datos.precio,
              activo: this.datos.activo,
              numero_personas: this.datos.numero_personas,
              nombre_al: this.datos.nombre_al,
            });
            this.router.navigate(['Habitaciones/Listado']);
          }
        );
    }
  }

  // Metodo encargado de listar los alojamientos
  CargarDatosAlojamiento(): void {
    // La propiedad alojamientoServicio accede al metodo ObtenerAlojamientos()
    // del servicio alojamientos luego nos suscribimos con subscribe, declaramos
    // un parametro de nombre data de tipo any, en donde a la propiedad alojamientos_cargados
    // se le asignaran los datos que obtuvo data

    // this.listadoalojamiento = this.alojamientoServicio.ObtenerAlojamientos();
    this.alojamientoServicio.ObtenerAlojamientos()
      .subscribe(
        data => {
          this.AlojamientosCargados = data;
          console.log(data);
        }
      );
  }
}

