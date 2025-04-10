import { Component, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../loader/loader.component';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterItem } from '../../../store/filters/filter-model';
import { Store } from '@ngrx/store';
import { FilterListActions } from '../../../store/filters/filter-actions';

@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [NgbAccordionModule, LoaderComponent, TitleCasePipe, FormsModule, AsyncPipe],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.scss'
})

export class SideFilterComponent {
  store = inject(Store);
  searchText: string = '';
  filterList$ = this.store.select('filters');

  filterChanged(group: string, label: string, e: any, filterItems: FilterItem[]) {
    let filterItem = filterItems.find(filter => filter.label === label);
    let retValue: string | number | boolean = '';
    if(filterItem) {
      const valueType =  typeof filterItem.value === 'boolean';
      if(valueType) {
        retValue = !filterItem.value;
      }
    }
    this.store.dispatch(FilterListActions.updateFilter({group, label, value: retValue}))
  }

  onSearchClicked() {
    this.store.dispatch(FilterListActions.updateSearchText({searchTxt: this.searchText}))
  }
}



