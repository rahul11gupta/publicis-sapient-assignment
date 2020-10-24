import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'ps-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input('template') template: TemplateRef<any>;
  @Input('data') data: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.data = changes.data.currentValue;
    }
  }

}
