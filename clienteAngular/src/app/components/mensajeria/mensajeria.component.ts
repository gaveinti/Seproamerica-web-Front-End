import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService, smsInfo } from 'src/app/services/mensajeria/chat.service';
import { MensajeriaService, smsInfo1, smsInfo2 } from 'src/app/services/mensajeria/mensajeria.service';
import { ServicioseleccionadoService } from 'src/app/services/servicioseleccionado.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  textSms = "";
  data_ventana_principal_canal_nuevo:any


  constructor(
    public mensajeriaService: MensajeriaService,
    private route: ActivatedRoute


  ) { 

    this.route.queryParams
    .subscribe(params=>{
      //console.log(JSON.parse(JSON.stringify(params)))
      console.log(params)
      console.log(params['receptor'])
      console.log(params['servicio'])
      this.mensajeriaService.usuario_receptor=params['receptor']
      this.mensajeriaService.servicio_actual=params['servicio']

    })
  }

  ngOnInit(): void {
    this.mensajeriaService.obtenerListaMensajes()

    this.mensajeriaService.socket.onmessage = (e: { data: string; }) => {
      const data = JSON.parse(e.data);
      this.mensajeriaService.obtenerListaMensajes()
      
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    };
    

  }
  sendMessage() {
    console.log(this.mensajeriaService.contactosMensajes)
    if (this.textSms.length > 0) {
      this.mensajeriaService.sendMessage(this.textSms)
      this.mensajeriaService.enviar()
      this.textSms = "";
    }



  }

  clickOnChat(mensaje: smsInfo2) {
    this.mensajeriaService.usuario_receptor = mensaje.receptor
    this.mensajeriaService.servicio_actual = mensaje.servicio
    console.log(mensaje.servicio.split(" "))
    this.mensajeriaService.obtenerListaMensajes()


  }



}

