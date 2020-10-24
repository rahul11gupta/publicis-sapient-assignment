import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from '../../shared/services/http-client-wrapper.service';
import { SERVICE_CONSTANTS, ServiceConstantConfig } from '../../../app.constants';
import { IHomeService } from 'src/app/models/home.service.model';
import { IHttpGetData } from 'src/app/models/http-wrapper.service.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService implements IHomeService {

  constructor(@Inject(SERVICE_CONSTANTS) private serviceConstantsConfig: ServiceConstantConfig, private http: HttpClientWrapperService) { }

  getLaunchData(data: IHttpGetData): Observable<any> {
    const url = this.serviceConstantsConfig.API['launchDetails'];
    return this.http.get(url, data);
  }

}
