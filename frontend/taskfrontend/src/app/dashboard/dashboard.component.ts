import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username;
  dashboarddata;
  constructor(public apiserv1:ApicallService,public route:Router) { }

  ngOnInit() {



this.apiserv1.dashboard().subscribe(data=>{
  this.dashboarddata = data;
  console.log(this.dashboarddata)
}) 
  }

  logout()
  {
    localStorage.removeItem('token')
    this.route.navigateByUrl('/')
  }


  taskcreatepage()
  {
    this.route.navigateByUrl('/task')
  }

  update()
  {
    this.route.navigateByUrl('/update')
  }

}
