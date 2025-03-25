import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../instrument-model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ModalContent } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/modal/modal.service';
import { InstrumentService } from '../services/instrument-service';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CurrencyPipe, NgbTooltipModule, AsyncPipe],
  providers: [InstrumentService],
  templateUrl: './instrument-item.component.html',
  styleUrl: './instrument-item.component.scss'
})
export class InstrumentItemComponent {
  imgSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/150`
  router = inject(Router);
  store = inject(Store);
  activeRoute = inject(ActivatedRoute);
  instrument = input<Instrument>(new Instrument({}));
  modalService = inject(ModalService);

  openEdit = output();
  deleteItem = output<number>();

  user$ = this.store.select('user');

  modalContent: ModalContent = new ModalContent();
  
  openDetails(id: number) {
    console.log(id);
    this.router.navigate([id], {relativeTo: this.activeRoute});
  }

  addtoCart(e:Event) {
    e.stopPropagation();
    console.log('add to cart');
  }

  editInstrument(e: Event) {
    e.stopPropagation();
    this.openEdit.emit();
  }

  deleteInstrument(e: Event) {
    e.stopPropagation();
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Delete Instrument'
    }
    this.modalService.open(this.modalContent, { size: 'md' }).result.then(res => {
      if (res) {
        console.log('delete please', this.instrument().id)
        this.deleteItem.emit(this.instrument().id);
      }
    }, (e) => {});
  }
}
