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
    const mockMap = TypeMoq.Mock.ofType<esri.Map>();
    const mockDefaultUi = TypeMoq.Mock.ofType<esri.DefaultUI>();
    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();
    mockMapView.setup((mock) => mock.ui).returns(() => mockDefaultUi.object);
    const mockBasemapToggle = TypeMoq.Mock.ofType<esri.BasemapToggle>();
    const mockZoom = TypeMoq.Mock.ofType<esri.Zoom>();

    const esriMockTypes = [mockMap, mockMapView, mockBasemapToggle, mockZoom];

    const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve(esriMockTypes)
    );

    const getInstanceSpy = spyOn(service.esriLoaderWrapperService, 'getInstance').and.returnValues(
      ...esriMockTypes.map((mock) => mock.object)
    );

    const basemap = 'streets';
    const centerLon = -112.077;
    const centerLat = 33.491;
    const zoomLevel = 10;
    const elementRef = new ElementRef(null);

    // Act
    await service.initDefaultMap(basemap, centerLon, centerLat, zoomLevel, elementRef);

    // Assert
    expect(loadModulesSpy).toHaveBeenCalledTimes(1);
    expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);
    expect(service.mapView).not.toBeUndefined();
    expect(service.mapView).toBe(mockMapView.object);
    mockDefaultUi.verify((mock) => mock.add(TypeMoq.It.isAny(), TypeMoq.It.isAnyString()), TypeMoq.Times.exactly(2));
  });
});
