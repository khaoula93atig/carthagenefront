import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/services/news.service';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-ajout-news',
  templateUrl: './ajout-news.component.html',
  styleUrls: ['./ajout-news.component.css']
})
export class AjoutNewsComponent implements OnInit {

  fichier: File;
  retrievedFile: string;
  title=' '
  dateNews=new Date()

  constructor(private newsService:NewsService,
    private toastr:ToastrService,
    private newsComponent:NewsComponent) { }

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedFile = reader.result as string;
      };
      reader.readAsDataURL(this.fichier);
    }
  }

  save(monform:NgForm){
    let dateN= formatDate(this.dateNews,'dd/MM/yyyy','en_US')
    let news={title:this.title,dateNews:dateN}
    const formData = new FormData();
    formData.append('fichier', this.fichier);
    formData.append('news',JSON.stringify(news))
    this.newsService.ajouter(formData).subscribe(data=>{
      console.log("test"+data['message'])
      console.log(data['response'])
      if(data['response']=="OK"){
        this.toastr.success('Success', 'Ajout avec succés');
        monform.reset();
    this.newsComponent.ngOnInit;
      }else{
        this.toastr.error('Error', 'operation echouée');
      }
      
    })
  }


}
