import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteWAService {

  /*Url del servidor */
  DJANGO_SERVER: string = "http://127.0.0.1:8000/api/usuarioRegistro";
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
}
