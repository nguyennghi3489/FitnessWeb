import { Component, Inject, forwardRef } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { Activity } from '/app/models/Activity';
import { UserService } from '/app/services/user.service';
import { AppComponent } from '/app/components/app.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { Router } from 'angular2/router';

@Component({
	selector : 'change-password',
	templateUrl: '/app/components/management/change-password/change-password.html',
	// styleUrls: ['/app/components/management/list-activity/list-activity.css']
})

export class ChangePasswordComponent{
	public activities : [Activity];
	confirmPasswordCheckFlag = false;
	oldPasswordWrongFlag = false;
	samePasswordWithOldCheckFlag = false;
	form: ControlGroup;
	constructor(private formBuilder: FormBuilder,public userService: UserService,  private utilities: Utilities, private router:Router) {
		this.form = this.formBuilder.group({
			'oldpassword':new Control("12345678",Validators.compose([Validators.required,this.oldPassIsDifferentValidator])),
			'newpassword': new Control("23456789",Validators.compose([Validators.required, Validators.minLength(8), this.oldPassIsDifferentValidator])),
			'confirmnewpassword': new Control("234567891",this.confirmValidator)
		});
	};

	ngOnInit(){
		
		this.userService.get(this.utilities.getUserId())
        .subscribe(
			data => {
				
				
		 	},
		 	error => {
		 		console.log(error);
		});
	}

	changepassword(value){
		console.log(value);
		value.userId = this.utilities.getUserId();
		
		this.userService.changepassword(value)
		    .subscribe(
				data => {
					console.log(data);
		 		if(data.success){
		 			console.log("DONE");
		 		}
		 		else{
		 			this.oldPasswordWrongFlag = true;
		 		}
		 	},
		 	error => {
		 		console.log(error);
		 	});
	}
	checkConfirm(){
    	this.confirmPasswordCheckFlag = true;
    	this.samePasswordWithOldCheckFlag = false;
    	if(this.form.controls.newpassword.value == this.form.controls.confirmnewpassword.value){
    		this.confirmPasswordCheckFlag = false;
    	}
    	if(this.form.controls.newpassword.value == this.form.controls.oldpassword.value){
    		this.samePasswordWithOldCheckFlag = true;
    	}
    }
	confirmValidator(control){
		if(control._parent){
			if(control.value == control._parent.controls.newpassword.value) return null;
		return {confirm:true}
		}
	}
	oldPassIsDifferentValidator(control){
		if(control._parent){
			if(control._parent.controls.oldpassword.value == control._parent.controls.newpassword.value) return null;
		return {confirm:true}
	}
}