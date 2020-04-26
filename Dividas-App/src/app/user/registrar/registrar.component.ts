import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public fb: FormBuilder,
      private toastr: ToastrService
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
    console.log('Cadastrado');
  }

}
