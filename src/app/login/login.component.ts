import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Responce } from '../model/responce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public name:any=null;
  public password:any=null;

  //injecting services and router to this compoenent
  constructor(private DataService:DataService,private router:Router) { }
  
  ngOnInit(): void {
  }
  onFormSubmit(event:any){
    //calling function for validating
    let validate=this.validateForm();
    //if validate is true then getting token 
    if(validate==true){
      //accessing button and make it disable
      let button=document.querySelector('.btn');
      button?.setAttribute('aria-disabled','true');
      button?.classList.add('disabled')
      this.sendData();
    }
  } 

  validateForm(){
    //accessing form fields for style change
    let name=document.querySelector('#name');
    let password=document.querySelector('#password');

    if(this.name==null||this.name==''){
      name?.classList.add('is-invalid');
    }else{
      name?.classList.remove('is-invalid');
    }
    if(this.password==null||this.password==''){
      password?.classList.add('is-invalid');
    }else{
      password?.classList.remove('is-invalid');
    }
    //checking validity
    if(this.name!=null&&this.name!=''&&this.password!=null&&this.password!=''){
      return true;
    }else{
      return false;
    }

  }

  sendData(){
    //creating a user object to send data
    var user={
      username:this.name,
      password:this.password
    }
    //getting observable and subscribe to observable ,handling success and error
    this.DataService.getLoginData(user).subscribe((res:any)=>{
        this.router.navigate(['/movies']);
        this.DataService.storeUserToken(res.data.token)
    },(err:any)=>{
        //accessing button and activating disabled button
        let button=document.querySelector('.btn');
        button?.setAttribute('aria-disabled','false');
        button?.classList.remove('disabled')
        //creating an alert div and appending it to the form
        let alertDiv=document.createElement('div');
        alertDiv.className="alert alert-danger";
        alertDiv.innerText="Invalid Login Credentials"

        let parent=document.querySelector('.wrapper');
        let child=document.querySelector('.first-form');
        // parent?.insertBefore(alertDiv,child);
        parent?.appendChild(alertDiv);
        //remove that alert div after 3 seconds
        setTimeout(()=>{
          alertDiv.remove();
        },3000)
    })
  }

}
