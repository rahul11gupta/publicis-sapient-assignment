import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHttpParams {
  param: string;
  value: any;
}

export interface IHttpHeaders {
  param: string;
  value: string | string[];
}

export interface IHttpGetData {
  headers: IHttpHeaders[];
  params: IHttpParams[];
}

export interface IHttpWrapperService {
  setHeaders(headers: IHttpHeaders[]): HttpHeaders,
  setParams(params: IHttpParams[]): HttpParams,
  setUrl(url: string): string,
  get(url: string, data: IHttpGetData): Observable<any>,
  catchError(err: HttpErrorResponse): Observable<never>
}