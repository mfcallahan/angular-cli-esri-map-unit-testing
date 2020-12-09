import esri = __esri;
import * as TypeMoq from 'typemoq';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';
import { WidgetPosition } from 'src/app/enums/widgetPosition';
import { BasemapId } from 'src/app/enums/basemapId';
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

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a default map', async () => {
    // initDefaultMap() parameter values
    const basemapId = BasemapId.streets;
    const centerLon = -112.077;
    const centerLat = 33.491;
    const zoomLevel = 10;
    const elementRef = new ElementRef(null);

    // Create mock types of the ArcGIS API modules that initDefaultMap() will load.
    const mockMap = TypeMoq.Mock.ofType<esri.Map>();
    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();

    const esriMockTypes = [mockMap, mockMapView];

    // Spy on the EsriLoaderWrapperService.loadModules() method and mock its return value to be an array of the mocked ArcGIS API modules.
    const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve(esriMockTypes)
    );

    // Spy on the EsriLoaderWrapperService.getInstance() method, returning the correct instances of the mocked ArcGIS API modules
    // according to the arguments passed in.
    const getInstanceSpy = spyOn(service.esriLoaderWrapperService, 'getInstance')
      .withArgs(jasmine.objectContaining(mockMap), jasmine.objectContaining({ basemap: basemapId }))
      .and.returnValue(mockMap.object)
      .withArgs(
        jasmine.objectContaining(mockMapView),
        jasmine.objectContaining({
          map: mockMap.object,
          center: [centerLon, centerLat],
          zoom: zoomLevel,
          container: elementRef?.nativeElement,
        })
      )
      .and.returnValue(mockMapView.object);

    // Call the method under test.
    await service.initDefaultMap(basemapId, centerLon, centerLat, zoomLevel, elementRef);

    // Assert the Spy objects were called.
    expect(loadModulesSpy).toHaveBeenCalledTimes(1);
    expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);

    // Assert class properties were set with the expected values.
    expect(service.defaultCenterLat).toBe(centerLat);
    expect(service.defaultCenterLon).toBe(centerLon);
    expect(service.defaultZoom).toBe(zoomLevel);
    expect(service.map).toBe(mockMap.object);
    expect(service.mapView).toBe(mockMapView.object);
  });

  it('should add widgets to MapView', async () => {
    // addAllMapWidgets() parameter values
    const basemapId = BasemapId.streetsNightVector;
    const basemapTogglePosition = WidgetPosition.bottomRight;
    const zoomPosition = WidgetPosition.topLeading;

    // Create mock types of the ArcGIS API modules that initDefaultMap() will load.
    const mockDefaultUi = TypeMoq.Mock.ofType<esri.DefaultUI>();
    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();
    // Set up the 'ui' property of mockMapView to return an instance of the mockDefaultUi.
    mockMapView.setup((mock) => mock.ui).returns(() => mockDefaultUi.object);

    const mockBasemapToggle = TypeMoq.Mock.ofType<esri.BasemapToggle>();
    const mockZoom = TypeMoq.Mock.ofType<esri.Zoom>();

    service.mapView = mockMapView.object;

    const esriMockTypes = [mockBasemapToggle, mockZoom];

    // Spy on the EsriLoaderWrapperService.loadModules() method and mock its return value to be an array of the mocked ArcGIS API modules.
    const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve(esriMockTypes)
    );

    // Spy on the EsriLoaderWrapperService.getInstance() method, returning the correct instances of the mocked ArcGIS API modules
    // according to the arguments passed in.
    const getInstanceSpy = spyOn(service.esriLoaderWrapperService, 'getInstance')
      .withArgs(
        jasmine.objectContaining(mockBasemapToggle),
        jasmine.objectContaining({ view: service.mapView, nextBasemap: basemapId })
      )
      .and.returnValue(mockBasemapToggle.object)
      .withArgs(
        jasmine.objectContaining(mockZoom),
        jasmine.objectContaining({
          view: service.mapView,
        })
      )
      .and.returnValue(mockMapView.object);

    // Call the method under test.
    await service.addAllMapWidgets(basemapId, basemapTogglePosition, zoomPosition);

    // Assert the Spy objects were called.
    expect(loadModulesSpy).toHaveBeenCalledTimes(1);
    expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);

    // Assert the widgets were added to MapService.mapView.ui
    mockDefaultUi.verify(
      (mock) => mock.add(TypeMoq.It.isAny(), TypeMoq.It.isValue(basemapTogglePosition)),
      TypeMoq.Times.exactly(1)
    );

    mockDefaultUi.verify(
      (mock) => mock.add(TypeMoq.It.isAny(), TypeMoq.It.isValue(zoomPosition)),
      TypeMoq.Times.exactly(1)
    );
  });
});
