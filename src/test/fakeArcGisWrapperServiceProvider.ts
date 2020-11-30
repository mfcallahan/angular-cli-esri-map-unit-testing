import { InjectionToken } from '@angular/core';
import { FakeArcGisWrapperService } from './fakeArcGisWrapperService';

// This is a fake ArcGisWrapperServiceProvider which can be used for testing. Instead of providing an instance
// of the ArcGisWrapperService (which will make HTTP requests to fetch ArcGIS JS API modules), this provider will
// inject an instance of the FakeArcGisWrapperService, which also implements the IArcGisWrapperService interface,
// but does not call the methods from the esri-loader npm package.
export const FakeArcGisWrapperServiceProvider = new InjectionToken('ArcGisWrapperServiceProvider', {
  providedIn: 'root',
  factory: () => new FakeArcGisWrapperService(),
});
