import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SportsFieldService{
    constructor(private http:Http){
    }
    
    getSportsFields(){
        return this.http.get('http://localhost:3000/api/sportsfields')
            .map(res => res.json());
    }

    getSingleSportsField(id){
        return this.http.get('http://localhost:3000/api/sportsfield/'+id)
        .map(res => res.json());
    }
    
    addSportsField(newSportsField){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/sportsfield',JSON.stringify(newSportsField), {headers:headers} )
            .subscribe()
    }
    
    deleteSportsfield(id){
        return this.http.delete('http://localhost:3000/api/sportsfield/'+id)
            .map(res => {
                return res.json()
            });
    }
    
    updateStatus(sportsfield){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/sportsfield/'+sportsfield._id, JSON.stringify(sportsfield), {headers: headers})
            .map(res => {
                return res.json()
            });
    }

    
}