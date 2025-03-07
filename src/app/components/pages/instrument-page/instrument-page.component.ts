import { Component, inject, OnInit } from '@angular/core';
import { FilterGroup, SideFilterComponent } from '../../shared/side-filter/side-filter.component';
import { InstrumentService } from './services/instrument-service';
import { forkJoin, Observable } from 'rxjs';
import { InstrumentListComponent } from './instrument-list/instrument-list.component';

@Component({
  selector: 'app-instrument-page',
  standalone: true,
  imports: [SideFilterComponent, InstrumentListComponent],
  templateUrl: './instrument-page.component.html',
  providers: [InstrumentService],
  styleUrl: './instrument-page.component.scss'
})
export class InstrumentPageComponent implements OnInit{
  instrumentService = inject(InstrumentService);
  allFilters: FilterGroup[] = [];
  filterSubs: Observable<any>[] = [];

  ngOnInit(): void {
    this.filterSubs = [this.instrumentService.getManufacturers(), this.instrumentService.getInstrumentTypes()]
    forkJoin(this.filterSubs).subscribe({
      next: (res) => {
        const manufacturerGroup =  new FilterGroup('brands', res[0]);
        const instrumentTypeGroup = new FilterGroup('types', res[1]);
        this.allFilters = [manufacturerGroup, instrumentTypeGroup]
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}

