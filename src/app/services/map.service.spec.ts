import esri = __esri;
import * as TypeMoq from 'typemoq';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';

import { MapService } from './map.service';

describe('MapService', () => {
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
    // Arrange
    const mockBasemapToggle = TypeMoq.Mock.ofType<esri.BasemapToggle>();

    const mockDefaultUi = TypeMoq.Mock.ofType<esri.DefaultUI>();
    mockDefaultUi
      .setup((m) => m.add(TypeMoq.It.isAny(), TypeMoq.It.isAnyString()))
      .returns((): void => {
        return;
      });

    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();
    mockMapView.setup((m) => m.ui).returns(() => mockDefaultUi.object);

    const mockMap = TypeMoq.Mock.ofType<esri.Map>();

    const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve([mockMap, mockMapView, mockBasemapToggle])
    );

    spyOn(service.esriLoaderWrapperService, 'getInstance').and.returnValues(
      mockMap.object,
      mockMapView.object,
      mockBasemapToggle.object
    );

    const basemap = 'streets';
    const centerLon = -112.077;
    const centerLat = 33.491;
    const zoom = 10;
    const elementRef = new ElementRef(null);

    // Act
    await service.initDefaultMap(basemap, centerLon, centerLat, zoom, elementRef);

    // Assert
    expect(loadModulesSpy).toHaveBeenCalled();
    expect(service.mapView).not.toBeUndefined();
    mockDefaultUi.verify((m) => m.add(TypeMoq.It.isAny(), TypeMoq.It.isAnyString()), TypeMoq.Times.atLeastOnce());
  });
});
