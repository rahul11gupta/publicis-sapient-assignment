import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { APP_CONSTANTS, AppConstantConfig } from 'src/app/app.constants';
import { IHttpParams } from 'src/app/models/http-wrapper.service.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ps-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public yearArr: any;
  public selectedYear: string;
  public selectedLand: boolean;
  public selectedLaunch: boolean;
  @Output() paramEmitter = new EventEmitter<IHttpParams>();
  private ngUnsubscribe: Subject<any> = new Subject();
  public getActivatedRouteSubscription: Subscription;
  constructor(@Inject(APP_CONSTANTS) private appConstantConfig: AppConstantConfig, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.yearArr = this.appConstantConfig.APP['yearArray'];
    this.resolveUrlParams();
  }
  //Function called from view  which will handle different filter parameters
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

  resolveUrlParams() {
    this.getActivatedRouteSubscription = this.activatedRoute.queryParams.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(res => {
        Object.keys(res).forEach(r => {
          if (r !== 'limit') {
            switch (r) {
              case 'launch_year': this.selectedYear = res[r]; break;
              case 'launch_success': this.selectedLaunch = Boolean(res[r]); break;
              case 'land_success': this.selectedLand = Boolean(res[r]); break;
            }
          }
        });
      }, e => { console.log(e) });
  }

  // Performing cleanup to prevent memory leaks
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
