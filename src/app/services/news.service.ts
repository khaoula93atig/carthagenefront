import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/News';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  public ListeNews(): Observable<News[]>{
    return this.http.get<News[]>(environment.UrlNews);
  }
  public getImage(id): Observable<any>{
    return this.http.get<any>(environment.UrlNews+"/image/"+id);
  }
  public ajouter(formData){
    return this.http.post<any>(environment.UrlNews+'/save',formData)
  }

  public supprimer(id:string){
    return this.http.delete(environment.UrlNews+'/delete/'+id)
  }
}
