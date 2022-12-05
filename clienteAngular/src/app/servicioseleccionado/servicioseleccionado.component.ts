import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective } from '@angular/forms';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
import { FormularioServicio } from '../models/formularioServicio';
import * as moment from "moment";
import { Router } from '@angular/router';
import { Constantes } from '../util/constantes';



@Component({
  selector: 'app-servicioseleccionado',
  templateUrl: './servicioseleccionado.component.html',
  styleUrls: ['./servicioseleccionado.component.css']
})
export class ServicioseleccionadoComponent implements OnInit {

  fechaActual = moment().format('DD/MM/YYYY')
  estaEnSErvicioSeleccionado!: boolean;
  usuario: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: '',
    rol:'2'
  };

  nombreServicio: string | null = "";

  servicio: FormularioServicio = new FormularioServicio();

  registerForm!: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private servicioSeleccionadoService: ServicioseleccionadoService,
    ) { }

  ngOnInit(): void {
    this.servicioSeleccionadoService.estaEnSErvicioSeleccionado=true
    console.log("esta seleccionado?: " + this.servicioSeleccionadoService.estaEnSErvicioSeleccionado)

    this.nombreServicio = this.servicioSeleccionadoService.nombreServicioEscogidoComponente()
    if(localStorage.getItem("servicio") != null){
       this.nombreServicio = localStorage.getItem("servicio")
    }
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("datoUsuario")
    console.log(data)
    this.usuario = this.authService.getUsuario();
    this.registerForm = this.formBuilder.group({
      'fechaInicio': [],
      'fechaFinalizacion': [],
      'horaInicio': [],
      'horaFinalizacion': [],
      'numeroEmpleados': [],
    });
    console.log(this.fechaActual)
  }

  ngOnDestroy(){
    this.servicioSeleccionadoService.estaEnSErvicioSeleccionado=false
    console.log("salio del componente")
    console.log("esta seleccionado?: " + this.servicioSeleccionadoService.estaEnSErvicioSeleccionado)

  }

  
}
