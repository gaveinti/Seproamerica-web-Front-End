import { Component, OnInit } from '@angular/core';
import { ChatService,smsInfo } from 'src/app/services/mensajeria/chat.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  textSms="";

  constructor(
    //public chat:ChatService,
    public mensajeriaService:MensajeriaService
    ) {

      const data=localStorage.getItem("usuario_logeado")
      console.log("usuario actual ",data)
     }

  ngOnInit(): void {
    
  }
  sendMessage(){
    console.log(this.mensajeriaService.contactosMensajes)
    let smsInfo:smsInfo={
      text: this.textSms,
      messageType: 1,
      date: '',
      estado_envio: false
    }
    //this.chat.sendMessage(smsInfo);
    this.textSms="";

  }

  clickOnChat(usuario: string){
    this.mensajeriaService.obtenerListaMensajes(usuario)
    console.log("mensajes",this.mensajeriaService.contactosMensajes)
    console.log("chat presionado ", usuario)
  }
  

}

