import { Component, OnInit } from '@angular/core';
import { OrlikService} from '../../services/orlik.service'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [OrlikService]
})
export class ReservationsComponent implements OnInit {

  constructor(private orlikService: OrlikService) { }

  orliks: any;
  selectedOrlik = null;
  today = {
    fullDate: this.setToday(),
    day: this.setToday().getDate(),
    month: this.setToday().getMonth()+1,
    year: this.setToday().getFullYear,
    stringDate: this.convertDateToString(this.setToday())
  }
  selectedDay = this.today;
  openHours = [];

  ngOnInit() {
    this.getOrliks();
    this.fillOpenHour();
    console.log(this.openHours);
  }

  getOrliks(){
    this.orlikService.getAllOrliks()
    .subscribe(res =>{
      this.orliks = res;
    })  }

    selectOrlik(orlik){
      console.log(orlik);
      this.selectedOrlik = orlik;
    }

    fillOpenHour(){
      this.openHours = [];
      let startHour = 8
      let endHour = 22;
      for (let i = startHour+1; i<=endHour; i++){
        let hourStringSTART = (i-1)<10? "0"+(i-1) : (i-1);
        let hourStringEND = i<10? "0"+i : i;
        this.openHours.push({
          "reservation":{
            "date": this.selectedDay.stringDate,
            "startHour": hourStringSTART+":00",
            "endHour": hourStringEND+":00",
            "free":true
          }
        })
      }
    }

    convertDateToString(date): String{
      let day = date.getDate()<10? "0"+date.getDay():date.getDate()
      let month = (date.getMonth()+1)<10? "0"+(date.getMonth()+1):(date.getMonth()+1);
      let year = date.getFullYear();
      return day+"-"+month+"-"+year;
    }

    prevDay(){
      let pDay = this.selectedDay.fullDate;
      pDay.setDate(pDay.getDate()-1);
      this.selectedDay = {
        fullDate: pDay,
        day: pDay.getDate(),
        month: pDay.getMonth()+1,
        year: pDay.getFullYear,
        stringDate: this.convertDateToString(pDay)
      }
      this.fillOpenHour();
    }

    nextDay(){
      let nDay = this.selectedDay.fullDate;
      nDay.setDate(nDay.getDate()+1);
      this.selectedDay = {
        fullDate: nDay,
        day: nDay.getDate(),
        month: nDay.getMonth()+1,
        year: nDay.getFullYear,
        stringDate: this.convertDateToString(nDay)
      }
      this.fillOpenHour();
    console.log(this.openHours);
      

    }
    setToday(){
      let tDay = new Date();
      tDay.setHours(0,0,0);
      return tDay;
    }
}
