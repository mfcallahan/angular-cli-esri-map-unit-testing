import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { FakeMapViewModule } from 'src/test/esri/fakeMapViewModule';
import { FakeModule } from 'src/test/esri/fakeModule';
import { EnvironmentService } from './environment.service';

import { MapService } from './map.service';

fdescribe('MapService', () => {
  let service: MapService;
  const environment = new EnvironmentService();
  const esriLoaderWrapperService = new EsriLoaderWrapperService(environment);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EsriLoaderWrapperService,
          useValue: esriLoaderWrapperService,
        },
      ],
    });
    service = TestBed.inject(MapService);
  });

  it('should created MapService', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a default map', async () => {
    const basemap = 'streets';
    const centerLon = -112.077;
    const centerLat = 33.491;
    const zoom = 10;
    const elementRef = new ElementRef(null);

    const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve([FakeModule, FakeMapViewModule, FakeModule])
    );

    await service.initDefaultMap(basemap, centerLon, centerLat, zoom, elementRef);

    expect(loadModulesSpy).toHaveBeenCalled();
    expect(service.mapView).not.toBeUndefined();
  });
});
