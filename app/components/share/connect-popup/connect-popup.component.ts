import { Component, EventEmitter } from 'angular2/core';
import { BookingService } from '/app/services/booking.service';
@Component({
  selector: 'approval-popup',
  templateUrl:"/app/components/share/connect-popup/connect-popup.html",
  styleUrls:["./app/components/share/connect-popup/connect-popup.css"],
  bindings: [BookingService],
  providers: [BookingService]
})
export class ConnectPopupComponent {
	click1 = new EventEmitter();
	constructor(private bookingService : BookingService){
		console.log(this);
	}
	close(){
		this.click1.emit('event');
		$("body").css('overflow','auto');
	}
	approve(id){
		let data = {};
		data.id = id;

		this.bookingService.approve(data)
		.subscribe(
			data => {
				console.log("SUCCESS");
		 		console.log(data);
		 		this.close()
		 	},
		 	error => {
		 		console.log(error);
		 	});
	}
}