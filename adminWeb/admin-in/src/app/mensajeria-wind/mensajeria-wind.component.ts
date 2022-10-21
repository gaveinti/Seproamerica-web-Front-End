import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-mensajeria-wind',
  templateUrl: './mensajeria-wind.component.html',
  styleUrls: ['./mensajeria-wind.component.css']
})
export class MensajeriaWindComponent implements OnInit {

  textSms="";
  constructor(public chat:ChatService) { }

  ngOnInit(): void {
  }


  
  sendMessage(){
    let smsInfo:smsInfo={
      text: this.textSms,
      messageType: 1,
      date: '',
      estado_envio: false
    }
    this.chat.sendMessage(smsInfo);
    this.textSms="";

  }
}

export interface smsInfo{
  text:string,
  messageType:number,
  date:string,
  estado_envio:boolean
}
