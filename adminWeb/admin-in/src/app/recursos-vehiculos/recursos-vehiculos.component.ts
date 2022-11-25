import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';
@Component({
  selector: 'app-recursos-vehiculos',
  templateUrl: './recursos-vehiculos.component.html',
  styleUrls: ['./recursos-vehiculos.component.css']
})
export class RecursosVehiculosComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
/*
  emp:any;
    nombres!: string;
    apellidos!: string;
    numCedula!: string;
    sexo!: string;
    correo!: string;
    fechaNac!: string;
    telefono!: string;

    //datos: PersonalOpN[] = [];
    personalList:any=[];
    columnas: string[] = ['Nombres','Apellidos','Cedula','Sexo','Correo','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _inventarioService: InventarioService){}
 

    ngOnInit(): void {
      this._inventarioService.getAllInventario().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;
    }
    
      
    eliminarUsuario(index: number){
      console.log(index);
      this._inventarioService.eliminarRegistro(index);
      //this.cargarUsuarios();
    }
*/
}
