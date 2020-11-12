import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlojamientosService } from '../../../services/alojamientos.service';
import { Alojamiento } from '../../../Models/alojamientos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-alojamientos',
  templateUrl: './formulario-alojamientos.component.html',
  styleUrls: ['./formulario-alojamientos.component.scss']
})
export class FormularioAlojamientosComponent implements OnInit {

  alojamientos: Alojamiento = new Alojamiento();
  datos: any;
  alojamientosId: number;
  success = false;
  constructor(private formBuilder: FormBuilder,
              private alojamientoServicio: AlojamientosService,
              private router: Router,
              private activatedRouted: ActivatedRoute) {
  }

  alojamientosForms = this.formBuilder.group({
    id: new FormControl(null),
    nombre_al: new FormControl('', [Validators.required, Validators.minLength(8)]),
    descripcion_al: new FormControl('', [Validators.required, Validators.minLength(10)]),
    tiempo_estadia: new FormControl('', [Validators.required, Validators.minLength(2)]),
    eliminado: new FormControl('NO')
  });

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(
      params => {
        this.alojamientosId = Number(params.get('id'));
      }
    );
    this.ObtenerDatos();
  }

  // Metodo encargado de cargar los datos al momento de actualizar
  ObtenerDatos(): void {
    this.alojamientoServicio.ObtenerUnAlojamiento(this.alojamientosId).subscribe(
      data => {
        console.log(data);
        this.alojamientosForms.setValue(data);
      }
    );
  }

  // Metodo encargado de llamar al metodo guardar y actualizar
  onSubmit(): any {
    console.log(this.alojamientosForms.value);
    this.GuardarAlojamiento();
  }

  // Metodo encargado de guardar y actualizar alojamientos
  GuardarAlojamiento(): void {
    // Metodo encargado de guardar
    // En caso que alojamientosId sea igual a cero, se procede a crear el registro
    if (this.alojamientosId === null ) {
      console.log(this.alojamientosForms.value);
      this.alojamientoServicio.Agregar(this.alojamientosForms.value)
        .subscribe(
          data => {
            this.success = true;
            console.log('Se creo un alojamiento nuevo');
            console.log(data);
            this.router.navigate(['Alojamientos/Listado']);
          },
          error => console.log('Hubo un error' + error)
        );
      // Metodo encargado de actualizar
      // En caso que alojamientosId sea distinto a cero, se procede a
      // actualizar el registro según el id que posea
    } else if (this.alojamientosId !== null) {
      this.alojamientoServicio.ActualizarAlojamiento(this.alojamientosId,
          this.alojamientosForms.value).subscribe(
        data => {
          this.datos = data;
          this.success = true;
          this.alojamientosForms.patchValue({
            nombre_al: this.datos.nombre_al,
            descripcion_al: this.datos.descripcion_al,
            tiempo_estadia: this.datos.tiempo_estadia,
          });
          this.router.navigate(['Alojamientos/Listado']);
        }
      );
    }
  }
}


