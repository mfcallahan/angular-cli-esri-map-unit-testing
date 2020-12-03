import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBase } from 'src/test/testBase';
import { MapService } from 'src/app/services/map.service';

import { MapComponent } from './map.component';
import { AppComponent } from '../app.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let initDefaultMapSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [MapService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    initDefaultMapSpy = spyOn(component.mapService, 'initDefaultMap').and.returnValue(Promise.resolve());
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should initialize MapComponent', () => {
    expect(component).toBeTruthy();
    expect(initDefaultMapSpy).toHaveBeenCalledOnceWith(
      component.defaultBaseMap,
      component.defaultCenterLon,
      component.defaultCenterLat,
      component.defaultZoom,
      component.mapElementRef
    );
  });
});
