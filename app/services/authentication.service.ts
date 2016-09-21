import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { AuthenticationData } from '/app/models/Authentication';

@Injectable()
export class AuthenticationService{
  authenticationTempData : AuthenticationData;
	constructor(public http: Http){

	}

  checkEmailExist(email){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get('http://52.40.15.203:3000/api/checkEmailExist?email='+ email, { headers: headers })
      .map(res => res.json());
  }

	login(data){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    
    	var dataJson = JSON.stringify(data);

    	console.log(dataJson);
		return this.http.post('http://52.40.15.203:3000/api/authenticate', dataJson, { headers: headers })
		  .map(res => res.json());
	}

	create(data){
    var data = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://52.40.15.203:3000/api/user/signup', data, options)
      .map(res => res.json())
  }

  update(data){
    var data = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://52.40.15.203:3000/api/trainer', data, options)
      .map(res => res.json());
  }

  uploadAvatar(avartar){
    var data = JSON.stringify(avartar);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("UPLOAD IMAGE");
    console.log(data);
    return this.http.post('http://52.40.15.203:3000/api/avatarUpload', data, options)
      .map(res => res.json());
  }
}