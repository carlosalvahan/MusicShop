import { Component, inject, OnInit } from '@angular/core';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../store/user/user-model';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

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

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select('user');
  }
}
