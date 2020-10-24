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