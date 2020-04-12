import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dividas',
  templateUrl: './dividas.component.html',
  styleUrls: ['./dividas.component.css']
})
export class DividasComponent implements OnInit {

  /* Variaveis */
  title = 'Dividas';
  dividas: any = [];
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  dividasFiltradas: any [];
  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.dividasFiltradas = this.filtroLista ? this.filtrarLista(this.filtroLista) : this.dividas;
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDividas();
  }

  filtrarLista(filtrarPor: string): any {
    /*
    if (!isNaN(Number(filtrarPor))) {
      const n = Number(filtrarPor);
      return this.dividas.filter(filtrar => filtrar.valor === n);
    }
    */
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.dividas.filter(dividas => dividas.titulo.toLocaleLowerCase().indexOf(filtrarPor)
    !== -1 || dividas.valor.toString().indexOf(filtrarPor) !== -1
    );
  }


  mudarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getDividas() {
    this.http.get('http://localhost:5000/api/values').subscribe(r => {
      this.dividas = r;
      console.log(r);
    }, error => {
      console.log(error);
    });
  }

}
