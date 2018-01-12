import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[UserService]
})
export class MainComponent implements OnInit {

  mockData=[
    {
      "id":0,
      "name":"Wstać"
    },
    {
      "id":1,
      "name":"Zjeść"
    },
    {
      "id":2,
      "name":"Grać"
    },
  ];

  data = this.mockData;
  constructor() { }

  ngOnInit() {
  }

  addToList(name){
    let tmpId;
    if(this.data.length!=0){
       tmpId = this.data[this.data.length-1].id +1;
    } else  tmpId = 0;

    this.data.push({id: tmpId, name: name});
    console.log(this.data[this.data.length-1])
  }
  deleteFromList(item){
    let index = this.data.findIndex(x=>x.name==item.name);
    this.data.forEach(element=>{
      if (element.id>index){
        element.id--;
      }
    })
    this.data.splice(index,1);
  }
}