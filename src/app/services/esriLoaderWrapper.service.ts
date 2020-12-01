import { Injectable } from '@angular/core';
import { loadCss, loadModules } from 'esri-loader';
import { EnvironmentService } from 'src/app/services/environment.service';

// This class acts as a wrapper for methods available in the esri-loader npm package so that they can be
// more easily mocked during testing.
@Injectable({
  providedIn: 'root',
})
export class EsriLoaderWrapperService {
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
