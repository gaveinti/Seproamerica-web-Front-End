import { Component, OnInit, Input } from '@angular/core';
import { GeneralBarInfoModel } from 'src/app/models/generalbarinfoModel';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/register.model';

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

  @Input() usuario: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: ''
  };

  constructor(private authS: AuthService) { }

  ngOnInit(): void {
    this.authS.loginDos()
    console.log(this.usuario.correo)
    /*const areaSeleccionada = document.getElementById('prueba')
    if(areaSeleccionada != undefined){
      areaSeleccionada.innerHTML += `
      <br>
      <h2><a router-Link="/principal" (click)="mandarGuard()"></a>Servicios</h2>`
    }*/
  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authS.loginDos()
  }

}
