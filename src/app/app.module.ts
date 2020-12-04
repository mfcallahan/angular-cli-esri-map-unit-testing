import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FlexLayoutModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
