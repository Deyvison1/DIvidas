import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Divida } from '../_model/Divida';

@Injectable({
  providedIn: 'root'
})
export class DividaService {

  baseURL = 'http://localhost:5000/api/divida';
  tokenHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
   }

  getAllDivida(): Observable<Divida[]> {
    return this.http.get<Divida[]>(this.baseURL, {headers: this.tokenHeader});
  }

  getAllDividasPaga(): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/dividasPaga`, {headers: this.tokenHeader});
  }
  getDividasPagasTitulo(titulo: string): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getDividasPagasTitulo/${titulo}`);
  }
  getDividasPagasValor(valor: number): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getDividasPagasValor/${valor}`);
  }
  getDividasPendentesTitulo(titulo: string): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getDividasPendentesTitulo/${titulo}`);
  }
  getDividasPendentesValor(valor: number): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/getDividasPendentesValor/${valor}`);
  }
  getAllDividasPendentes(): Observable<Divida[]> {
    return this.http.get<Divida[]>(`${this.baseURL}/dividasPendentes`, {headers: this.tokenHeader});
  }

  postUpload(file: File, name: string) {
    const fileToUpload = <File>file[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, name);

    return this.http.post(`${this.baseURL}/upload`, formData, {headers: this.tokenHeader});
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
    return this.http.post(this.baseURL, divida, {headers: this.tokenHeader});
  }

  putDivida(divida: Divida) {
    return this.http.put(`${this.baseURL}/${divida.id}`, divida, {headers: this.tokenHeader});
  }

  pagarDivida(divida: Divida) {
    return this.http.put(`${this.baseURL}/${divida.id}`, divida);
  }

  deletarDivida(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
