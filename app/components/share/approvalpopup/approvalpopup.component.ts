import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'approval-popup',
  templateUrl:"/app/components/share/approvalpopup/approvalpopup.html",
  styleUrls:["./app/components/share/approvalpopup/approvalpopup.css"]
})
export class ApprovalPopupComponent {
	click1 = new EventEmitter();
	close(){
		this.click1.emit('event');
		$("body").css('overflow','auto');
	}
}