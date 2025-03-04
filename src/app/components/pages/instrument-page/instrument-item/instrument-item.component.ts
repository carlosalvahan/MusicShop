import { Component } from '@angular/core';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [],
  templateUrl: './instrument-item.component.html',
  styleUrl: './instrument-item.component.scss'
})
export class InstrumentItemComponent {
  imgSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/150`
}
