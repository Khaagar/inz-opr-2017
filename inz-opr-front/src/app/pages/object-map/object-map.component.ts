import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-object-map',
  templateUrl: './object-map.component.html',
  styleUrls: ['./object-map.component.css']
})
export class ObjectMapComponent implements OnInit {
  

  markers: marker[] = [
    {
      lat: 53.799,
      lng: 20.489,
      label: 'A',
      draggable: false
    },
    {
      lat: 52.799,
      lng: 20.489,
      label: 'B',
      draggable: false
    }
  ]

  constructor() { }

  ngOnInit() {
  }
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

