## angular-cli-esri-map-unit-testing

An approach for unit testing an Angular CLI application which uses the [esri-loader](https://github.com/Esri/esri-loader) to lazy load [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) modules. See my [blog post](https://seesharpdotnet.wordpress.com/2020/12/03/angular-and-arcgis-api-for-javascript-a-unit-testing-strategy-using-dependency-injection-and-the-facade-pattern/) for an in depth tutorial and walk through of the code in this repository:

[**seesharpdotnet.wordpress.com/2020/12/03/angular-and-arcgis-api-for-javascript-a-unit-testing-strategy-using-dependency-injection-and-the-facade-pattern/**](https://seesharpdotnet.wordpress.com/2020/12/03/angular-and-arcgis-api-for-javascript-a-unit-testing-strategy-using-dependency-injection-and-the-facade-pattern/)

### The problem

The [esri-loader](https://github.com/Esri/esri-loader) allows an application to load ArcGIS API [Dojo AMD Modules](https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html) outside of the [Dojo Toolkit](https://dojotoolkit.org/). A module can be [lazy loaded](https://github.com/Esri/esri-loader#lazy-loading-the-arcgis-api-for-javascript), improving the initial load performance of the application by waiting to fetch API resources until they are actually needed:

```typescript
// MapService class to encapsulate ArcGIS API
@Injectable({ providedIn: 'root' })
export class MapService {
  mapView?: esri.MapView;

  async initDefaultMap(): Promise<void> {
    // loadModules() will make HTTP requests to arcgis.com to fetch specified modules
    const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

    this.mapView = new MapView({
      map: new Map({ basemap: 'streets' }),
      center: [-112.077, 39.83],
      zoom: 5,
    });
  }
}
```

However, this can make unit testing difficult, as the system under test does not have any reference to ArcGIS API modules objects until an HTTP request is made to fetch it. A test for the `initDefaultMap()` method will call `loadModules()` and make HTTP requests to Esri CDN at arcgis.com to fetch the resources needed. This may not be desirable for a few reasons:

- The test becomes more like an integration test; we want to assert the `component.mapView` was correctly set inside `loadModules()`, not test that the application could connect to the internet and fetch dependencies.

- Tests may be executed in an environment which may not have access to the internet or the Esri CDN, such as an automated build pipeline or build server.

- Tests to ensure error responses from the request to load an ArcGIS API module (the unhappy path) are handled properly may be necessary.

```typescript
// initDefaultMap() unit test
it('should initialize a default map', async () => {
  await service.initDefaultMap(); // test will make actual HTTP requests!

  expect(service.mapView).not.toBeUndefined();
});
```

### My solution

Difficult to mock code is difficult to test! By refactoring the application code to follow the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) and leverage [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection), the tight coupling between the above `initDefaultMap()` method and the [esri-loader](https://github.com/Esri/esri-loader) can be eliminated. The [Facade Pattern](https://en.wikipedia.org/wiki/Facade_pattern) can be used, creating a wrapper class for the esri-loader which can be injected into the class that has dependencies on ArcGIS API modules. The wrapper class exposes its own `loadModules()` method, and a `getInstance()` method, both of which can be easily mocked in tests.

```typescript
// Singleton service wrapper class for esri-loader
import { loadModules } from 'esri-loader';

@Injectable({ providedIn: 'root' })
export class EsriLoaderWrapperService {
  constructor() {}

  public async loadModules(modules: string[]): Promise<any[]> {
    return await loadModules(modules);
  }

  public getInstance<T>(type: new (paramObj: any) => T, paramObj?: any): T {
    return new type(paramObj);
  }
}
```

The `EsriLoaderWrapperService` class is injected into the `MapService` class. The `loadModules()` method is called to load the necessary ArcGIS API modules, and the `getInstance()` method is called to create a new instance of a module:

```typescript
// Updated MapService class
@Injectable({ providedIn: 'root' })
export class MapService {
  mapView?: esri.MapView;

  constructor(readonly esriLoaderWrapperService: EsriLoaderWrapperService) {}

  async initDefaultMap(): Promise<void> {
    const [Map, MapView] = await this.esriLoaderWrapperService.loadModules(['esri/Map', 'esri/views/MapView']);

    const map = this.esriLoaderWrapperService.getInstance<esri.Map>(Map, { 'streets' });

    this.mapView = this.esriLoaderWrapperService.getInstance<esri.MapView>(MapView, {
      map,
      center: [-112.077, 39.83],
      zoom: 5,
    });
  }
}
```

The updated unit tests can use a library such as [TypeMoq](https://github.com/florinn/typemoq) to mock ArcGIS API modules. Jasmine `Spy` objects are created to mock the behavior of the `EsriLoaderWrapperService.loadModules()` and `EsriLoaderWrapperService.getInstance()` methods, returning the mock modules, and instances of the mock modules, respectively.

```typescript
// Updated initDefaultMap() unit test
it('should initialize a default map', async () => {
  // Arrange
  const mockMap = TypeMoq.Mock.ofType<esri.Map>();
  const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();

  const esriMockTypes = [mockMap, mockMapView];

  const loadModulesSpy = spyOn(service.esriLoaderWrapperService, 'loadModules').and.returnValue(
    Promise.resolve(esriMockTypes)
  );

  const getInstanceSpy = spyOn(service.esriLoaderWrapperService, 'getInstance').and.returnValues(
    ...esriMockTypes.map((mock) => mock.object)
  );

  // Act
  await service.initDefaultMap(basemap, centerLon, centerLat, zoom, elementRef);

  // Assert
  expect(loadModulesSpy).toHaveBeenCalledTimes(1);
  expect(getInstanceSpy).toHaveBeenCalledTimes(esriMockTypes.length);
  expect(service.mapView).not.toBeUndefined();
  expect(service.mapView).toBe(mockMapView.object);
});
```

This repository contains a working Angular application which loads several different ArcGIS API for JavaScript modules. I have made an attempt to write clean, testable code, and provide maximum unit test coverage using the patterns and practices I outlined above. Feel free to browse or clone the repository, and use this to assist with unit testing your own Angular + ArcGIS applications. Any feedback back is welcomed!
