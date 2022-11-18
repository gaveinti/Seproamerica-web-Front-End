import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { InfoempresaComponent } from './infoempresa/infoempresa.component';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { ServicioseleccionadoComponent } from './servicioseleccionado/servicioseleccionado.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

const routes: Routes = [
  { path: "inicioSesion/:correo", component: InicioSesionComponent},
  { path: "registro", component: RegistroComponent},
  { path: "principal", component: PrincipalComponent, canActivate: [GuardService]},
  { path: "informacion", component: InfoempresaComponent},
  { path: "perfil", component: PerfilComponent},
  { path: "editarPerfil", component: EditarperfilComponent},
  { path: "mensajeria", component: MensajeriaComponent},
  { path: "servicioSeleccionado", component: ServicioseleccionadoComponent},
  { path: "ubicacion", component: UbicacionComponent},
  //{ path: '',   redirectTo: '/inicioSesion/:correo', pathMatch: 'full'},
  { path: '', component: InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
