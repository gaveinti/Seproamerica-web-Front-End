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
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';

const routes: Routes = [
  //{ path: "inicioSesion/:correo", component: InicioSesionComponent},
  { path: '', component: InicioSesionComponent,pathMatch: 'prefix' },
  { path: 'registro', component: RegistroComponent,pathMatch: 'prefix' },
  { path: "principal", component: PrincipalComponent, canActivate: [GuardService],pathMatch: 'prefix'},
  { path: "informacion", component: InfoempresaComponent,pathMatch: 'prefix'},
  { path: "perfil", component: PerfilComponent,pathMatch: 'prefix'},
  { path: "editarPerfil", component: EditarperfilComponent,pathMatch: 'prefix'},
  { path: "mensajeria", component: MensajeriaComponent,pathMatch: 'prefix'},
  { path: "servicioSeleccionado", component: ServicioseleccionadoComponent,pathMatch: 'prefix'},
  { path: "ubicacion", component: UbicacionComponent,pathMatch: 'prefix'},
  //{ path: '',   redirectTo: 'inicioSesion', pathMatch: 'prefix'},
  { path: '**',  component:NotFoundComponentComponent, pathMatch: 'prefix'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
