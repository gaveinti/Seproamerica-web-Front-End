import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: "inicioSesion/:correo", component: InicioSesionComponent},
  { path: "registro", component: RegistroComponent},
  { path: "principal", component: PrincipalComponent},
  //{ path: '',   redirectTo: '/inicioSesion/:correo', pathMatch: 'full'},
  { path: '', component: InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
