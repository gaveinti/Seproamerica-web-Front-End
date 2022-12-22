import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import * as moment from "moment";
import { InfPersonalService } from '../services/inf-personal.service';

@Component({
  selector: 'app-personal-registro',
  templateUrl: './personal-registro.component.html',
  styleUrls: ['./personal-registro.component.css']
})
export class PersonalRegistroComponent implements OnInit {
/*
  constructor() { }

  ngOnInit(): void {
  }
*/
  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";

  title = 'email-validation-tutorial';
  userEmail = new FormControl({
    correo: new FormControl('',[
      Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      secondaryEmail: new FormControl('',[
        Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  
  user: RegisterModel = new RegisterModel();
  fechaRegistro: string = '2000-09-01';
  rol: string ='2';

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;
  ppp: boolean = false;
  //varComb: boolean = this.varPUno && this.varPDos;

  registerForm!: FormGroup;
  hide = true;
  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  esMayorEdad: boolean = false;
  p: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private _infPersonalService: InfPersonalService,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.user.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'nombres': [this.user.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'cedula': [this.user.cedula, [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      'fechaNac': [this.user.fechaNac, []],
      'sexo': [this.user.sexo, [Validators.required]],
      'correo': [this.user.correo, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],
      'telefono': [this.user.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]],
      //'direccion': [this.user.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],

    });
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
      direccion : this.user.correo,
      rol : '3'
    };
    console.log("entra")
    console.log(data)
    console.log("Fecha valida:" )
    console.log("Campos completos: "+this.camposCompletos)
    console.log("Terminos aceptados:")
    //Se han completado los campos y se han aceptado los términos de la empresa
    /*
    if(this.camposCompletos){
      this._infPersonalService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            alert("Cuenta creada exitosamente")
            this.registerForm.reset()
          },
          error: (e) => {
          console.error(e.error.cedula)
          this.mensajeError = e.error.cedula
          this.mensajeErrorCorreo = e.error.correo
          if(this.mensajeError != undefined){
            console.log(this.mensajeError)
            alert(this.mensajeError)
          }
          if(this.mensajeErrorCorreo != undefined){
            console.log(this.mensajeErrorCorreo)
            alert(this.mensajeErrorCorreo)

          }
          }
        });
    } else{

      alert("Debe completar los campos")
    }
    */
    if(this.submitted){
      console.log("Datos guardados")
    } else {
      console.log("Datos no guardados")
    }
  }


  permitirRegistro(): void{
    console.log("entra a fucnion")
    var botonRegistro = document.querySelector("#botonRegistro") as HTMLInputElement | null;
    /*Caso en el que se deba habilitar el boton */
    if(!this.registerForm ){
      if(botonRegistro != undefined){
        console.log("se ha habilitado el boton")
        botonRegistro.disabled = false;
      }
    } else{
      if(botonRegistro != undefined){
        console.log("boton deshabilitado")
        console.log(this.registerForm)
        botonRegistro.disabled = false;
      }
    }
  }

   /*validar si fecha escogida indica si usuario es mayor de edad */
  validacionFecha(control: any){

    console.log(control)
    if(control){
      const date = moment(control).format('DD-MM-YYYY')
      console.log("Fecha introducida: " + date)
      const diaEscogido: number = parseInt(date.split('-')[0])
      const mesEscogido: number = parseInt(date.split('-')[1])
      const anioEscogido: number = parseInt(date.split('-')[2])
      const today = moment().format('DD-MM-YYYY')
      console.log("Fecha de hoy: " + today)
      const diaActual: number = parseInt(today.split('-')[0])
      const mesActual: number = parseInt(today.split('-')[1])
      const anioActual: number = parseInt(today.split('-')[2])
      const restaAnio = anioActual - anioEscogido
      const restaMes = mesActual - mesEscogido
      const restaDia = diaActual - diaEscogido
      if(restaAnio > 18){
        console.log("Es mayor de edad")
        this.esMayorEdad=true
        console.log("conf",this.esMayorEdad)
        return null
      }
      if ((restaAnio == 18) && (restaMes >= 0) && (restaDia >= 0)){
        console.log("Es mayor de edad")
        this.esMayorEdad=true
        console.log("conf",this.esMayorEdad)

        return null/*{ 'validDate': true}*/
      }
      this.esMayorEdad=false
    }
    this.esMayorEdad=false
    console.log("conf",this.esMayorEdad)

    let mensajeError = "Debe ser mayor de edad"
    console.log("No es mayor de edad")
    //this.esMayorEdad=false
    return mensajeError/*{'validDate': false};*/
  }

}
