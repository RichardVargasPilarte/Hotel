import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Alojamiento } from '../Models/alojamientos';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {
  private endpoint = 'http://127.0.0.1:8000/Hotel_Django/Alojamientos/';
  constructor(private http: HttpClient) { }

  // Metodo GET - Listar todos los alojamientos
  ObtenerAlojamientos(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  // Metodo POST - Agregar un nuevo alojamiento
  Agregar(alojamientos: Alojamiento): Observable<object> {
    return this.http.post(this.endpoint, alojamientos);
  }

  // Metodo GET - Para obtener un solo dato mediante su Id
  ObtenerUnAlojamiento(id: number): Observable<any> {
    return this.http.get(this.endpoint + id);
  }

  // Metodo PUT - Para actualizar un dato mediante su Id
  ActualizarAlojamiento(id: number, payload: any): Observable<object> {
    return this.http.put(this.endpoint + id, payload);
  }

  // Metodo DELETE - Para eliminar un dato mediante su Id
  BorrarAlojamiento(id: number): Observable<any> {
    return this.http.delete(this.endpoint + id);
  }

  EncontrarAlojamiento(term: string): Observable<Alojamiento[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Alojamiento[]>(`${this.endpoint}?nombre_al=${term}`).pipe(
      tap(_ => console.log(`alojamientos encontrados que coinciden "${term}"`))
    );
  }
}
