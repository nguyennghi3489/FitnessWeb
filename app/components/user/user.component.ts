import { Component } from 'angular2/core';
import { ControlGroup, Control, Validators, FormBuilder, RadioButtonState } from 'angular2/common';
import { AuthenticationService } from '/app/services/authentication.service';
import { Utilities } from '/app/utilities/utilities.ts';
import { Authentication, AuthenticationData } from '/app/models/Authentication';
import { CustomValidator } from '/app/extension/CustomValidation';
import { Router } from 'angular2/router';

@Component({
	selector : 'my-user',
	templateUrl : '/app/components/user/user.html',
})

export class UserComponent{
	public vanilla: any;
	public imageObj: Image;
	public imageData : Any;
	form;
	cacheAuthentication;

	checkMajor = true;
	public choiceList : Array<String>;
	constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private utilities: Utilities, private router:Router){
		
		this.choiceList = [];
		this.imageData = {};
		
	    this.form = this.formBuilder.group({  
	      "quote": ['', Validators.required],
	      "description": ['', Validators.required],
	      "major": this.formBuilder.group({
	      	'Aerobics': this.formBuilder.control(null),
	      	'Boxing': this.formBuilder.control(null),
	      	'BrazillianJiuJitsu': this.formBuilder.control(null),
	      	'Cardiovascular': this.formBuilder.control(null),
	      	'CircuitTraining': this.formBuilder.control(null),
	      	'Conditioning': this.formBuilder.control(null),
	      	'Crossfit': this.formBuilder.control(null),
	      	'KickBoxing': this.formBuilder.control(null),
	      	'MartialArt': this.formBuilder.control(null),
	      	'Pilates': this.formBuilder.control(null),
	      	'Spinning': this.formBuilder.control(null),
	      	'StrengthTraining': this.formBuilder.control(null),
	      	'WeightTraining': this.formBuilder.control(null),
	      	'Yoga': this.formBuilder.control(null),
	      	'Zumba': this.formBuilder.control(null)
	      }, {validator: CustomValidator.checkboxSetRequired}),
	      "gender": this.formBuilder.group({
	      	'male': this.formBuilder.control(new RadioButtonState(false,'male')),
	      	'female': this.formBuilder.control(new RadioButtonState(false,'female'))
	      },{validator: CustomValidator.radioSetRequired}),
	    });
	    // this.cacheAuthentication = JSON.parse(this.utilities.getCookie('authentication'));
	}
	ngOnInit(){
	    // let male = this.form.find('gender') as ControlGroup;
	   	// let child = male.find("male") as Control;
	   	// child.value.checked = true;
	}
	openFile(){
		$('#upload-input').click();
	}

	selectFile($event){	
        var inputValue = $event.target;
        var file = inputValue.files[0];
        this.showAvatar("avatar", file);
    };
    showAvatar(id, file){
    	var that = this;
    	var fileReader = new FileReader();
    	this.imageObj = new Image();
    	this.imageData["filename"] = file.name;
    	this.imageData["id"] = this.utilities.getCookie('userId');
        fileReader.onload = function(e) {
		    that.imageObj.src = fileReader.result;
		    that.vanilla.bind({
			    url: that.imageObj.src
			});
		}
	  	fileReader.readAsDataURL(file);
    }

	ngAfterViewInit(){
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

			$("#country_selector").countrySelect({
				preferredCountries: ['gb', , 'us']
			});
            var el = document.getElementById('demo-basic');
				this.vanilla = new Croppie(el, {
			    viewport: { width: 150, height: 150, type: 'circle' },
			    boundary: { width: 300, height: 200 },
			    showZoomer: false,
			    enableOrientation: true
			});	
	}
	
	crop(id){
		var that = this;
    	this.vanilla.result('canvas').then(function(base64Image) {
		    // do something with cropped base64 image here
		    that.imageData["data"] = base64Image;
		    that.imageData["id"] = id;
		    that.authenticationService.uploadAvatar(that.imageData).subscribe(
		    	data => {
		    		console.log("DONE");
		    	}
		    );
    		$('#cropImage').attr('src', base64Image); 
		});
	}

	updateUserInformation(value){
		var that = this;
		// this.crop();
		if(this.form.valid){
			var data = new AuthenticationData(this.authenticationService.authenticationTempData);
			var extraInfo = {};
			extraInfo.gender = this.utilities.getOneValueFromCheckbox(this.form.controls["gender"]);
			extraInfo.quote = this.form.value.quote;
			console.log('-----check here--------');
			console.log(this.form.value);
			extraInfo.description = this.form.value.description;
			extraInfo.major =this.utilities.getValueFromCheckbox(this.form.controls["major"]);
			//extraInfo.major = this.utilities.getValueFromCheckbox(this.form.controls["major"]);
			extraInfo.nationality = $("#country_selector").val();

			// var filePart = this.imageData["filename"].split(".");
	    	// extraInfo.baseImageUrl =  "avartar" + "." + filePart[1];

			data.extend(extraInfo);

		    this.authenticationService.create(data)
		    .subscribe(
				data => {
		 		if(data.success){
		 			this.crop(data.userId);
					this.router.navigate(['../Success']);
		 		}
		 		else{
		 			if(data.code == 11000){
		 				this.emailExistFlag = true;
		 			}
		 		}
		 	},
		 	error => {
		 		console.log(error);
		 	});
    	}	
    }
}