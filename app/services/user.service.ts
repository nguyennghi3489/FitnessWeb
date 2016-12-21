import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
// import { Activity } from '/app/models/Activity';

@Injectable()
export class UserService{
	constructor(public http: Http){

	}

    get(id: string){
        console.log(id);
        let headers = new Headers();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let order = 'id='+id;
        console.log("HELLO");
        return this.http.get('http://localhost:3000/api/trainerinfo?'+order,options)
        .map(res => res.json());
    }

    update(data){
        var data = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('http://localhost:3000/api/trainer', data, options)
          .map(res => res.json());
    }
    changepassword(data){
        var data = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('http://localhost:3000/api/password', data, options)
          .map(res => res.json());
    }
}


