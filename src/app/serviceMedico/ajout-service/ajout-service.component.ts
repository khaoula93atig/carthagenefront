import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceComponent } from '../service-medico/service.component';

@Component({
  selector: 'app-ajout-service',
  templateUrl: './ajout-service.component.html',
  styleUrls: ['./ajout-service.component.css']
})
export class AjoutServiceComponent implements OnInit {

  constructor(private serviceService:ServiceService,
    private toastr:ToastrService,
    private serviceComponent:ServiceComponent) { }

  ngOnInit(): void {
  }
  
  save(myForm:NgForm){
    console.log(myForm.value)
    this.serviceService.ajouter(myForm.value).subscribe(data=>{
      if(data['response']=="OK"){
        this.toastr.success('Success', 'Ajout avec succés');
        myForm.reset();
        this.serviceComponent.ngOnInit();
      }else{
        this.toastr.error('Error', 'operation echouée');
      }
      
    })
  }

}
