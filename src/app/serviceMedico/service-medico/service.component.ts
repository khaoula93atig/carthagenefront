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
  displayedColumns = ['description'];

  services:any[]=[]
  categrie=1

  constructor(private servicesService:ServiceService) {
    this.dataSource=new MatTableDataSource(this.services)
   }

  ngOnInit(): void {
    this.getByCategoriesSerivces(this.categrie)
  }
  getByCategoriesSerivces(cat){
    this.dataSource=new MatTableDataSource
    this.servicesService.getbycategorie(cat).subscribe(data=>{
      this.dataSource.data=data;
    })

  }
  

}
