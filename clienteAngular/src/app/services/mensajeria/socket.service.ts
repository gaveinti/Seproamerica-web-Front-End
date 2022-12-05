import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';
import { Constantes } from 'src/app/util/constantes';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket:any;
  server="ws://localhost:3000"


  constructor() {
    console.log(this.server)
    this.socket=  io(this.server,{
      withCredentials:true,    
      autoConnect:true
  
    })
   console.log("en socket")
  }

listen(eventname:string){
  return new Observable((subscriber)=>{
    this.socket.on(eventname,(data: any)=>{
      subscriber.next(data)
    })
  })
}
emit(eventname:string,data:any){
  this.socket.emit(eventname,data);
}
/*
  socket:any
  server="ws://localhost:3000"

  url='ws://'
  + Constantes.DOMINIO_SERVER
  + '/ws/chat/room/'

  url1='ws://'
  + 'localhost:8000'
  + '/ws/chat/room/'

  url2="http://localhost:3000/"
  
  

  constructor() {
    console.log(this.url)
    this.socket=  io(this.server,{
      withCredentials:true,    
      autoConnect:true
  
    })
   console.log("en socket")
  }


  listen(eventname:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventname,(data: any)=>{
        subscriber.next(data)
      })
    })
  }

  emit(eventname:string,data:any){
    this.socket.emit(eventname,data);
  }*/
  setupSocketConnection() {
    this.socket = io(this.server);
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  
}
}
