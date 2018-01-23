import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { AgmMap, MapsAPILoader} from '@agm/core';
import { OrlikService} from '../../services/orlik.service'
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import {LocalStorage} from "ngx-store";
@Component({
  selector: 'app-object-map',
  templateUrl: './object-map.component.html',
  styleUrls: ['./object-map.component.css'],
  providers: [OrlikService]
})
export class ObjectMapComponent implements OnInit, AfterViewChecked {
  
  @ViewChild(AgmMap)
  public agmMap: AgmMap

  objectMap: marker[];
  startLat = 53.799;
  startLng = 20.389;

  orliks;
  wyniki;
  cities;
  geocoder;
  @LocalStorage() showAllOrliks : boolean;
  constructor(private orlikService: OrlikService, private mapsAPILoader:MapsAPILoader) {
    this.showAllOrliks=true;
    this.objectMap = [];
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
  });
   }

  ngOnInit() {
    this.orlikService.getAllOrliks()
      .subscribe(res=>{
         this.orliks= res;
         this.makeOrlikMap(this.orliks);
        
      })
      this.showAllOrliks=true;
  }
  ngAfterViewChecked(){
    this.agmMap.triggerResize();
  }

  searchByCity(city: String){
    let firstLetter = city.substr(0,1);
    let rest = city.substr(1,city.length-1);
    firstLetter = firstLetter.toUpperCase();
    rest = rest.toLowerCase();
    city=firstLetter+rest;
    console.log(city);
    this.orlikService.getOrlikByCity(city)
    .subscribe(res=>{
      this.wyniki=res;
      this.makeOrlikMap(this.wyniki);
      console.log(this.wyniki);
      this.showAllOrliks=false;
    })
  }

  makeOrlikMap(orliks){

    orliks.forEach(orlik => {
      var vm=this;
      let address=orlik.city+" "+orlik.street+" "+orlik.streetNumber;
      this.geocoder.geocode({"address":address},function(result, status){
          var orlikDoMapy = {
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng(),
            label: orlik.name,
            draggable: false
          }
          vm.objectMap.push(orlikDoMapy)
          orlik.lat = orlikDoMapy.lat;
          orlik.lng = orlikDoMapy.lng;
          vm.selectOrlik(orlik.lat,orlik.lng)
      })
    });
  }

  selectOrlik(lat, lng){
    this.startLat = lat;
    this.startLng = lng;
  }

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
declare var google: any;


