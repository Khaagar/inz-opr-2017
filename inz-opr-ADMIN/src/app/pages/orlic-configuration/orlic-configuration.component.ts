import { Component, OnInit } from '@angular/core';
import { OrlikService } from '../../services/orlik.service';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
@Component({
  selector: 'app-orlic-configuration',
  templateUrl: './orlic-configuration.component.html',
  styleUrls: ['./orlic-configuration.component.css'],
  providers: [OrlikService]
})
export class OrlicConfigurationComponent implements OnInit {

  orliks: any;
  orlik = {};
  typyBoisk: any;
  constructor(private orlikService: OrlikService) { }

  ngOnInit() {
    var vm=this;
    setTimeout(function(){
      vm.getOrliks();
      vm.getBoiska();
    },Math.random()*1300);

  }
  getOrliks() {
    this.orlikService.getAllOrliks()
      .subscribe(orliks => {
        this.orliks = orliks;
        this.orliks.forEach(element => {
          if(!element.sportsfields){
            element.sportsfields = [];

          }
        });
      })
  }
  
  getBoiska(){
    this.orlikService.getSportfieldsTypes()
      .subscribe(types => {
        this.typyBoisk = types;
      })
  }

  usunOrlik(id) {
    this.orlikService.deleteOrlik(id)
      .subscribe(data => {
        var vm=this;
    this.orliks=null;
    setTimeout(function(){
      vm.getOrliks();
    },Math.random()*1300);

      })
  }

  dodajOrlik() {
    this.orlikService.addOrlik(this.orlik);
    this.orlik = {};
    var vm = this;
    this.orliks=null;      
    
    setTimeout(function () {
      vm.getOrliks();
    },Math.random()*1300);
  }

  aktualizujOrlik(orlik){
    this.orlikService.updateStatus(orlik).subscribe(data=>{
      orlik = data;
      var vm=this;
      this.orliks=null;
    setTimeout(function(){
      vm.getOrliks();
    },Math.random()*1300);

    })
  }
  
  dodajBoiskoDoOrlika(id,type){
    console.log('ID ORLIKA ',id );
    console.log('TYP BOISKA ',type );
    
    this.orlikService.addSportsfieldToObject(id,type)
      .subscribe(data=>{
        console.log('data',data);
        var index = this.orliks.findIndex(x=>x._id === id);
        var orlik = this.orliks[index];
        orlik.sportsfields.push(data);
        console.log(orlik);
        
        this.orlikService.updateStatus(orlik);
      });

  }

  usunBoiskoDoOrlika(orlik,type){
    let index = this.orliks.findIndex(x=>x._id===orlik._id);
    this.orliks[index].sportsfields.splice(this.orliks[index].sportsfields.findIndex(x=>x._id===type._id),1);
    
  }

}
