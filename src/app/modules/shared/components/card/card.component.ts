import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ps-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input('template') template;
  @Input('data') data;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.data = changes.data.currentValue;
    }
  }

}
