import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    standalone: true,
    templateUrl: './loader.component.html',
    imports: [NgClass],
    styleUrl: './loader.component.scss',
    selector: 'app-loader'
})
export class LoaderComponent {
    placeholder = input<boolean>(false);
    darken = input<boolean>(false);

    getLoaderClass() {
        let cssClass = this.darken() ? 'bg-loader' : '';
        const positionClass = this.placeholder() ? ' position-relative' : ' position-absolute';
        cssClass += positionClass;
        return cssClass;
    }
}