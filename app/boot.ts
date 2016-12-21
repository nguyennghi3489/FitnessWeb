import {bootstrap}  from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from '/app/components/app.component';
import { AuthenticationService } from '/app/services/authentication.service';
import { ActivityService } from '/app/services/activity.service';
import { BookingService } from '/app/services/booking.service';
import { UserService } from '/app/services/user.service';
import { HTTP_PROVIDERS } from 'angular2/http';
import {Utilities} from '/app/utilities/utilities.ts';
import 'rxjs/add/operator/map';

bootstrap(AppComponent,[ROUTER_PROVIDERS,HTTP_PROVIDERS, AuthenticationService,ActivityService, BookingService, UserService, Utilities]);
