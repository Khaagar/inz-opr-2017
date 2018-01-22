import { SportsFieldService } from './../../services/sportsfield.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[SportsFieldService]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}