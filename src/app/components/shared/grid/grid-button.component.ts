import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './grid-button.component.html',
    styleUrl: './grid-button.component.scss'
})
export class CustomButtonComponent implements ICellRendererAngularComp {
    private params: any;
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }
    refresh(params: ICellRendererParams) {
        return true;
    }
    buttonClicked(type: string) {
        // alert('Software Launched');
        this.params.onClick({data: {...this.params.data}, type: type})
    }
}