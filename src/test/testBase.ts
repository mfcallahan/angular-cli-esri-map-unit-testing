import { ComponentFixture } from '@angular/core/testing';

export class TestBase {
  static testTearDown(fixture: ComponentFixture<any>): void {
    // remove rendered component in test results page
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  }
}
