import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { NotificacionesService } from './services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-in';
  ruta=window.location.href.split("/").pop()
  child!: { ruta: string; };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rutaActiva: ActivatedRoute,
    private notificacionService:NotificacionesService
     ) { 
      this.ruta=window.location.href.split("/").pop()
    console.log(this.ruta)
    console.log("constructor")
    
  }

  ngAfterContentInit(){
    console.log("ngafetcontetinit")
    console.log(this.ruta)
    console.log(this.router.url)
    console.log(window.location.href.split("/").pop())
  }
  

  ngOnInit(){
    console.log("oninit")
    
   
  }
 

}
