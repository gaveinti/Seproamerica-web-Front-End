import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioseleccionadoService {

  nombreServicio = ""

  constructor() { }

  //Recibo de nombre de servicio escogido en pantalla principal
  nombreServicioEscogido(servicio: string){
    this.nombreServicio = servicio
    console.log(this.nombreServicio)
  }

  //Envio de nombre de servicio escogido a su respectiva pantalla
  nombreServicioEscogidoComponente(){
    console.log(this.nombreServicio)
    return this.nombreServicio
  }


}
