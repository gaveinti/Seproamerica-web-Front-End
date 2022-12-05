import { Component, OnInit, Input } from '@angular/core';
import { GeneralBarInfoModel } from 'src/app/models/generalbarinfoModel';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/register.model';
import { ServicioseleccionadoService } from 'src/app/services/servicioseleccionado.service';
import { Constantes } from 'src/app/util/constantes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generalinfobar',
  templateUrl: './generalinfobar.component.html',
  styleUrls: ['./generalinfobar.component.css']
})
export class GeneralinfobarComponent implements OnInit {
  //Dato booleano para saber que es para ir a pagina de servicios
  esServicio = false;

  listaGenInfoBar: GeneralBarInfoModel[] = [
    {linkOpcion: "/principal", nombre: "Servicios"},
    {linkOpcion: "/", nombre: "Historial de servicios"},
    {linkOpcion: "/", nombre: "Carrito"},
    {linkOpcion: "/", nombre: "Tarjetas"},
    {linkOpcion: "/", nombre: "Escanear código"},
    {linkOpcion: "/", nombre: "Sucursales"},
    {linkOpcion: "/informacion", nombre:"Información general"}
  ]
  data_chat!:any
  @Input() usuario: RegisterModel = {
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

  constructor(
    private router: Router,
    private authS: AuthService,
    public servicioSeleccionadoService: ServicioseleccionadoService
    ) {
      console.log(servicioSeleccionadoService.estaEnSErvicioSeleccionado)
     }

  ngOnInit(): void {
    this.authS.loginDos()
    console.log(this.usuario.correo)
    const data = localStorage.getItem("datoUsuario")
    console.log("Info bar: " + data)
    this.usuario = JSON.parse(localStorage.getItem("datoUsuario")!)

  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authS.loginDos()
  }

  comenzarChat(){
    this.mandarGuard()
    this.data_chat={
      receptor:Constantes.correoAdmin,
      emisor:this.usuario.correo,
      servicio:this.servicioSeleccionadoService.nombreServicio.split(" ")[0]
    }
    localStorage.setItem("data_chat",JSON.stringify(this.data_chat))
    console.log(this.data_chat)
    console.log(this.servicioSeleccionadoService.nombreServicio)
    console.log(this.servicioSeleccionadoService.nombreServicio.split(" ")[0])
    


    /*this.router.navigate(
      ['/mensajeria'],
      { queryParams: this.data_chat }
      )*/
  }

}
