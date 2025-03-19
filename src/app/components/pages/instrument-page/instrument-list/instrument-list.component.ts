import { Component, inject, OnInit } from '@angular/core';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../store/user/user-model';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { InstrumentService } from '../services/instrument-service';
import { Instrument } from '../instrument-model';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [InstrumentItemComponent, AsyncPipe],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.scss'
})
export class InstrumentListComponent implements OnInit{
  loggedInUser$!: Observable<UserModel>;

  store = inject(Store);
  instrumentService = inject(InstrumentService);
  instrumentList: Instrument[] = [];

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select('user');
    this.instrumentService.getInstrumentList().subscribe({
      next: res => {
        this.instrumentList = [...res];
        console.log(this.instrumentList);
      },
      error: e => {
        console.log(e);
      }
    });
  }
}
