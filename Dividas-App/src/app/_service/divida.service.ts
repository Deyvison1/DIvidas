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

  getDividasByTitulo(titulo: string): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getAllTitulo/${titulo}`);
  }

  getDividasByValor(valor: number): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getAllValor/${valor}`);
  }

  getDividaById(id: number): Observable<Divida> {
    return this.http.get<Divida>(`${this.baseURL}/${id}`);
  }

  postDivida(divida: Divida) {
    return this.http.post(this.baseURL, divida);
  }

  putDivida(divida: Divida) {
    return this.http.put(`${this.baseURL}/${divida.id}`, divida);
  }

  deletarDivida(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
