import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterInputComponent } from '../../../shared/counter-input/counter-input.component';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../../store/cart/cart-model';
import { CartListAction } from '../../../../store/cart/cart-actions';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/modal/modal.service';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, CounterInputComponent, FormsModule, NgbTooltip],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent {
  store = inject(Store);
  modalService = inject(ModalService);

  cartList$ = this.store.select('cartList');
  modalContent: ModalContent = new ModalContent();

  quantityChanged(value: number, cartItem: CartItem) {
    const updatedCartItem = {
      ...cartItem,
      quantity: value
    };
    this.store.dispatch(CartListAction.updateCartItem({cartItem: updatedCartItem}));
  }

  removeConfirm(id: number) {
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Remove from Cart'
    }
    this.modalService.open(this.modalContent, { size: 'md' }).result.then(res => {
      if (res) {
        this.removeFromCart(id);
      }
    }, (e) => {});
  }

  removeFromCart(id: number) {
    this.store.dispatch(CartListAction.deleteCartItem({id}));
  }
}
