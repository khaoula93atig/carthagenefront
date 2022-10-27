import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {HadService} from '../../services/had.service'
import {Had} from '../../models/HAD'
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-had',
  templateUrl: './had.component.html',
  styleUrls: ['./had.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Had>
  displayedColumns = ['id', 'patient', 'service', 'date', 'status', 'action'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: HadService | null;

  hads:Had[]=[]
  had=new Had()
  idHad=' '

  descriptionConfirmation = " "
  descriptionAnnuler=" "

  constructor(private hadService:HadService,
    private toastr:ToastrService) {
    this.dataSource=new MatTableDataSource(this.hads) }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.hadService.ListeHad().subscribe(data=>{
      let res:any[];
      res=data;
      {res.map((i)=>{
        i.position=res.indexOf(i)+1
        return i})}
      this.dataSource.data=res;
      this.dataSource.paginator=this.paginator
    })
  }

  getHad(index){
    for(let i of this.dataSource.data){
      if (i==index){
        this.idHad=i.idHad
        this.had=i
      }
    }
    console.log(this.had)
    this.descriptionConfirmation='le Rendez-Vous avec le docteur x est confirmé '+'pour le '+this.had.creationDate
    this.descriptionAnnuler='Désolé cette date est complet '
    
  }

  confirmer(){
    console.log(this.idHad, this.descriptionConfirmation)
    
    this.hadService.changeStatus(this.idHad,"confirmer",this.descriptionConfirmation).subscribe(data=>{
      if(data["response"]=="OK"){
        this.ngOnInit()
        this.toastr.success('Success', 'Confirmation envoyée');
        this.descriptionConfirmation=''
      }
      else{
        this.toastr.error('Error', 'operation echouée');
      }
      
    }
      )
  }

  annuler(){
    console.log(this.idHad , this.descriptionAnnuler)
    this.hadService.changeStatus(this.idHad,"annuler",this.descriptionAnnuler).subscribe(data=>
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getcolor(aff)
  {
    if (aff.status == "En cours") {
      return '#103073';
    }
    else if(aff.status == "confirmer"){
      return 'green'
    }

    else if(aff.status == "annuler"){
      return 'red'
    }
  }

}
