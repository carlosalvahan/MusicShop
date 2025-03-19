import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../instrument-model';
import { CurrencyPipe } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CurrencyPipe, NgbTooltipModule],
  templateUrl: './instrument-item.component.html',
  styleUrl: './instrument-item.component.scss'
})
export class InstrumentItemComponent {
  imgSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/150`
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  instrument = input<Instrument>(
    {
      id: 0,
      type: '',
      stocks: 0,
      details: '',
      name: '',
      price: 0
    }
  );
  openDetails(id: number) {
    console.log(id);
    // this.router.navigate(['1'], {relativeTo: this.activeRoute});
  }

  addtoCart(e:Event) {
    e.stopPropagation();
    console.log('add to cart');
  }
}
