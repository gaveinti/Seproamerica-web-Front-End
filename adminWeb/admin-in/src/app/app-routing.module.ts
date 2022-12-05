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

const routes: Routes = [
{ path: 'login', component: InicioSesionComponent,pathMatch: 'prefix' },
{ path: 'registro', component: RegistroComponent,pathMatch: 'prefix' },
{ path: 'perfil', component: PerfilComponent,pathMatch: 'prefix' },
{ path: 'recursosVentana', component: RecursosWindComponent,pathMatch: 'prefix' },
{ path: 'serviciosVentana', component: ServiciosWindComponent,pathMatch: 'prefix' },
{ path: 'personalVentana', component: PersonalWindComponent,pathMatch: 'prefix' },
{ path: 'reportesVentana', component: ReportesWindComponent,pathMatch: 'prefix' },
{ path: 'mensajeriaVentana', component: MensajeriaWindComponent,pathMatch: 'prefix' },

{ path: 'vehiculosSec', component: RecursosVehiculosComponent,pathMatch: 'prefix' },
{ path: 'celularesSec', component: RecursosCelularComponent,pathMatch: 'prefix' },
{ path: 'armasSec', component: RecursosArmasComponent,pathMatch: 'prefix' },
{ path: 'candadosSec', component: RecursosCandadosComponent,pathMatch: 'prefix' },
{ path: 'registrarPer', component: PersonalRegistroComponent,pathMatch: 'prefix' },

//{ path: '',   redirectTo: 'serviciosVentana', pathMatch: 'prefix'},

{ path: '**',   component:NotFoundComponent, pathMatch: 'prefix'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
