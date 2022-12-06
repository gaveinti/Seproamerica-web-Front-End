import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
import { FormularioServicio } from '../models/formularioServicio';
import * as moment from "moment";
import * as L from 'leaflet';
import { map } from 'jquery';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit{

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

  placeMarker(map, location){
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
  

  initMap(): void {
    const uluru = { lat: -2.2058400, lng: -79.9079500 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 11,
        center: uluru,
      }
    );

    google.maps.event.addListener(map, 'click', function(event) {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map
      })
    });


  }


  



  constructor(private authService: AuthService, private formBuilder: FormBuilder, private servicioSeleccionadoService: ServicioseleccionadoService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.initMap();
  }



}
