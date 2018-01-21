import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  modalMode = {
    state:"login",
    title:"Zaloguj się",
    button_title:"ZALOGUJ"
  }
  username:String;
  password:String;
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.modalMode);
  }

  rejestracja(){
    this.modalMode.state="register";
    this.modalMode.title="Rejestracja";
    this.modalMode.button_title="ZAREJESTRUJ SIĘ"
  }
  login(username,password){
    this.userService.login(username,password)
      .subscribe(res=>console.log(res));
  }
}
