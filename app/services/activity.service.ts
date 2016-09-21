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
        return this.http.post('http://52.43.102.187:3000/api/activity', data, options)
        .map(res => res.json());

    }
}


