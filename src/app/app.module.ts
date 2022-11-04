import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AjoutMedecinComponent } from './medecin/ajout-medecin/ajout-medecin.component';
import { MedecinComponent } from './medecin/medecin/medecin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';



import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ServiceComponent } from './serviceMedico/service-medico/service.component';
import { AjoutServiceComponent } from './serviceMedico/ajout-service/ajout-service.component';
import { NewsComponent } from './news/news/news.component'
import { MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { AjoutNewsComponent } from './news/ajout-news/ajout-news.component';
import { DatePipe } from '@angular/common';
import { ListRdvComponent } from './RDV/list-rdv/list-rdv.component';
import { StatusRdvComponent } from './RDV/status-rdv/status-rdv.component';
import {MatIconModule} from '@angular/material/icon'
import{JwtInterceptor} from './login/jwt.interceptor';
import { HadComponent } from './HAD/had/had.component'
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    NavbarComponent,
    AjoutMedecinComponent,
    MedecinComponent,
    ServiceComponent,
    AjoutServiceComponent,
    NewsComponent,
    AjoutNewsComponent,
    ListRdvComponent,
    StatusRdvComponent,
    HadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ClrIconModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
