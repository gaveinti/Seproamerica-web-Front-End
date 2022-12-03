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

  emp:any;
    placa!: string;
    marca!: string;
    modelo!: string;
    color!: string;
    anio!: string;
  
    VehiculoList:any=[];
    columnas: string[] = ['Placa','Marca','Modelo','Color','Año','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _inventarioService: InventarioService){}
 

    ngOnInit(): void {
      this._inventarioService.getAllVehiculo().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.VehiculoList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarVehiculo(index: number){
      console.log(index);
      this._inventarioService.eliminarVehiculo(index);
    }


}
