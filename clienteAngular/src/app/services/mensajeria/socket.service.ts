import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url ="http://localhost:3000/"
  url1='ws://'
  + '127.0.0.1:8000'
  + '/ws/socket-server/'

  url2="http://localhost:3000/"
  io =  io(this.url,{
    withCredentials:true,    
    autoConnect:true

  })
  constructor() {
    console.log(this.url1)
   
  }

}