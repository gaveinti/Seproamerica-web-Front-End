import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
import { FormularioServicio } from '../models/formularioServicio';
import * as moment from "moment";
import * as L from 'leaflet';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements AfterViewInit {

  

  private initMap(): void {
    let map = L.map('map', {
      center: [ -2.2058400, -79.9079500 ],
      zoom: 12
    });
  

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);
  }

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

  



  constructor(private authService: AuthService, private formBuilder: FormBuilder, private servicioSeleccionadoService: ServicioseleccionadoService) { }

  ngAfterViewInit(): void {
    this.usuario = this.authService.getUsuario();
    this.initMap();
  }



}
