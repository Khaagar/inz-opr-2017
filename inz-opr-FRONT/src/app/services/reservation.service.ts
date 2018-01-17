import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservationService{
    constructor(private http:Http){
        console.log('Reservation Service Initialized...');
    }
    
    getReservations(){
        return this.http.get('http://localhost:3000/api/reservations')
            .map(res => res.json());
    }
    
    addReservation(newReservation){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/reservation',JSON.stringify(newReservation), {headers:headers} )
            .subscribe()
    }
    
    deleteReservation(id){
        return this.http.delete('http://localhost:3000/api/reservation/'+id)
            .map(res => res.json());
    }
    
    updateStatus(reservation){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/reservation/'+reservation._id, JSON.stringify(reservation), {headers: headers})
            .map(res => res.json());
    }
}