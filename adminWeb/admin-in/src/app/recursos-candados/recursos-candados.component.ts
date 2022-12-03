import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-recursos-candados',
  templateUrl: './recursos-candados.component.html',
  styleUrls: ['./recursos-candados.component.css']
})
export class RecursosCandadosComponent implements OnInit {


  emp:any;
    numSerie!: string;
    marca!: string;
    modelo!: string;
    color!: string;
    anio!: string;
  
    CandadoList:any=[];
    columnas: string[] = ['Numero Serie','Marca','Modelo','Color','Año','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _inventarioService: InventarioService){}

    ngOnInit(): void {
      this._inventarioService.getAllCandado().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.CandadoList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarCandado(index: number){
      console.log(index);
      this._inventarioService.eliminarCandado(index);
    }

}
