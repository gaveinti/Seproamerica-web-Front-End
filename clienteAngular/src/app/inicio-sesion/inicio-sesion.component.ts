import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteWAService } from '../services/cliente-wa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  @Output() enviar = new EventEmitter<string>();
  ruta!:string

  //variables para las cookies
  private cookie_correo='';
  private all_cookies:any='';
  

  usuariosLista?: RegisterModel[];
  user: RegisterModel = new RegisterModel();
  indexActual = -1
  inicioSesionForm: FormGroup;
  hide = true;
  correoX = 'frh';
  camposCompletos: boolean = false;
  //bandera de prueba
  b : boolean = false;
  /*Variable para guardar usuario encontrado*/
  usuarioActual: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: '',
    rol:'2'
  };
  
  //Bandera con la que se habilitara el boton de inicio de sesion
  exito = true

  esCliente: boolean = true;
  estaRegistrado!: boolean;

  constructor(public fb: FormBuilder, private http: HttpClient, private clienteWAService: ClienteWAService,
    private authService: AuthService , private route: ActivatedRoute, private router: Router, private cookieService: CookieService) {
    this.inicioSesionForm = this.fb.group({
      correo: [this.user.correo, [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$')]],
      contrasenha: [this.user.contrasenia, [Validators.required, Validators.minLength(8)]]
    });
    console.log(router.url)
    this.enviar.emit(this.router.url)
    console.log("contruhijo")

  }
  ngAfterContentInit(){
    console.log("ngafetcontetinithijo")
    this.enviar.emit(this.router.url)

  }
 
  enviare(){
    this.enviar.emit(this.router.url)
    console.log("press")

  }
  ngAfterViewInit() {
    this.enviar.emit(this.router.url)

    console.log(this.ruta)
    console.log("holaaahijo")
    
  }

  //Para las cookies
  setCookie(correoCookie: string){
    this.cookieService.set('usuario', correoCookie);
  }
   
  deleteCookie(){
    this.cookieService.delete('usuario');
  }
   
  deleteAll(){
    this.cookieService.deleteAll();
  }
  ////////////////////////////////////////////////

  obj: any;

  ngOnInit(): void{
    //Eliminar datos guardados en el localStorage
    //this.authService.eliminarDatosLocalStorage("123")
    console.log("oninithijo")

  

/*    localStorage.clear()
    this.deleteAll()*/

    this.inicioSesionForm = this.fb.group({
      'correo': [this.user.correo, [Validators.required, Validators.pattern('[a-z/.0-9_-]+@[a-z0-9]+[.{1}][a-z]{2,}([.{1}][a-z]{2,})?')]],
      'contrasenha': [this.user.contrasenia, [Validators.required, Validators.minLength(8)]]
    });
    this.correoX = this.inicioSesionForm.value.correo
  }


  onInicioSesionSubmit(){
    this.obj = this.clienteWAService.get(this.inicioSesionForm.value.correo).subscribe(
      data => {
        console.log(data.apellidos)
        this.obj = data
      })
    /*var formData: any = new FormData();
    formData.append('correo', this.inicioSesionForm.get('correo')?.value);
    formData.append('contrasenha', this.inicioSesionForm.get('contrasenha')?.value);*/
  }


  //Funcion que obtiene el objeto de la base de datos y valida el inicio de sesion
  getUsuarioA(): void{
    this.estaRegistrado=true
    this.esCliente=true
    this.exito=true
    var correoIngresado = this.inicioSesionForm.value.correo;
    this.camposCompletos = !this.inicioSesionForm.invalid;

    console.log("Campos completos: "+this.camposCompletos)
    if(this.camposCompletos){
      this.clienteWAService.get(correoIngresado)
      .subscribe({
        next: (data) => {
          console.log(data)
          if(data.rol!="2"){
            this.esCliente=false
            return
          }else{
            this.usuarioActual = data;
            console.log(data)
            console.log(this.usuarioActual)
            var contrasenhaValidar = data.contrasenia
            if(this.inicioSesionForm.value.contrasenha == contrasenhaValidar){
              this.authService.infoPutUsuario(this.usuarioActual)
              console.log("inicio de sesion exitoso")
              //cookie exitoso
              this.setCookie(JSON.stringify(this.usuarioActual))
              this.exito = true
              this.authService.loginDos()
              //localStorage.setItem("estaLogeado", "true")
              localStorage.setItem("datoUsuario", JSON.stringify(this.usuarioActual))
              localStorage.setItem("usuario_logeado", this.usuarioActual.correo.toString())
  
              this.router.navigate(["/principal"])
            } else{
              this.exito=false
              console.log("inicio de sesion fallido")
            }
            this.exito = false
          }
          
        },
        error: (e) => {
          if(window.ononline){
            alert("no tiene internet")
          }
          else{
            this.estaRegistrado=false
          }
        }

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
