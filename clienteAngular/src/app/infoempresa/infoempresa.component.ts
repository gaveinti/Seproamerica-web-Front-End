import { Component, OnInit } from '@angular/core';
import { GeneralinfobarComponent } from '../principal/generalinfobar/generalinfobar.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-infoempresa',
  templateUrl: './infoempresa.component.html',
  styleUrls: ['./infoempresa.component.css']
})
export class InfoempresaComponent implements OnInit {

  //titulo de la pagina
  titulo: string = "Informacion General"

  constructor(private authS: AuthService) { }

  ngOnInit(): void {
  }

  //Funcion que permite volver a la pagina principal ya que tiene el canactivate activo
  mandarGuard(){
    this.authS.loginDos()
  }

}
