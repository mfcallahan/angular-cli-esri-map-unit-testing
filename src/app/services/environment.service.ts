import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEnvironment } from 'src/app/interfaces/iEnvironment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  get production(): any {
    return environment.production;
  }

  get baseConfigs(): any {
    return environment.baseConfigs;
  }
}
