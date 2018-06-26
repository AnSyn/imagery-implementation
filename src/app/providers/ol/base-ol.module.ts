import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlComponentsModule } from './ol.components.module';
import { OlMapsModule } from './maps/ol-maps.module';

@NgModule({
  imports: [
    CommonModule,
    OlComponentsModule,
    OlMapsModule
  ]
})
export class BaseOlModule {

}


