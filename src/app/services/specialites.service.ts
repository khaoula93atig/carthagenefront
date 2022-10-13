import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import{environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SpecialitesService {

  constructor(private http:HttpClient) { }

  public ListeSpecialites(): Observable<any[]>{
    return this.http.get<any[]>(environment.URLSpecialite);
  }
  public ListeBySpecialiteMedicale(id:number): Observable<any[]>{
    return this.http.get<any[]>(environment.URLCategorie+'/'+id);
  }
}
