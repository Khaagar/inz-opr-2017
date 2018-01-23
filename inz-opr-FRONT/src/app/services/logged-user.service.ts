import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs'

@Injectable()
export class LoggedUserService {

  data:any;
  dataChange: Observable<any>;
  dataChangeObserver;

  constructor() {

    this.dataChange = new Observable((observer:Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  setData(data:any) {
    this.data = data;
    this.dataChangeObserver.next(this.data);
  }

  getData(){
    let status = JSON.parse(window.localStorage.getItem('ngx_userLogged'))
    if (status){
      return 'logged'
    } else
    return 'notlogged';
  }
}
