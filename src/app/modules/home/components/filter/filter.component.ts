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

  updateParam(paramName: string, value: any) {
    let data = { param: paramName, value: null };
    switch (paramName) {
      case 'launch_year': this.updateYear(data, value); break;
      case 'launch_success': this.updateLaunch(data, value); break;
      case 'land_success': this.updateLand(data, value); break;
    }

    this.paramEmitter.emit(data);
  }

  updateLaunch(data: IHttpParams, value: boolean) {
    if (value !== this.selectedLaunch) {
      this.selectedLaunch = value;
      data['value'] = value;
    } else {
      this.selectedLaunch = null;
    }
    return data;
  }

  updateLand(data: IHttpParams, value: boolean) {
    if (value !== this.selectedLand) {
      this.selectedLand = value;
      data['value'] = value;
    } else {
      this.selectedLand = null;
    }
    return data;
  }

  updateYear(data: IHttpParams, year: string): IHttpParams {
    if (year !== this.selectedYear) {
      this.selectedYear = year;
      data['value'] = year;
    } else {
      this.selectedYear = null;
    }
    return data;
  }

}
