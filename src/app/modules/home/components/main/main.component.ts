import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnChanges {
  @Input('data') data;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.data = changes.data.currentValue;
    }
  }
}
