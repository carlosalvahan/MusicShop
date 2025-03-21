import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

interface stringKeys {
    [index: string]: string;
}

@Injectable()
export class FormMapper {
    mapForm(fg: FormGroup) {
        let mappedForm = {} as stringKeys;
        Object.keys(fg.controls).forEach(key => {
            mappedForm[key] = fg.get(key)?.value;
        });
        return mappedForm;
    }

    mapRestToForm(fg: FormGroup, res: any) {
        Object.keys(res).forEach(key => {
            fg.get(key)?.setValue(res[key]);
        })
    }
}