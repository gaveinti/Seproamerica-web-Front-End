import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteWAService } from '../services/cliente-wa.service';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as moment from "moment";



@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {
  sesionIniciada: boolean = true;

  registerForm!: FormGroup;

  hide = true;

  noMayorEdad: boolean = true;
  mensajeErrorEdad = "";

  //Variables de campos completados del registro 
  camposCompletos: boolean = false;
  camposIncorrectos: boolean = false;

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

  constructor(private clienteWAS: ClienteWAService , private authService: AuthService, private route: ActivatedRoute, 
    private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.authService.loginDos()
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.usuario.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'nombres': [this.usuario.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'cedula': [this.usuario.cedula, /*[Validators.required, Validators.pattern("^[0-9]*$")]*/],
      'fechaNac': [this.usuario.fechaNac, [this.validacionFecha]],
      'sexo': [this.usuario.sexo, [Validators.required]],
      //'correo': [this.usuario.correo, [Validators.required, Validators.email]],
      'telefono': [this.usuario.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      'contrasenha': [this.usuario.contrasenia, [Validators.required]],
    });
    //Funcion donde se guardan los datos del usuario que inició sesión
    this.usuario = this.authService.getUsuario();
  }


  actualizarDatos(): void {
    this.camposCompletos = !this.registerForm.invalid;
    console.log(this.camposCompletos)
    //Informacion actualizada a enviar 
    const usuarioInfoActualizada  = {
      apellidos: this.usuario.apellidos,
      nombres: this.usuario.nombres,
      cedula: this.usuario.cedula,
      fechaNac: this.usuario.fechaNac,
      sexo: this.usuario.sexo,
      correo: this.usuario.correo,
      telefono: this.usuario.telefono,
      contrasenia: this.usuario.contrasenia,
      
      direccion : this.usuario.correo,
      rol : '11'
    };

    if(this.camposCompletos){
      //this.camposCompletos = false
      this.clienteWAS.update(this.usuario.correo, usuarioInfoActualizada)
      .subscribe({//Esto me devuelve el objeto cambiado
        next: (res) => {
          console.log("Se han guardado los datos")
          console.log("Info actualizada: "+ res);
          /*Actualizar datos a mostrar en la pagina de perfil*/
          this.usuario.apellidos = res.apellidos
          this.usuario.nombres = res.nombres
          this.usuario.cedula = res.cedula
          this.usuario.fechaNac = res.fechaNac
          this.usuario.sexo = res.sexo
          //correo no
          this.usuario.telefono = res.telefono
          this.usuario.contrasenia = res.contrasenia
          res.rol = 11
          //Poner mensaje de exito
          /*let seccion = document.getElementById('#mensajePositivoNegativo')
          let plantilla = `<p>Datos actualizados exitosamente</p>`
          if(seccion != null){
            seccion.innerHTML += plantilla
          }*/
          alert("Datos actualizados exitosamente")
          localStorage.setItem("datoUsuario", JSON.stringify(usuarioInfoActualizada))
          this.authService.infoPutUsuario(usuarioInfoActualizada)
          this.setCookie(JSON.stringify(usuarioInfoActualizada))

          //Poner datos actualizados visibles en el perfil del usuario
          this.clienteWAS.get(this.usuario.correo)
          .subscribe({
          next: (data) => {
            console.log(data)
            this.usuario.apellidos = data.apellidos
            this.usuario.nombres = data.nombres
            this.usuario.telefono = data.telefono
            this.usuario.cedula = data.cedula
            this.usuario.fechaNac = data.fechaNac
            this.usuario.sexo = data.sexo
            this.usuario.contrasenia = data.contrasenia
            //
            
            this.registerForm.reset()
            this.authService.infoPutUsuario(usuarioInfoActualizada)

          },
          error: (e) => console.error(e)
        });
           
           
        },
        error: (e) => console.log(e)
      })
    } else{
      //Poner mensaje de exito
      let seccion = document.getElementById('#mensajePositivoNegativo')
      let plantilla = `<p>Datos no actualizados</p>`
      if(seccion != null){
        seccion.innerHTML += plantilla
      }
      this.camposIncorrectos = true
      alert("Datos no válidos o campos incorrectos")
    }
  }

  resetearUsuario(): void{
    //this.sesionIniciada = false;
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
  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authService.loginDos()
  }

  //Para las cookies
  setCookie(correoCookie: string){
    this.cookieService.set('usuario', correoCookie);
  }

  /*validar si fecha escogida indica si usuario es mayor de edad */
  validacionFecha(control: FormControl){
    if(control.value){
      const date = moment(control.value).format('DD-MM-YYYY')
      console.log("Fecha introducida: " + date)
      const diaEscogido: number = parseInt(date.split('-')[0])
      const mesEscogido: number = parseInt(date.split('-')[1])
      const anioEscogido: number = parseInt(date.split('-')[2])
      const today = moment().format('DD-MM-YYYY')
      console.log("Fecha de hoy: " + today)
      const diaActual: number = parseInt(today.split('-')[0])
      const mesActual: number = parseInt(today.split('-')[1])
      const anioActual: number = parseInt(today.split('-')[2])
      const restaAnio = anioActual - anioEscogido
      const restaMes = mesActual - mesEscogido
      const restaDia = diaActual - diaEscogido
      if(restaAnio > 18){
        console.log("Es mayor de edad")
        return null
      }
      if ((restaAnio == 18) && (restaMes >= 0) && (restaDia >= 0)){
        console.log("Es mayor de edad")
        return null/*{ 'validDate': true}*/
      }
    }
    let mensajeError = "Debe ser mayor de edad"
    console.log("No es mayor de edad")
    //this.mensajeErrorEdad = "Debe ser mayor de edad"
    return mensajeError/*{'validDate': false};*/
  }


}
