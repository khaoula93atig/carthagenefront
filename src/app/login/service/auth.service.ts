import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient) { }
   
  login(auth : {username:string,password:string}):Observable<any>{
    return this.http.post<any>(environment.URLAuth+'/signin',auth)
  }
  register(user):Observable<any>{
    return this.http.post<any>(environment.URLAuth+'/signup',user)
  }
 
  
}
