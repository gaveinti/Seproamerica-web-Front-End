import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { PersonalOpN } from '../personal-wind/personal-wind.component';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

const baseUrl = 'http://localhost:8000/api/visualizarPersonal';


@Injectable({
  providedIn: 'root'
})
export class InfPersonalService {

 datos: any[] = [];
    /*
    {nombres:'Mathias' ,apellidos:'Guijarro Alban', cedula: '0915623452',direccion: 'Boyaca y velez',
    correo:'mguija@gmail.com', rol: 'guardaespaldas'},
    {nombres:'Luis' ,apellidos:'Guijarro Alban', cedula: '0815623452',direccion: 'Boyaca y velez',
    correo:'mguija@gmail.com', rol: 'guardaespaldas'},
    {nombres:'Rafael' ,apellidos:'Guijarro Alban', cedula: '0715623452',direccion: 'Boyaca y velez',
    correo:'mguija@gmail.com', rol: 'guardaespaldas'},
    {nombres:'Jose' ,apellidos:'Guijarro Alban', cedula: '0665623452',direccion: 'Boyaca y velez',
    correo:'mguija@gmail.com', rol: 'guardaespaldas'},
    
  ];*/

  dataSource:any;
  paginator: any;

/*
  ngOnInit() {
    for (let x = 1; x <= 80; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    //this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    //this.dataSource.paginator = this.paginator;

  }*/  

  constructor(private http: HttpClient) { }

  //constructor() { }
   getArticulo(){
    return this.datos.slice();
   }

    eliminarRegistro(index: number){
      this.datos.splice(index,1);
    }

    getAllPersonalOp(): Observable<any[]> {
      return this.http.get<any[]>(baseUrl);
    }

    obtenerPersonalOp(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarPersonal');
      }
    
    agregarPersonalOp(val:any){
      return this.http.post('http://127.0.0.1:8000/api/visualizarPersonal/',val);
    }

    updatePersonalOp(val:any){
      return this.http.put('http://127.0.0.1:8000/api/visualizarPersonal/',val);
    }

    deletePersonalOp(val:any){
      return this.http.delete('http://127.0.0.1:8000/api/visualizarPersonal/'+val);
    }
  /*
    get(id: any): Observable<Articulo> {
      return this.http.get(`${baseUrl}/${id}`);
    }*/
 /* 
    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
    }
  
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }
  
    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }
  
    deleteAll(): Observable<any> {
      return this.http.delete(baseUrl);
    }
  
    findByTitle(title: any): Observable<Articulo[]> {
      return this.http.get<Articulo[]>(`${baseUrl}?title=${title}`);
    }
  */
}
