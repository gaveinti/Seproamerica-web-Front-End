import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalMensajeriaComponent } from '../components/modals/modal-mensajeria/modal-mensajeria.component';
import { ModalNotificacionesComponent } from '../components/modals/modal-notificaciones/modal-notificaciones.component';
import { ModalPerfilComponent } from '../components/modals/modal-perfil/modal-perfil.component';
import { AuthService } from '../services/auth.service';
import { ModalsService } from '../services/modals/modals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private modalService:ModalsService,
    private authService:AuthService,
    private router:Router
    ) {
   }

  ngOnInit(): void {
    this.authService.estaAutenticado().subscribe(res=>{
      console.log(res)
      console.log("cambio")
      if(res==false){

        this.modalService.closeAllModals()
          setTimeout(() => {
            this.router.navigate(["/login"])
          }, 500);

      }
      
    })
   
  }
 

  abrirModalPerfil(){
    //this.dialogRef.closeAll()
    //this.dialogRef.open(ModalPerfilComponent,this.dialogConfig)
    this.modalService.getDialogRef().closeAll()
    this.modalService.getDialogRef().open(ModalPerfilComponent,this.modalService.getDialogConfig())
    
  }
  abrirModalNotificaciones(){
    this.modalService.getDialogRef().closeAll()

    
    this.modalService.getDialogRef().open(ModalNotificacionesComponent,this.modalService.getDialogConfig(),
      )
  }
  abrirModalMensajeria(){
    this.modalService.getDialogRef().closeAll()

   
   this.modalService.getDialogRef().open(ModalMensajeriaComponent,this.modalService.getDialogConfig())
  }

  

}
