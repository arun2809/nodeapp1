import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  logintoken;

  constructor(private apiserv:ApicallService,public route:Router) { }

  ngOnInit() {
  }
login()
{
  if(!this.email)
  {
    alert("enter email")
  }
  else if(!this.password)
  {
    alert("enter password")
  }
  else{
   this.apiserv.apiloginservice({email:this.email,password:this.password}).subscribe(data=>{
    this.logintoken = data;
    localStorage.setItem('token',data.toString())
    if(data)
    {
alert("login successful")
this.route.navigateByUrl('/dashboard')  
    }
   
     
   },
   error=>{
       if(error.status == 409)
       {
         alert("password not match")
       }
       else if(error.status == 404){
         alert("email not found")
       }
   }
   )
  }
}

registerbutton()
{
this.route.navigateByUrl('/register')
}



}
