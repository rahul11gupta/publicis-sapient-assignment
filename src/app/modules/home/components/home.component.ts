import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { IHttpGetData, IHttpParams } from 'src/app/models/http-wrapper.service.model';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public apiData;
  public getLaunchDataSubscription: Subscription;
  public data: IHttpGetData = {
    headers: [],
    params: [{
      param: 'limit',
      value: '100'
    }]
  };
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.callLaunchDetails();
  }

  callLaunchDetails() {
    this.apiData = [];
    this.getLaunchDataSubscription = this.homeService.getLaunchData(this.data).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.apiData = res;
      }, e => { console.log(e) });
  }

  updateGetParams(event) {
    this.data.params.forEach((p, i) => {
      if (p.param == event.param) {
        this.data.params.splice(i, 1);
      }
    });
    if (event.value !== null)
      this.data.params.push(event);
    this.callLaunchDetails();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
