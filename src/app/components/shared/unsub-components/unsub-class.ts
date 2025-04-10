import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
export class UnsubClass implements OnDestroy{
    protected subList: Subscription[] = [];
    ngOnDestroy(): void {
        this.subList.forEach(sub => { sub.unsubscribe() });
        console.log('component destroyed');
    }
}