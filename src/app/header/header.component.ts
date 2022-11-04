import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../login/service/token-storage.service';
import { UserService } from '../login/service/user.service';
import { createPopper } from '@popperjs/core';
import { Router } from '@angular/router';
import { RdvService } from '../services/rdv.service';
import { HadService } from '../services/had.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService,
    private tokenService: TokenStorageService,
    private router:Router,
    private rdvService:RdvService,
    private hadService:HadService) { }

    notification:any[]=[]
   rdvEncours:any[]=[]
   hadEncours:any[]=[]
  user:any
  ngOnInit(): void {
    this.getUser()
    this.getNewRdv()
    this.getNewHad()
  }

  getUser(){
    this.userService.getuserById(this.tokenService.getUser().id).subscribe(data=>{this.user=data})
  }

  logout(){
    this.tokenService.logout()
this.router.navigateByUrl('')
  }

  getNewRdv(){
    this.rdvService.getNewRdv('Encours').subscribe(data=>{
      this.rdvEncours=data
    })
    setInterval(() => {
      this.rdvService.getNewRdv('Encours').subscribe(data=>{
        this.rdvEncours=data
        console.log('test')
      })},10000);
  }

  getNewHad(){
    this.hadService.getNewhad('Encours').subscribe(data=>{
      this.hadEncours=data
    })
    setInterval(() => {
      this.hadService.getNewhad('Encours').subscribe(data=>{
        this.hadEncours=data
        
      })},10000);

  }

  campareArray(a1,a2){
    let bigArray = null;
let smallArray = null;
if(a1.length >= a2.length)
  {
    bigArray = a1;
    smallArray =a2;
  } else {
    bigArray= a2;
    smallArray =a1;
  }       
return  bigArray.filter(item => smallArray.indexOf(item) < 0); 
  }

}
