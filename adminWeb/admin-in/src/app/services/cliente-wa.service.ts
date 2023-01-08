import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { SucursalModel } from '../models/sucursal.model';
import { Administrador_Obtener_Model } from '../models/admin_Obtener';
import { TiposServiciosModel } from '../models/tipoServicio.model';
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

  DJANGO_SERVER_REGISTRO_ADMIN: string = "http://127.0.0.1:8000/api/personalAdminRegistro";
  DJANGO_SERVER_OBTENER_SUCURSALES: string = "http://127.0.0.1:8000/api/visualizarSucursales";
  DJANGO_SERVER_OBTENER_ADMINISTRADOR: string = "http://127.0.0.1:8000/api/obtenerAdministrador";
  DJANGO_SERVER_REGISTRO_PersonalOp: string = "http://127.0.0.1:8000/api/personalOperativoRegistro";
  DJANGO_SERVER_OBTENER_TIPOSSERVICIOS: string = "http://127.0.0.1:8000/api/visualizarTiposServicios";
  DJANGO_SERVER_CREAR_SERVICIO: string = "http://127.0.0.1:8000/api/crearServicio";
  DJANGO_SERVER_OBTENER_SERVICIOS: string = "http://127.0.0.1:8000/api/obtenerServicio";
  DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR: string = "http://127.0.0.1:8000/api/servicio_seleccionar_actualizar_eliminar";
  
  constructor(private http: HttpClient) { }

  
  /*Basandome en la pagina https://www.bezkoder.com/angular-crud-app/ */
  create(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER, data)
  }

  registrar_administrador(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER_REGISTRO_ADMIN, data)
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

  //Request para obtener informacion de las sucursales 
  obtener_Sucursales(): Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(this.DJANGO_SERVER_OBTENER_SUCURSALES);
  }

  //Request para obtener un administrador a partir d su cédula
  obtener_Administrador(cedula_administrador: any): Observable<Administrador_Obtener_Model>{
    return this.http.get<Administrador_Obtener_Model>(`${this.DJANGO_SERVER_OBTENER_ADMINISTRADOR}/${cedula_administrador}`)
  }

  registrar_personalOp(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER_REGISTRO_PersonalOp, data)
  }

  //Request para obtener los tipos de servicios por tarifa
  obtener_Tipos_Servicios(): Observable<TiposServiciosModel[]>{
    return this.http.get<TiposServiciosModel[]>(this.DJANGO_SERVER_OBTENER_TIPOSSERVICIOS);
  }

  //Request para poder crear un servicio
  crear_Servicio(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER_CREAR_SERVICIO, data)
  }

  //Request para obtener lista de los servicios ya creados
  obtener_servicios_creados(): Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>(this.DJANGO_SERVER_OBTENER_SERVICIOS);
  }

  //Request para actualizar servicio
  actualizar_servicio(servicio_nombre: any, data: any): Observable<any> {
    return this.http.put(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${servicio_nombre}/`, data);
  }

  //Request para eliminar servicio
  eliminar_servicio(servicio_nombre: any): Observable<any> {
    return this.http.delete(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${servicio_nombre}`)
  }

  //Request para obtener servicio especifico
  seleccionar_servicio(nombre_servicio_seleccionar: any): Observable<ServiceModel>{
    return this.http.get<ServiceModel>(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${nombre_servicio_seleccionar}`)
  }

}