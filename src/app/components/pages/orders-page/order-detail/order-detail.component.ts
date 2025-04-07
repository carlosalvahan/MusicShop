import { Component, inject, input, OnInit, output } from '@angular/core';
import { CartService } from '../../cart-page/services/cart-service';
import { ProjectionMapper } from '../../../shared/projection-mapper/projection-mapper-service';
import { CartItem } from '../../../../store/cart/cart-model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CurrencyPipe],
  providers: [CartService, ProjectionMapper],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit{
  cartService = inject(CartService);
  projectionMapper = inject(ProjectionMapper)
  cartId = input<number>(0);
  closeModal = output<void>();
 
  orderItems: CartItem[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.cartService.getCartById(this.cartId()).subscribe({
      next: res => { 
        this.orderItems = res.items.map(item => this.projectionMapper.mapProjectionItems<CartItem>(item, 'instrument'));
        this.totalPrice = res.totalPrice;
      }
    })
  }
  
}
