import { Component } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { AuthenticationService } from '/app/services/authentication.service';
import { Utilities } from '/app/utilities/utilities.ts';
import { Authentication } from '/app/models/Authentication';
import { CustomValidator } from '/app/extension/CustomValidation';
import { Router } from 'angular2/router';
@Component({
  selector: 'my-signup',
  templateUrl: '/app/components/signup/signup.html'
})
 
export class SignupComponent{
	form;
	confirmPasswordCheckFlag = false;
	emailExistFlag = false;

	constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private utilities: Utilities, private router:Router){
		if(this.utilities.getCookie('authentication')){
			console.log("EXIST HERE");
		}
		this.form = this.formBuilder.group({
			'firstname':new Control('a',Validators.required),
			'lastname': new Control('b',Validators.required),
			'email': new Control('nguyennghi3489@gmail.com',Validators.compose([Validators.required, CustomValidator.mailFormat])),
			'password': new Control('12345678',Validators.compose([Validators.required, Validators.minLength(8)])),
			'confirmpassword': new Control('12345678',this.confirmValidator)
		});
	}
	ngOnInit(){
		
	}
	signup(value){
		this.authenticationService.authenticationTempData = this.form.value;
		this.authenticationService.checkEmailExist(value.email)
		.subscribe(
		 	data => {
		 		console.log(data);
		 		if(data.success){
		// 			console.log("--------------");
		// 			console.log(data);
					
		// 			console.log(this.authenticationService.authenticationTempData);
		// 			let authentication = new Authentication(data);
		// 			this.utilities.setCookie('authentication', JSON.stringify(authentication), 60)
					this.router.navigate(['../User']);
		 		}
		 		else{
		 			if(data.code == 11000){
		 				console.log("HELLO");
		 				this.emailExistFlag = true;
		 			}
		 		}
		 	},
		 	error => {
		 		console.log(error);
		 	}
		);
	}

	resetEmailError(){
    	this.emailExistFlag = false;
    	console.log(this.form.valid);
    	console.log(this.form.errors);
    }

	checkConfirm(){
    	this.confirmPasswordCheckFlag = true;
    	if(this.form.controls.password.value == this.form.controls.confirmpassword.value){
    		this.confirmPasswordCheckFlag = false;
    	}
    }
	confirmValidator(control){
		if(control._parent){
			if(control.value == control._parent.controls.password.value) return null;
		return {confirm:true}
	}
}