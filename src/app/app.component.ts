import { Component, OnInit } from '@angular/core';
import { loadCss } from 'esri-loader';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly environment: EnvironmentService) {}

  ngOnInit(): void {
    // Load ArcGIS JS API CSS on app init
    // https://github.com/Esri/esri-loader#using-loadcss
    loadCss(this.environment.baseConfigs.arcgisJsApiSettings.cssUrl, 'link[rel="stylesheet"]');
  }
}
