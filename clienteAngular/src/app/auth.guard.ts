import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //COn este valor cambia (Tengo que ver como obtengo el booleano del otro componente)
  validarRuta: boolean = true;

  constructor(private aService: AuthService) {}

  /*ngOnInit(){
    this.aService.currentApprovalStageMessage.subscribe(msg => this.validarRuta = msg)
    this.submit()
  }*/

  /*submit()
  {
  console.log("Valor de validacion de auth: "+this.validarRuta)
  this.aService.updateApprovalMessage(this.validarRuta);
  }*/

  canActivate(
    /*route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot*/): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //logica
    //this.aService.currentApprovalStageMessage.subscribe(msg => this.validarRuta = msg)
    /*if(this.validarRuta){
      console.log("entra a habilitar el inicio de sesion")
      return true
    }
    console.log("no habilitar el inicio sesion")
    console.log("valor de validar ruta:"+this.validarRuta)
    return false*/
    console.log("Receptor validacion:" + this.aService.obtenerValidacion());
    if(this.aService.obtenerValidacion()){
      return true;
    } else{
      console.log("alerta de window");
      window.alert("No puede iniciar sesion");
      return false;
    }
  }

  
}
