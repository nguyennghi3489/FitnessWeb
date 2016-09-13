import { ControlGroup, Control, Validators, FormBuilder, RadioButtonState } from 'angular2/common';

export class CustomValidator{
    static mailFormat(control: Control) {

        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (!EMAIL_REGEXP.test(control.value)) {
            return { "incorrectMailFormat": true };
        }
        return null;
    }

    static radioSetRequired(controlGroup: ControlGroup){
    	for(let name of Object.keys(controlGroup.controls)){
    		let radio = controlGroup.controls[name].value as RadioButtonState;
    		if(radio.checked){
    			return null;
    		}
    	}
    	return{
    		atLeastOneRadioRequired: true
    	}
    } 
    static checkboxSetRequired(controlGroup: ControlGroup){
    	for(let name of Object.keys(controlGroup.controls)){
    		let checked = controlGroup.controls[name].value;
    		if(checked){
    			return null;
    		}
    	}
    	return{
    		atLeastOneCheckboxRequired: true
    	}
    } 
}

interface ValidationResult {
    [key: string]: boolean;
}