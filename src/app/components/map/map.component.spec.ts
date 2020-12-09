import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBase } from 'src/test/testBase';
import { MapService } from 'src/app/services/map.service';
import { EnvironmentService } from 'src/app/services/environment.service';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const mockEnvironment = TestBase.getMockEnvironment();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [{ provide: EnvironmentService, useValue: mockEnvironment }, MapService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  it('should set up map after component view initialization', async () => {
    const initDefaultMapSpy = spyOn(component.mapService, 'initDefaultMap').and.returnValue(Promise.resolve());
    const addAllMapWidgetsSpy = spyOn(component.mapService, 'addAllMapWidgets').and.returnValue(Promise.resolve());

    await component.ngAfterViewInit();

    expect(initDefaultMapSpy).toHaveBeenCalledOnceWith(component.mapElementRef);
    expect(addAllMapWidgetsSpy).toHaveBeenCalledTimes(1);
  });
});
