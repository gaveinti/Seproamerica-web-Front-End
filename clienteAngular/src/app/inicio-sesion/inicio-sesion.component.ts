import { Component, OnInit } from '@angular/core';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteWAService } from '../services/cliente-wa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  camposCompletos: boolean = false;
  //bandera de prueba
  b : boolean = false;
  //Bandera con la que se habilitara el boton de inicio de sesion
  exito = false
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

  constructor(public fb: FormBuilder, private http: HttpClient, private clienteWAService: ClienteWAService,
    private authService: AuthService , private route: ActivatedRoute, private router: Router) {
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
    /*
    this.authService.login(this.inicioSesionForm.value, this.inicioSesionForm.value.correo).subscribe((res) => console.log("Login"));
    */
    //this.authService.currentApprovalStageMessage.subscribe(msg => this.exito = msg)

  }


  onInicioSesionSubmit(){
    //alert(this.user.correo)
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
    /*console.log("Correo ingresado: "+correoIngresado)
    console.log("Contra ingresada: "+this.inicioSesionForm.value.contrasenha)*/
    //this.authService.updateApprovalMessage(this.exito)
    this.camposCompletos = !this.inicioSesionForm.invalid;
    console.log("Campos completos: "+this.camposCompletos)
    if(this.camposCompletos){
      this.clienteWAService.get(correoIngresado)
      .subscribe({
        next: (data) => {
          this.usuarioActual = data;
          console.log(data)
          //Obtener contraseña para validar
          /*console.log("Contraseña ingresada: " + this.inicioSesionForm.value.contrasenha)
          console.log("Contraseña de la base de datos: " + data.contrasenia)*/
          var contrasenhaValidar = data.contrasenia
          if(this.inicioSesionForm.value.contrasenha == contrasenhaValidar){
            console.log("inicio de sesion exitoso")
            this.exito = true
            //console.log(this.exito)

            //this.authService.esValidado(this.exito)

            this.authService.loginDos()
            //this.authService.currentApprovalStageMessage.subscribe(msg => this.exito = msg)
          } else{
            console.log("inicio de sesion fallido")
            //console.log(this.exito)
            //this.authService.esValidado(this.exito)
            //this.authService.currentApprovalStageMessage.subscribe(msg => this.exito = msg)
          }
          this.exito = false
          //this.authService.currentApprovalStageMessage.subscribe(msg => this.exito = msg)
        },
        error: (e) => /*console.error(e)*/ alert("Usuario no registrado")
      });
    }else{
      console.log("Campos no válidos")
    }
  }

  imprimirObjeto(): void{
    var correoIngresado = this.inicioSesionForm.value.correo;
    console.log(correoIngresado)
    //console.log(this.inicioSesionForm.value.correo)
  }

  //Función que habilita el boton "inicio de sesion" si correo y contraseña coinciden
  esV(){
    return true;
  }

}
