/// <reference types="@types/googlemaps" />
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
import { CookieService } from 'ngx-cookie-service';
import { ServicioseleccionadoComponent } from './servicioseleccionado/servicioseleccionado.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';

//import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
//import { environment } from 'src/environments/environment';
//import { initializeApp } from "firebase/app";
//initializeApp(environment.firebase);

import { } from 'googlemaps';



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
    ServicioseleccionadoComponent,
    UbicacionComponent,
    NotFoundComponentComponent,
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,  
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireMessagingModule,
    
  ],
  exports: [RouterModule],
  providers: [ClienteWAService, AuthService, AuthGuard, GuardService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
