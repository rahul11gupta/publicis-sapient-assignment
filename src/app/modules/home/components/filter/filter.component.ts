import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { APP_CONSTANTS, AppConstantConfig } from 'src/app/app.constants';
import { IHttpParams } from 'src/app/models/http-wrapper.service.model';

@Component({
  selector: 'ps-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  yearArr;
  selectedYear: string;
  selectedLand: boolean;
  selectedLaunch: boolean;
  @Output() paramEmitter = new EventEmitter<IHttpParams>();
  constructor(@Inject(APP_CONSTANTS) private appConstantConfig: AppConstantConfig) { }

  ngOnInit(): void {
    this.yearArr = this.appConstantConfig.APP['yearArray'];
  }

  updateLaunch(value: boolean) {
    this.selectedLaunch = value;
    this.paramEmitter.emit({
      param: 'launch_success',
      value: value
    });
  }

  updateLand(value: boolean) {
    this.selectedLand = value;
    this.paramEmitter.emit({
      param: 'land_success',
      value: value
    });
  }

  updateYear(year: string) {
    this.selectedYear = year;
    this.paramEmitter.emit({
      param: 'launch_year',
      value: year
    });
  }

}
