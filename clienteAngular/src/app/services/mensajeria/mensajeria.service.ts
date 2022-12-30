import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CanalInfoMensajes } from 'src/app/models/infoCanalMensaje';
import { Constantes } from 'src/app/util/constantes';
import { ServicioseleccionadoService } from '../servicioseleccionado.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  url_chat = Constantes.URL_CHAT
  usuario_logeado = localStorage.getItem("usuario_logeado")
  usuario_receptor = ""
  nombre_usuario_receptor = ""
  servicio_actual = ""
  num_servicio_actual=""
  canal_actual = ""
  chats: smsInfo2[] = [];
  contactosMensajes!: smsInfo2[];

  //  +"localhost:8000"

  socket: any

  url_websocket = ""

  contador_temporal=0
  constructor(
    private http: HttpClient,
    private servicioActualService: ServicioseleccionadoService,
    //private socketService: SocketService
  ) {

    if (window.location.host == "localhost:4200") {
      this.url_websocket = 'ws://'
        //+ Constantes.DOMINIO_SERVER
        +"localhost:8000"
        + '/ws/chat/mensajeria/'
    }

    if (window.location.host == Constantes.DOMINIO_SERVER) {
      this.url_websocket = 'wss://'
        + Constantes.DOMINIO_SERVER_WEB_SOCKET
        + '/ws/chat/mensajeria/'
    }

    console.log(this.url_websocket)
    this.obtenerMensajesPorUsuarioLogeado()
    this.obtenerListaMensajes()
    //this.socket = new WebSocket(this.url_websocket)
    console.log("usuario", this.usuario_logeado)
  }

  enviar() {
    //this.socket = new WebSocket('ws://localhost:8000/ws/chat/' + "room" + "/")
    this.socket.send(JSON.stringify({
      message: 'OK',
    }))

  }

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(Constantes.URL_CHAT_PRODUCCION + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)

  }
  obtenerListaMensajes() {
    if(this.num_servicio_actual){
        //this.num_servicio_actual=(this.contador_temporal+1).toString()
        this.http.get<any[]>(this.url_chat +this.num_servicio_actual+"/"+ this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)
      .subscribe(res => {
        let data = JSON.stringify(res)
        //console.log(data)
        let mensajes = JSON.parse(data).mensajes
        this.canal_actual = JSON.parse(data).canal
        this.contactosMensajes = mensajes
        console.log(this.contactosMensajes)
        console.log(this.servicio_actual)
      })
    }
    
    //this.usuario_receptor=""
    //console.log(this.url_chat+ this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado,"ruta")
    
  }

  sendMessage(sms: string) {
    let sms_info: smsInfo1 = {
      texto: sms,
      usuario: this.usuario_logeado,
      canal: this.canal_actual

    }
    if(this.num_servicio_actual){

    this.http.post<any>(this.url_chat +this.num_servicio_actual+"/"+ this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado + "/", sms_info)
      .subscribe(res => {
        //this.socketService.socket.emit('OK','Mensaje enviado')
        //this.enviar()
        this.obtenerMensajesPorUsuarioLogeado()
        this.obtenerListaMensajes()
      })
    }
  }

  obtenerMensajesPorUsuarioLogeado() {
    //console.log("url", this.url_chat + "inbox/" + this.usuario_logeado + "/")
    this.http.get<any>(this.url_chat + "inbox/" + this.usuario_logeado + "/")
      .subscribe(res => {
        this.chats = []
        let data = JSON.stringify(res)
        //console.log(JSON.parse(data))
        let canales = JSON.parse(data)
        for (let i in canales) {

          if (canales[i].mensajes.length>0) {
            let cantidad_mensajes = canales[i].mensajes.length
            let ultimo_mensaje = canales[i].mensajes[cantidad_mensajes - 1]
            //console.log(ultimo_mensaje)
            let usuario = canales[i].usuarios_canal[0]
            //console.log(usuario)
            ultimo_mensaje.usuario__correo == usuario[0] ?
              ultimo_mensaje["nombre_perfil"] = usuario[1] :
              ultimo_mensaje["nombre_perfil"] = canales[i].usuarios_canal[1][1]
            //ultimo_mensaje["receptor"] = ultimo_mensaje.usuarios_canal.find((usuario: string | null) => usuario != this.usuario_logeado)

            if (usuario[0] != this.usuario_logeado) {
              //console.log("no es logeado")
              ultimo_mensaje["receptor"] = usuario[1]
              //console.log(ultimo_mensaje)

            } else {
              //console.log("es logeado")
              ultimo_mensaje["receptor"] = canales[i].usuarios_canal[1][1]
            }


            //ultimo_mensaje["receptor"] = ultimo_mensaje.usuarios_canal.find((usuario: string | null) => usuario != this.usuario_logeado)
            //ultimo_mensaje["servicio"] = canales[i].servicio


            this.chats.push(ultimo_mensaje)
          }

        }
        this.chats.sort((a, b) => {
          var firstDate = new Date(a.tiempo),
            SecondDate = new Date(b.tiempo);
          if (firstDate > SecondDate) return -1;
          if (firstDate < SecondDate) return 1;
          return 0;
        });

      })
  }

  mostrarMensajesActual() {

  }


}

export interface smsInfo1 {
  canal: string
  texto: string
  usuario: string | null
}
export interface smsInfoCanal {
  CANAL_ID: string
  mensajes: Array<smsInfo2>
  servicio: string
  usuario_canal: Array<any>
}

export interface smsInfo2 {
  canal__servicio: string
  canal__id_servicio:string
  texto: string
  tiempo: string
  usuario: string
  usuario__correo: string
  usuario__rol: number
  receptor: string
  nombre_perfil: string
}

/*fecha_envio: string,
  nombre_perfil: string
  texto: string
  tiempo: string
  tiempo_envio: string
  usuario: string
  receptor: string
  correo_usuario: string
  rol: string
  servicio: string
*/