import { Injectable, InjectionToken } from '@angular/core';
import { loadCss, loadModules } from 'esri-loader';
import { IArcGisWrapperService } from '../interfaces/iArcGisWrapperService';
import { EnvironmentService } from './environment.service';
import esri = __esri;

export const ArcGisWrapperServiceProvider = new InjectionToken('AuthenticationProvider', {
  providedIn: 'root',
  factory: () => new ArcGisWrapperService(new EnvironmentService()),
});

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
