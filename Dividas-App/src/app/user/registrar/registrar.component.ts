import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder,
      private toastr: ToastrService,
      public router: Router,
      private authService: AuthService
    ) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      nomeCompleto: ['', [Validators.required, Validators.minLength(10)]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required ]
      }, { validator: this.compararSenha })
    });
  }

  compararSenha(fb: FormGroup) {
    const confirSenhaCtrl = fb.get('confirmPassword');
    if (confirSenhaCtrl.errors == null || 'mismatch' in confirSenhaCtrl.errors) {
      if (fb.get('password').value !== confirSenhaCtrl.value) {
        confirSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value},
        this.registerForm.value
      );
      this.authService.registrar(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado com Sucesso!');
        }, error => {
          const erro = error.error;
          erro.array.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Nome duplicado');
                break;
              default:
                this.toastr.error(`Falha no cadastro ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

}
