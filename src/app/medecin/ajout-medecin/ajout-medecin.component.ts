import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MedecinService } from 'src/app/services/medecin.service';
import {SpecialitesService} from 'src/app/services/specialites.service'
import { MedecinComponent } from '../medecin/medecin.component';

@Component({
  selector: 'app-ajout-medecin',
  templateUrl: './ajout-medecin.component.html',
  styleUrls: ['./ajout-medecin.component.css']
})
export class AjoutMedecinComponent implements OnInit {

  specialites:any[]=[]
  specialitesMedicale:any[]=[]
  specialitesChirurgicales:any[]=[]
  specialitesExpFonctionelle:any[]=[]
  
  constructor(private specialiteService: SpecialitesService,
    private medecinService:MedecinService,
    private medecinComponent: MedecinComponent,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSpecilites()
    this.getbySpecilitesMedicale()
    this.getbySpecilitesChirurgicalese()
    this.getbyExpFonctionellee()
  }

  getSpecilites(){
    this.specialiteService.ListeSpecialites().subscribe(res=>{
      this.specialites=res;
    })
  }

  getbySpecilitesMedicale(){
    this.specialiteService.ListeBySpecialiteMedicale(1).subscribe(res=>{
      this.specialitesMedicale=res;
    
    })
  }

  getbySpecilitesChirurgicalese(){
    this.specialiteService.ListeBySpecialiteMedicale(2).subscribe(res=>{
      this.specialitesChirurgicales=res;
     
    })
  }

  getbyExpFonctionellee(){
    this.specialiteService.ListeBySpecialiteMedicale(3).subscribe(res=>{
      this.specialitesExpFonctionelle=res;
      
    })
  }
  save(monform:NgForm){
    this.medecinService.ajouter(monform.value).subscribe(data=>{
      if(data['response']=="OK"){
        this.toastr.success('Success', 'Ajout avec succés');
        monform.reset();
    this.medecinComponent.ngOnInit();
      }else{
        this.toastr.error('Error', 'operation echouée');
      }
      
    })

    

  }
}
