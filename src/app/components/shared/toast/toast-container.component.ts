import { Component, inject } from '@angular/core';

import { ToastService } from './toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toasts',
	imports: [NgbToastModule],
    standalone:true,
	template: `
		@for (toast of toastService.toasts; track toast.message) {
			<ngb-toast
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
				{{toast.message}}
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
	toastService = inject(ToastService);
}