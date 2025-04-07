import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { WizardComponent, WizardItem } from '../../../shared/wizard/wizard.component';
import { NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormMapper } from '../../../shared/form-mapper/form-mapper';
import { InstrumentService } from '../services/instrument-service';
import { Instrument } from '../instrument-model';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { ToastService } from '../../../shared/toast/toast-service';

@Component({
  selector: 'app-create-instrument',
  standalone: true,
  imports: [WizardComponent, NgbNavModule, ReactiveFormsModule, LoaderComponent],
  providers: [NgbNav, FormMapper],
  templateUrl: './create-instrument.component.html',
  styleUrl: './create-instrument.component.scss'
})
export class CreateInstrumentComponent implements OnInit, OnDestroy {
  mapper = inject(FormMapper);
  instrumentService = inject(InstrumentService);
  toastService = inject(ToastService);
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
    type: new FormControl('Guitar'),
    imageFile: new FormControl('')
  })

  activeIndex: number = 0;
  closeModal = output<void>();
  editInstrument = input<number>(0);
  subList: Subscription[] = [];
  imageInfo = {
    imageUrl: '',
    imageLocalUrl: ''
  }
  showLoader: boolean = false;

  ngOnInit(): void {
    if (this.editInstrument()) {
      this.showLoader = true;
      this.subList.push(
        this.instrumentService.getInstrumentById(this.editInstrument()).subscribe({
          next: (res) => {
            this.mapper.mapRestToForm(this.instrumentForm, res);
            const { imageUrl, imageLocalUrl } = res;
            this.imageInfo.imageLocalUrl = imageLocalUrl || '';
            this.imageInfo.imageUrl = imageUrl || '';
            this.showLoader = false;
          },
          error: (e) => {
            console.log(e);
            this.showLoader = false;
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
    this.showLoader = true;
    const mappedForm = this.mapper.mapForm(this.instrumentForm);
    const reqBody: Instrument = new Instrument(mappedForm);
    const formData = new FormData();
    

    if (!this.editInstrument()) {
      this.createFormData(reqBody, formData);
      this.subList.push(
        this.instrumentService.createInstrument(formData).subscribe({
          next: (res) => {
            this.showLoader = false;
            this.toastService.show({message: 'Instrument created successfully.'}, 'success');
            this.closeModal.emit();
          },
          error: (e) => {
            this.showLoader = false;
            console.log(e);
            this.closeModal.emit();
          }
        })
      );
    } else {
      reqBody.id = this.editInstrument();
      const {imageUrl, imageLocalUrl} = this.imageInfo;
      reqBody.imageLocalUrl = imageLocalUrl;
      reqBody.imageUrl = imageUrl;

      this.createFormData(reqBody, formData);
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // })
      this.subList.push(
        this.instrumentService.updateInstrument(formData).subscribe({
          next: (res) => {
            this.showLoader = false;
            this.toastService.show({message: 'Instrument updated successfully.'}, 'success');
            this.closeModal.emit();
          }
        })
      );
    }

  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.instrumentForm.get('imageFile')?.setValue(file);
    }
  }


  createFormData(reqBody: Instrument, formData: FormData) {
    Object.entries(reqBody).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const file: any = this.instrumentForm.get('imageFile')?.value;

    if (file instanceof File) {
      formData.append('Image', file, file.name);
    }
  }


}
