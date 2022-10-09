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

  user: RegisterModel = new RegisterModel();
  indexActual = -1
  inicioSesionForm: FormGroup;
  hide = true;
  correoX = '';
  /*Variable para guardar usuario encontrado*/
  usuarioActual: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenha: ''
  };

  constructor(public fb: FormBuilder, private http: HttpClient, private clienteWAService: ClienteWAService, private route: ActivatedRoute, private router: Router) {
    this.inicioSesionForm = this.fb.group({
      correo: [this.user.correo, [Validators.required, Validators.email]],
      contrasenha: [this.user.contrasenha, [Validators.required]]
    });
  }

  ngOnInit(): void{
    this.inicioSesionForm = this.fb.group({
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'contrasenha': [this.user.contrasenha, [Validators.required]]
    });
    this.onInicioSesionSubmit();
  }


  onInicioSesionSubmit(){
    alert(this.user.correo)
    var formData: any = new FormData();
    formData.append('correo', this.inicioSesionForm.get('correo')?.value);
    formData.append('contrasenha', this.inicioSesionForm.get('contrasenha')?.value);
    this.http.post('http://127.0.0.1:8000/usuarioInicioSesion/', JSON.stringify(formData)).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
    });
  }

  /*Función para obtener usuario a partir del correo ingresado*/
  getUsuario(correoIngresado: string): void{
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
    this.clienteWAService.get(correoIngresado)
      .subscribe({
        next: (data) => {
          let x = data;
          console.log(x)
          console.log(data);
        },
        error: (e) => console.log(e)
      });
  }

}
