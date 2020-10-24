import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { AppConstantsModule } from 'src/app/app.constants';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [HomeComponent, FilterComponent, MainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    HomeRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
