import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [],
  templateUrl: './instrument-item.component.html',
  styleUrl: './instrument-item.component.scss'
})
export class InstrumentItemComponent {
  imgSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/150`
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  openDetails() {
    this.router.navigate(['1'], {relativeTo: this.activeRoute});
  }

  addtoCart(e:Event) {
    e.stopPropagation();
    console.log('add to cart');
  }
}
