import { IArcGisWrapperService } from 'src/app/interfaces/iArcGisWrapperService';

export class FakeArcGisWrapperService implements IArcGisWrapperService {
  loadCss(url: string, before: string): void {}

  loadModules(modules: string[]): Promise<any[]> {
    return Promise.resolve([]);
  }
}
