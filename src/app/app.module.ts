import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageryModule } from '@ansyn/imagery';
import { OsmSourceProvider } from './providers/map-source-providers/osm.source-provider';
import { OlImap } from './providers/maps/ol-imap';
import { CesiumMap } from './providers/maps/cesium-map';

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
      mapSourceProviders: [OsmSourceProvider]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
