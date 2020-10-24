import { Observable } from 'rxjs';
import { IHttpGetData } from './http-wrapper.service.model';

export interface IHomeService {
    getLaunchData(data: IHttpGetData): Observable<any>
}