import { Injectable } from '@angular/core';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

 /* private approvalStageMessage = new BehaviorSubject(true);
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();*/

  constructor() { }

  /*updateApprovalMessage(message: boolean) {
    this.approvalStageMessage.next(message)
  }*/

  //Funcion para el componente que envia
  esValidado(iniciosesionValidar: boolean){
    
    this.sesionValidada = iniciosesionValidar;
    console.log("Servicio validado")
    console.log("servicio validado: "+this.sesionValidada)

  }

  //Funcion para el componente que recibe
  obtenerValidacion(){
    return this.sesionValidada;
  }

}
