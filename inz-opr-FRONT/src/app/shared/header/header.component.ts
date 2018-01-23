
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from './../../../models/User';
import {LocalStorage} from "ngx-store";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
  @LocalStorage() liczbaWyswietlen: number =0;
  users: User[];
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  isAdmin:boolean;
  user = {
      _id:'',
      name:'',
      surname:'',
      email:'',
      password:'',
      phone:'',
      isAdmin:false
      }

  modalMode = {
    state:"login",
    title:"Zaloguj się",
    button_title:"ZALOGUJ"
  }
  @LocalStorage() username:String;
  @LocalStorage() userPassword:String;
  @LocalStorage() user2:any;
  @LocalStorage() userLogged:boolean;
  constructor(private userService: UserService) { 
    this.liczbaWyswietlen++;
    //this.user2.isAdmin=false;
  }

  ngOnInit() {
    console.log(this.modalMode);
  }

  addUser(user){
    console.log(user);
    this.userService.addUser(user);   
  }

  rejestracja(){
    this.modalMode.state="register";
    this.modalMode.title="Rejestracja";
    this.modalMode.button_title="ZAREJESTRUJ SIĘ"
  }

  logowanie(){
    
    this.modalMode.state="login";
    this.modalMode.title="Zaloguj się";
    this.modalMode.button_title="ZALOGUJ"
  }
  wyloguj(){
    window.localStorage.removeItem('ngx_user2');
    window.localStorage.removeItem('ngx_userPassword');
    window.localStorage.removeItem('ngx_username');
    window.localStorage.removeItem('ngx_userLogged');
    this.username='';
    this.userPassword='';
    this.user2=null;
    this.userLogged=false;
  }

  login(username,userPassword){
   
    this.userService.login(username,userPassword)
      .subscribe(res=>{
        if(res.type==='error'){
          window.alert(res.object);
          console.log(res);
        }
        else{
        this.user2=res;
        this.userLogged=true;
        this.username=res.name;
        this.password=res.password;
        console.log(res);
        }
      });
  }

}
