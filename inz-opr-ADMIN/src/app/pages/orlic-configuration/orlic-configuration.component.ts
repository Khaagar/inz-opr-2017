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
  dates:any;
  sportsfields:any;
  constructor(private orlikService: OrlikService) { }

  ngOnInit() {
    var vm=this;
    setTimeout(function(){
      vm.getOrliks();
      vm.getBoiska();
      vm.getSportsfields();
      vm.getDates();
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

  getSportsfields() {
    this.orlikService.getSportsFields()
      .subscribe(sportsfields => {
        this.sportsfields = sportsfields;
        this.sportsfields.forEach(element => {
          if(!element.dates){
            element.dates = [];
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

  getDates(){
    this.orlikService.getDates()
      .subscribe(dates => {
        this.dates = dates[0].days;
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
    type._id = null;
    type.objectId = id;
    type.dates=this.dates; //testing
    this.orlikService.addSportsfield(type)
      .subscribe(res=>{
        var index = this.orliks.findIndex(x=>x._id===id);
        this.orliks[index].sportsfields.push(res);
      })
  }

  dodajDatyDoBoiska(id,type){
    type._id = null;
    type.sportsfieldId = id;
   
    var index = this.sportsfields.findIndex(x=>x._id===id);
    this.sportsfields[index].dates.push(this.dates);
      
  }

  usunBoiskoDoOrlika(orlik,type){
    console.log(type);
    this.orlikService.deleteSportsfield(type._id)
    .subscribe(data=>{});
    let index = this.orliks.findIndex(x=>x._id===orlik._id);
    this.orliks[index].sportsfields.splice(this.orliks[index].sportsfields.findIndex(x=>x._id===type._id),1);


    
  }

}
