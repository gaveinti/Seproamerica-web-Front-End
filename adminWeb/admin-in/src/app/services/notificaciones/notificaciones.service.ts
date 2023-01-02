import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from 'src/app/util/constantes';
import {Notificacion} from '../../models/notificacion.model'
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  notificaciones:Notificacion[]=[]
  notificaciones_no_leidas:Notificacion[]=[]

  url_notificaciones=Constantes.URL_NOTIFICACION
  dataUsuario=JSON.parse(localStorage.getItem("datoUsuario")!)
  noti_no_leida_num: any;
  
  constructor(
    private http: HttpClient,

  ) { }

  obtenerListaNotificaciones() {
    
    //console.log(this.servicio_actual,this.usuario_receptor,this.usuario_logeado)
    //this.contactosMensajes=[]
    this.http.get<any[]>(this.url_notificaciones +"all/" + this.dataUsuario.cedula)
      .subscribe(res => {
        let data = JSON.stringify(res)
        let notificaciones = JSON.parse(data)
        this.notificaciones = notificaciones.data
      })
  }

  obtenerNotificacionesNoLeidas(){
    this.http.get<any[]>(this.url_notificaciones +"no_leido/" + this.dataUsuario.cedula)
    .subscribe(res => {
      let data = JSON.stringify(res)
      let notificaciones = JSON.parse(data)
      this.notificaciones = notificaciones.data
      this.noti_no_leida_num=notificaciones.cantidad
    })
  }

  marcarComoLeido(id:any){
    this.http.get<any>(this.url_notificaciones +"marcar_como_leido/" + Number(id))
    .subscribe(res => {
      
      this.obtenerNotificacionesNoLeidas()

    })  }

}
