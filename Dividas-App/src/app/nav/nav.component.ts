import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
  }

  logado() {
    return this.auth.logado();
  }

  role() {
    return sessionStorage.getItem('role');
  }

  nomeLogado() {
    return sessionStorage.getItem('username');
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  sair() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
