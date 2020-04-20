import { Component, OnInit } from '@angular/core';
import { Divida } from '../_model/Divida';
import { DividaService } from '../_service/divida.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dividas-pendentes',
  templateUrl: './dividasPendentes.component.html',
  styleUrls: ['./dividasPendentes.component.css']
})
export class DividasPendentesComponent implements OnInit {

  title = 'Dividas Pendete';
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  divida: Divida = new Divida();
  dividas: Divida[];
  _filtroLista: string;
  dividasFiltradas: Divida[] = [];
  dividaAserPaga: Divida;
  bodyPagarDivida: string;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.dividasFiltradas = this._filtroLista ? this.filtrarLista(this.filtroLista) : this.dividas;
  }
  constructor(
    private dividaService: DividaService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getDividas();
  }

  abrirModal(template: any) {
    template.show();
  }
  pagarDivida(template: any, divida: Divida) {
    this.abrirModal(template);
    this.dividaAserPaga = divida;
    this.bodyPagarDivida = `Tem certeza que deseja Pagar\n ${divida.titulo}, Valor: ${divida.valor}`;
  }

  confirmPagamento(template: any) {

    if (this.dividaAserPaga.id) {

      this.dividaAserPaga.situacao = 1;
      this.dividaAserPaga = Object.assign({ id: this.dividaAserPaga.id }, this.dividaAserPaga);
      this.dividaService.pagarDivida(this.dividaAserPaga).subscribe(
        () => {
          template.hide();
          this.getDividas();
          this.toast.success('Divida Paga com Sucesso!');
        }, error => {
          this.toast.error(`Erro ao Pagar Divida. CODE: ${error}`);
        }
      );
    }
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
  mudarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  getDividas() {
    this.dividaService.getAllDividasPendentes().subscribe( (_dividas: Divida[]) => {
      this.dividas = _dividas;
      this.dividasFiltradas = this.dividas;
      console.log(_dividas);
    }, error => {
      console.log(error);
    });
  }
}
