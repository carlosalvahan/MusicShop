import { Component, ViewChild } from "@angular/core";

@Component({
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    selector: 'app-modal',
    standalone: true,
})
export class ModalComponent {
    content = new ModalContent();
    @ViewChild('modalTemplate') modalTemplate: any;
}

export class ModalContent {
    title: string = 'Title';
    message: string = 'Modal Content';
    confirmText: string = 'Confirm';
    cancelText: string = 'Cancel'
}