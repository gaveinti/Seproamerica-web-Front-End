import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';


@Component({
  selector: 'app-servicioseleccionado',
  templateUrl: './servicioseleccionado.component.html',
  styleUrls: ['./servicioseleccionado.component.css']
})
export class ServicioseleccionadoComponent implements OnInit {

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

  servicio: RegisterModel = new RegisterModel();

  registerForm!: FormGroup;


  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("usuario_logeado")
    console.log(data)
    this.usuario = this.authService.getUsuario();
    this.registerForm = this.formBuilder.group({
      'fechaInicio': [],
      'nombres': [],
      'cedula': [],
      'fechaNac': [],
      'sexo': [],
      'correo': [],
      'telefono': [],
      'contrasenha': [],
    });
  }

}
