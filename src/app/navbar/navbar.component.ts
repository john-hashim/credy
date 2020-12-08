import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public data:DataService,
              private routes:Router
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('id_token')){
      this.data.logedIn=true;
    }
  }
  logOut(){
    this.data.logOut();
    this.routes.navigate(['/login']);
  }

}
