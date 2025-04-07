import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartListState } from '../../../store/cart/cart-model';
import { CartService } from './services/cart-service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ToastService } from '../../shared/toast/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartDetailComponent, AsyncPipe, LoaderComponent],
  providers: [CartService],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  
  store = inject(Store);
  cartService = inject(CartService);
  toastService = inject(ToastService);
  router = inject(Router);
  user$ = this.store.select('user');
  cart$ = this.store.select('cartList');

  showLoader: boolean = false;
  

  finishOrder(cart: CartListState) {
    const reqBody = {
      addressId: 1,
      cartID: cart.cartId
    }
    this.showLoader = true;
    this.cartService.fulfillCart(reqBody).subscribe({
      next: (res) => { 
        console.log(res)
        this.toastService.show({message: 'Order successfully placed'}, 'success');
        this.showLoader = false;
        this.router.navigate(['/orders'])
      },
      error: (e) => {
        console.log(e);
        this.toastService.show({message: 'An error has occured'}, 'danger');
        this.showLoader = false;
      }
    });
  }
}
