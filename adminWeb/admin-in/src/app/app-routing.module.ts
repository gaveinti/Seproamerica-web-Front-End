import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosWindComponent } from './servicios-wind/servicios-wind.component';
import { PersonalWindComponent } from './personal-wind/personal-wind.component';
import { RecursosWindComponent } from './recursos-wind/recursos-wind.component';
import { ReportesWindComponent } from './reportes-wind/reportes-wind.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeriaWindComponent } from './mensajeria-wind/mensajeria-wind.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecursosVehiculosComponent } from './recursos-vehiculos/recursos-vehiculos.component';
import { RecursosCandadosComponent } from './recursos-candados/recursos-candados.component';
import { RecursosCelularComponent } from './recursos-celular/recursos-celular.component';
import { RecursosArmasComponent } from './recursos-armas/recursos-armas.component';
import { PersonalRegistroComponent } from './personal-registro/personal-registro.component';


const routes: Routes = [
  {path: 'personalVentana', component: PersonalWindComponent},
  {path: 'registrarPer', component: PersonalRegistroComponent},
  {path: 'recursosVentana', component: RecursosWindComponent},
  {path: 'serviciosVentana', component: ServiciosWindComponent},
  {path: 'reportesVentana', component: ReportesWindComponent},
  {path: 'mensajeriaVentana', component: MensajeriaWindComponent},
  {path: 'vehiculosSec',component: RecursosVehiculosComponent},
  {path: 'celularesSec', component: RecursosCelularComponent},
  {path: 'armasSec', component: RecursosArmasComponent},
  {path: 'candadosSec', component: RecursosCandadosComponent},

    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
