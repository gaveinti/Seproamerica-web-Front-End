import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { GuardService } from '../services/guard.service';
import { ServiceModel } from '../models/servicio';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  listaServicios: ServiceModel[] = [
    { nombre: "Custodia Armada"},
    { nombre: "Transporte de productos"},
    { nombre: "Chofer seguro"},
    { nombre: "Guardia de seguridad"}
  ];

  listaOpciones: [string, string][] = [
    ["/", "Servicios"],
    ["/", "Historial de servicios"],
    ["/", "Carrito"],
    ["/", "Tarjetas"],
    ["/", "Escanear código"],
    ["/", "Sucursales"],
    ["/informacion", "Información general"]
  ];

  //sesionIniciada: boolean = true;

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

  data: string = "";

  constructor(private authService: AuthService, private guardS: GuardService) {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
   }

  ngOnInit(): void {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();

    //let d = this.authService.obtenerLocalStorage("23")
    //this.usuario = this.authService.getUsuario();
  }

  /*resetearUsuario(): void{
    this.sesionIniciada = false;
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
  
    this.authService.reseteoUsuario();
  }*/

}
