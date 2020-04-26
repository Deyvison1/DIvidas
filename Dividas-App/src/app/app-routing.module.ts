import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividasComponent } from './dividas/dividas.component';
import { ContatosComponent } from './contatos/contatos.component';
import { DividasPagaComponent } from './dividasPaga/dividasPaga.component';
import { DividasPendentesComponent } from './dividasPendentes/dividasPendentes.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrarComponent } from './user/registrar/registrar.component';

const routes: Routes = [
  { path: 'user', component: UserComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegistrarComponent }
  ]},
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
