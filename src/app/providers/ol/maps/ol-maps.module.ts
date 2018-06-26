import { NgModule } from '@angular/core';
import { ImageryModule } from '@ansyn/imagery';
import { OsmSourceProvider } from './osm-source-provider';

@NgModule({
  imports: [
    ImageryModule.provideMapSourceProviders([OsmSourceProvider])
  ],
})
export class OlMapsModule {

}


