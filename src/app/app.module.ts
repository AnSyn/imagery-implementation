import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageryModule } from '@ansyn/imagery';
import { OsmSourceProvider } from './providers/ol/map-source-providers/osm.source-provider';
import { OlImap } from './providers/ol/maps/ol-imap';
import { CesiumMap } from './providers/ol/maps/cesium-map';
import { DefaultCesium } from './providers/ol/map-source-providers/default-cesium';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ImageryModule.provide({
      maps: [OlImap, CesiumMap],
      plugins: [],
      mapSourceProviders: [OsmSourceProvider, DefaultCesium]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
