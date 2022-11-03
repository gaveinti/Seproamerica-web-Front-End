import { Injectable } from '@angular/core';
import { smsInfo } from '../mensajeria-wind/mensajeria-wind.component';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  chats:smsInfo[]=[];
  constructor(private socket:SocketService) {
    this.onReceiveMessage();

   }




  sendMessage(smsInfo:smsInfo){
    this.chats.push(smsInfo);
    this.socket.io.emit("sendMessage",smsInfo)

  }

  onReceiveMessage(){
    this.socket.io.on("receiveMessage",(smsInfo)=>{
      smsInfo.messageType=2
      this.chats.push(smsInfo)
    })
  }
}


