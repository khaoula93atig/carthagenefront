import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Services} from '../../models/Services';
import {ServiceService} from '../../services/service.service'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  displayedColumns = ['id', 'description', 'categorie'];

  services:any[]=[]
  constructor(private servicesService:ServiceService) {
    this.dataSource=new MatTableDataSource(this.services)
   }

  ngOnInit(): void {
    this.getAllSerivces()
  }
  getAllSerivces(){
    this.servicesService.ListeServices().subscribe(data=>{
      console.log(data)
      this.dataSource.data=data;
      for(let cat of this.dataSource.data){

        switch(cat.categorie) { 
          case 1: { 
            
            cat.categorie='Spécialités Médicales'
             break; 
          } 
          case 2: { 
            cat.categorie='Spécialités chirurgicales' 
             break; 
          } 
          case 3: { 
            cat.categorie='Explorations fonctionnelles' 
             break; 
          } 
       } 
      }
      
      
      this.dataSource.paginator=this.paginator
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
