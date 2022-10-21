import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteWAService } from '../services/cliente-wa.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
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

  constructor(private clienteWAS: ClienteWAService , private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Funcion donde se guardan los datos del usuario que inició sesión
    this.usuario = this.authService.getUsuario();
  }

  actualizarDatos(): void {
    //Informacion actualizada a enviar 
    const usuarioInfoActualizada: RegisterModel = {
      apellidos: this.usuario.apellidos,
      nombres: "Eugenio",
      cedula: this.usuario.cedula,
      fechaNac: this.usuario.fechaNac,
      sexo: this.usuario.sexo,
      correo: this.usuario.correo,
      telefono: this.usuario.telefono,
      contrasenia: this.usuario.contrasenia
    };

    this.clienteWAS.update(this.usuario.correo, usuarioInfoActualizada)
    .subscribe({//Esto me devuelve el objeto cambiado
      next: (res) => {
        console.log("Info actualizada: "+ res);
        /*Actualizar datos a mostrar en la pagina de perfil*/
        /*this.usuario.apellidos = res.apellidos*/
        this.usuario.nombres = res.nombres
        /*this.usuario.cedula = res.cedula
        this.usuario.fechaNac = res.fechaNac
        this.usuario.sexo = res.sexo*/
        //correo no
        /*this.usuario.telefono = res.telefono
        this.usuario.contrasenia = res.contrasenia*/

      },
      error: (e) => console.log(e)
    })
  }

}
