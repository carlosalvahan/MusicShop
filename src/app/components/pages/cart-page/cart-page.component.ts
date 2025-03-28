import { Component } from '@angular/core';
import { CartDetailComponent } from './cart-detail/cart-detail.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartDetailComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

}
