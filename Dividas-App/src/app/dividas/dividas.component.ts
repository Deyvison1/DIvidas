import { Component, OnInit, TemplateRef } from '@angular/core';
import { DividaService } from '../_service/divida.service';
import { Divida } from '../_model/Divida';
import { BsModalRef, BsModalService, ptBrLocale, defineLocale, BsLocaleService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

defineLocale('pt-br', ptBrLocale);



@Component({
  selector: 'app-dividas',
  templateUrl: './dividas.component.html',
  styleUrls: ['./dividas.component.css']
})
export class DividasComponent implements OnInit {

  /* Variaveis */
  title = 'Dividas';
  dividas: Divida[];
  divida: Divida;
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  dividasFiltradas: Divida[] = [];
  _filtroLista =  '';
  registerForm: FormGroup;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.dividasFiltradas = this._filtroLista ? this.filtrarLista(this.filtroLista) : this.dividas;
  }
  constructor(private dividaService: DividaService,
      private modalService: BsModalService,
      private fb: FormBuilder,
      private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br');
    }

  abrirModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  novaDivida(template: any) {
    this.abrirModal(template);
    this.divida = new Divida();
  }
  editarDivida(divida: Divida, template: any) {
    this.abrirModal(template);
    this.divida = divida;
    this.registerForm.patchValue(divida);
  }

  ngOnInit() {
    this.validacao();
    this.getDividas();
  }

  filtrarLista(filtrarPor: string): Divida[] {
    /*
    if (!isNaN(Number(filtrarPor))) {
      const n = Number(filtrarPor);
      return this.dividas.filter(filtrar => filtrar.valor === n);
    }

    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.dividas.filter(dividas => dividas.titulo.toLocaleLowerCase().indexOf(filtrarPor)
    !== -1 || dividas.valor.toString().indexOf(filtrarPor) !== -1
    );
    */
    if (!isNaN(Number(filtrarPor))) {
      const n = +filtrarPor;
      this.dividaService.getDividasByValor(n).subscribe(
        data => {
          this.dividasFiltradas = data;
          return this.dividas;
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.dividaService.getDividasByTitulo(filtrarPor).subscribe(
        data => {
          this.dividasFiltradas = data;
          return this.dividas;
        }, error => {
          console.log(error);
        }
      );
    }
    return [];
  }

  validacao() {
    this.registerForm = this.fb.group({
      titulo: ['' , [Validators.required, Validators.minLength(4)]],
      imagemURL: [],
      dataCompra: ['' , Validators.required],
      vencimento: ['', Validators.required],
      formaPagamento: ['', [Validators.required, Validators.max(2), Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  mudarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (!this.divida.id) {
      /* Se não tiver Id e Post */
      this.divida = Object.assign({ }, this.registerForm.value);
      this.dividaService.postDivida(this.divida).subscribe(
        (novaDivida: Divida) => {
          template.hide();
          this.getDividas();
        }, error => {
          console.log(error);
        }
      );
      } else {
        /* Se tiver Id e Put */
        this.divida = Object.assign({ id: this.divida.id }, this.registerForm.value);
        this.dividaService.putDivida(this.divida).subscribe(
          () => {
            template.hide();
            this.getDividas();
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }

  getDividas() {
    this.dividaService.getAllDivida().subscribe( (_dividas: Divida[]) => {
      this.dividas = _dividas;
      this.dividasFiltradas = this.dividas;
      console.log(_dividas);
    }, error => {
      console.log(error);
    });
  }
}
