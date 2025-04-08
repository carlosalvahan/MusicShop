import { Component, input, OnInit, output } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../loader/loader.component';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [NgbAccordionModule, LoaderComponent, TitleCasePipe, FormsModule],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.scss'
})

export class SideFilterComponent {
  filterItems = input<FilterGroup[] | []>([]);
  searchText: string = '';

  filterChanged() {
    const filterReturn: FilterReturn = {
      searchText: this.searchText,
      filter: this.filterItems()
    };
  }
}


export class FilterGroup {
 constructor(group: string, filterItems: FilterItem[], groupLabel?: string) {
  this.group = group;
  this.groupLabel = groupLabel || this.group;
  this.filterItems = filterItems;
 }
 group: string;
 filterItems: FilterItem[] = [];
 groupLabel: string;
}

export class FilterItem {
  constructor(label: string, value: boolean) {
    this.label = label;
    this.value = value;
   }
  label:string;
  value:boolean;
}

export class FilterReturn {
  searchText: string = '';
  filter: FilterGroup[] = [];
}