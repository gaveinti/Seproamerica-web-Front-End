import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ServiciosWindComponent,
    PersonalWindComponent,
    RecursosWindComponent,
    ReportesWindComponent,
    MensajeriaWindComponent,

    RecursosVehiculosComponent,
    RecursosCandadosComponent,
    RecursosCelularComponent,
    RecursosArmasComponent,
    PersonalRegistroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'recursosVentana', component: RecursosWindComponent},
      {path: 'serviciosVentana', component: ServiciosWindComponent},
      {path: 'personalVentana', component: PersonalWindComponent},
      {path: 'reportesVentana', component: ReportesWindComponent},
      {path: 'mensajeriaVentana', component: MensajeriaWindComponent},
      
      {path: 'vehiculosSec',component: RecursosVehiculosComponent},
      {path: 'celularesSec', component: RecursosCelularComponent},
      {path: 'armasSec', component: RecursosArmasComponent},
      {path: 'candadosSec', component: RecursosCandadosComponent},
      {path: 'registrarPer', component: PersonalRegistroComponent},
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
