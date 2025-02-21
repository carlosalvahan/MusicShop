import { Injectable } from "@angular/core";
import type { ColDef } from 'ag-grid-community';


@Injectable()
export class ColumnModelMapper {
    mapModelToColumn<T extends Object>(model: T, ex: string[] = []): ColDef[] {
        // return Object.keys(model).map(key => {
        //     if(!ex.includes(key)) {
        //         return {field: key}
        //     }
        // });

        return Object.keys(model).reduce((before: ColDef[], current) => {
            if(!ex.includes(current)) {
                before.push({field: current})
            }
            return before;
        }, [])
    }
}