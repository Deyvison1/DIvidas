import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Divida } from '../_model/Divida';

@Injectable({
  providedIn: 'root'
})
export class DividaService {

  baseURL = 'http://localhost:5000/api/divida';

  constructor(private http: HttpClient) { }

  getAllDivida(): Observable<Divida[]> {
    return this.http.get<Divida[]>(this.baseURL);
  }
  getDividaByTitulo(titulo: string): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getByTitulo/${titulo}`);
  }
  getByValor(valor: number): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getByValor/${valor}`);
  }
  getDividaById(id: number): Observable<Divida> {
    return this.http.get<Divida>(`${this.baseURL}/${id}`);
  }

}
