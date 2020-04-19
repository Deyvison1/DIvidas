import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DividasComponent } from './dividas/dividas.component';

/*  Depois do init project  */

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
   declarations: [
      AppComponent,
      DividasComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         timeOut: 10000,
         preventDuplicates: true,
      }),
      HttpClientModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      FormsModule
   ],
   providers: [

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
