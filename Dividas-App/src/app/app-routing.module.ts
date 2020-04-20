import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividasComponent } from './dividas/dividas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { DividasPagaComponent } from './dividasPaga/dividasPaga.component';
import { DividasPendentesComponent } from './dividasPendentes/dividasPendentes.component';

const routes: Routes = [
  { path: 'dividas', component: DividasComponent },
  { path: 'dividas-paga', component: DividasPagaComponent},
  { path: 'dividas-pendentes', component: DividasPendentesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
