import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteWAService } from '../services/cliente-wa.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  sesionIniciada: boolean = true;

  registerForm!: FormGroup;

  hide = true;

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
    this.descifrarDatosUsuario()
    this.recogerDatosActualizados()
    this.authService.loginDos()
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.usuario.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'nombres': [this.usuario.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'cedula': [this.usuario.cedula, /*[Validators.required, Validators.pattern("^[0-9]*$")]*/],
      'fechaNac': '2000-09-01',
      'sexo': [this.usuario.sexo, [Validators.required]],
      //'correo': [this.usuario.correo, [Validators.required, Validators.email]],
      'telefono': [this.usuario.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      'contrasenha': [this.usuario.contrasenia, [Validators.required]],
    });
    //Funcion donde se guardan los datos del usuario que inició sesión
    this.usuario = this.authService.getUsuario();
  }

  //Poner datos actualizados
  recogerDatosActualizados(){
    let usuarioRecogido: RegisterModel = {
      apellidos: '',
      nombres: '',
      cedula: 0,
      fechaNac: new Date(),
      sexo: '',
      correo: '',
      telefono: 0,
      contrasenia: ''
    };
    usuarioRecogido = this.authService.getUsuario()
    console.log(usuarioRecogido.apellidos)
  }

  //Para las cookies
  deleteCookie(){
    this.cookieService.delete('usuario');
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
          let seccion = document.getElementById('#mensajePositivoNegativo')
          let plantilla = `<p>Datos actualizados exitosamente</p>`
          if(seccion != null){
            seccion.innerHTML += plantilla
          }
          alert("Datos actualizados exitosamente")
          this.registerForm.reset()

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
      alert("Debe completar los campos")
    }
  }

  resetearUsuario(): void{
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
    this.deleteCookie();
  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authService.loginDos()
  }

  public descifrarDatosUsuario(){

    let datoUsuario: {apellidos: String; cedula:Number; contrasenia: String; 
      correo:String; direccion: string; fechaNac: Date; fechaRegistro: Date; 
      nombres: String; rol: Number; sexo: String; telefono: Number} = JSON.parse(this.cookieService.get('usuario') as string);
    if(!datoUsuario){
      return;
    }

    let usuarioDeLocalStorage : RegisterModel = {
      apellidos: datoUsuario.apellidos,
      nombres: datoUsuario.nombres,
      cedula: datoUsuario.cedula,
      fechaNac: datoUsuario.fechaNac,
      sexo: datoUsuario.sexo,
      correo: datoUsuario.correo,
      telefono: datoUsuario.telefono,
      contrasenia: datoUsuario.contrasenia
    };

    this.authService.infoPutUsuario(usuarioDeLocalStorage);

  }

}
