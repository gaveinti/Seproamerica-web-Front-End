import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css']
})
export class ModalNotificacionesComponent implements OnInit {

  constructor() { }

  notificaciones=[
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo',
      
    },
    {
      'titulo':'Servicio 341 pagado',
      'texto':'Servicio 341 pagado'
    },
    {
      'titulo':'Nueva notificacion cualquiera',
      'texto':'Nueva notificacion cualquiera'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    {
      'titulo':'Nueva notificacion cualquiera',
      'texto':'Nueva notificacion cualquiera'
    },
    {
      'titulo':'Servicio 342 pagado',
      'texto':'Servicio 342 pagado'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    

    


  ]
  ngOnInit(): void {
  }

}
