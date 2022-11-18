import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket:any
  server="http://localhost:8000/ws/chat/room"

  url ="http://localhost:8000/"
  url1='ws://'
  + 'localhost:8000'
  + '/ws/chat/room/'

  url2="http://localhost:3000/"
  io =  io(this.url1,{
    withCredentials:true,    
    autoConnect:true

  })

  constructor() {
    console.log(this.url1)
   
  }

}
