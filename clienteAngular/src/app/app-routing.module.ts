import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';

const routes: Routes = [
  { path: "inicioSesion/:correo", component: InicioSesionComponent},
  { path: "registro", component: RegistroComponent},
  { path: "principal", component: PrincipalComponent, canActivate: [AuthGuard]},
  { path: "perfil", component: PerfilComponent},
  { path: "mensajeria", component: MensajeriaComponent},
  //{ path: '',   redirectTo: '/inicioSesion/:correo', pathMatch: 'full'},
  { path: '', component: InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
