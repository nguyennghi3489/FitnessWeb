import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
// import { Activity } from '/app/models/Activity';

@Injectable()
export class ActivityService{
	constructor(public http: Http){

	}

	create(data){
        var data = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(data);
        console.log("CALLED");
        return this.http.post('http://localhost:3000/api/activity', data, options)
        .map(res => res.json());
    }

    update(data){
        var data = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(data);
        console.log("CALLED");
        return this.http.post('http://localhost:3000/api/activity', data, options)
        .map(res => res.json());
        
    }

    get(id: string){
        let headers = new Headers();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let order = 'userId='+id;
        console.log("HELLO");
        return this.http.get('http://localhost:3000/api/activity?'+order,options)
        .map(res => res.json());
  }
}


