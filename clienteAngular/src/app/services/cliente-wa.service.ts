import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteWAService {

  /*Url del servidor */
  DJANGO_SERVER: string = "http://127.0.0.1:8000/api/usuarioRegistro";
  DJANGO_SERVER_INICIO_SESION: string = "http://127.0.0.1:8000/api/usuarioInicioSesion";
  constructor(private http: HttpClient) { }

  /*public upload(formData){
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }*/

  /* Metodo para mandar un usuario que inicia sesion al back end */
  /*El link de usuarioInicioSesion se encuentra en url.py de clientewa 
  addUsuarioIS(val:any){
    return this.http.post(this.DJANGO_SERVER + '/usuarioInicioSesion/',val);
  }*/
  
  /*Basandome en la pagina https://www.bezkoder.com/angular-crud-app/ */
  create(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER, data)
  }

  /*Basandome en  https://www.bezkoder.com/django-angular-crud-rest-framework/*/
  get(correo: any){
    return this.http.get(`${this.DJANGO_SERVER_INICIO_SESION}/${correo}`);
  }
}
