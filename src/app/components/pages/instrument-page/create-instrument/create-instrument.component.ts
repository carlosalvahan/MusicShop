import { Component, output } from '@angular/core';
import { WizardComponent, WizardItem } from '../../../shared/wizard/wizard.component';
import { NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-instrument',
  standalone: true,
  imports: [WizardComponent, NgbNavModule],
  providers: [NgbNav],
  templateUrl: './create-instrument.component.html',
  styleUrl: './create-instrument.component.scss'
})
export class CreateInstrumentComponent {
  wizardItems: WizardItem[] = [
    { tooltip: 'Instrument Details', icon: 'bi bi-card-heading' },
    { tooltip: 'Additional Details', icon: 'bi bi-journals' },
    { tooltip: 'Specifications', icon: 'bi bi-gear' },
  ];

  activeIndex:number = 0;
  closeModal = output<void>();

  moveStep(next: number = -1) {
    this.activeIndex += next;
  }

}
