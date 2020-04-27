import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  model: any = {};


  constructor(
      private authService: AuthService,
      public router: Router,
      private toastr: ToastrService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/dividas']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(
      (data) => {
        this.router.navigate(['/dividas']);
        this.toastr.success('logado');
        console.log(data);
      }, error => {
        this.toastr.error('Erro ao logar');
      }
    );
  }
}
