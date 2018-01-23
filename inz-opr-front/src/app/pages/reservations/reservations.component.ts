import { Component, OnInit } from '@angular/core';
import { OrlikService} from '../../services/orlik.service'
import { ReservationService} from '../../services/reservation.service'
import { SportsFieldService} from '../../services/sportsfield.service'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [OrlikService, ReservationService, SportsFieldService]
})
export class ReservationsComponent implements OnInit {

  constructor(private orlikService: OrlikService, private reservationService: ReservationService, private sportsfieldService: SportsFieldService) { }

  orliks: any;
  selectedOrlik = null;
  selectedSportsfield = null;
  today = {
    fullDate: this.setToday(),
    day: this.setToday().getDate(),
    month: this.setToday().getMonth()+1,
    year: this.setToday().getFullYear,
    stringDate: this.convertDateToString(this.setToday())
  }
  selectedDay = this.today;
  openHours = [];
  user = JSON.parse(window.localStorage.getItem("ngx_user2"));

  ngOnInit() {
    this.getOrliks();
  }

  getOrliks(){
    this.orlikService.getAllOrliks()
    .subscribe(res =>{
      this.orliks = res;
    })  }

    selectOrlik(orlik){
      console.log(orlik);
      this.selectedOrlik = orlik;
      this.selectedSportsfield = null;
    }
    
    selectSportsfield(sportsfield){
      this.sportsfieldService.getSingleSportsField(sportsfield._id)
        .subscribe(res=>{
          this.selectedSportsfield = res
          this.fillOpenHour();
        });
    }

    fillOpenHour(){
      this.openHours = [];
      let startHour = 8
      let endHour = 22;
      console.log(this.selectedSportsfield)
      let sportsfieldReservations = this.selectedSportsfield?this.selectedSportsfield.reservations:null;
      for (let i = startHour+1; i<=endHour; i++){
        let hourStringSTART = (i-1)<10? "0"+(i-1) : (i-1);
        let hourStringEND = i<10? "0"+i : i;
        let reservationToPush = {
          "date": this.selectedDay.stringDate,
          "startHour": hourStringSTART+":00",
          "endHour": hourStringEND+":00",
          "free":true
      }
      let reservationToEqual = sportsfieldReservations.find(x=>x.date===reservationToPush.date && x.startHour===reservationToPush.startHour && x.endHour ===reservationToPush.endHour);
      reservationToPush = reservationToEqual? reservationToEqual : reservationToPush;
        this.openHours.push(reservationToPush);
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

    saveReservation(reservation){
      var vm = this;
      this.reservationService.saveReservation(this.selectedSportsfield._id,this.user._id,reservation)
        .subscribe( res =>{
          this.selectSportsfield(vm.selectedSportsfield)
        }
        );
        
    }
}
