import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskcreator',
  templateUrl: './taskcreator.component.html',
  styleUrls: ['./taskcreator.component.css']
})
export class TaskcreatorComponent implements OnInit {
title;
reporter;
status;
  constructor(public apiserv:ApicallService,public route:Router) { }

  ngOnInit() {
  }

  taskcreate()
  {
    if(!this.title)
    {
      alert("enter project title")
    }
    else if(!this.reporter)
    {
      alert("enter reporter name ")
    }
    else if(!this.status)
    {
      alert("enter status")
    }
    else
    {
      this.apiserv.saveindashboard({title:this.title,status:this.status,reporter:this.reporter}).subscribe(data=>{
        console.log(data)
        this.route.navigateByUrl('/dashboard')
      })
    }
  }

}
