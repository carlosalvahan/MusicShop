import { Component, Input, input, OnInit, output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { CustomButtonComponent } from './grid-button.component';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [AgGridAngular], // Add Angular Data Grid Component
    templateUrl: './grid.component.html'
})

export class ACGridComponent implements OnInit {
    // rowData = input<any[]>([]);
    @Input()
    rowData: any[] = [];
    colData = input<ColDef[]>([])
    gridButtonClicked = output<ButtonOutput>()
    buttonOutput = new ButtonOutput();
    // Row Data: The data to be displayed.
    // rowData = ;

    // Column Definitions: Defines the columns to be displayed.
    colDefs: ColDef[] = [
        {   
            field: "button", 
            headerName: "Actions", 
            cellRenderer: CustomButtonComponent,
            cellRendererParams: {
                onClick: (value: any) => {
                    this.buttonOutput = {
                        ...this.buttonOutput,
                        ...value,
                    }
                    this.gridButtonClicked.emit(this.buttonOutput)
                }
            }
        },
        
    ];

    defaultColDef: ColDef = {
        flex: 1,
        filter: true, // Enable filtering on all columns
        editable: true, // Enable editing on all columns
    };

    ngOnInit(): void {
        this.colDefs = [...this.colDefs, ...this.colData()]
    }
}

export class ButtonOutput {
    type: string = '';
    data: any = {};
}