import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividasComponent } from './dividas/dividas.component';
import { ContatosComponent } from './contatos/contatos.component';
import { DividasPagaComponent } from './dividasPaga/dividasPaga.component';
import { DividasPendentesComponent } from './dividasPendentes/dividasPendentes.component';

const routes: Routes = [
  { path: 'dividas', component: DividasComponent },
  { path: 'dividas-paga', component: DividasPagaComponent},
  { path: 'dividas-pendentes', component: DividasPendentesComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: '', redirectTo: 'dividas', pathMatch: 'full' },
  { path: '**', redirectTo: 'dividas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
