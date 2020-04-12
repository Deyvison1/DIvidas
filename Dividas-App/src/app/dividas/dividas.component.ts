import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dividas',
  templateUrl: './dividas.component.html',
  styleUrls: ['./dividas.component.css']
})
export class DividasComponent implements OnInit {

  msg = 'Ola amigao';
  numero =  2;
  dividas: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDividas();
  }

  getDividas() {
    this.http.get('http://localhost:5000/api/values').subscribe(r => {
      this.dividas = r;
    }, error => {
      console.log(error);
    });
  }

}
