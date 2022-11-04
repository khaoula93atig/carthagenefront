import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {RendezVous} from '../../models/RendezVous'
import {RdvService} from 'src/app/services/rdv.service'
import { MedecinService } from 'src/app/services/medecin.service';
import { ServiceService } from 'src/app/services/service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListRdvComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<RendezVous>
  displayedColumns = ['id', 'date', 'patient', 'medecin', 'service', 'spécialité','status', 'action'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: RdvService | null;

  descriptionConfirmation = " "
  descriptionAnnuler=" "
  specilite=" "

  rendezVous:RendezVous[]=[]
  idRdv=''
  rdv=new RendezVous()
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

  constructor(private rdvService:RdvService,
    private medecinService: MedecinService,
    private servicesService:ServiceService,
    private toastr:ToastrService) {
    this.dataSource=new MatTableDataSource(this.rendezVous)
   }

  ngOnInit(): void {
    this.getAllRdv()
  }

  getAllRdv(){
    this.rdvService.getallRDV().subscribe(data=>{
      
      let res:any[];
      res=data;
      {res.map((i)=>{
        if(i.idMedecin==''){
          i.nomMedecin=' '
        }else{
        i.nomMedecin= this.medecinService.getbyid(i.idMedecin).subscribe(data1=>
        i.nomMedecin=data1[0].nom+' '+data1[0].prenom)}
        if(i.specialiteId==''){
          i.specialite=' '
        }else{
        i.specialite=this.servicesService.getbyid(i.specialiteId).subscribe(data2=>i.specialite=data2[0].description)}
        i.isExpanded=false
        i.position=res.indexOf(i)+1
        return i})}
      this.dataSource.data=res;
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.francaisRangeLabel
      for(let cat of this.dataSource.data){

        switch(cat.serviceId) { 
          case '1': { 
            
            cat.serviceId='Spécialités Médicales'
             break; 
          } 
          case '2': { 
            cat.serviceId='Spécialités chirurgicales' 
             break; 
          } 
          case '3': { 
            cat.serviceId='Explorations fonctionnelles' 
             break; 
          } 
       } 
      }
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getcolor(aff)
  {
    if (aff.status == "encours") {
      return '#103073';
    }
    else if(aff.status == "Confirmé"){
      return 'green'
    }

    else if(aff.status == "Annulé"){
      return 'red'
    }
  }

  confirmer(){
    console.log(this.idRdv , this.descriptionConfirmation)
    
    this.rdvService.changeStatus(this.idRdv,"Confirmé",this.descriptionConfirmation).subscribe(data=>{
      if(data["response"]=="OK"){
        this.ngOnInit()
        this.toastr.success('Success', 'Confirmation envoyée');
        this.descriptionConfirmation=''
      }
      else{
        this.toastr.error('Error', 'Operation echouée');
      }
      
    }
      )
  }
  annuler(){
    console.log(this.idRdv , this.descriptionAnnuler)
    this.rdvService.changeStatus(this.idRdv,"Annulé",this.descriptionAnnuler).subscribe(data=>
      {
        if(data["response"]=="OK"){
          this.ngOnInit()
          this.toastr.success('Success', 'Annulation envoyée');
          this.descriptionAnnuler=''
        }
        else{
          this.toastr.error('Error', 'operation echouée');
        }
  })

  }
  getRdv(index){
    for(let i of this.dataSource.data){
      if (i==index){
        this.idRdv=i.idRdv
        this.rdv=i
      }
    }
    console.log(this.rdv)
    this.descriptionConfirmation='le Rendez-Vous avec le docteur x est confirmé '+'pour le '+this.rdv.creationDate
    this.descriptionAnnuler='Cette date n’est pas disponible, on vous propose la date ..'
    
  }
  

}
