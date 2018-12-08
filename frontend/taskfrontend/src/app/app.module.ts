import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ApicallService } from './apicall.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TaskcreatorComponent } from './taskcreator/taskcreator.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    TaskcreatorComponent,
    TaskupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      {path:'signin',component:LoginComponent},
      {path:'home',component:LoginComponent},
      {path:'register',component:RegistrationComponent},
     
      {path:'dashboard',component:DashboardComponent,canActivate:[ApicallService]},
      {path:'task',component:TaskcreatorComponent},
      {path:'update',component:TaskupdateComponent}
    ])
  ],
  providers: [ApicallService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
