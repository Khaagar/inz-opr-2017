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

  getOrlikByCity(city): Observable<any>{
    return this.http.get('http://localhost:3000/api/objects/'+city)
      .map(res=>{
        return res.json();
      })
  }


  addOrlik(orlik){
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

getSportfieldsTypes(){
  return this.http.get('http://localhost:3000/api/sportsfields/types')
  .map(res=>{
    return res.json();
  })
}

getDates(){
  return this.http.get('http://localhost:3000/api/sportsfields/dateTemplate')
  .map(res=>{
    return res.json();
  })
}

getSportsFields(){
  return this.http.get('http://localhost:3000/api/sportsfield')
      .map(res => res.json());
}

addSportsfieldToObject(id,type){
  return this.http.put('http://localhost:3000/api/object/'+id+'/sportsfields',type)
    .map(res=>{
      res.json()
    });
}
addSportsfield(type){
  return this.http.post('http://localhost:3000/api/sportsfield',type)
    .map(res=>{
      return res.json();
    })
}
deleteSportsfield(id){
  return this.http.delete('http://localhost:3000/api/sportsfield/'+id)
    .map(res=>res.json());
}

}
