import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SERVICE_CONSTANTS, ServiceConstantConfig } from '../../../app.constants';
import { IHttpHeaders, IHttpParams, IHttpGetData, IHttpWrapperService } from 'src/app/models/http-wrapper.service.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService implements IHttpWrapperService {

  constructor(private http: HttpClient, @Inject(SERVICE_CONSTANTS) private serviceConstantsConfig: ServiceConstantConfig, ) { }

  //Function to set headers for backend requests
  setHeaders(headers: IHttpHeaders[]): HttpHeaders {
    let reqHeader = new HttpHeaders();
    headers.forEach(h => {
      reqHeader.append(h.param, h.value);
    });
    return reqHeader;
  }
  //Function to set url paeameters for backend requests
  setParams(params: IHttpParams[]): HttpParams {
    let reqParam = new HttpParams();
    params.forEach(p => {
      reqParam = reqParam.set(p.param, p.value);
    });
    return reqParam;
  }
  //Function to set url for backend requests
  setUrl(url: string): string {
    let apiUrl = this.serviceConstantsConfig.apiUrl + url;
    return apiUrl;
  }
  //Wrapper function for HTTPCLient.get()
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
  //Common Error-Handling Function for different Http Request Types
  catchError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

}
