import { Component } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { AuthenticationService } from '/app/services/authentication.service';
import { Utilities } from '/app/utilities/utilities.ts';
import { Authentication } from '/app/models/Authentication';
import { RouterLink, Router } from 'angular2/router';

@Component({
  selector: 'my-login',
  templateUrl: '/app/components/login/login.html',
  directives: [RouterLink]
})
 
export class LoginComponent{
	form;
	constructor(private router: Router ,private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private utilities: Utilities){
		//if(this.utilities.getCookie('authentication')){
		//	console.log("EXIST HERE");
		//}
	}
	ngOnInit(){
		this.form = this.formBuilder.group({
			'email':new Control(localStorage.getItem('email'),Validators.required),
			'password': new Control(localStorage.getItem('password'),Validators.required),
			'remember': new Control(null)
		});
	}
	onSubmit(value){
		console.log("HELLOLOO");
					console.log(value);
		this.authenticationService.login(value).subscribe(
			data => {
				if(data.success){
					if(this.form.controls.remember.value){
		              localStorage.setItem('email', this.form.controls.email.value);
		              localStorage.setItem('password', this.form.controls.password.value);
		            }
					let authentication = new Authentication(data);

					this.utilities.setCookie('authentication', JSON.stringify(authentication), 60);
					this.router.navigate(['../Management']);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	redirectPage(data){
		switch (data.type) {
			case 1:
				// code...
				break;
			
			default:
				// code...
				break;
		}

	}
}




