import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuario } from '../Models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endpoint = 'http://127.0.0.1:8000/Hotel_Django/Usuarios/';
  constructor(private http: HttpClient) { }

  // Metodo GET - Listar todos los alojamientos
  ObtenerUsuarios(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  // Metodo POST - Agregar un nuevo alojamiento
  Agregar(usuarios: Usuario): Observable<object> {
    return this.http.post(this.endpoint, usuarios);
  }

  // Metodo GET - Para obtener un solo dato mediante su Id
  ObtenerUnUsuario(id: number): Observable<any> {
    return this.http.get(this.endpoint + id);
  }

  // Metodo PUT - Para actualizar un dato mediante su Id
  ActualizarUsuario(id: number, payload: any): Observable<object> {
    return this.http.put(this.endpoint + id, payload);
  }

  // Metodo DELETE - Para eliminar un dato mediante su Id
  BorrarUsuario(id: number): Observable<any> {
    return this.http.delete(this.endpoint + id);
  }
}

