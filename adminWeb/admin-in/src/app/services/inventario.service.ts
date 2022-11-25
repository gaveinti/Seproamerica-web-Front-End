import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  datos: any[] = [];

  constructor(private http: HttpClient) { }

  eliminarRegistro(index: number){
    this.datos.splice(index,1);
  }

  getAllInventario(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarPersonal');
  }

  obtenerInventario(){
      return this.http.get('http://127.0.0.1:8000/api/visualizarPersonal');
    }
  
}
