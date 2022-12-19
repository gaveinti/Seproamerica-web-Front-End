import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { Constantes } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  url_chat = Constantes.URL_CHAT_PRODUCCION
  usuario_logeado = localStorage.getItem("usuario_logeado")
  //usuario_logeado = "bryanloor.21@gmail.com"

  usuario_receptor = ""
  nombre_usuario_receptor = ""
  servicio_actual = ""
  canal_actual = ""
  chats: smsInfo2[] = [];
  contactosMensajes!: smsInfo2[];

  //  +"localhost:8000"

  socket: any

  url_websocket = ""

  constructor(
    private http: HttpClient,
  ) {


    if (window.location.host == "localhost:8300") {
      this.url_websocket = 'ws://'
      + "localhost:8000"
      + '/ws/chat/mensajeria/'
   
    }

    if (window.location.host == Constantes.DOMINIO_SERVER) {
      this.url_websocket = 'wss://'
        + Constantes.DOMINIO_SERVER_WEB_SOCKET
        + '/ws/chat/mensajeria/'
    }

    this.obtenerMensajesPorUsuarioLogeado()
    this.obtenerListaMensajes()
    this.socket = new WebSocket(this.url_websocket)
    console.log("usuario", this.usuario_logeado)
  }


  enviar() {
    this.socket.send(JSON.stringify({
      message: 'OK',
    }))

  }

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(Constantes.URL_CHAT_PRODUCCION + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)

  }
  obtenerListaMensajes() {
    //console.log(this.servicio_actual,this.usuario_receptor,this.usuario_logeado)
    //this.contactosMensajes=[]
    this.http.get<any[]>(this.url_chat + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado)
      .subscribe(res => {
        let data = JSON.stringify(res)
        let mensajes = JSON.parse(data).mensajes
        this.canal_actual = JSON.parse(data).canal
        this.contactosMensajes = mensajes
      })
  }

  sendMessage(sms: string) {
    let sms_info: smsInfo1 = {
      texto: sms,
      usuario: this.usuario_logeado,
      canal: this.canal_actual,

    }
    this.http.post<any>(this.url_chat + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado + "/", sms_info)
      .subscribe(res => {
        this.enviar()
        this.obtenerMensajesPorUsuarioLogeado()
        this.obtenerListaMensajes()
      })
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

            if (usuario[0] != this.usuario_logeado) {
              //console.log("no es logeado")
              ultimo_mensaje["receptor"] = usuario[1]
              ultimo_mensaje["correo_receptor"] = usuario[0]

              //console.log(ultimo_mensaje)

            } else {
              //console.log("es logeado")
              ultimo_mensaje["receptor"] = canales[i].usuarios_canal[1][1]
              ultimo_mensaje["correo_receptor"] = canales[i].usuarios_canal[1][0]

            }


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
  texto: string
  tiempo: string
  usuario: string
  usuario__correo: string
  usuario__rol: number
  receptor: string
  correo_receptor: string
  nombre_perfil: string

}

