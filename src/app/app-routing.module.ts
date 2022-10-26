import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MedecinComponent } from './medecin/medecin/medecin.component';
import { NewsComponent } from './news/news/news.component';
import { ListRdvComponent } from './RDV/list-rdv/list-rdv.component';
import { ServiceComponent } from './serviceMedico/service-medico/service.component';
import {AuthGuard} from './guards/AuthGuard'
import {AfterAuthGuard} from './guards/AfterAuthGuard'


const routes: Routes = [
  {path:'',component:LoginComponent, canActivate:[AfterAuthGuard]},
  {path:'dash',component:DashboardComponent,canActivate:[AuthGuard],children:[
  {path:'medecin',component:MedecinComponent},
  {path:'service',component:ServiceComponent},
  {path:'news',component:NewsComponent},
  {path:'RDV',component:ListRdvComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
