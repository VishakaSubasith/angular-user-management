import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserComponent} from "./user/user.component";
import {AuthenticationService} from "./services/authentication.guard"

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'user', component: UserComponent ,canActivate:[AuthenticationService]},
  { path:'home', component: DashboardComponent ,canActivate:[AuthenticationService]},
  {path : 'signup',component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
