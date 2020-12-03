import { Injectable } from '@angular/core';
import { loadCss, loadModules } from 'esri-loader';
import { EnvironmentService } from './environment.service';

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

  // This generic method accepts a constructor as a parameter and and optional object parameter, and return
  // an instance of Type <T>. See this link for more information about the mixin pattern:
  // https://devblogs.microsoft.com/typescript/announcing-typescript-2-2-rc/
  public getInstance<T>(type: new (paramObj: any) => T, paramObj?: any): T {
    return new type(paramObj);
  }
}
