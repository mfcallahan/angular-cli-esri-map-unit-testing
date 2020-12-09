import esri = __esri;
import * as TypeMoq from 'typemoq';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestBase } from 'src/test/testBase';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';
import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;
  const environment = new EnvironmentService();
  const esriLoaderWrapperService = new EsriLoaderWrapperService(environment);
  const mockEnvironment = TestBase.getMockEnvironment();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EnvironmentService,
          useValue: mockEnvironment,
        },
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
    // initDefaultMap() parameter value
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
      .withArgs(
        jasmine.objectContaining(mockMap),
        jasmine.objectContaining({ basemap: mockEnvironment.baseConfigs.defaultMapSettings.basemapId })
      )
      .and.returnValue(mockMap.object)
      .withArgs(
        jasmine.objectContaining(mockMapView),
        jasmine.objectContaining({
          map: mockMap.object,
          center: [
            mockEnvironment.baseConfigs.defaultMapSettings.centerLon,
            mockEnvironment.baseConfigs.defaultMapSettings.centerLat,
          ],
          zoom: mockEnvironment.baseConfigs.defaultMapSettings.zoomLevel,
          container: elementRef?.nativeElement,
        })
      )
      .and.returnValue(mockMapView.object);

    // Call the method under test.
    await service.initDefaultMap(elementRef);

    // Assert the Spy objects were called.
    expect(loadModulesSpy).toHaveBeenCalledTimes(1);
    expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);

    // Assert class properties were set with the expected values.
    expect(service.map).toBe(mockMap.object);
    expect(service.mapView).toBe(mockMapView.object);
  });

  it('should add widgets to MapView', async () => {
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
        jasmine.objectContaining({
          view: service.mapView,
          nextBasemap: mockEnvironment.baseConfigs.defaultMapSettings.widgets.basemapToggle.nextBasemap,
        })
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
    await service.addAllMapWidgets();

    // Assert the Spy objects were called.
    expect(loadModulesSpy).toHaveBeenCalledTimes(1);
    expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);

    // Assert the widgets were added to MapService.mapView.ui
    mockDefaultUi.verify(
      (mock) =>
        mock.add(
          TypeMoq.It.isAny(),
          TypeMoq.It.isValue(mockEnvironment.baseConfigs.defaultMapSettings.widgets.basemapToggle.position)
        ),
      TypeMoq.Times.exactly(1)
    );

    mockDefaultUi.verify(
      (mock) =>
        mock.add(
          TypeMoq.It.isAny(),
          TypeMoq.It.isValue(mockEnvironment.baseConfigs.defaultMapSettings.widgets.zoom.position)
        ),
      TypeMoq.Times.exactly(1)
    );
  });

  it('should remove all points from map', () => {
    const zoomToDefaultExtent = false;

    const mockMap = TypeMoq.Mock.ofType<esri.Map>();

    service.map = mockMap.object;

    service.removeAllPoints(zoomToDefaultExtent);

    mockMap.verify((mock) => mock.removeAll(), TypeMoq.Times.exactly(1));
  });

  fit('should remove all points from map and zoom to default extent', () => {
    const zoomToDefaultExtent = true;

    const mockMap = TypeMoq.Mock.ofType<esri.Map>();
    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();

    service.map = mockMap.object;
    service.mapView = mockMapView.object;

    service.removeAllPoints(zoomToDefaultExtent);
    mockMap.verify((mock) => mock.removeAll(), TypeMoq.Times.exactly(1));
    mockMapView.verify(
      (mock) =>
        mock.goTo(
          TypeMoq.It.isObjectWith({
            center: [
              service.environment.baseConfigs.defaultMapSettings.centerLon,
              service.environment.baseConfigs.defaultMapSettings.centerLat,
            ],
            zoom: service.environment.baseConfigs.defaultMapSettings.zoomLevel,
          })
        ),
      TypeMoq.Times.exactly(1)
    );
  });
});
