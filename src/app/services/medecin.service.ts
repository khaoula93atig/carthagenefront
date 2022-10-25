import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medecins } from '../models/Medecins';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private http :HttpClient) { }

  public ListeMedecins(): Observable<Medecins[]>{
    return this.http.get<Medecins[]>(environment.URLMedecin);
  }

  public getbyid(id:string): Observable<Medecins>{
    return this.http.get<Medecins>(environment.URLMedecin+'/getbyid/'+id);
  }

  public ajouter(medecins:any):Observable<any>{
    return this.http.post<any>(environment.URLMedecin+'/save',medecins)
  }

  public modifier(medecin:Medecins):Observable<Medecins>{
    return this.http.put<Medecins>(environment.URLMedecin+'/update',medecin)
  }

  public supprimer(medecin:Medecins):Observable<Medecins>{
    return this.http.put<Medecins>(environment.URLMedecin+'/supprimer',medecin)
  }

}
