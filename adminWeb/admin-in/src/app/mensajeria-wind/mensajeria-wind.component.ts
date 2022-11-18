import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MensajeriaService, smsInfo2 } from '../services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-mensajeria-wind',
  templateUrl: './mensajeria-wind.component.html',
  styleUrls: ['./mensajeria-wind.component.css']
})
export class MensajeriaWindComponent implements OnInit {

  textSms = "";

  constructor(
    public mensajeriaService: MensajeriaService
  ) { }

  ngOnInit(): void {
    this.mensajeriaService.socket.onmessage = (e: { data: string; }) => {
      const data = JSON.parse(e.data);
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    };


  }
  sendMessage() {
    console.log(this.mensajeriaService.contactosMensajes)
    this.mensajeriaService.sendMessage(this.textSms)
    this.mensajeriaService.enviar()
    this.textSms = "";
  }

  clickOnChat(mensaje: smsInfo2) {
    console.log(mensaje)
    this.mensajeriaService.room=mensaje.servicio.split(' ').join('')
    this.mensajeriaService.usuario_receptor = mensaje.receptor
    this.mensajeriaService.servicio_actual = mensaje.servicio
    this.mensajeriaService.obtenerListaMensajes()

  }

}


