import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MensajeriaWindComponent } from './mensajeria-wind/mensajeria-wind.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonalRegistroComponent } from './personal-registro/personal-registro.component';
import { PersonalWindComponent } from './personal-wind/personal-wind.component';
import { RecursosArmasComponent } from './recursos-armas/recursos-armas.component';
import { RecursosCandadosComponent } from './recursos-candados/recursos-candados.component';
import { RecursosCelularComponent } from './recursos-celular/recursos-celular.component';
import { RecursosVehiculosComponent } from './recursos-vehiculos/recursos-vehiculos.component';
import { RecursosWindComponent } from './recursos-wind/recursos-wind.component';
import { RegistroComponent } from './registro/registro.component';
import { ReportesWindComponent } from './reportes-wind/reportes-wind.component';
import { ServiciosWindComponent } from './servicios-wind/servicios-wind.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermitidoConSesionActivaGuard } from './guards/permitido-con-sesion-activa.guard';
import { NoPermitidoSinSesionActivaGuard } from './guards/no-permitido-sin-sesion-activa.guard';



//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'login', 
  component: InicioSesionComponent, pathMatch: 'prefix',
  canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'registro', component: RegistroComponent, pathMatch: 'prefix',    
  canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'perfil', component: PerfilComponent, pathMatch: 'prefix',    
  canActivate:[PermitidoConSesionActivaGuard]},
  { path: 'recursosVentana', component: RecursosWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard]},
  { path: 'serviciosVentana', component: ServiciosWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'personalVentana', component: PersonalWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'reportesVentana', component: ReportesWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'mensajeriaVentana', component: MensajeriaWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },

  { path: 'vehiculosSec', component: RecursosVehiculosComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'celularesSec', component: RecursosCelularComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'armasSec', component: RecursosArmasComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'candadosSec', component: RecursosCandadosComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'registrarPer', component: PersonalRegistroComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },




  { path: '', redirectTo: '/login', pathMatch: 'prefix' },

  { path: '**', component: NotFoundComponent, pathMatch: 'prefix' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
