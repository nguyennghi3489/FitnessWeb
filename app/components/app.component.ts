import { Component, ViewChild, ViewContainerRef } from 'angular2/core';
import {LoginComponent} from '/app/components/login/login.component';
import {SignupComponent} from '/app/components/signup/signup.component';
import {UserComponent} from '/app/components/user/user.component';
import {SuccessRegisterComponent} from '/app/components/staticpage/register-page/success-register.component';
import {PopupComponent} from '/app/components/share/popup/popup.component';
import {DemoComponent} from '/app/components/share/demo/demo.component';
import {ManagementComponent} from '/app/components/management/management.component';
import {ApprovalPopupComponent} from '/app/components/share/approvalpopup/approvalpopup.component';
import { Utilities } from '/app/utilities/utilities.ts';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'my-app',
  templateUrl: '/app/components/app.html',
  directives:[ROUTER_DIRECTIVES, PopupComponent]
})
 
@RouteConfig([
	{ path:'/signup', component:SignupComponent, name:'Signup'}
  { path:'/management/...', component:ManagementComponent, name:'Management'}
	{ path:'/login', component:LoginComponent, name:'Login', useAsDefault:true}
	{ path:'/user', component:UserComponent, name:'User'}
  { path:'/success', component:SuccessRegisterComponent, name:'Success'}
])
export class AppComponent implements AfterViewInit{
  	@ViewChild('popup1') popupChild : PopupComponent;
    constructor(public utilities: Utilities, private router:Router){
      if(this.utilities.checkAuthentication()){
        this.router.navigate(['Management']);
      }
  	}

    openDialogBox(){
        this.popupChild.createDialog(ApprovalPopupComponent);
        $('body').css('overflow','hidden');
    }
}