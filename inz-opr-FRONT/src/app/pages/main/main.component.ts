import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[UserService]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}