import { Injectable } from '@angular/core';
import { Articulo } from '../personal-wind/personal-wind.component';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InfPersonalService {
  datos: Articulo[] = [
    {codigo:1,descripcion:'gato Archie',precio:5},
    {codigo:2,descripcion:'gato Oshy',precio:15},
    {codigo:3,descripcion:'Vasie',precio:22},
    {codigo:4,descripcion:'pomo de agua',precio:31},
    {codigo:5,descripcion:'pato',precio:19},
    {codigo:6,descripcion:'perico',precio:68},
    {codigo:7,descripcion:'puma',precio:2},
    {codigo:8,descripcion:'ornamental',precio:25},
    {codigo:9,descripcion:'educacion',precio:18},
    {codigo:10,descripcion:'alcalde',precio:52},
    {codigo:11,descripcion:'momito',precio:76},
  ];
  dataSource:any;
  paginator: any;
/*
  ngOnInit() {
    for (let x = 1; x <= 80; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    //this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    //this.dataSource.paginator = this.paginator;

  }*/  

  constructor() { }
   getArticulo(){
    return this.datos.slice();
   }

    eliminarRegistro(index: number){
      this.datos.splice(index,1);
    }
}
