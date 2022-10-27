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

  constructor(private authService: AuthService, private guardS: GuardService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
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
