import { Injectable } from '@angular/core';
import { loadCss, loadModules } from 'esri-loader';
import { IArcGisWrapperService } from 'src/app/interfaces/iArcGisWrapperService';
import { EnvironmentService } from 'src/app/services/environment.service';

// This class acts as a wrapper for methods available in the esri-loader npm package.
@Injectable({
  providedIn: 'root',
})
export class ArcGisWrapperService implements IArcGisWrapperService {
  constructor(private readonly environment: EnvironmentService) {}

  public loadCss(url: string, before: string): void {
    loadCss(url, before);
  }

  public async loadModules(modules: string[]): Promise<any[]> {
    return await loadModules(modules, {
      url: this.environment.baseConfigs.arcgisJsApiSettings.apiUrl,
    });
  }
}
