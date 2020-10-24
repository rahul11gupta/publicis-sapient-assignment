import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../services/home.service';
import { IHttpGetData, IHttpParams } from 'src/app/models/http-wrapper.service.model';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public apiData: any = [];
  public getLaunchDataSubscription: Subscription;
  public getActivatedRouteSubscription: Subscription;
  public data: IHttpGetData = {
    headers: [],
    params: [{
      param: 'limit',
      value: '100'
    }]
  };
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild('emptyMessage') emptyMessage: ElementRef<any>;
  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resolveUrlParams();
  }
  // Calling backend API `launches` with url params
  callLaunchDetails() {
    this.apiData = [];
    if (this.emptyMessage)
      this.emptyMessage.nativeElement.innerText = "Loading...";
    this.getLaunchDataSubscription = this.homeService.getLaunchData(this.data).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.apiData = res;
        if (this.apiData.length == 0) {
          this.emptyMessage.nativeElement.innerText = "No Data";
        }
      }, e => { console.log(e) });
  }
  // function to update the parameters based on the user entry
  updateGetParams(event: IHttpParams) {
    this.data.params.forEach((p, i) => {
      if (p.param == event.param) {
        this.data.params.splice(i, 1);
      }
    });
    if (event.value !== null)
      this.data.params.push(event);
    this.setAppUrl();
    this.callLaunchDetails();
  }

  // Function to set APP url to prevent data loss after browser Refresh
  setAppUrl() {
    const queryParamObject = {}
    this.data.params.forEach((p) => {
      queryParamObject[p.param] = p.value;
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute, queryParams: queryParamObject
    });
  }

  resolveUrlParams() {
    this.getActivatedRouteSubscription = this.activatedRoute.queryParams.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(res => {
        Object.keys(res).forEach(r => {
          this.data.params.push({ param: r, value: res[r] });
        });
        this.callLaunchDetails();
      }, e => { console.log(e) });
  }

  // Performing cleanup to prevent memory leaks
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
