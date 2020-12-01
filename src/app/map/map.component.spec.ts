import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeArcGisWrapperServiceProvider } from 'src/test/fakeArcGisWrapperServiceProvider';
import { TestBase } from 'src/test/testBase';
import { ArcGisWrapperServiceProvider } from '../services/arcGisWrapper/arcGisWrapperServiceProvider';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      // Use the FakeArcGisWrapperServiceProvider to inject the IArcGisWrapperService dependency into the
      // MapComponent class for testing purposes.
      providers: [{ provide: ArcGisWrapperServiceProvider, useValue: FakeArcGisWrapperServiceProvider }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should initialize MapComponent', () => {
    expect(component).toBeTruthy();

    // Assert that component was created correctly, and private methods called from ngOnInit() have
    // initialized properties as expected.
    expect(component.map).not.toBeUndefined();
    expect(component.mapView).not.toBeUndefined();
  });
});
