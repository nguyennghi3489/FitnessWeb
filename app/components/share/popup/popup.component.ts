import { Component,TemplateRef, ViewChild, ViewContainerRef, ComponentResolver } from 'angular2/core';

@Component({
	selector: 'my-popup',
	template: '',

})

export class PopupComponent{
	show:false;
	component = "Hello";
	allTheThings = [1, 2, 3];
	constructor(private viewContainer:ViewContainerRef, private componentResolver: ComponentResolver){
	
	}

	createDialog(dialogComponent):Promise<ComponentRef<DemoComponent>>
    {
    	this.viewContainer.clear();

    	let componentCreated = this.componentResolver
            .resolveComponent(dialogComponent)
            .then((dialogComponentFactory) => {
                return this.viewContainer.createComponent(dialogComponentFactory);
            });

        componentCreated.then((dialogComponentRef) => {
            dialogComponentRef.instance.click1.subscribe(() => {
                dialogComponentRef.destroy();
            });
        });
        return componentCreated;
    }

}