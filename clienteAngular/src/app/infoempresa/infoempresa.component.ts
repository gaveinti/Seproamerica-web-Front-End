import { Component, OnInit } from '@angular/core';
import { GeneralinfobarComponent } from '../principal/generalinfobar/generalinfobar.component';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-infoempresa',
  templateUrl: './infoempresa.component.html',
  styleUrls: ['./infoempresa.component.css']
})
export class InfoempresaComponent implements OnInit {

  //titulo de la pagina
  titulo: string = "Informacion General"

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();
  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authService.loginDos()
  }

}
