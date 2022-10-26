import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';
import {AuthService} from './service/auth.service'
import {UserService} from './service/user.service'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: NgForm;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user:any;
  showPassword = false

  constructor( private tokenStorage:TokenStorageService,
    private authService:AuthService, 
    private userService:UserService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(monform): void {
    console.log(monform.value)
    this.authService.login(monform.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.userService.getuserById(data.id).subscribe(data=>{
          this.toastr.success('Bienvenue '+data.nom +' '+ data.prenom +' !')
        })
       this.router.navigate(['/dash/medecin'])

        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error(`S'il vous plait vérifier vos informations d'identification`)
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }


}
