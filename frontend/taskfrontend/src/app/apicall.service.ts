import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map,catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { CanActivate,ActivatedRouteSnapshot,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApicallService implements CanActivate{
  products
  constructor(public apiserv:HttpClient,public route:Router) { }

  apiloginservice(logindata)
  {
    return this.apiserv.post("http://localhost:4400/login",logindata)
    .map(res => res)
.catch(this.handleError);
}


  


apisignupservice(signupdata)
{
return this.apiserv.post("http://localhost:4400/signup",signupdata)
// .pipe(
// map((data:any[])=>{
//   this.products = data;
  
//   return true;
// }),
// catchError(error=>{
//   return throwError (error.status)
// })


// )}
.map(res => res)
.catch(this.handleError);
}

private handleError(error: any) { 
let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
return  throwError (error);
}


apiuserdetails()
{
return this.apiserv.get("http://localhost:4400/username",{
  observe:'body',
  params:new HttpParams().append('token',localStorage.getItem('token'))
})

}

canActivate(routes:ActivatedRouteSnapshot):boolean{
  if(localStorage.getItem('token') == undefined || null)
  {
    this.route.navigateByUrl('/home')
    return false
  }
  else{
    return true
  }
}

dashboard()
{
  return this.apiserv.get('http://localhost:4400/dashboarddata')
}


saveindashboard(taskcreatordata)
{
  return this.apiserv.post("http://localhost:4400/dashboard",taskcreatordata)
}

deletedata(Titledata)
{
return this.apiserv.post('http://localhost:4400/delete',Titledata)
.map(res => res)
.catch(this.handleError);
}



}
