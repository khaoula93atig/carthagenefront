import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {News} from '../../models/News'
import {NewsService} from '../../services/news.service'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input()
color: ThemePalette
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<News>
  displayedColumns = ['id', 'titre', 'date', 'fichier','action'];
  obs:Observable<any>
  url:any;

  news:News[]=[]
  new=new News()
  image:any
  dutchRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
    
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }


  constructor(private newsService:NewsService,
    private toastr: ToastrService,
    private http:HttpClient) {
      this.dataSource=new MatTableDataSource(this.news)
    }

  ngOnInit(): void {
    this.AllNews()
    this.obs=this.dataSource.connect()
  }

  delete(){
    this.newsService.supprimer(this.new.idNews).subscribe(data=>{
      if(data['response']=="OK"){
        this.toastr.success('Success', 'Suppression avec succesées');
        this.ngOnInit()
      }else{
        this.toastr.error('Error', 'operation echouée');
      }
      this.new=new News()

    })
  }


  
  AllNews(){
    this.newsService.ListeNews().subscribe(data=>{
      let res:any[];
      res=data;
      {res.map((i)=>{i.fullname=environment.UrlNews+"/image/"+i.idNews;
     return i;})}
     this.dataSource.data=res
      this.dataSource.paginator=this.paginator
      this.dataSource.paginator._intl.itemsPerPageLabel='Eléments par page'
      this.dataSource.paginator._intl.getRangeLabel=this.dutchRangeLabel

    })
  }

  getNews(index){
    for(let i of this.dataSource.data){
      if (i.idNews==index){
        this.new=i
        this.image=environment.UrlNews+"/image/"+i.idNews
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
