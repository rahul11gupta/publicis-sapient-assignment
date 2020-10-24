import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let SERVICE_CONSTANTS = new InjectionToken<ServiceConstantConfig>('ps.service.constant');
export let APP_CONSTANTS = new InjectionToken<AppConstantConfig>('ps.app.constant');

// Services Constants
export class ServiceConstantConfig {
    apiUrl!: string;
    API!: object;

}
export const SERVICE_CONSTANTS_CONFIG: ServiceConstantConfig = {
    apiUrl: environment.API_BASE_PATH,
    API: {
        launchDetails: 'launches'
    }
};

// Services Constants
export class AppConstantConfig {
    APP!: object;

}
export const APP_CONSTANTS_CONFIG: AppConstantConfig = {
    APP: {
        yearArray: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020",
        ]
    }
};

@NgModule({
    providers: [{
        provide: SERVICE_CONSTANTS,
        useValue: SERVICE_CONSTANTS_CONFIG
    }, {
        provide: APP_CONSTANTS,
        useValue: APP_CONSTANTS_CONFIG
    }]
})
export class AppConstantsModule { }