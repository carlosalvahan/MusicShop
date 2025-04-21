import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../../store/user/user-model';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { InstrumentService } from '../services/instrument-service';
import { Instrument } from '../instrument-model';
import { CreateInstrumentComponent } from '../create-instrument/create-instrument.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnsubClass } from '../../../shared/unsub-components/unsub-class';
import { FilterListState } from '../../../../store/filters/filter-model';
import { FilterListActions } from '../../../../store/filters/filter-actions';
import { ToastService } from '../../../shared/toast/toast-service';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [InstrumentItemComponent, AsyncPipe, CreateInstrumentComponent],
  providers: [NgbModal],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstrumentListComponent extends UnsubClass implements OnInit {
  loggedInUser$!: Observable<UserModel>;

  store = inject(Store);
  modalService = inject(NgbModal);
  instrumentService = inject(InstrumentService);
  toastService = inject(ToastService);
  cdr = inject(ChangeDetectorRef);

  instrumentList: Instrument[] = [];
  displayList: Instrument[] = [];
  selectedInstrumentId: number = 0;
  instrumentLoading: boolean = false;
  searchText: string = '';
  

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select('user');
    this.instrumentLoading = true;
    this.getInstrumentList();
    this.subList.push(
      this.store.select('filters').subscribe({
        next: (res: FilterListState) => {
          const conditions: {group: string, trueValues:string[]}[] = [];
          res.filters.forEach(group => {
            if(typeof group.filterItems[0].value === 'boolean') {
              const trueItems = group.filterItems.filter(item => item.value === true).map(fItem => fItem.label);
              conditions.push({group: group.group, trueValues: trueItems })
            }
          });
          this.displayList = this.instrumentList.filter((instrument: Instrument) => {
            const filterCondition: boolean[] = [];
            this.searchText = res.searchText;
            if(res.searchText) {
              filterCondition.push(instrument.name?.toLowerCase().includes(res.searchText?.toLowerCase()));
            }
            conditions.forEach(cond => {
              const instruValue = this.getInstrumentValueByKey(instrument, cond.group)?.toString();
              if(instruValue) {
                filterCondition.push(cond.trueValues.includes(instruValue))
              }
            });
            return filterCondition.every(Boolean);
          });
          this.cdr.markForCheck();
        }
      })
    );
  }

  getInstrumentValueByKey(instrument: Instrument, groupKey: string) {
    const instruKey = Object.keys(instrument).find(key => key === groupKey) as keyof Instrument|| '';
    if(instruKey) {
      if(groupKey === 'stocks')
      console.log(instrument[instruKey]);
      return instrument[instruKey];
    }
    return '';
  }

  openInstrumentModal(template: any) {
    this.modalService.open(template);
  }

  closeModal(e: boolean, modal: any) {
    console.log(e);
    if(e) {
      this.getInstrumentList(true);
    }
    this.selectedInstrumentId = 0;
    modal.close()
  }

  getInstrumentList(secondRetrieve: boolean = false) {
    this.instrumentLoading = true;
    this.subList.push(
      this.instrumentService.getInstrumentList().subscribe({
        next: res => {
          this.instrumentLoading = false;
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
          this.displayList = [...this.instrumentList];
          if(secondRetrieve){
            this.store.dispatch(FilterListActions.updateSearchText({searchTxt: this.searchText}))
          }
          this.instrumentLoading = false;
          this.cdr.markForCheck();
        },
        error: e => {
          this.instrumentLoading = false;
        }
      })
    );
  }

  openEdit(id: number, template: any) {
    this.selectedInstrumentId = id;
    this.modalService.open(template, {size: 'lg'})
  }

  deleteItem(e: number) {
    this.instrumentLoading = true;
    this.subList.push(
      this.instrumentService.deleteInstrument(e).subscribe({
        next: (res) => {
          this.getInstrumentList(true);
          this.toastService.show({message: 'Item deleted successfully.'}, 'danger')
        }, 
        error: () => {
          this.instrumentLoading = false;
        }
      })
    );
  }
}
