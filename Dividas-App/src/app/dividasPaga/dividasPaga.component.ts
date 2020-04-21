import { Component, OnInit } from '@angular/core';
import { Divida } from '../_model/Divida';
import { DividaService } from '../_service/divida.service';


@Component({
  selector: 'app-dividas-paga',
  templateUrl: './dividasPaga.component.html',
  styleUrls: ['./dividasPaga.component.css']
})
export class DividasPagaComponent implements OnInit {

  title = 'Pagas';
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  dividas: Divida[];
  _filtroLista: string;
  dividasFiltradas: Divida[] = [];
  dataAtual: string;


  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.dividasFiltradas = this._filtroLista ? this.filtrarLista(this.filtroLista) : this.dividas;
  }
  constructor(
    private dividaService: DividaService
  ) { }

  ngOnInit() {
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
      this.dividaService.getDividasPagasValor(n).subscribe(
        data => {
          this.dividasFiltradas = data;
          return this.dividas;
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.dividaService.getDividasPagasTitulo(filtrarPor).subscribe(
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
      this.dataAtual = new Date().getMilliseconds().toString();
      this.dividaService.getAllDividasPaga().subscribe( (_dividas: Divida[]) => {
      this.dividas = _dividas;
      this.dividasFiltradas = this.dividas;
      console.log(_dividas);
    }, error => {
      console.log(error);
    });
  }
}
