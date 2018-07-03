import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageryModule } from '@ansyn/imagery';
import { OsmSourceProvider } from './providers/map-source-providers/osm.source-provider';
import { OlImap } from './providers/maps/ol-imap';
import { CesiumMap } from './providers/maps/cesium-map';
import { ControllerComponent } from './controller/controller.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ControllerComponent
  ],
  imports: [
    FormsModule,
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
