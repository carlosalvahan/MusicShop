import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
    message: string;
	classname?: string;
	delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: Toast[] = [];

	show(toast: Toast, type: String = 'secondary') {
        if(!toast.message) {
            toast.message = '';
        }
        toast.classname += ' bg-' + type;
        if(type !== 'secondary') {
            toast.classname += ' text-white';
        }   
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
