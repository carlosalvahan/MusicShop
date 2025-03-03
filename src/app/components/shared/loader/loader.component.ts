import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    standalone: true,
    templateUrl: './loader.component.html',
    imports: [NgClass],
    selector: 'app-loader'
})
export class LoaderComponent {
    placeholder = input<boolean>(false);
}