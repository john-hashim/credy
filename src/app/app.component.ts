import { Component,OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data:DataService){}
  title = 'credy';
  
  ngOnInit(){
  }
}
