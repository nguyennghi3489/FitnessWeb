import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ActivityComponent } from '/app/components/management/activity/activity.component';
@Component({
	selector : 'management',
	templateUrl: '/app/components/management/management.html',
	directives:[ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path:'/activity', component:ActivityComponent, name:'Activity', useAsDefault:true}	
])

export class ManagementComponent{

}