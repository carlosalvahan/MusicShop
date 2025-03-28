import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../instrument-model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ModalContent } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/modal/modal.service';
import { InstrumentService } from '../services/instrument-service';
import { CartItem } from '../../../../store/cart/cart-model';
import { CartListAction } from '../../../../store/cart/cart-actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CurrencyPipe, NgbTooltipModule, AsyncPipe],
  providers: [InstrumentService],
  templateUrl: './instrument-item.component.html',
  styleUrl: './instrument-item.component.scss'
})
export class InstrumentItemComponent implements OnInit, OnDestroy {
  imgSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/150`
  router = inject(Router);
  store = inject(Store);
  activeRoute = inject(ActivatedRoute);
  instrument = input<Instrument>(new Instrument({}));
  modalService = inject(ModalService);

  openEdit = output();
  deleteItem = output<number>();

  user$ = this.store.select('user');

  modalContent: ModalContent = new ModalContent();
  cartItems: CartItem[] = [];
  subList: Subscription[] = [];
  itemIsInCart: boolean = false;

  ngOnInit(): void {
    this.subList.push(
      this.store.select('cartList').subscribe(res => {
        this.cartItems = res.cartList;
        const itemInCart = this.cartItems.find(item => item.id === this.instrument().id);
        this.itemIsInCart = Boolean(itemInCart);
      })
    );
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() });
  }

  openDetails(id: number) {
    this.router.navigate([id], { relativeTo: this.activeRoute });
  }


  editInstrument(e: Event) {
    e.stopPropagation();
    this.openEdit.emit();
  }

  deleteInstrument(e: Event) {
    e.stopPropagation();
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Delete Instrument'
    }
    this.modalService.open(this.modalContent, { size: 'md' }).result.then(res => {
      if (res) {
        console.log('delete please', this.instrument().id)
        this.deleteItem.emit(this.instrument().id);
      }
    }, (e) => { });
  }

  addToCart(e: Event) {
    e.stopPropagation();
    const { id, name, price, stocks } = this.instrument();
    const itemAdd: CartItem = {
      id,
      name,
      price,
      stocks,
      quantity: 1,
    }
    if (this.cartItems.length < 1) {
      this.store.dispatch(CartListAction.addCartItem({ cartItem: itemAdd }));
    } else if (this.itemIsInCart) {
      this.store.dispatch(CartListAction.updateCartItem({ cartItem: itemAdd }));
    } else {
      this.store.dispatch(CartListAction.addCartItem({ cartItem: itemAdd }));
    }
  }
}
