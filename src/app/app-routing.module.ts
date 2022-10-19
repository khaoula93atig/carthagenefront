import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MedecinComponent } from './medecin/medecin/medecin.component';
import { NewsComponent } from './news/news/news.component';
import { ServiceComponent } from './serviceMedico/service-medico/service.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dash',component:DashboardComponent,children:[
  {path:'medecin',component:MedecinComponent},
  {path:'service',component:ServiceComponent},
  {path:'news',component:NewsComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
