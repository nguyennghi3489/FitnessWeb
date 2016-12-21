import { Component, Inject, forwardRef, ViewChild, ViewContainerRef  } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder } from 'angular2/common';
import { Activity } from '/app/models/Activity';
import { Booking } from '/app/models/Booking';
import { UserService } from '/app/services/user.service';
import { AppComponent } from '/app/components/app.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { BookingService } from '/app/services/booking.service';
import { Router } from 'angular2/router';
import {PopupComponent} from '/app/components/share/popup/popup.component';
import {ConnectPopupComponent} from '/app/components/share/connect-popup/connect-popup.component';

@Component({
	selector : 'connection',
	templateUrl: '/app/components/management/connection/connection.html',
	// styleUrls: ['/app/components/management/list-activity/list-activity.css']
	directives:[PopupComponent]
})

export class ConnectionComponent{
	connectNumber: number;
	public activities : [Activity];
	@ViewChild('popup1') popupChild : PopupComponent;
	constructor(private formBuilder: FormBuilder,public bookingService: BookingService,  private utilities: Utilities, private router:Router, @Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) {
		this.activities = [];
		console.log("IT'S OK");
		console.log(bookingService);
		bookingService.get(this.utilities.getUserId()).subscribe(
	        data => {
	        	data.forEach((item, index) => {
	        		this.activities.push(new Booking(item));
	        	});
	        	console.log(this.activities);
	        },
	        // err => this.handleError(err),
	        () => console.log('Authentication Complete')
	    );
	};

	convertDate(date){
        var _utc = new Date(date);
        return _utc;
    }

    edit(value){
    	console.log(value);
    	this.popupChild.createDialogWithParam(ConnectPopupComponent, value);
        $('body').css('overflow','hidden');
    }
    
    
}