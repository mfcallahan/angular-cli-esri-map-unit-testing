import { ComponentFixture } from '@angular/core/testing';
import { IEnvironment } from 'src/app/interfaces/iEnvironment';

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
}
