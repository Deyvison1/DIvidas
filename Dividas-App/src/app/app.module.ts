import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DividasComponent } from './dividas/dividas.component';

/*  Depois do init project  */

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';



@NgModule({
   declarations: [
      AppComponent,
      DividasComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
