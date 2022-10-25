import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {RendezVous} from '../models/RendezVous'

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http : HttpClient) { }

  public getallRDV():Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(environment.UrlRendezVous)
  }
  public changeStatus(idRdv:string, status:string, description:string):Observable<any>{
    return this.http.put<any>(environment.UrlRendezVous+'/changeStatus/'+idRdv+'/'+status+'/'+description, observable)
  }
}
