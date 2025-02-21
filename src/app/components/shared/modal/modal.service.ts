import { inject, Injectable, ViewContainerRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent, ModalContent } from "./modal.component";

@Injectable({providedIn: 'root'})
export class ModalService {
    ngbModalService = inject(NgbModal);
    modalTemplate: any;
    viewContainerRef = inject(ViewContainerRef)

    open(content: ModalContent = new ModalContent(), options: any = {}) {
        let modalComponent = this.viewContainerRef.createComponent(ModalComponent)
        modalComponent.instance.content = {...content}
        modalComponent.changeDetectorRef.detectChanges();
        return this.ngbModalService.open(modalComponent.instance.modalTemplate, {...options});
    }

    

}