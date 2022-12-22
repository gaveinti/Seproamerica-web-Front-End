import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { ServiceModel } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ClienteWAService {
  //"http://127.0.0.1:8000/api/usuarioRegistro";
  //"http://127.0.0.1:8000/api/usuarioInicioSesion";
  /*
  "https://seproamerica2022.pythonanywhere.com/api/usuarioRegistro";
  "https://seproamerica2022.pythonanywhere.com/api/usuarioInicioSesion";
   */
  /*Url del servidor */
  //DJANGO_SERVER: string = "https://seproamerica2022.pythonanywhere.com/api/usuarioRegistro";
  //DJANGO_SERVER_INICIO_SESION: string = "https://seproamerica2022.pythonanywhere.com/api/usuarioInicioSesion";
  /*Url para desarrolllo */
  DJANGO_SERVER: string = "http://127.0.0.1:8000/api/usuarioRegistro";
  DJANGO_SERVER_INICIO_SESION: string = "http://127.0.0.1:8000/api/usuarioInicioSesion";
  DJANGO_SERVER_SERVICIOS: string = "http://127.0.0.1:8000/api/obtenerServicio";
  
  constructor(private http: HttpClient) { }

  
  /*Basandome en la pagina https://www.bezkoder.com/angular-crud-app/ */
  create(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER, data)
  }

  /*Basandome en  https://www.bezkoder.com/django-angular-crud-rest-framework/*/
  get(correoU: any): Observable<RegisterModel>{
    return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}`);
  }

  encontrarCorreo(correoU: any): Observable<RegisterModel>{
    return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}?correo=${correoU}`)
  }

  /*Basandome en  https://www.bezkoder.com/django-angular-mysql/*/
  update(correoU: any, data: any): Observable<any> {
    return this.http.put(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}/`, data);
  }

  //Request para obtener informacion de los servicios que ofrece Seproamerica
  obtener_Servicios(): Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>(this.DJANGO_SERVER_SERVICIOS);
  }

}
