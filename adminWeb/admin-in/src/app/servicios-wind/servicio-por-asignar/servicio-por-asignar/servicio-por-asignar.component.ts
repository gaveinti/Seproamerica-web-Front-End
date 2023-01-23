import { Component, OnInit } from '@angular/core';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { PedidoModel } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-servicio-por-asignar',
  templateUrl: './servicio-por-asignar.component.html',
  styleUrls: ['./servicio-por-asignar.component.css']
})
export class ServicioPorAsignarComponent implements OnInit {

  //Lista de pedidos
  lista_pedidos?: PedidoModel[];

  constructor(private clienteWAService: ClienteWAService) { }

  ngOnInit(): void {
    this.obtener_Pedidos_Request()
  }

  //Obtener pedidos desde un request
  obtener_Pedidos_Request(): void{
    this.clienteWAService.obtener_Pedidos()
    .subscribe({
      next: (data) => {
        this.lista_pedidos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  encontrar_pedido_especifico(id: Number){
    for(let pedido of this.lista_pedidos!){
      if(pedido.idPedido == id){
        console.log("El pedido seleccionado es: ")
        console.log(pedido)
        localStorage.setItem("pedido_seleccionado", JSON.stringify(pedido))
      }
    }
  }

}
