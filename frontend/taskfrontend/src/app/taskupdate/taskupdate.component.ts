import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrls: ['./taskupdate.component.css']
})
export class TaskupdateComponent implements OnInit {
    title;
  constructor(private apiserv:ApicallService,public route:Router) { }

  ngOnInit() {
  }

  taskdelete()
  {
    if(!this.title)
    {
      alert("enter title name")
    }
    else
    {
      this.apiserv.deletedata({"Title":this.title}).subscribe(data=>{
        console.log(data)
        alert("data deleted successfully")
      },error=>{
        if(error.status == 404)
        {
          alert("no data found")
          this.route.navigateByUrl('/dashboard')
        }
      })
    }
  }
}
