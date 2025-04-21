import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
    standalone: true,
    templateUrl: './loader.component.html',
    imports: [NgClass],
    styleUrl: './loader.component.scss',
    selector: 'app-loader',
    changeDetection: ChangeDetectionStrategy.OnPush
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