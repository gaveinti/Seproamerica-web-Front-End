import { Component, OnInit } from '@angular/core';
import { GeneralinfobarComponent } from '../principal/generalinfobar/generalinfobar.component';

@Component({
  selector: 'app-infoempresa',
  templateUrl: './infoempresa.component.html',
  styleUrls: ['./infoempresa.component.css']
})
export class InfoempresaComponent implements OnInit {

  //titulo de la pagina
  titulo: string = "Informacion General"

  constructor() { }

  ngOnInit(): void {
  }

}
