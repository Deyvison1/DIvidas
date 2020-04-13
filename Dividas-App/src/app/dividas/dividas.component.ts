import { Component, OnInit, TemplateRef } from '@angular/core';
import { DividaService } from '../_service/divida.service';
import { Divida } from '../_model/Divida';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-dividas',
  templateUrl: './dividas.component.html',
  styleUrls: ['./dividas.component.css']
})
export class DividasComponent implements OnInit {

  /* Variaveis */
  modalRef: BsModalRef;
  title = 'Dividas';
  dividas: Divida[];
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  dividasFiltradas: Divida [];
  _filtroLista = '';

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.dividasFiltradas = this.filtroLista ? this.filtrarLista(this.filtroLista) : this.dividas;
  }
  constructor(private dividaService: DividaService,
      private modalService: BsModalService
    ) { }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.getDividas();
  }

  filtrarLista(filtrarPor: string): Divida[] {
    /*
    if (!isNaN(Number(filtrarPor))) {modalRef
      const n = Number(filtrarPor);
      return this.dividas.filter(filtrar => filtrar.valor === n);
    }modalRef
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
    this.dividaService.getAllDivida().subscribe( (_dividas: Divida[]) => {
      this.dividas = _dividas;
      this.dividasFiltradas = this.dividas;
      console.log(_dividas);
    }, error => {
      console.log(error);
    });
  }

}
