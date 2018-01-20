import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrlikService {

  constructor(private http: Http) { }

  getAllOrliks(): Observable<any>{
    return this.http.get('http://localhost:3000/api/objects')
      .map(res=>{
        return res.json();
      })
      
  }

  addOrlik(orlik){
    console.log(orlik)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/object',orlik)
        .subscribe()
}

deleteOrlik(id): Observable<any>{
  return this.http.delete('http://localhost:3000/api/object/'+id)
  .map(res => res.json());
}

updateStatus(orlik){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put('http://localhost:3000/api/object/'+orlik._id, orlik)
      .map(res => res.json());
}

}
