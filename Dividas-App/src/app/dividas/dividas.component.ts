import { Component, OnInit, TemplateRef } from '@angular/core';
import { DividaService } from '../_service/divida.service';
import { Divida } from '../_model/Divida';
import { BsModalRef, BsModalService, ptBrLocale, defineLocale, BsLocaleService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  divida: Divida = new Divida();
  imagemLargura = 50;
  imagemMargem = 3;
  mostrarImagem = false;
  dividasFiltradas: Divida[] = [];
  _filtroLista =  '';
  registerForm: FormGroup;
  bodyDeletarDivida = '';
  file: File;
  fileNameUpdate: string;
  fileName: string;
  dataAtual: string;

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
      private localeService: BsLocaleService,
      private toast: ToastrService
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
  excluirDivida(divida: Divida, template: any) {
    this.abrirModal(template);
    this.divida = divida;
    this.bodyDeletarDivida = `Tem certeza que deseja deletar ${divida.titulo}, Valor: ${divida.valor}`;
  }
  confirmeDelete(template: any) {
    this.dividaService.deletarDivida(this.divida.id).subscribe(
      () => {
        template.hide();
        this.getDividas();
        this.toast.success('Divida Deletada com Sucesso!');
      }, error => {
        this.toast.error(`Erro ao Deletar Divida. CODE: ${error}`);
      }
    );
  }
  editarDivida(_divida: Divida, template: any) {
    this.divida = _divida;
    this.abrirModal(template);
    this.divida = Object.assign({}, _divida);
    this.fileNameUpdate = _divida.imagemURL.toString();
    this.fileName = _divida.imagemURL.toString();
    this.divida.imagemURL = '';
    this.registerForm.patchValue(this.divida);
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
      titulo: ['' , [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      imagemURL: [''],
      dataCompra: ['' , Validators.required],
      vencimento: ['', Validators.required],
      formaPagamento: ['', [Validators.required, Validators.max(2), Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(0.1)]],
      situacao: ['']
    });
  }

  mudarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  uploadImagem() {
    if (!this.divida.id) {
      const nomeArquivo = this.divida.imagemURL.split('\\', 3);
      this.divida.imagemURL = nomeArquivo[2];
      this.dividaService.postUpload(this.file, nomeArquivo[2]).subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.getDividas();
        }
      );
    } else {
      this.divida.imagemURL = this.fileNameUpdate;
      this.dividaService.postUpload(this.file, this.fileNameUpdate).subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.getDividas();
        }
      );
    }
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (!this.divida.id) {
      /* Se não tiver Id e Post */
      this.divida = Object.assign({ }, this.registerForm.value);

      this.uploadImagem();

      this.divida.situacao = 0;
      this.dividaService.postDivida(this.divida).subscribe(
        (novaDivida: Divida) => {
          template.hide();
          this.getDividas();
          this.toast.success('Divida Cadastrada com Sucesso!');
        }, error => {
          this.toast.error(`Erro ao Cadastrar Divida. CODE: ${error}`);
        }
      );
      } else {
        /* Se tiver Id e Put */
        this.divida = Object.assign({ id: this.divida.id }, this.registerForm.value);

        this.divida.imagemURL = this.fileName;
        if (this.registerForm.get('imagemURL').value) {
          this.uploadImagem();
        } else {
          this.divida.imagemURL = this.fileName;
        }

        this.dividaService.putDivida(this.divida).subscribe(
          () => {
            template.hide();
            this.getDividas();
            this.toast.success('Divida Atualizada com Sucesso!');
          }, error => {
            this.toast.error(`Erro ao Atualizar Divida. CODE: ${error}`);
          }
        );
      }
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file);
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
