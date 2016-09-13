export class Utilities {
	makeBaseUrlFile(filename: string)
	{
		var filePart = filename.split(".");
		var newName = "";
		var date = new Date();
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var time = date.getMilliseconds();
		var filenameLength = filename.length > 8 ? 4:filename.length - 5;
		var unique = filename.substr(0,filenameLength);
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    newName = text + monthIndex + day + year + time + unique + "." + filePart[1];    

	    return newName;
	}

	setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

 	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

 	checkCookie(cookieKey) {
	    var user = getCookie(cookieKey);
	    if (user != "") {
	        alert("Welcome again " + user);
	    } else {
	        user = prompt("Please enter your name:", "");
	        if (user != "" && user != null) {
	            setCookie("username", user, 365);
	        }
	    }
	}

	checkAuthentication(){
		var authenticationCookie = this.getCookie("authentication");
		if(authenticationCookie != ""){
			var object = JSON.parse(authenticationCookie);
			if(typeof object.token != undefined){
				return true;
			}	
		}
		return false;
	}

	getUserId(){
		var authenticationCookie = this.getCookie("authentication");
		if(authenticationCookie != ""){
			var object = JSON.parse(authenticationCookie);
			return object.userId || false;	
		}
		return false;
	}

	deleteCookie(name) {
		console.log(name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	getValueFromCheckbox(controlGroup){
		var result = [];
		for(let name of Object.keys(controlGroup.controls)){
			if(controlGroup.controls[name].value){
				result.push(name);
			}
		}
		return result;
	}
	getOneValueFromCheckbox(controlGroup){
		for(let name of Object.keys(controlGroup.controls)){
			if(controlGroup.controls[name].value.checked){
				return name;
			}
		}
	}
}