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
  listaGenInfoBar: GeneralBarInfoModel[] = [
    {linkOpcion: "/", nombre: "Servicios"},
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

  constructor() { }

  ngOnInit(): void {
    console.log(this.usuario.correo)
  }

}
