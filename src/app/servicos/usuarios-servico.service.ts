import { Usuarios } from './../models/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServicoService {

  private readonly urlAPI = '/assets/usuarios.json';

  constructor(private http: HttpClient) { }

  listagemUsuarios() {
    return this.http.get<Usuarios[]>(this.urlAPI)
    .pipe(
      first(),
      delay(500),
      tap(apiUsuarios => console.log(apiUsuarios))
    )
  }

  pesquisar(query: string) {
    return this.http.get<Usuarios[]>(this.urlAPI)
    .pipe(
      map((resp) => resp.find(g => (g.nome.toLowerCase()).startsWith(query.toLowerCase())))
    )
  }
}
