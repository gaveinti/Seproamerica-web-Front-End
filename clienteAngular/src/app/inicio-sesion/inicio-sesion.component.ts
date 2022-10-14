import { Component, OnInit } from '@angular/core';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteWAService } from '../services/cliente-wa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  usuariosLista?: RegisterModel[];
  user: RegisterModel = new RegisterModel();
  indexActual = -1
  inicioSesionForm: FormGroup;
  hide = true;
  correoX = 'frh';
  /*Variable para guardar usuario encontrado*/
  usuarioActual: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: ''
  };

  constructor(public fb: FormBuilder, private http: HttpClient, private clienteWAService: ClienteWAService, private route: ActivatedRoute, private router: Router) {
    this.inicioSesionForm = this.fb.group({
      correo: [this.user.correo, [Validators.required, Validators.email]],
      contrasenha: [this.user.contrasenia, [Validators.required]]
    });
  }

  ngOnInit(): void{
    //this.getUsuarioA(this.route.snapshot.params["correo"]);
    this.inicioSesionForm = this.fb.group({
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'contrasenha': [this.user.contrasenia, [Validators.required]]
    });
    this.onInicioSesionSubmit();
    this.correoX = this.inicioSesionForm.value.correo
  }


  onInicioSesionSubmit(){
    alert(this.user.correo)
    var formData: any = new FormData();
    formData.append('correo', this.inicioSesionForm.get('correo')?.value);
    formData.append('contrasenha', this.inicioSesionForm.get('contrasenha')?.value);
    /*this.http.post('http://127.0.0.1:8000/usuarioInicioSesion/', JSON.stringify(formData)).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
    });*/
    //this.getUsuarioA(this.inicioSesionForm.get('correo')?.value)

    //this.getUsuarioA(this.inicioSesionForm.value.correo, this.inicioSesionForm.value.contrasenha)
  }

  /*Función para obtener usuario a partir del correo ingresado
  getUsuario(correoIngresado: string): void{
    this.clienteWAService.get(correoIngresado)
    this.usuarioActual = {
      apellidos: '',
      nombres: '',
      cedula: 0,
      fechaNac: new Date(),
      sexo: '',
      correo: '',
      telefono: 0,
      contrasenha: ''
    };
    this.indexActual = -1;
    console.log("entra")
    this.clienteWAService.encontrarCorreo(correoIngresado)
      .subscribe({
        next: (data) => {
          //this.usuariosLista: RegisterModel[] = data;
          let x = data;
          console.log(x)
          console.log(data);
        },
        error: (e) => console.log(e)
      });
  }*/

  //Funcion que obtiene el objeto de la base de datos y valida el inicio de sesion
  getUsuarioA(): void{
    var correoIngresado = this.inicioSesionForm.value.correo;
    console.log(correoIngresado)
    this.clienteWAService.get(correoIngresado)
    .subscribe({
      next: (data) => {
        this.usuarioActual = data;
        console.log(data)
        //Obtener contraseña para validar
        console.log("Contraseña ingresada: " + this.inicioSesionForm.value.contrasenha)
        console.log("Contraseña de la base de datos: " + data.contrasenia)
        var contrasenhaValidar = data.contrasenia
        if(this.inicioSesionForm.value.contrasenha == contrasenhaValidar){
          console.log("inicio de sesion exitoso")
        } else{
          console.log("inicio de sesion fallido")
        }
      },
      error: (e) => console.error(e)
    });
  }

  imprimirObjeto(): void{
    var correoIngresado = this.inicioSesionForm.value.correo;
    console.log(correoIngresado)
    //console.log(this.inicioSesionForm.value.correo)
  }

  //Función que habilita el boton "inicio de sesion" si correo y contraseña coinciden

}
