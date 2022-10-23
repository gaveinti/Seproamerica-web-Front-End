import { Injectable } from '@angular/core';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError} from "rxjs";
import { map, catchError} from 'rxjs/operators';

import { ClienteWAService } from './cliente-wa.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { InicioSesionModel } from '../models/inicioSesion.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  usuario: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: ''
  };

  constructor() { }


  //log
  sesionIniciada: boolean = false;

  //Este valor pasa al guard y de manera muy rapida. La solucion deberia enfocarse en hacer que esta parte corra luego de los if de la linea 111 de inicio sesion componente
  sesionValidada: boolean = true;

  //Para el registro (validacion)
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    cedula: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    sexo: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
    contrasenia: new FormControl(''),
    esPermanente: new FormControl(false)
  });

  /*Metodos para mantenerse en sesion iniciada o cerrarla
  login(authData: InicioSesionModel, correoU: any): Observable<RegisterModel | void>{
    return this.http.post<RegisterModel>(`${this.clienteWservice.DJANGO_SERVER_INICIO_SESION}/${correoU}`, authData)
    .pipe(
      map( (res:RegisterModel) => {
        console.log('Res =>', res)
      }),
      catchError( (err) => this.handlerError(err))
    );
  }*/

  loginDos(){
    this.sesionIniciada = true;
  }

  logout(){
    this.sesionIniciada = false;
  }

  estaAutenticado(){
    return this.sesionIniciada;
  }

  //Método para probar paso de datos a componente principal
  getUsuario(){
    return this.usuario;
  }

  /*Metodo para obtener el usuario del inicio de sesion */
  infoPutUsuario(usuarioIS: RegisterModel){
    this.usuario = usuarioIS;
  }

  /*Metodo para enviar datos de usuario a distintos componentes */
  enviarUsuario(){
    return this.usuario;
  }

  //Metodo para resetear usuario
  reseteoUsuario(){
    this.usuario = {
      apellidos: '',
      nombres: '',
      cedula: 0,
      fechaNac: new Date(),
      sexo: '',
      correo: '',
      telefono: 0,
      contrasenia: ''
    };
    this.sesionIniciada = false;
  }

  /*
  private readToken(): void{}
  private saveToken(): void{}
  private handlerError(err: { message: any; }): Observable<never>{
    let mensajeError = "Un error ocurrio al devolver los datos";
    if(err){
      mensajeError = `Error: código ${err.message}`;
    }
    window.alert(mensajeError)
    return throwError(mensajeError);
  }*/

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return false;
  }*/
 /* private approvalStageMessage = new BehaviorSubject(true);
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();*/


  /*updateApprovalMessage(message: boolean) {
    this.approvalStageMessage.next(message)
  }*/

  //Funcion para el componente que envia
  /*esValidado(iniciosesionValidar: boolean){
    
    this.sesionValidada = iniciosesionValidar;
    console.log("Servicio validado")
    console.log("servicio validado: "+this.sesionValidada)

  }

  //Funcion para el componente que recibe
  obtenerValidacion(){
    return this.sesionValidada;
  }*/

}
