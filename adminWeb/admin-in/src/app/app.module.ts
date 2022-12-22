import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ActualizarPerfilComponent } from './actualizar-perfil/actualizar-perfil.component';
import { AgregarvehiculoDialogComponent } from './agregarvehiculo-dialog/agregarvehiculo-dialog.component';
import { EditVehiculosComponent } from './edit-vehiculos/edit-vehiculos.component';
import { EditCandadosComponent } from './edit-candados/edit-candados.component';
import { AgregarcandadosDialogComponent } from './agregarcandados-dialog/agregarcandados-dialog.component';
import { AgregararmamentoDialogComponent } from './agregararmamento-dialog/agregararmamento-dialog.component';




import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServiciosWindComponent,
    PersonalWindComponent,
    RecursosWindComponent,
    ReportesWindComponent,
    MensajeriaWindComponent,
    RecursosVehiculosComponent,
    RecursosCandadosComponent,
    RecursosCelularComponent,
    RecursosArmasComponent,
    PersonalRegistroComponent,
    NotFoundComponent,
    InicioSesionComponent,
    RegistroComponent,
    HeaderComponent,
    PerfilComponent,
    ActualizarPerfilComponent,
    AgregarvehiculoDialogComponent,
    EditVehiculosComponent,
    EditCandadosComponent,
    AgregarcandadosDialogComponent,
    AgregararmamentoDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,

  ],
  entryComponents: [AgregarvehiculoDialogComponent],
   
  providers: [   
/*    ClienteWAService, 
    AuthService, 
    AuthGuard, 
    GuardService, 
    CookieService, */
    {provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
