import { Component, OnInit } from '@angular/core';
import  { DataService } from '../services/data.service';
import { Movie } from '../model/responce'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  nextFlag: number=0;
  preFlag:number=0;
  errorFlag:number=0;
  reloadCount:number=0;

  constructor(private DataService:DataService) { }


  toggleLoading:boolean=true;
  selectedMovie:Movie={
     title:'',
     genres:'',
     description:'',
     uuid:''
  }
  Movies:Movie[]=[]
  currentUrl:String='https://demo.credy.in/api/v1/maya/movies/'
  nextUrl:String='';
  previousUrl:String='';
  errorUrl:String='';

  ///calling parent api and geting next api
  ngOnInit(): void {
    this.DataService.getMoviesList(localStorage.getItem('id_token'),this.currentUrl)
    .subscribe((val:any)=>{
        this.Movies=val.results;
        this.nextUrl=val.next;
        this.previousUrl=val.previous;
    },(err)=>{
        this.error(this.currentUrl)
    });
    
  }

  previousList(){
    this.preFlag=0;
    this.DataService.getMoviesList(localStorage.getItem('id_token'),this.previousUrl)
    .subscribe((val:any)=>{
        this.preFlag=1;
        if(val.previous==null){
          document.querySelector('.previous')?.classList.add('display-none');
        }
        this.previousUrl=val.previous;
        this.Movies=val.results;
        this.nextUrl=val.next;
    },(err)=>{
      this.error(this.previousUrl)
    });
    setTimeout(()=>{
      if(this.preFlag==0){
        this.error(this.previousUrl)
      }
     },4000)
  }


  nextList(){
    this.nextFlag=0;
    this.DataService.getMoviesList(localStorage.getItem('id_token'),this.nextUrl)
    .subscribe((val:any)=>{
        this.nextFlag=1;
        document.querySelector('.previous')?.classList.remove('display-none');
        this.Movies=val.results;
        this.nextUrl=val.next;
        this.previousUrl=val.previous;
    },(err)=>{
      this.error(this.nextUrl)
    });
    setTimeout(()=>{
        if(this.nextFlag==0){
          this.error(this.nextUrl)
        }
    },4000)
  }

  error(url:String){
    document.querySelector('.previous')?.classList.add('display-none');
    document.querySelector('.next')?.classList.add('display-none');
    document.querySelector('.error')?.classList.remove('display-none');
    this.errorUrl=url;
  }

  handleError(){
    this.DataService.getMoviesList(localStorage.getItem('id_token'),this.errorUrl)
    .subscribe((val:any)=>{
        this.reloadCount=0;
        document.querySelector('.error')?.classList.add('display-none');
        if(val.previous!=null){
          document.querySelector('.previous')?.classList.remove('display-none');
        }
        document.querySelector('.next')?.classList.remove('display-none');
        this.Movies=val.results;
        this.nextUrl=val.next;
    },(err)=>{
      this.error(this.errorUrl)
    });
    this.reloadCount++
    if(this.reloadCount==3){
      location.reload();
    }
  }
  

  selectMovie(movie:Movie){
      this.selectedMovie=movie;
  }

}
