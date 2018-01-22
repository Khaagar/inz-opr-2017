import { SportsFieldService } from './../../services/sportsfield.service';
import { ReservationService } from './../../services/reservation.service';
import { ObjectService } from './../../services/object.service';
import { User } from './../../../models/User';

import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: 'users.component.html',
  providers:[SportsFieldService]
})

export class UsersComponent { 
    
    sportsfields: any;
    currentSportsfield: any;
    allDays:any;
    currentDay:any;
    allHours:any;
    
    
    
    constructor(private sportsfieldService:SportsFieldService){
        this.sportsfieldService.getSportsFields()
            .subscribe(sportsfields => {
                this.sportsfields = sportsfields[3].dates;
                console.log(sportsfields.dates);
            });
    }

    getAllDays(){
         
    }
    
   
}
