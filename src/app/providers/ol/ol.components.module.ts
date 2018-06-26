import { NgModule } from '@angular/core';
import { ImageryModule } from '@ansyn/imagery';
import { CommonModule } from '@angular/common';
import { OlImap } from './ol-imap';

@NgModule({
  imports: [
    CommonModule,
    ImageryModule.provideIMaps([OlImap])
  ]
})
export class OlComponentsModule {

}


