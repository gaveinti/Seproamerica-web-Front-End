import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteWAService } from './services/cliente-wa.service';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { PerfilComponent } from './perfil/perfil.component';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import * as Material from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { GuardService } from './services/guard.service';
import { GeneralinfobarComponent } from './principal/generalinfobar/generalinfobar.component';
import { InfoempresaComponent } from './infoempresa/infoempresa.component';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';

const routes: Routes = [
  { path: 'inicioSesion', component: InicioSesionComponent },
  { path: 'registro', component: RegistroComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistroComponent,
    PrincipalComponent,
    PerfilComponent,
    MensajeriaComponent,
    GeneralinfobarComponent,
    InfoempresaComponent,
    EditarperfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,  
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    
  ],
  exports: [RouterModule],
  providers: [ClienteWAService, AuthService, AuthGuard, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
