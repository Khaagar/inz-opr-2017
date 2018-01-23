import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { AgmMap, MapsAPILoader} from '@agm/core';
import { OrlikService} from '../../services/orlik.service'
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

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
  geocoder;
  constructor(private orlikService: OrlikService, private mapsAPILoader:MapsAPILoader) {
    this.objectMap = [];
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
  });
   }

  ngOnInit() {
    this.orlikService.getAllOrliks()
      .subscribe(res=>{
         this.orliks= res;
         this.makeOrlikMap();
        
      })
  }
  ngAfterViewChecked(){
    this.agmMap.triggerResize();
  }

  makeOrlikMap(){

    this.orliks.forEach(orlik => {
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


