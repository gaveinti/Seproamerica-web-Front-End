import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, ResolveEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, tap,} from 'rxjs/operators';
import { catchError,  Observable} from "rxjs";
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import {firstValueFrom} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  private valorRetorno: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean  {
    //Para manener la sesion despues del refresh de la pagina principal
    const data = localStorage.getItem("usuario_logeado")
    if(data != null){
      this.authService.envioCorreoLS(data)
    }
    console.log(data)
    //
    console.log("se usa")
    let navigarLogIn = () => this.router.navigate([''])
    return new Promise((resolve) => {
      this.authService.estaAutenticado()
      .subscribe((r: boolean) => {
        console.log(r)
        if(r == false){
          console.log("No puede entrar")
          this.router.navigate(['']);
          resolve(false)
        } else{
          console.log("Puede entrar")
          resolve(true)
        }
      })
    });
    
  }

}
