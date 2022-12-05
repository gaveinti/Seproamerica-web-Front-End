import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { GuardService } from '../services/guard.service';
import { ServiceModel } from '../models/servicio';
import { CookieService } from 'ngx-cookie-service';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';


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

  usuario: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: '',
    rol:"2"
  };

  data: string = "";

  constructor(private authService: AuthService, private guardS: GuardService, private cookieService: CookieService,
    private servicioSeleccionadoService: ServicioseleccionadoService) {

    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
   }

  ngOnInit(): void {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();

    
  }

  //Envio de nombre de servicio a componente "servicioseleccionado" y además setea en cookie el nombre del servicio escogido
  envioNombre(servicioNombre: any){
    //console.log(servicioNombre)
    this.servicioSeleccionadoService.nombreServicioEscogido(servicioNombre)
    localStorage.setItem("servicio", JSON.stringify(servicioNombre))
  }

  

  
}
