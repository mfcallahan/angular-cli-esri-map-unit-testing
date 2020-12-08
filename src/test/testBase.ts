import { ComponentFixture } from '@angular/core/testing';
import { IEnvironment } from 'src/app/interfaces/iEnvironment';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';

export class TestBase {
  // Call this in a test spec's afterEach() method to a remove rendered component from the test runner page.
  static testTearDown(fixture: ComponentFixture<any>): void {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  }

  // Return an object which implements IEnvironment but contains dummy data for testing. This object can be provided
  // in the test bed configuration. See this link for more info:
  // https://medium.com/@seangwright/the-best-way-to-use-angulars-environment-files-a0c098551abc
  static getMockEnvironment(): IEnvironment {
    return {
      production: false,
      baseConfigs: {},
      randomPtsPhxUrl: 'https://url.to/RandomPointsPhx',
    };
  }

  static getIMapPointArray(): Array<IMapPoint> {
    return [
      {
        location: 'Foo',
        lat: 33.1995,
        lon: -112.261,
      },
      {
        location: 'Bar',
        lat: 33.6495,
        lon: -112.1032,
      },
    ];
  }
}
