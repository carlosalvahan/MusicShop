import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterInputComponent } from '../../../shared/counter-input/counter-input.component';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../../store/cart/cart-model';
import { CartListAction } from '../../../../store/cart/cart-actions';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/modal/modal.service';
import { StorageService } from '../../../shared/storage/storage-service';
import { CartService } from '../services/cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, CounterInputComponent, FormsModule, NgbTooltip],
  providers: [CartService],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent implements OnInit, OnDestroy {
  store = inject(Store);
  modalService = inject(ModalService);
  storageService = inject(StorageService);
  cartService = inject(CartService);

  cartList$ = this.store.select('cartList');
  modalContent: ModalContent = new ModalContent();
  subList: Subscription[] = [];
  cartId: number = 0;

  ngOnInit(): void {
    
  }

  quantityChanged(value: number, cartItem: CartItem, cartId: number) {
    const updatedCartItem = {
      ...cartItem,
      quantity: value
    };
    const reqBody = {
      instrumentId: updatedCartItem.instrumentId,
      quantity: updatedCartItem.quantity,
      cartId
    };
    this.subList.push(
      this.cartService.updateCart(reqBody).subscribe()
    );

    this.store.dispatch(CartListAction.updateCartItem({ cartItem: updatedCartItem }));
  }

  removeConfirm(id: number) {
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Remove from Cart'
    }
    console.log(id);
    this.modalService.open(this.modalContent, { size: 'md' }).result.then(res => {
      if (res) {
        this.removeFromCart(id);
      }
    }, (e) => { });
  }

  removeFromCart(id: number) {
    this.subList.push(this.cartService.removeItemFromCart(id).subscribe());
    this.store.dispatch(CartListAction.deleteCartItem({ id }));
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => {sub.unsubscribe()});
  }
  
}
