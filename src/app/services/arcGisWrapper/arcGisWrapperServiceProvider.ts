import { InjectionToken } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ArcGisWrapperService } from './arcGisWrapper.service';

export const ArcGisWrapperServiceProvider = new InjectionToken('AuthenticationProvider', {
  providedIn: 'root',
  factory: () => new ArcGisWrapperService(new EnvironmentService()),
});
