import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  datos: any[] = [];

  constructor(private http: HttpClient) { }


    eliminarVehiculo(index: number){
      this.datos.splice(index,1);
    }

    getAllVehiculo(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarVehiculos');
    }

    obtenerVehiculo(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarVehiculos');
      }
  
    eliminarCandado(index: number){
      this.datos.splice(index,1);
    }

    getAllCandado(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarCandados');
    }

    obtenerCandado(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarCandados');
      }
    
    eliminarArmamento(index: number){
      this.datos.splice(index,1);
    }

    getAllArmamento(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarArmamentos');
    }

    obtenerArmamento(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarArmamentos');
      }
}
