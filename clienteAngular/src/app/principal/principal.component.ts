import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { GuardService } from '../services/guard.service';
import { ServiceModel } from '../models/servicio';
import { CookieService } from 'ngx-cookie-service';


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

  constructor(private authService: AuthService, private guardS: GuardService, private cookieService: CookieService) {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
   }

  ngOnInit(): void {
    //this.autoLogin()
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();

    //let d = this.authService.obtenerLocalStorage("23")
    //this.usuario = this.authService.getUsuario();
  }

  /*autoLogin(){
    let datoUsuario: {apellidos: String; cedula:Number; contrasenia: String; 
      correo:String; direccion: string; fechaNac: Date; fechaRegistro: Date; 
      nombres: String; rol: Number; sexo: String; telefono: Number} = JSON.parse(localStorage.getItem('datoUsuario') as string);
    if(!datoUsuario){
      return;
    }

    let usuarioDeLocalStorage : RegisterModel = {
      apellidos: datoUsuario.apellidos,
      nombres: datoUsuario.nombres,
      cedula: datoUsuario.cedula,
      fechaNac: datoUsuario.fechaNac,
      sexo: datoUsuario.sexo,
      correo: datoUsuario.correo,
      telefono: datoUsuario.telefono,
      contrasenia: datoUsuario.contrasenia
    };

    if(usuarioDeLocalStorage.correo){
      this.authService.loginDos()
    }

  }*/

  

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
