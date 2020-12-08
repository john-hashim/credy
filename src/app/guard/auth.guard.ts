import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private dataService:DataService,
                private router:Router){}

    canActivate(){
        if(localStorage.getItem('id_token')!=null){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }            
}