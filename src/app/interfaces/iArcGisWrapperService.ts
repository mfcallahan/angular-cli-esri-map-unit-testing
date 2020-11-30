export interface IArcGisWrapperService {
  loadCss(url: string, before: string): void;
  loadModules(modules: string[]): Promise<any[]>;
}
