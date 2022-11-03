import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfPersonalService } from '../services/inf-personal.service';

@Component({
  selector: 'app-personal-wind',
  templateUrl: './personal-wind.component.html',
  styleUrls: ['./personal-wind.component.css']
})
export class PersonalWindComponent{

  datos: Articulo[] = [];
  columnas: string[] = ['codigo', 'descripcion', 'precio','opciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 
  
  constructor (private _infPersonalService: InfPersonalService){}
 
  ngOnInit(): void{
    this.cargarUsuarios();
    
  }
  
  cargarUsuarios(){
    this.datos = this._infPersonalService.getArticulo();
    //this.dataSource = new MatTableDataSource(this.datos);
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }
  

  eliminarUsuario(index: number){
    console.log(index);
    this._infPersonalService.eliminarRegistro(index);
    this.cargarUsuarios();
  }
}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}
