import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfPersonalService } from '../services/inf-personal.service';
import { PersonalOpModel } from '../models/personalOp.models';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-personal-wind',
  templateUrl: './personal-wind.component.html',
  styleUrls: ['./personal-wind.component.css']
})

export class PersonalWindComponent implements OnInit{
    emp:any;
    nombres!: string;
    apellidos!: string;
    numCedula!: string;
    sexo!: string;
    correo!: string;
    fechaNac!: string;
    telefono!: string;
    rol!: string;

    //Lista para guardar los servicios ya creados
    lista_personal!: PersonalOpModel[];


    //datos: PersonalOpN[] = [];
    personalList:any=[];
    columnas: string[] = ['Nombres','Apellidos','Cedula','Sexo','Correo','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _infPersonalService: InfPersonalService, private clienteWAService: ClienteWAService, private router: Router){}
 

    ngOnInit(): void {
      localStorage.removeItem('cedula_personalOp')
      localStorage.removeItem('detalles_personal')
      this.obtener_personal()
      console.log("Lista de personal")
      console.log(this.lista_personal)
      /*this._infPersonalService.getAllPersonalOp().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;*/
    }

    obtener_personal():void {
      this.clienteWAService.obtener_personalOp()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.lista_personal = data;
        },
        error: (e) => console.error(e)
      });
    }
    
    cargarUsuarios(){
      this._infPersonalService.obtenerPersonalOp();
      //this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarUsuario(cedula: number){
      this.clienteWAService.eliminar_personaOp(cedula)
      .subscribe({
        next: (res) => {
          console.log(res)
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
      /*console.log(index);
      this._infPersonalService.eliminarRegistro(index);
      this.cargarUsuarios();*/
    }

    agregarPersonalOp(){
      var val = {nombres:this.nombres,
                  apellidos:this.apellidos,
                  numCedula:this.numCedula,
                  sexo:this.sexo,
                  correo:this.correo};
  
      this._infPersonalService.agregarPersonalOp(val).subscribe(res=>{
        alert(res.toString());
      });
    }
  
    updatePersonalOp(){
      var val = {nombres:this.nombres,
        apellidos:this.apellidos,
        numCedula:this.numCedula,
        sexo:this.sexo,
        correo:this.correo};
  
      this._infPersonalService.updatePersonalOp(val).subscribe(res=>{
      alert(res.toString());
      });
    }

    /*mostrar_detalles(cedula: number){
      console.log("Muestreo de detalles")
      localStorage.setItem('cedula_personalOp', cedula.toString())
      this.router.navigate(['/personalActualizar'])
    }*/

    enviar_personalop_seleccionado(cedula_personal: number){
      this.clienteWAService.obtener_personalOp_especifico(cedula_personal.toString())
      .subscribe({
        next: (data) => {
          console.log(data)
          localStorage.setItem('detalles_personal', JSON.stringify(data))
          this.router.navigate(['/personalActualizar'])
        },
        error: (e) => console.log(e)
      });
    }


  }

