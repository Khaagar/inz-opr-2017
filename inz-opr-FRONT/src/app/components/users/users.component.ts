import { User } from './../../../User';

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
    
    constructor(private userService:UserService){
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
    
    addUser(name,email){
        console.log(name,email)
    
        var newUser = {
            name: name,
            email: email
        }
        console.log(newUser);
        this.userService.addUser(newUser)
            
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
    
    updateStatus(user){
        var _user = {
            _id:user._id,
            name: user.name,
            email: user.email
        };
        
        this.userService.updateStatus(_user).subscribe(data => {
            user.name=user.name;
        });
    }
}
