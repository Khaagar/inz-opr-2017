import { SportsFieldService } from './../../services/sportsfield.service';
import { ReservationService } from './../../services/reservation.service';
import { ObjectService } from './../../services/object.service';
import { User } from './../../../models/User';

import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: 'users.component.html'
})

export class UsersComponent { 
    users: User[];
    name: string;
    email: string;
    password: string;
    reservation_ids: string[];
    user = {
        _id:'',
        name:'',
        email:'',
        password:'',
        reservation_ids:[]
        }
    
    
    constructor(private userService:UserService){
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
    
    addUser(user){
        console.log(user);
        this.userService.addUser(user);
            
    }
    
    deleteUser(id){
        var users = this.users;
        
        this.userService.deleteUser(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < users.length;i++){
                    if(users[i]._id == id){
                        users.splice(i, 1);
                    }
                }
            }
        });
    }
    
    sendToInput(user){
        this.user = {
            _id:user._id,
            name: user.name,
            email: user.email,
            password:user.password,
            reservation_ids:user.reservation_ids,
        }
    }
    updateStatus(user){
        var _user = {
            _id:user._id,
            name: user.name,
            email: user.email,
            password:user.password
        };
        
        this.userService.updateStatus(_user).subscribe(data => {
            user.name=user.name;
        });
    }
}
