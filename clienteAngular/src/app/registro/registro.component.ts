import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.user.apellidos, [Validators.required]],
      'nombres': [this.user.nombres, [Validators.required]],
      'cedula': [this.user.cedula, [Validators.required]],
      'fNacimiento': [this.user.fNacimiento, [Validators.required]],
      'sexo': [this.user.sexo, [Validators.required]],
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'telefono': [this.user.telefono, [Validators.required]],
      'contrasenha': [this.user.contrasenha, [Validators.required]]
    });
  }

  onRegisterSubmit(){
    alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user.fNacimiento + ' ' + 
    this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenha);
  }

}
