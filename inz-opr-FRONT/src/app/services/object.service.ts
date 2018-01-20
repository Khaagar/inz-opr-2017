import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ObjectService{
    constructor(private http:Http){
        console.log('Object Service Initialized...');
    }
    
    getObjects(){
        return this.http.get('http://localhost:3000/api/objects')
            .map(res => res.json());
    }
    
    addObject(newObject){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/object',JSON.stringify(newObject), {headers:headers} )
            .subscribe()
    }
    
    deleteObject(id){
        return this.http.delete('http://localhost:3000/api/object/'+id)
            .map(res => res.json());
    }
    
    updateStatus(object){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/object/'+object._id, JSON.stringify(object), {headers: headers})
            .map(res => res.json());
    }
}