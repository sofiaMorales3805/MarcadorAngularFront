import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../servicios/global';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  username: string;
  roleName: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = `${Global.url}/usuarios`;

  constructor(private http: HttpClient) {}

  listar(params: any = {}): Observable<{ items: Usuario[], total: number }> {
    return this.http.get<{ items: Usuario[], total: number }>(this.url, { params });
  }

  crear(usuario: { username: string; password: string; roleId: number }): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  actualizar(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${id}`, usuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
