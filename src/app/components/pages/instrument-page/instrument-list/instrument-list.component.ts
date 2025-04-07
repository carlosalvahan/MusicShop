import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../../store/user/user-model';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { InstrumentService } from '../services/instrument-service';
import { Instrument } from '../instrument-model';
import { CreateInstrumentComponent } from '../create-instrument/create-instrument.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [InstrumentItemComponent, AsyncPipe, CreateInstrumentComponent],
  providers: [NgbModal],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.scss'
})
export class InstrumentListComponent implements OnInit, OnDestroy{
  loggedInUser$!: Observable<UserModel>;

  store = inject(Store);
  modalService = inject(NgbModal);
  instrumentService = inject(InstrumentService);
  instrumentList: Instrument[] = [];
  subList: Subscription[] = [];
  selectedInstrumentId: number = 0;

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select('user');
    this.subList.push(
      this.instrumentService.getInstrumentList().subscribe({
        next: res => {
          this.instrumentList = [...res]
          .sort((a, b) => {
            if (a.stocks === 0 && b.stocks === 0) {
              return 0;
            }
          
            if (a.stocks === 0) {
              return 1;
            }
          
            if (b.stocks === 0) {
              return -1;
            }
            return 0;
          });
        },
        error: e => {
          console.log(e);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() })
  }

  openInstrumentModal(template: any) {
    this.modalService.open(template);
  }

  closeModal(modal: any) {
    this.selectedInstrumentId = 0;
    modal.close()
  }

  openEdit(id: number, template: any) {
    this.selectedInstrumentId = id;
    this.modalService.open(template, {size: 'lg'})
  }

  deleteItem(e: number) {
    console.log('delete number', e);
    this.subList.push(
      this.instrumentService.deleteInstrument(e).subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    );
  }
}
