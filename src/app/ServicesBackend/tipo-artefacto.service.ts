import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoArtefactoService {

  url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = environment.url + 'tipoArtefacto/'
  }

  public consultarTipoArtefactosActivos(): Observable<any> {
    return this.httpClient.get(this.url + 'consultarTipoArtefactoActivos');
  }

  
}
