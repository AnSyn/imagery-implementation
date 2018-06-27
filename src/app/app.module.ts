import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ImageryModule } from '@ansyn/imagery';
import { BrowserModule } from '@angular/platform-browser';
import { BaseOlModule } from './providers/ol/base-ol.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ImageryModule,
    BaseOlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
