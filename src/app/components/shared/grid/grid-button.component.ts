import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import { CustomGridButtons } from './grid.component';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
    templateUrl: './grid-button.component.html',
    styleUrl: './grid-button.component.scss'
})
export class CustomButtonComponent implements ICellRendererAngularComp {
    private params: any;
    customButtons: CustomGridButtons[] = [];
    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.customButtons = this.params.customButtons;
    }
    refresh(params: ICellRendererParams) {
        return true;
    }
    buttonClicked(type: string) {
        this.params.onClick({data: {...this.params.data}, type: type})
    }
}