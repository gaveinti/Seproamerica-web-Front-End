import { Component, OnInit } from '@angular/core';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  user: InicioSesionModel = new InicioSesionModel();
  inicioSesionForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicioSesionForm = this.formBuilder.group({
      'correo': [this.user.correo, [Validators.required, Validators.email]],
      'contrasenha': [this.user.contrasenha, [Validators.required]]
    });
  }

  onInicioSesionSubmit(){
    alert(this.user.correo + ' ' + this.user.contrasenha);
  }

}
