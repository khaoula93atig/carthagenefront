import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Medecins } from 'src/app/models/Medecins';

import {MedecinService} from 'src/app/services/medecin.service'
import { SpecialitesService } from 'src/app/services/specialites.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Medecins>
  displayedColumns = ['id', 'nom', 'prenom', 'spécialité', 'téléphone', 'email','action'];
  
  francaisRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
    
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  medecins:Medecins[]=[]
  subs: SubSink = new SubSink()
  medecin=new Medecins()

  specialites:any[]=[]
  specialitesMedicale:any[]=[]
  specialitesChirurgicales:any[]=[]
  specialitesExpFonctionelle:any[]=[]

  constructor(private medecinService:MedecinService,
    private specialiteService: SpecialitesService,
    private toastr: ToastrService) {
      this.dataSource=new MatTableDataSource(this.medecins)
     }

  ngOnInit(): void {
    this.getallmedecin()
    this.getSpecilites()
    this.getbySpecilitesMedicale()
    this.getbySpecilitesChirurgicalese()
    this.getbyExpFonctionellee()
    
  }

  update(){
    this.medecinService.modifier(this.medecin).subscribe(data=>{
      if(data['response']=="OK"){
      this.toastr.success('Success', 'modification avec succés');
    }else{
      this.toastr.error('Error', 'operation echouée');
    }
    this.medecin=new Medecins()})
  }
  delete(){
    this.medecinService.supprimer(this.medecin).subscribe(data=>{
      if(data['response']=="OK"){
        this.toastr.success('Success', 'Suppression avec succesées');
        this.ngOnInit()
      }else{
        this.toastr.error('Error', 'operation echouée');
      }
      this.medecin=new Medecins()

    })
  }


  getallmedecin(){
    this.subs.add(
    this.medecinService.ListeMedecins().subscribe(data=>{
      this.dataSource.data=data,
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.francaisRangeLabel
  })
    )

  }

  getMedecin(index){
    for(let i of this.dataSource.data){
      if (i==index){
        this.medecin=i
      }
    }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
