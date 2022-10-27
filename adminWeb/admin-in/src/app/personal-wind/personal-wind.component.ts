import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-personal-wind',
  templateUrl: './personal-wind.component.html',
  styleUrls: ['./personal-wind.component.css']
})
export class PersonalWindComponent{
  columnas: string[] = ['codigo', 'descripcion', 'precio','opciones'];
  datos: Articulo[] = [];
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  ngOnInit() {
    for (let x = 1; x <= 80; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;

  }
}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}
