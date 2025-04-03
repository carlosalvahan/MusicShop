import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartListState } from '../../../store/cart/cart-model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartDetailComponent, AsyncPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  
  store = inject(Store);
  user$ = this.store.select('user');
  cart$ = this.store.select('cartList');
}
