import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Had} from '../models/HAD'

@Injectable({
  providedIn: 'root'
})
export class HadService {

  constructor(private http:HttpClient) { }

  public ListeHad(): Observable<Had[]>{
    return this.http.get<Had[]>(environment.URLhad);
  }

  public changeStatus(idHad:string, status:string, description:string):Observable<any>{
    return this.http.put<any>(environment.URLhad+'/changeStatue/'+idHad+'/'+status+'/'+description, observable)
  }

  public getNewhad(status:string):Observable<Had[]>{
    return this.http.get<Had[]>(environment.URLhad+'/newHad/'+status)
  }


}
