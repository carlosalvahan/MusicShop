import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [NgClass, NgbTooltip, NgStyle],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent implements OnInit{
  wizardItems = input<WizardItem[]>([]);
  colClass = '';
  activeIndex = input<number>(0);
  containerHeight = input<string>('calc(100vh - 18rem)')
  readonly activeIconClass = ' text-warning';
  readonly inactiveIconClass = ' text-primary';
  readonly disabledIconClass = ' opacity-50';

  readonly activeColClass = ' border-warning';
  readonly inactiveColClass = ' border-grey';

  ngOnInit(): void {
    switch(this.wizardItems().length) {
      case 2: this.colClass = 'col-6';break;
      case 3: this.colClass = 'col-4';break;
      case 4: this.colClass = 'col-3';break;
      case 5: 
      case 6: this.colClass = 'col-2';break;
    }
  }

  getIconClass(i:number) {
    if(i === this.activeIndex()) {
      return this.activeIconClass;
    } else if(i < this.activeIndex()) {
      return this.inactiveIconClass;
    } else {
      return this.disabledIconClass;
    }
  }

  getColClass(i: number) {
    if(i === this.activeIndex()) {
      return this.activeColClass;
    } else {
      return this.inactiveColClass;
    }
  }
}

export interface WizardItem {
  tooltip: string;
  icon: string;
}
