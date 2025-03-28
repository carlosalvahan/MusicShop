import { Component, input, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../loader/loader.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [NgbAccordionModule, LoaderComponent, TitleCasePipe],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.scss'
})

export class SideFilterComponent implements OnInit{
  filterItems = input<FilterGroup[] | []>([]);
  
  ngOnInit(): void {
  }
}


export class FilterGroup {
 constructor(group: string, filterItems: FilterItem[]) {
  this.group = group;
  this.filterItems = filterItems;
 }
 group: string;
 filterItems: FilterItem[] = [];
}

export class FilterItem {
  constructor(label: string, value: boolean) {
    this.label = label;
    this.value = value;
   }
  label:string;
  value:boolean;
}