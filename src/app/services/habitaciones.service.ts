import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Habitacion } from '../Models/habitaciones';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private endpoint = 'http://127.0.0.1:8000/Hotel_Django/Habitaciones/';
  private endpoint_alojamientos = 'http://127.0.0.1:8000/Hotel_Django/Alojamientos/';

  constructor(private http: HttpClient) { }

  // Metodo GET - Listar todos las habitaciones
  ListadoHabitaciones(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  // Metodo GET - Para cargar todos los alojamientos
  // que no esten eliminados en el select
  CargarAlojamientos(): Observable<any> {
    return this.http.get(this.endpoint_alojamientos).pipe(
      map(
        (data: any) => {
          return data.nombre_al;
        }
      )
    );
  }

  // Metodo POST - Agregar una nueva habitacion
  Agregar(habitaciones: Habitacion): Observable<object> {
    return this.http.post(this.endpoint, habitaciones);
  }

  // Metodo GET - Para obtener un solo dato mediante su Id
  ObtenerUnaHabitacion(id: number): Observable<any> {
    return this.http.get(this.endpoint + id);
  }

  // Metodo PUT - Para actualizar un dato mediante su Id
  ActualizarHabitacion(id: number, payload: any): Observable<object> {
    return this.http.put(this.endpoint + id, payload);
  }

  // Metodo DELETE - Para eliminar un dato mediante su Id
  BorrarHabitacion(id: number): Observable<any> {
    return this.http.delete(this.endpoint + id);
  }
}
