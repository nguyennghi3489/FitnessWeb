import { Directive, ComponentResolver, ComponentFactory, ComponentRef } from 'angular2/core';
import { DemoComponent } from "/app/components/share/demo/demo.component";
import { ViewContainerRef } from 'angular2/core';

@Directive({ selector: '[dialogAnchor]' })
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentResolver: ComponentResolver
    ) {

    }

    createDialog(dialogComponent: { new(): DemoComponent }):Promise<ComponentRef<DemoComponent>>
    {
    	this.viewContainer.clear();

    	let componentCreated = this.componentResolver
            .resolveComponent(dialogComponent)
            .then((dialogComponentFactory: ComponentFactory<DemoComponent>) => {
                return this.viewContainer.createComponent(dialogComponentFactory);
            });

        return componentCreated;
    }
}