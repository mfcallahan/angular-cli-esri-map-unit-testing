import { Component, Inject, OnInit } from '@angular/core';
import { IArcGisWrapperService } from './interfaces/iArcGisWrapperService';
import { ArcGisWrapperServiceProvider } from './services/arcGisWrapper.service';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly environment: EnvironmentService,
    @Inject(ArcGisWrapperServiceProvider)
    private readonly arcGisWrapperService: IArcGisWrapperService
  ) {}

  ngOnInit(): void {
    // Load ArcGIS JS API CSS on app init, inserting the stylesheet link above the first <style> tag on th
    // page so that ArcGIS styles can be overridden in the app:
    // https://github.com/Esri/esri-loader#overriding-arcgis-styles
    this.arcGisWrapperService.loadCss(
      this.environment.baseConfigs.arcgisJsApiSettings.cssUrl,
      'link[rel="stylesheet"]'
    );
  }
}
