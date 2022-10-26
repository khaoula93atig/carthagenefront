import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../login/service/token-storage.service';
import { UserService } from '../login/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService,private tokenService: TokenStorageService) { }

  user:any
  ngOnInit(): void {
    console.log('user',this.tokenService.getUser().id)
    this.getUser()
  }

  getUser(){
    this.userService.getuserById(this.tokenService.getUser().id).subscribe(data=>{this.user=data
    console.log(this.user)})
  }
}
