import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SERVICE_CONSTANTS, ServiceConstantConfig } from '../../../app.constants';
import { IHttpHeaders, IHttpParams, IHttpGetData } from 'src/app/models/http-wrapper.service.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {

  constructor(private http: HttpClient, @Inject(SERVICE_CONSTANTS) private serviceConstantsConfig: ServiceConstantConfig, ) { }

  setHeaders(headers: IHttpHeaders[]) {
    let reqHeader = new HttpHeaders();
    headers.forEach(h => {
      reqHeader.append(h.param, h.value);
    });
    return reqHeader;
  }

  setParams(params: IHttpParams[]) {
    let reqParam = new HttpParams();
    params.forEach(p => {
      reqParam = reqParam.set(p.param, p.value);
    });
    return reqParam;
  }

  setUrl(url: string) {
    let apiUrl = this.serviceConstantsConfig.apiUrl + url;
    return apiUrl;
  }

  get(url: string, data: IHttpGetData): Observable<any> {
    let reqHeader = this.setHeaders(data.headers);
    let reqParam = this.setParams(data.params);
    return this.http.get(
      this.setUrl(url), {
      headers: reqHeader,
      params: reqParam
    }).pipe(
      catchError(this.catchError)
    );
  }

  catchError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
