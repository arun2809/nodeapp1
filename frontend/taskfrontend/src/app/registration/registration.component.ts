import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { error } from 'util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
name;
email;
password;
contact;
formdata;
  constructor(public route:Router,public apiserv1:ApicallService) { }

  ngOnInit() {
  }

register()
{
  if(!this.name)
  {
    alert("enter name")
  }
  else if(!this.email)
  {
    alert("enter email")
   
  }
  else if(!this.password)
  {
    alert("enter password")
    
  }
  else if(!this.contact)
  {
    alert("enter contact")
  }
  else{
    this.apiserv1.apisignupservice({name:this.name,email:this.email,
      password:this.password,contact:this.contact}).subscribe((data)=>{
      this.formdata = data
    if(data)
    {
      alert("signup succesfull")
      this.route.navigateByUrl('/home')
    }
      
      },error=>{

           if(error.status == 409)
           {
             alert("already registered")
           }
           else if(error.status == 411)
           {
             alert("email fomat mismatch")
           }
           else
           {
             alert("enter phone number numeric")
           }
      })
  }
}

loginbutton()
{
this.route.navigateByUrl('/signin')
}

}
