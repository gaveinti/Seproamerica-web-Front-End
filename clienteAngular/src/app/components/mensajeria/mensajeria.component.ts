import { Component, OnInit } from '@angular/core';
import { ChatService,smsInfo } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {
  textSms="";

  constructor(
    public chat:ChatService
    ) { }

  ngOnInit(): void {
  }
  sendMessage(){
    let smsInfo:smsInfo={
      text: this.textSms,
      messageType: 1,
      date: '',
      estado_envio: false
    }
    //this.chat.sendMessage(smsInfo);
    this.textSms="";

  }
  

}

