import { Injectable } from '@angular/core';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { BehaviorSubject, Subject } from 'rxjs';
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
  [x: string]: any;

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
  //sesionIniciada: boolean = false;
  sesionIniciada = new Subject<boolean>()

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


  //Metodo usado para indicar que se ha iniciado sesion y dicha variable enviarla al guard
  loginDos(){
    this.sesionIniciada.next(true)
    console.log(this.sesionIniciada)
  }

  logout(){
    this.sesionIniciada.next(false)
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
    this.sesionIniciada.next(false)
  }


}
