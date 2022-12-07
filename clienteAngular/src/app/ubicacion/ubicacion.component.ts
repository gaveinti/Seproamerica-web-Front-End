import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
import { FormularioServicio } from '../models/formularioServicio';
import * as moment from "moment";
import * as L from 'leaflet';
import { map } from 'jquery';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';

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
  

  //Metodo para iniciar el mapa de Google Maps
  initMap(): void {
    var latitudInicio;
    var longitdInicio;
    var latitudDestino;
    var longitudDestino;
    var markerInicio;
    var markerDestino;

    let markers: google.maps.Marker[] = [];

    /*const LIMITES_GUAYAQUIL = {
      north: 10.36,
      south: 10.35,
      west: 170.28,
      east: -400.81,
    }*/

    const uluru = { lat: -2.2058400, lng: -79.9079500 };
    var map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 12,
        center: uluru,
        /*restriction: {
          latLngBounds: LIMITES_GUAYAQUIL,
          strictBounds: false,
        }*/
      }
    );


    markerInicio = new google.maps.Marker({
      position: { lat: -2.1221118360497218, lng: -79.9072633544922 },
      map: map,
      title: 'inicio',
      label: 'inicio',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    markerDestino = new google.maps.Marker({
      position: { lat: -2.179063268877046, lng: -79.89009721679689 },
      map: map,
      title: 'destino',
      label: 'destino',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });


    //Evento para crear markers
    /*google.maps.event.addListener(map, 'click', function(event) {
      var markerInicio;
      var markerDestino;
      if( enter == 2 ){
        alert("Solo puede ingresar los marcadores de inicio y destino")
        console.log(markers)

      } 
      else if ( enter == 0) {
        console.log(enter)
        markerInicio = new google.maps.Marker({
          position: event.latLng,
          map: map,
          title: 'inicio',
          label: 'inicio',
          draggable: true,
          animation: google.maps.Animation.DROP,
        });
        markers.push(markerInicio.position.toJSON())
        let loc = event.latLng.toJSON()
        console.log("Localizacion: ")
        console.log(JSON.stringify(event.latLng.toJSON(), null, 2))
        console.log(loc.lat)
        console.log(loc.lng)
        enter++;
      }
      else if (enter == 1){
        console.log(enter)
        markerDestino = new google.maps.Marker({
          position: event.latLng,
          map: map,
          title: 'destino',
          label: 'destino',
          draggable: true,
          animation: google.maps.Animation.DROP,
        });
        markers.push(markerDestino.position.toJSON())
        let loc = event.latLng.toJSON()
        console.log("Localizacion: ")
        console.log(JSON.stringify(event.latLng.toJSON(), null, 2))
        console.log(loc.lat)
        console.log(loc.lng)
        enter++;
      }
    });*/

    //Evento para obtener ultima latitud y longitud de markerInicio que puede moverse
    google.maps.event.addListener(markerInicio, 'dragend', function(event) {
      //$("#txtLat").val(event.latLng.lat())
      //$("#txtLng").val(event.latLng.lng())
      latitudInicio = event.latLng.lat()
      longitdInicio = event.latLng.lng()

      console.log("Inicio")
      console.log(latitudInicio + "\n" + longitdInicio)
      

      map.panTo(event.latLng);
    });

    //Evento para obtener ultima latitud y longitud de markerDestino que puede moverse
    google.maps.event.addListener(markerDestino, 'dragend', function(event) {
      //$("#txtLat").val(event.latLng.lat())
      //$("#txtLng").val(event.latLng.lng())
      latitudDestino = event.latLng.lat()
      longitudDestino = event.latLng.lng()

      console.log("Destino")
      console.log(latitudDestino + "\n" + longitudDestino)

      map.panTo(event.latLng);
    });

  }
  //------------------------------------------------------------------------------------

  


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private servicioSeleccionadoService: ServicioseleccionadoService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.initMap();
  }


  obtenerInfoMarkers(){
    let markerInicio = google.maps.Marker
    console.log(markerInicio)
  }



}
