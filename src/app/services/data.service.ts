import { Injectable,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  public token:any
  ngOnInit(){
      this.token=localStorage.getItem('id_token');
      console.log(this.token)
  }
  logedIn:boolean=false;
  constructor(private http:HttpClient) { }
  getLoginData(user:any){
    let headers=new HttpHeaders;
    headers.append('Content-Type','application/json');
    return this.http.post('https://demo.credy.in/api/v1/usermodule/login/',user,{
      headers:headers
    })
  }
  storeUserToken(token:any){
    localStorage.setItem('id_token',token)
    this.logedIn=true;
  }
  logOut(){
    localStorage.clear();
    this.logedIn=false;
  }

  getMoviesList(token:any,url:any){
    return this.http.get(url,{
        headers:new HttpHeaders().set('Authorization',`Token ${token}`)
      }).pipe(map(value=>value));
  }


}

