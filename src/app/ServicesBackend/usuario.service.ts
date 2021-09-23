import { Usuario } from './../Model/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = environment.url + 'usuario/'
  }

  public crearUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post(this.url + 'crearUsuario', usuario);
  }

  public consultarUsuario(id: number): Observable<any> {
    return this.httpClient.post(this.url + 'consultarUsuario', id);
  }

  public consultarUsuarios(usuario: Usuario): Observable<any> {
    return this.httpClient.post(this.url + 'consultarUsuarios', usuario);
  }

  public actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post(this.url + 'actualizarUsuario', usuario);
  }
  
  public consultarUsuariosPorCodigoOrm(codigo: String): Observable<any> {
    return this.httpClient.post(this.url + 'consultarUsuariosPorCodigoOrm', codigo);
  }

  public validarUsuarioYContraseñaCorrecta(usuario): Observable<any>{
    return this.httpClient.post(this.url + 'validarUsuarioYContraseñaCorrecta',usuario );
  }
  
  public actualizarEnviarContraseña(correo): Observable<any>{
    return this.httpClient.post(this.url + 'actualizarEnviarContraseña',correo );
  }

}
 