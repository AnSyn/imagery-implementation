import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ImageryModule, MAP_PROVIDERS_CONFIG, MAP_SOURCE_PROVIDERS_CONFIG } from '@ansyn/imagery';
import { AnnotationsVisualizer, OL_CONFIG, OL_PLUGINS_CONFIG, OpenLayerBingSourceProvider, OpenLayersMap } from '@ansyn/ol';
import { NavbarModule } from './navbar/navbar.module';
import { AnnotationsControlComponent } from './annotations-control/annotations-control.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MccColorPickerModule } from 'material-community-components';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationsControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavbarModule,
    MatButtonModule,
    MatIconModule,
    MccColorPickerModule.forRoot({
      used_colors: ['#000000', '#123456', '#777666']
    }),
    ImageryModule.provide({
      maps: [OpenLayersMap],
      plugins: [AnnotationsVisualizer],
      mapSourceProviders: [OpenLayerBingSourceProvider]
    })
  ],
  providers: [
    {
      provide: OL_PLUGINS_CONFIG,
      useValue: {
        Annotations: {}
      }
    },
    {
      provide: OL_CONFIG,
      useValue: {}
    },
    {
      provide: MAP_PROVIDERS_CONFIG,
      useValue: {
        openLayersMap: {
          defaultMapSource: 'BING'
        }
      }
    },
    {
      provide: MAP_SOURCE_PROVIDERS_CONFIG,
      useValue: {
        'BING': {
          key: 'AsVccaM44P5n-GYKXaV0oVGdTI665Qx_sMgYBSYRxryH2pLe92iVxUgEtwIt8des',
          styles: ['AerialWithLabels']
        }
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
