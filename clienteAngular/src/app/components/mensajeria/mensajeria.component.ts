import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { MensajeriaService, smsInfo1, smsInfo2 } from 'src/app/services/mensajeria/mensajeria.service';
import { SocketService } from 'src/app/services/mensajeria/socket.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  textSms = "";
  data_ventana_principal_canal_nuevo:any
  nombre_usuario_receptor = ""
  data_chat:any=localStorage.getItem("data_chat")

  constructor(
    public mensajeriaService: MensajeriaService,
    private route: ActivatedRoute,
    //private socketService: SocketService


  ) { 
    this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    this.data_chat=JSON.parse(this.data_chat!)
    console.log(this.data_chat)
    this.mensajeriaService.usuario_receptor=this.data_chat!['receptor']
    this.mensajeriaService.servicio_actual=this.data_chat!['servicio']

    /*this.route.queryParams
    .subscribe(params=>{
      //console.log(JSON.parse(JSON.stringify(params)))
      console.log(params)
      console.log(params['receptor'])
      console.log(params['servicio'])
      this.mensajeriaService.usuario_receptor=params['receptor']
      this.mensajeriaService.servicio_actual=params['servicio']

    })*/

    //this.socketService.setupSocketConnection()
  }

  ngOnInit(): void {
    this.mensajeriaService.obtenerListaMensajes()

    /*this.socketService.socket.on("OK",(  data: any  )=>{
      console.log(data)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    })*/
    //this.socketService.setupSocketConnection();
    /*this.socketService.listen("OK").subscribe(res=>{
      console.log(res)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    })*/
    
    const obs$=interval(2000)
    obs$.subscribe((t)=>{
      //console.log(t)
      //this.mensajeriaService.obtenerListaMensajes()
      //this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    })
    
    this.mensajeriaService.socket.onmessage = (e: { data: string; }) => {
      const data = JSON.parse(e.data);
      console.log(data)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    };
    

  }
  ngOnDestroy() {
    //this.socketService.disconnect();
    console.log("desconectado")
  }
  sendMessage() {
    console.log(this.mensajeriaService.contactosMensajes)
    if (this.textSms.length > 0) {
      this.mensajeriaService.sendMessage(this.textSms)
      //this.mensajeriaService.enviar()
      this.textSms = "";

    }



  }

  clickOnChat(mensaje: smsInfo2) {
    console.log(mensaje)
    this.mensajeriaService.num_servicio_actual=mensaje.canal__id_servicio
    this.mensajeriaService.servicio_actual=mensaje.canal__servicio
    this.mensajeriaService.nombre_usuario_receptor=mensaje.receptor
  
    this.mensajeriaService.obtenerListaMensajes()

  }



}

