import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-modal-mensajeria',
  templateUrl: './modal-mensajeria.component.html',
  styleUrls: ['./modal-mensajeria.component.css']
})
export class ModalMensajeriaComponent implements OnInit {

  constructor(
    public mensajeriaService: MensajeriaService,
    private router:Router,

  ) { }

  ngOnInit(): void {
  }
  irMensajeria(){
    console.log("ir mensajeria")
    this.router.navigate(['/mensajeriaVentana'])
    
    

  }
}
