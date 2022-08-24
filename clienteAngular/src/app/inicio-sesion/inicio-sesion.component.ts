import { Component, OnInit } from '@angular/core';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteWAService } from '../services/cliente-wa.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  user: InicioSesionModel = new InicioSesionModel();
  inicioSesionForm: FormGroup;
  hide = true;

  constructor(public fb: FormBuilder, private http: HttpClient, private service: ClienteWAService) {
    this.inicioSesionForm = this.fb.group({
      correo: [''],
      contrasenha: ['']
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

}
