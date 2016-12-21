import { Component, Inject, forwardRef } from 'angular2/core';
import { Activity } from '/app/models/Activity';
import { ActivityService } from '/app/services/activity.service';
import { AppComponent } from '/app/components/app.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { Router } from 'angular2/router';

@Component({
	selector : 'list-activity',
	templateUrl: '/app/components/management/list-activity/list-activity.html',
	// styleUrls: ['/app/components/management/list-activity/list-activity.css']
})

export class ListActivityComponent{
	public activities : [Activity];
	constructor(private utilities: Utilities, public activityService: ActivityService, private router:Router) {
		this.activities = [];
        var that = this;
        console.log(this.utilities.getUserId());
        this.activityService.get(this.utilities.getUserId())
        .subscribe(
			data => {
		 		data.forEach((item, index) => {
	                that.activities.push(new Activity(item));
	            }
		 	},
		 	error => {
		 		console.log(error);
		 	});
	};

	convertDate(date){
        var _utc = new Date(date);
        return _utc;
    }
}