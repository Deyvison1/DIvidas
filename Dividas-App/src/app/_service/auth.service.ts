import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:5000/api/user/';
  jwtHelper = new JwtHelperService();
  decodificadorToken: any;


  constructor(private http: HttpClient) { }

  login(model: any) {
    this.http.post(`${this.baseURL}login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodificadorToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  registrar(model: any) {
    return this.http.post(`${this.baseURL}registrar`, model);
  }

  logado() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
