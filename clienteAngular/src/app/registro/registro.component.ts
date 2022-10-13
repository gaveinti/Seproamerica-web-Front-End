import { Component, OnInit } from '@angular/core';
import { from, VirtualTimeScheduler } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ClienteWAService } from '../services/cliente-wa.service';

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

  terminosValidados: boolean = false;

  registerForm!: FormGroup;
  hide = true;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private clienteWAService: ClienteWAService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.user.apellidos, [Validators.required]],
      'nombres': [this.user.nombres, [Validators.required]],
      'cedula': [this.user.cedula, [Validators.required]],
      'fechaNac': '2000-09-01',
      'sexo': [this.user.sexo, [Validators.required]],
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'telefono': [this.user.telefono, [Validators.required]],
      'contrasenha': [this.user.contrasenha, [Validators.required]],
    });
    this.validarTerminosyCondiciones();
    this.permitirRegistro();
  }

  onRegisterSubmit(){
    alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
    this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenha + ' ' +  this.direccion + ' ' +
    this.fechaRegistro + ' ' + this.rol);
  }

  /*Función para guardar usuario nuevo que se registre */
  guardarUsuario(): void {
    const data = {
      apellidos : this.user.apellidos,
      nombres : this.user.nombres,
      cedula : this.user.cedula,
      fechaNac : this.user.fechaNac,
      sexo : this.user.sexo,
      correo : this.user.correo,
      telefono : this.user.telefono,
      contrasenia : this.user.contrasenha,

      direccion : this.user.correo,
      rol : '11'
    };
    console.log("entra")
    console.log(data)
    /*El problema empieza aqui */
    this.clienteWAService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
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

}
