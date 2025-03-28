import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instrument } from '../instrument-model';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CounterInputComponent } from '../../../shared/counter-input/counter-input.component';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../../store/cart/cart-model';
import { Store } from '@ngrx/store';
import { CartListAction } from '../../../../store/cart/cart-actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instrument-detail',
  standalone: true,
  imports: [CurrencyPipe, CounterInputComponent, FormsModule, NgClass],
  templateUrl: './instrument-detail.component.html',
  styleUrl: './instrument-detail.component.scss'
})
export class InstrumentDetailComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);

  instrument: Instrument = new Instrument({});
  quantity: number = 1;
  
  cartItems: CartItem[] = [];
  itemIsInCart: boolean = false;
  subList: Subscription[] = [];

  ngOnInit(): void {
    this.subList.push(
      this.activatedRoute.data.subscribe({
        next: ({instrument}) => {
          this.instrument = instrument;
        }
      }),
      this.store.select('cartList').subscribe(res => {
        this.cartItems = res.cartList;
        const itemInCart = this.cartItems.find(item => item.id === this.instrument.id);
        if(itemInCart) {
          this.itemIsInCart = true;
          this.quantity = itemInCart.quantity;
        } else {
          this.itemIsInCart = false;
          this.quantity = 1;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() });
  }

  addToCart() {
    const {id, name, price, stocks} = this.instrument;
    const itemAdd: CartItem = {
      id,
      name,
      price,
      stocks,
      quantity: this.quantity,
    }
    if(this.cartItems.length < 1) {
      this.store.dispatch(CartListAction.addCartItem({cartItem: itemAdd}));
    } else if(this.itemIsInCart) {
      this.store.dispatch(CartListAction.updateCartItem({cartItem: itemAdd}));
    } else {
      this.store.dispatch(CartListAction.addCartItem({cartItem: itemAdd}));
    }
  }
}
