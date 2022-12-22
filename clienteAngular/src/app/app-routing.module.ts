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
import { PermitidoConSesionActivaGuard } from './guards/permitido-con-sesion-activa.guard';
import { NoPermitidoSinSesionActivaGuard } from './guards/no-permitido-sin-sesion-activa.guard';

const routes: Routes = [
  //{ path: "inicioSesion/:correo", component: InicioSesionComponent},
  { path: 'login', component: InicioSesionComponent,pathMatch: 'prefix',
  canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'registro', component: RegistroComponent,pathMatch: 'prefix',
  canActivate:[NoPermitidoSinSesionActivaGuard] },
  { path: "principal", component: PrincipalComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "informacion", component: InfoempresaComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "perfil", component: PerfilComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "editarPerfil", component: EditarperfilComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "mensajeria", component: MensajeriaComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "servicioSeleccionado", component: ServicioseleccionadoComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: "ubicacion", component: UbicacionComponent,pathMatch: 'prefix',
  //canActivate:[PermitidoConSesionActivaGuard]
},
  { path: '',   redirectTo: '/login', pathMatch: 'prefix'},
  { path: '**',  component:NotFoundComponentComponent, pathMatch: 'prefix'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
