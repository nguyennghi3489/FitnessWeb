import { Component, Inject, forwardRef } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { Activity } from '/app/models/Activity';
import { UserService } from '/app/services/user.service';
import { AppComponent } from '/app/components/app.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { Router } from 'angular2/router';

@Component({
	selector : 'update-info',
	templateUrl: '/app/components/management/update-info/update-info.html',
	// styleUrls: ['/app/components/management/list-activity/list-activity.css']
})

export class UpdateInfoComponent{
	public activities : [Activity];
	form: ControlGroup;
	constructor(private formBuilder: FormBuilder,public userService: UserService,  private utilities: Utilities, private router:Router) {
		console.log("Update Info"); 
		
		this.form = this.formBuilder.group({
			'firstname':new Control(null,Validators.required),
			'lastname': new Control(null,Validators.required),
			'quote': new Control(null,Validators.required),
			'description': new Control(null,Validators.required)
		});
	};

	ngOnInit(){
		this.userService.get(this.utilities.getUserId())
        .subscribe(
			data => {
				console.log(data);
				let firstName = this.form.find('firstname');
				firstName.updateValue(data.firstname,false);
				let lastName = this.form.find('lastname');
				lastName.updateValue(data.lastname,false);
				let quote = this.form.find('quote');
				quote.updateValue(data.quote,false);
				let description = this.form.find('description');
				description.updateValue(data.xDescription,false);
				$('#trumbowyg-demo').trumbowyg('html', data.xDescription);
			
		 	},
		 	error => {
		 		console.log(error);
		});
	}

	ngAfterViewInit(){
			var that = this;
			$('#trumbowyg-demo').trumbowyg({
			    btns: ['strong', 'em', '|'],
			    autogrow: true
			});


			$('#trumbowyg-demo').on('tbwblur', function(){ 
				var newvalue = $('#trumbowyg-demo').trumbowyg('html');
				that.form.controls.description._touched = true;
				that.form.controls.description.updateValue(newvalue);		
			});
	}

	updateUserInformation(value){
		console.log(value);
		value.userId = this.utilities.getUserId();
		
		this.userService.update(value)
		    .subscribe(
				data => {
		 		if(data.success){
		 			// this.crop(data.userId);
		 			console.log("DONE");
					// this.router.navigate(['../Success']);
		 		}
		 	},
		 	error => {
		 		console.log(error);
		 	});
	}
}