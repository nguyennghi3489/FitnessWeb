import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';

@Injectable()
export class BookingService {

  private _bookingUrl = 'booking';  // URL to web api

  // private handleError (error: Response) {
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }

  constructor (public http: Http) {
  	
  }
  
  get(id: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let order = 'userId='+id;

      return this.http.get('http://localhost:3000/api/trainer/bookingList?'+order,options)
      .map(res => res.json());
  }
  approve(data: any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    var dataJson = JSON.stringify(data);
    return this.http.post('http://localhost:3000/api/activity/approve', dataJson ,options)
      .map(res => res.json());
  }
}

