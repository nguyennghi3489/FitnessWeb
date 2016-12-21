import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ActivityComponent } from '/app/components/management/activity/activity.component';
import { ListActivityComponent } from '/app/components/management/list-activity/list-activity.component';
import { UpdateInfoComponent } from '/app/components/management/update-info/update-info.component';
import { ChangePasswordComponent } from '/app/components/management/change-password/change-password.component';
import { NotificationComponent } from '/app/components/management/notification/notification.component';
import { ConnectionComponent } from '/app/components/management/connection/connection.component';

@Component({
	selector : 'management',
	templateUrl: '/app/components/management/management.html',
	directives:[ROUTER_DIRECTIVES, NotificationComponent]
})

@RouteConfig([
  { path:'/change-password', component:ChangePasswordComponent, name:'ChangePassword'},	
  { path:'/update-info', component:UpdateInfoComponent, name:'UpdateInfo'},	
  { path:'/activity', component:ActivityComponent, name:'Activity'},
  { path:'/list-activity', component:ListActivityComponent, name:'ListActivity'},
  { path:'/list-connection', component:ConnectionComponent, name:'ListConnection', useAsDefault:true}	
])

export class ManagementComponent{
	constructor(private formBuilder: FormBuilder,public bookingService: BookingService,  private utilities: Utilities, private router:Router) {
		NotificationComponent.register();
	};
}