import { InjectionToken } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ArcGisWrapperService } from './arcGisWrapper.service';

// Interfaces are a design time concept in TypeScript and are not available at run time. An InjectionToken is created
// here which is used to specify the concrete implementation of an IArcGisWrapperService dependency for a class. The
// class constructor parameter for IArcGisWrapperService is marked with the @Inject() decorator, and this custom
// provider is used when the IArcGisWrapperService dependency in injected.
export const ArcGisWrapperServiceProvider = new InjectionToken('ArcGisWrapperServiceProvider', {
  providedIn: 'root',
  factory: () => new ArcGisWrapperService(new EnvironmentService()),
});
