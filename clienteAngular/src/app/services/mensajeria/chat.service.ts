import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  chats:smsInfo[]=[];
  constructor(
    private socket:SocketService
    ) {
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




export interface smsInfo{
  text:string,
  messageType:number,
  date:string,
  estado_envio:boolean
}