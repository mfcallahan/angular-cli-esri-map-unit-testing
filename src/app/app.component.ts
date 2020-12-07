import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(readonly environment: EnvironmentService, readonly esriLoaderWrapperService: EsriLoaderWrapperService) {}

  ngOnInit(): void {
    // Load the ArcGIS JS API styles on app init, inserting the stylesheet link above the first <style> tag on
    // the page so that ArcGIS styles can be overridden, if needed. See this link for more information:
    // https://github.com/Esri/esri-loader#overriding-arcgis-styles
    this.esriLoaderWrapperService.loadCss(
      this.environment.baseConfigs.arcgisJsApiSettings.cssUrl,
      'link[rel="stylesheet"]'
    );
  }
}
