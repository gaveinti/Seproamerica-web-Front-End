import { Component, OnInit } from '@angular/core';
import { from, VirtualTimeScheduler } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ClienteWAService } from '../services/cliente-wa.service';
import { AuthService } from '../services/auth.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  user: RegisterModel = new RegisterModel();
  direccion: string = 'a@a.com';
  fechaRegistro: string = '2000-09-01';
  rol: string ='11';

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;
  terminosAceptados: boolean = false;
  ppp: boolean = false;
  //varComb: boolean = this.varPUno && this.varPDos;

  terminosValidados: boolean = false;

  registerForm!: FormGroup;
  hide = true;
  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  constructor(private formBuilder: FormBuilder, private clienteWAService: ClienteWAService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.user.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'nombres': [this.user.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'cedula': [this.user.cedula, [Validators.required, Validators.pattern("^[0-9]*$")]],
      'fechaNac': '2000-09-01',
      'sexo': [this.user.sexo, [Validators.required]],
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'telefono': [this.user.telefono, [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      'contrasenha': [this.user.contrasenia, [Validators.required]],
    });
    this.validarTerminosyCondiciones();
    this.permitirRegistro();
  }

  onRegisterSubmit(){
    /*alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
    this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenia + ' ' +  this.direccion + ' ' +
    this.fechaRegistro + ' ' + this.rol);*/
  }

  /*Función para guardar usuario nuevo que se registre */
  guardarUsuario(): void {
    this.camposCompletos = !this.registerForm.invalid;
    const data = {
      apellidos : this.user.apellidos,
      nombres : this.user.nombres,
      cedula : this.user.cedula,
      fechaNac : this.user.fechaNac,
      sexo : this.user.sexo,
      correo : this.user.correo,
      telefono : this.user.telefono,
      contrasenia : this.user.contrasenia,

      direccion : this.user.correo,
      rol : '11'
    };
    console.log("entra")
    console.log(data)
    console.log("Campos completos: "+this.camposCompletos)
    console.log("Terminos aceptados:")
    this.validarAceptacionDeTerminos();
    //Se han completado los campos y se han aceptado los términos de la empresa
    if(this.camposCompletos && this.terminosAceptados){
      this.clienteWAService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            alert("Cuenta creada exitosamente")
            this.registerForm.reset()
          },
          error: (e) => console.error(e)
        });
    } else{
      alert("Debe completar los campos y aceptar los términos y condiciones")
    }
    if(this.submitted){
      console.log("Datos guardados")
    } else {
      console.log("Datos no guardados")
    }
  }/*
  nuevoUsuario(): void {
    this.submitted = false;
    this.user = {

    }
  }*/

  validarTerminosyCondiciones(): void{
    var checkBox = document.getElementById("invalidCheck") as HTMLInputElement | null;
    if(checkBox?.checked == true){
      console.log("checkeado")
      this.terminosValidados = true;
    }  
  }

  permitirRegistro(): void{
    console.log("entra a fucnion")
    var botonRegistro = document.querySelector("#botonRegistro") as HTMLInputElement | null;
    /*Caso en el que se deba habilitar el boton */
    if(!this.registerForm  && !this.terminosValidados){
      if(botonRegistro != undefined){
        console.log("se ha habilitado el boton")
        botonRegistro.disabled = false;
      }
    } else{
      if(botonRegistro != undefined){
        console.log("boton deshabilitado")
        console.log(this.registerForm)
        console.log(this.terminosValidados)
        botonRegistro.disabled = false;
      }
    }
  }

  validarAceptacionDeTerminos(){
    const varValid = document.querySelector('#invalidCheck') as HTMLInputElement | null;
    if(varValid != null){
      this.terminosAceptados = varValid.checked
      console.log(varValid.checked);
    }
  }

}
