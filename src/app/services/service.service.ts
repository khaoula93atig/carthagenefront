
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Services} from '../models/Services'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  public ListeServices(): Observable<Services[]>{
    return this.http.get<Services[]>(environment.URLService);
  }

  public ajouter(service:any):Observable<any>{
    return this.http.post<any>(environment.URLService+'/save',service)
  }
  public getbyid(id:string):Observable<Services>{
    return this.http.get<Services>(environment.URLService+'/getbyid/'+id)
  }
}
