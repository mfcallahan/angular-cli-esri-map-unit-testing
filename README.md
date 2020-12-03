## angular-cli-esri-map-unit-testing

An approach for unit testing an Angular CLI application which uses the [esri-loader](https://github.com/Esri/esri-loader) to lazy load [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) modules. See my [blog post](https://seesharpdotnet.wordpress.com/2020/12/03/angular-and-arcgis-api-for-javascript-a-unit-testing-strategy-using-dependency-injection-and-the-facade-pattern/) for an in depth tutorial and walk through of the code in this repository.

### The problem

The [esri-loader](https://github.com/Esri/esri-loader) allows an application to load [Dojo AMD Modules](https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html) outside of the [Dojo Toolkit](https://dojotoolkit.org/). A module can be [lazy loaded](https://github.com/Esri/esri-loader#lazy-loading-the-arcgis-api-for-javascript), improving the initial load performance of the application by waiting to fetch API resources until they are actually needed:

```typescript
async initDefaultMap(): Promise<void> {
  // loadModules() will make HTTP requests to arcgis.com to fetch specified modules
  const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

  const map = new Map({
    basemap: 'streets',
  });

  this.mapView = new MapView({
    map: map,
    center: [-98.58, 39.83],
    zoom: 5,
  });
}
```

However, this can make unit testing difficult, as the system under test does not have any reference to the objects in an ArcGIS API module until an HTTP request is made to fetch it. A test for the `initDefaultMap()` method will call `loadModules()` and make HTTP requests to arcgis.com to fetch the resources needed. This may not be desireable for a few reasons:

- The test becomes more like an integration test; we want to assert the `component.mapView` was correctly set inside `loadModules()`, not test that the application could connect to the internet and fetch dependencies.

- Tests may be executed in an environment which may not have access to the ArcGIS CDN, such as an automated build pipeline or server.

- Tests to ensure error responses from the request to load an ArcGIS API module (the unhappy path) are handled properly may be necessary.

```typescript
it('should initialize a default map', async () => {
  await component.initDefaultMap(); // test will make actual HTTP requests!

  expect(component.mapView).not.toBeUndefined();
});
```

### My solution

Difficult to mock code is difficult to test! By refactoring the application code to follow the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) and leverage [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection), the tight coupling between the above `initDefaultMap()` method and the [esri-loader](https://github.com/Esri/esri-loader) can be eliminated. The [Facade Pattern](https://en.wikipedia.org/wiki/Facade_pattern) can be used, creating a wrapper class for `loadModules()` and others methods exported by [esri-loader](https://github.com/Esri/esri-loader) which can then be injected into the class that has a dependencies on ArcGIS API modules. The wrapper class exposes its own `loadModules()` method which can be easily mocked, eliminating HTTP requests to the ArcGIS CDN in a test suite. A library such as [TypeMoq](https://github.com/florinn/typemoq) can be used to create mock instances of the various ArcGIS API modules.

```typescript
// Singleton service wrapper class for esri-loader
import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';

@Injectable({ providedIn: 'root' })
export class EsriLoaderWrapperService {
  constructor() {}

  public async loadModules(modules: string[]): Promise<any[]> {
    return await loadModules(modules);
  }
}

// Test suite
describe('MapService', () => {
  // ...

  it('should initialize a default map', async () => {
    // Mocked instances of ArcGIS API modules
    const mockMap = TypeMoq.Mock.ofType<esri.Map>();
    const mockMapView = TypeMoq.Mock.ofType<esri.MapView>();

    // Mocked behavior of loadModules() method - HTTP requests will not be made
    const loadModulesSpy = spyOn(component.esriLoaderWrapperService, 'loadModules').and.returnValue(
      Promise.resolve([mockMap, mockMapView])
    );

    await component.initDefaultMap();

    expect(loadModulesSpy).toHaveBeenCalled();
    expect(component.mapView).not.toBeUndefined();
  });
});
```
