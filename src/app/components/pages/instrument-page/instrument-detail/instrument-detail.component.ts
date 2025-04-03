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
import { CartService } from '../../cart-page/services/cart-service';

@Component({
  selector: 'app-instrument-detail',
  standalone: true,
  imports: [CurrencyPipe, CounterInputComponent, FormsModule, NgClass],
  providers: [ CartService],
  templateUrl: './instrument-detail.component.html',
  styleUrl: './instrument-detail.component.scss'
})
export class InstrumentDetailComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  cartService = inject(CartService);

  instrument: Instrument = new Instrument({});
  quantity: number = 1;
  
  cartItems: CartItem[] = [];
  itemIsInCart: boolean = false;
  subList: Subscription[] = [];
  cartId: number = 0;
  cartItemId: number = 0;

  ngOnInit(): void {
    this.subList.push(
      this.activatedRoute.data.subscribe({
        next: ({instrument}) => {
          this.instrument = instrument;
        }
      }),
      this.store.select('cartList').subscribe(res => {
        this.cartItems = res.cartList;
        
        this.cartId = res.cartId;
        const itemInCart = this.cartItems.find(item => item.instrumentId === this.instrument.id);
        if(itemInCart) {
          this.itemIsInCart = true;
          this.quantity = itemInCart.quantity;
          this.cartItemId = itemInCart.id
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
      id: this.cartItemId,
      name,
      price,
      stocks,
      quantity: this.quantity,
      instrumentId: id
    }
    if(this.cartItems.length < 1) {
      this.addCartItem(itemAdd);
    } else if(this.itemIsInCart) {
      console.log(itemAdd);
      
      this.store.dispatch(CartListAction.updateCartItem({cartItem: itemAdd}));
      this.addCartItem(itemAdd, true);
    } else {
      this.addCartItem(itemAdd);
    }
  }

  addCartItem(itemAdd: any, update: boolean = false) {
    const reqBody = {
      instrumentId: itemAdd.instrumentId,
      quantity: itemAdd.quantity,
      cartId: this.cartId
    };
    this.cartService.updateCart(reqBody).subscribe({
      next: (res) => {
        if(!update) {
          itemAdd.id = res;
          this.store.dispatch(CartListAction.addCartItem({cartItem: itemAdd}));
        }
      }
    });
  }
}
