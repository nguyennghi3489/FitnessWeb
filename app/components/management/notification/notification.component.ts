import { Component, Inject, forwardRef } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { Activity } from '/app/models/Activity';
import { UserService } from '/app/services/user.service';
import { AppComponent } from '/app/components/app.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { BookingService } from '/app/services/booking.service';
import { Router } from 'angular2/router';

@Component({
	selector : 'notification',
	templateUrl: '/app/components/management/notification/notification.html',
	// styleUrls: ['/app/components/management/list-activity/list-activity.css']
})

export class NotificationComponent{
	connectNumber: number;
	constructor(private formBuilder: FormBuilder,public bookingService: BookingService,  private utilities: Utilities, private router:Router) {
		console.log("IT'S OK");
		console.log(bookingService);
		bookingService.get(this.utilities.getUserId()).subscribe(
	        data => {
	        	this.connectNumber = data.length;
	        },
	        // err => this.handleError(err),
	        () => console.log('Authentication Complete')
	    );
	};

	ngOnInit(){
		console.log("Helloworld");
		this.socket = io('http://localhost:3000');
  	    this.socket.on('request',(data)=>{
	    	this.bookingService.get(this.utilities.getUserId()).subscribe(
		        data => {
		            this.connectNumber = data.length;
		            console.log("CHANGE");
		        },
		        // err => this.handleError(err),
		        () => console.log('Authentication Complete')
		    );
	    });

	}

	static register(){
		
	 // this.socket = io('http://localhost:3000');
  	 //    	this.socket.on('request',function(data){
	 //      	console.log(data);
	 //    });
	 //    this.bookingService.get(this.utilities.getUserId()).subscribe(
	 //        data => {
	 //            console.log("NEW");
	 //        },
	 //        // err => this.handleError(err),
	 //        () => console.log('Authentication Complete')
	 //    );
	}
}