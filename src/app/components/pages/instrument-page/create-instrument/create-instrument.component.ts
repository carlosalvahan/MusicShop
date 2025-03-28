import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { WizardComponent, WizardItem } from '../../../shared/wizard/wizard.component';
import { NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormMapper } from '../../../shared/form-mapper/form-mapper';
import { InstrumentService } from '../services/instrument-service';
import { Instrument } from '../instrument-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-instrument',
  standalone: true,
  imports: [WizardComponent, NgbNavModule, ReactiveFormsModule],
  providers: [NgbNav, FormMapper],
  templateUrl: './create-instrument.component.html',
  styleUrl: './create-instrument.component.scss'
})
export class CreateInstrumentComponent implements OnInit, OnDestroy{
  mapper = inject(FormMapper);
  instrumentService = inject(InstrumentService);
  wizardItems: WizardItem[] = [
    { tooltip: 'Instrument Details', icon: 'bi bi-card-heading' },
    { tooltip: 'Additional Details', icon: 'bi bi-journals' },
    { tooltip: 'Specifications', icon: 'bi bi-gear' },
  ];

  instrumentForm = new FormGroup({
     name: new FormControl(''),
     stocks: new FormControl(0),
     price: new FormControl(0.00),
     detail: new FormControl(''),
     type: new FormControl('Guitar')
  })

  activeIndex:number = 0;
  closeModal = output<void>();
  editInstrument = input<number>(0);
  subList: Subscription[] = [];

  ngOnInit(): void {
    if(this.editInstrument()) {
      this.subList.push(
        this.instrumentService.getInstrumentById(this.editInstrument()).subscribe({
          next: (res) => {
            this.mapper.mapRestToForm(this.instrumentForm, res);
          },
          error: (e) => {
            console.log(e);
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() });
  }

  moveStep(next: number = -1) {
    this.activeIndex += next;
  }

  formSubmit() {
    const mappedForm = this.mapper.mapForm(this.instrumentForm);
    const reqBody: Instrument = new Instrument(mappedForm);
    if(!this.editInstrument()) {
      this.subList.push(
        this.instrumentService.createInstrument(reqBody).subscribe({
          next: (res) => {
            console.log(res)
          },
          error: (e) => {
            console.log(e)
          }
        })
      );
    } else {
      reqBody.id = this.editInstrument();
      this.subList.push(
        this.instrumentService.updateInstrument(reqBody).subscribe({
          next: (res) => {
            console.log(res);
          }
        })
      );
    }
    
  }

}
