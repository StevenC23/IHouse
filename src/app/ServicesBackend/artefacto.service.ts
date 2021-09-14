import { Observable } from 'rxjs';
import { Artefacto } from './../Model/artefacto';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtefactoService {

  url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = environment.url + 'artefacto/'
  }

  public crearArtefacto(artefacto: Artefacto): Observable<any> {
    return this.httpClient.post(this.url + 'crearArtefacto', artefacto);
  }

  public consultarArtefactosPorUsuario(usuaId: number): Observable<any> {
    return this.httpClient.post(this.url + 'consultarArtefactosPorUsuario', usuaId);
  }

  public eliminarArtefacto(artefacto: Artefacto): Observable<any> {
    return this.httpClient.post(this.url + 'eliminarArtefacto', artefacto);
  }
}
