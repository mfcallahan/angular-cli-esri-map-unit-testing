import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBase } from 'src/test/testBase';
import { EnvironmentService } from '../services/environment.service';
import { EsriLoaderWrapperService } from '../services/esriLoaderWrapper.service';
import { MapService } from '../services/map.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let initDefaultMapSpy: jasmine.Spy;
  const mockMapService = { initDefaultMap: () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [{ provide: MapService, useValue: mockMapService }],
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
