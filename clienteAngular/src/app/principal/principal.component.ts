import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { GuardService } from '../services/guard.service';
import { ServiceModel } from '../models/servicio';
import { CookieService } from 'ngx-cookie-service';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
import { ClienteWAService } from '../services/cliente-wa.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  /*listaServicios: ServiceModel[] = [
    { nombre: "Custodia Armada"},
    { nombre: "Transporte de productos"},
    { nombre: "Chofer seguro"},
    { nombre: "Guardia de seguridad"}
  ];*/

  info_Servicio: any

  listaServicios?: ServiceModel[];

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
    private servicioSeleccionadoService: ServicioseleccionadoService, private clienteWAService: ClienteWAService) {

    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
   }

  ngOnInit(): void {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();
    this.obtener_Servicios_Request();
  }

  //Envio de nombre de servicio a componente "servicioseleccionado" y además setea en cookie el nombre del servicio escogido
  envioNombre(servicioNombre: any){
    //console.log(servicioNombre)
    this.servicioSeleccionadoService.nombreServicioEscogido(servicioNombre)
    localStorage.setItem("servicio", servicioNombre.toString())
    this.info_Servicio = this.encontrar_Servicio(servicioNombre)
    console.log("Se selecciono: ")
    console.log(this.info_Servicio)
    localStorage.setItem("info_Servicio", JSON.stringify(this.info_Servicio))
  }

  
  //Obtener Servicios desde un request
  obtener_Servicios_Request(): void{
    this.clienteWAService.obtener_Servicios()
    .subscribe({
      next: (data) => {
        this.listaServicios = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  //Encontrar servicio seleccionado de la lista de servicio
  encontrar_Servicio(nombre_Servicio: any){
    let informacion_Servicio
    this.listaServicios?.forEach( (servicio) => {
      if(servicio.nombreServicio == nombre_Servicio){
        informacion_Servicio = servicio
      }
    })
    return informacion_Servicio
    
  }

  
}
