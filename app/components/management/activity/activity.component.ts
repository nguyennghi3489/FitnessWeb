import { Component, Inject, forwardRef } from 'angular2/core';
import { ControlGroup, Control,ControlArray, RadioButtonState, FormBuilder, Validators } from 'angular2/common';
import { Utilities } from '/app/utilities/utilities.ts';
import { Location } from '/app/models/Location';
import { ActivityService } from '/app/services/activity.service';
import {AppComponent} from '/app/components/app.component';

@Component({
	selector : 'activity',
	templateUrl: '/app/components/management/activity/activity.html',
	styleUrls: ['/app/components/management/activity/activity.css']
})

export class ActivityComponent{
	form;
	formActive = true;
  	requestControl : ControlArray;
	private mapElement : any;
	private autocomplete : any;
	private map : any;
	private location;

	public dt:Date = new Date();

	constructor(private utilities: Utilities, private _formBuilder: FormBuilder, private activityService : ActivityService, @Inject(forwardRef(() => AppComponent)) private _parent:AppComponent){
		this._buildForm();
		console.log("CONSTRUCTOR");
	}

	ngAfterViewInit(){
		console.log("AFTERVIEWINIT");
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

		$('#datetimepicker1').datetimepicker();
		$("#datetimepicker1").on("dp.change", function (e) {
			that.form.controls.datetime._touched = true;
			that.form.controls.date.updateValue(e.date.toDate().toDateString());
			that.form.controls.datetime.updateValue(e.date.toDate().toGMTString());
        });
	}

	changeMap(){
		var place = this.autocomplete.getPlace();
		var input = document.getElementById('pac-input');
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
          else{
          	console.log(place.geometry);
          	if (place.geometry.viewport) {

          		console.log(place.geometry.location.toJSON());
          		console.log(place.address_components);
          		console.log(place.geometry.viewport.toJSON());
          		var data = {};
	            this.map.fitBounds(place.geometry.viewport);
	            data.lat = place.geometry.location.lat();
	            data.lng = place.geometry.location.lng();
	            data.address = document.getElementById('pac-input').value;
	            this.location = new Location(data);

	          } else {
	          	var data = {};
	            data.lat = place.geometry.location.lat();
	            data.lng = place.geometry.location.lng();
	            data.address = place.formatted_address;
	            console.log(place.address_components);
	            place.address_components.forEach(key => {
		            if(key.types[0] == "locality"){
	            		data.locality = key.long_name;	
	            	}
	            	if(key.types[0] == "country"){
	            		data.country = key.long_name;
	            	}
	            	if(key.types[0] == "subLocality"){
	            		data.subLocality = key.long_name;
	            	}
	            	if(key.types[0] == "administrative_area_level_1"){
	            		data.administrativeArea = key.long_name;
	            	}
		        });
		        this.location = new Location(data);

		        this.map.setCenter(place.geometry.location);
	            this.map.setZoom(17);  // Why 17? Because it looks good.
	            var marker = new google.maps.Marker({
				  position: place.geometry.location,
				  map: this.map,
				});
	          }
          } 
	}

	ngAfterContentInit(){
		console.log("AFTERCONTENTINIT");
		this.mapElement = document.getElementById('map');
		this.map = new google.maps.Map(this.mapElement, {
	      center: {lat: 44.540, lng: -78.546},
	      zoom: 8
	    });
		var marker = new google.maps.Marker({
		  position: {lat: 44.540, lng: -78.546},
		  map: this.map,
		});

		var input = document.getElementById('pac-input');
        this.autocomplete = new google.maps.places.Autocomplete(input);
        this.autocomplete.bindTo('bounds', this.map);
        this.autocomplete.addListener('place_changed', this.changeMap.bind(this));
	}

	private _buildForm(){
		this.form = this._formBuilder.group({
			title: this._formBuilder.control("ABC",Validators.required),
			activityType: this._formBuilder.control("Boxing", Validators.required),
			activityLevel: this._formBuilder.control("Beginner", Validators.required),
			description:this._formBuilder.control(null, Validators.required),
			datetime:this._formBuilder.control(null, Validators.required)
			date:this._formBuilder.control(null)
			// location:this._formBuilder.control(null),
		});
		// this.requestControl = this.activityForm.find('request') as ControlArray;
	}
	onAddRequest(){
		this.requestControl.push(this._formBuilder.control(null));
	}
	onRemoveRequest(index){
		this.requestControl.removeAt(index);
	}
	clear(){
		this._buildForm();
	}

	submit(data){
		if(typeof this.location !== undefined){
			data.location = this.location;
		}
		data.userId = this.utilities.getUserId();
		this.activityService.create(data)
		.subscribe(
			data => {
				console.log("SUCCESS");
		 		console.log(data);
		 		this._parent.openDialogBox();
		 		this.reset();
		 	},
		 	error => {
		 		console.log(error);
		 	});
	}
	test(data){
		console.log(data);
	}

	reset(){
		this._buildForm();
		this.location = "";
		var input = document.getElementById('pac-input').value = "";
		$('#trumbowyg-demo').trumbowyg('html', "");
		this.formActive = false;
		setTimeout(() => {
			this.formActive = true;
		},0);
	}
}