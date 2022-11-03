import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanalInfoMensajes } from 'src/app/models/infoCanalMensaje';
import { Constantes } from '../../util/constantes';
import { smsInfo } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  usuario_logeado=localStorage.getItem("usuario_logeado")
  usuario_receptor=""
  chats:smsInfo2[]=[];
  contactosMensajes:smsInfo2[]=[]

  constructor(private http: HttpClient) {
    //this.obtenerListaMensajes("mel@gmail.com")
    this.obtenerMensajesPorUsuarioLogeado()
  }

  obtenerListaMensajes(usuario_chat:string) {

    this.http.get<any[]>(Constantes.URL_CHAT+usuario_chat+"/"+this.usuario_logeado)
      
      .subscribe(res => {
        let data=JSON.stringify(res)
        console.log(data)
        let mensajes=JSON.parse(data).mensajes
        this.contactosMensajes=mensajes
        //console.log(this.contactosMensajes)
        console.log(mensajes)
        
        console.log("usuario chat: ",usuario_chat)

      })
  }

  obtenerMensajesPorUsuarioLogeado(){
    //const usuario_logeado=localStorage.getItem("usuario_logeado")
    
    //let mensajes:smsInfo2[]=[]

    console.log("usuario actual ",this.usuario_logeado)
    
    this.http.get<any>(Constantes.URL_CHAT_INBOX+this.usuario_logeado)
    
    .subscribe(res=>{
      let data=JSON.stringify(res)
      console.log(data)
      let canales=JSON.parse(data).canales

      console.log("canales del usuario logeado")
      console.log(canales)
      console.log(canales[0])
      

      for(let i in canales){
        let cantidad_mensajes=canales[i].mensajes.length
        let ultimo_mensaje=canales[i].mensajes[cantidad_mensajes-1]
        
        console.log(cantidad_mensajes)
        
        //let canal=JSON.parse(JSON.stringify(canal))
        console.log("=========================")
        
        console.log(canales[i].mensajes)
        
        console.log(ultimo_mensaje)
        console.log(ultimo_mensaje.usuarios_canal)
        //console.log(canal[0])
        console.log("=========================")
        //canales[i].mensajes["receptor"]=
        //console.log("mens",canales[i].mensajes)
        
        
        this.chats.push(ultimo_mensaje)

      }
      //let data:CanalInfoMensajes=res
      
      
      
      
      
      //this.contactosMensajes=

    })
  }

  obtenerMensajesPorCanalUsuario(usuario_chat: any){
    const usuario_logeado=localStorage.getItem("usuario_logeado")
    console.log(usuario_chat,usuario_logeado)


  }

}



export interface smsInfo2 {
  fecha_envio:string,
  nombre_perfil:string
  texto:string
  tiempo:string
  tiempo_envio:string
  usuario:string
  receptor:string
  estado:string
  correo_usuario:string

}