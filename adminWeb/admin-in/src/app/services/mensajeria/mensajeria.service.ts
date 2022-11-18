import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CanalInfoMensajes } from 'src/app/models/infoCanalMensaje';
import { Constantes } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {


  usuario_logeado = localStorage.getItem("usuario_logeado")
  usuario_receptor = ""
  nombre_usuario_receptor = ""
  servicio_actual = ""
  canal_actual = ""
  chats: smsInfo2[] = [];
  contactosMensajes!: smsInfo2[];


  socket: any
  room: string = "room"


  constructor(
    private http: HttpClient) {
    this.obtenerMensajesPorUsuarioLogeado()
    this.socket = new WebSocket('ws://localhost:8000/ws/chat/' + 'mensajeria'+ "/")

  }


  enviar() {
    this.socket.send(JSON.stringify({
      message: 'OK',
    }))

  }

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(Constantes.URL_CHAT + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)

  }
  obtenerListaMensajes() {
    console.log(this.room)
    this.http.get<any[]>(Constantes.URL_CHAT + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)
      .subscribe(res => {
        let data = JSON.stringify(res)
        let mensajes = JSON.parse(data).mensajes
        this.canal_actual = JSON.parse(data).canal
        this.contactosMensajes = mensajes
        this.nombre_usuario_receptor = JSON.parse(data).perfil_receptor
        this.room = this.canal_actual.toString()
      })
  }

  sendMessage(sms: string) {
    let sms_info: smsInfo1 = {
      texto: sms,
      usuario: this.usuario_logeado,
      canal: this.canal_actual,

    }
    this.http.post<any>(Constantes.URL_CHAT + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado + "/", sms_info)
      .subscribe(res => {


      })
  }

  obtenerMensajesPorUsuarioLogeado() {

    this.http.get<any>(Constantes.URL_CHAT_INBOX + this.usuario_logeado)
      .subscribe(res => {
        this.chats = []
        let data = JSON.stringify(res)
        let canales = JSON.parse(data).canales
        for (let i in canales) {
          let cantidad_mensajes = canales[i].mensajes.length
          let ultimo_mensaje = canales[i].mensajes[cantidad_mensajes - 1]
          console.log(ultimo_mensaje)
          ultimo_mensaje["receptor"] = ultimo_mensaje.usuarios_canal.find((usuario: string | null) => usuario != this.usuario_logeado)
          ultimo_mensaje["servicio"] = canales[i].servicio
          this.chats.push(ultimo_mensaje)
        }
        this.chats.sort((a, b) => {
          var firstDate = new Date(a.tiempo),
            SecondDate = new Date(b.tiempo);
          if (firstDate > SecondDate) return -1;
          if (firstDate < SecondDate) return 1;
          return 0;
        });
      }
      
      )
      

  }


}

export interface smsInfo1 {
  canal: string
  texto: string
  usuario: string | null
}

export interface smsInfo2 {
  fecha_envio: string,
  nombre_perfil: string
  texto: string
  tiempo: string
  tiempo_envio: string
  usuario: string
  receptor: string
  correo_usuario: string
  rol: string
  servicio: string


}