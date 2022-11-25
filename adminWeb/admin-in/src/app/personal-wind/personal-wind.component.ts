import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfPersonalService } from '../services/inf-personal.service';

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

    //datos: PersonalOpN[] = [];
    personalList:any=[];
    columnas: string[] = ['Nombres','Apellidos','Cedula','Sexo','Correo','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _infPersonalService: InfPersonalService){}
 

    ngOnInit(): void {
      this._infPersonalService.getAllPersonalOp().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;
    }
    
    cargarUsuarios(){
      this._infPersonalService.obtenerPersonalOp();
      //this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarUsuario(index: number){
      console.log(index);
      this._infPersonalService.eliminarRegistro(index);
      this.cargarUsuarios();
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
  }

