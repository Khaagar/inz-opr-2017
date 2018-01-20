import { User } from './../../../models/User';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    users: User[];
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    user = {
        _id:'',
        name:'',
        surname:'',
        email:'',
        password:'',
        phone:'',
        }

  constructor(private userService:UserService) { }

  addUser(user){
    console.log(user);
    this.userService.addUser(user);
        
}

  ngOnInit() {
  }

}
