import { HttpParams } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';
import { HttpService } from './http.service';
import esri = __esri; // Esri types

// This class encapsulates the Esri MapView and methods to manipulate the map. It is a singleton service, provided in
// the application root so that it can be injected into any component which needs to access the ArcGIS map.
@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapView?: esri.MapView;

  constructor(readonly esriLoaderWrapperService: EsriLoaderWrapperService, readonly environment: EnvironmentService) {}

  // Initialize a default Map object for the app, which is rendered with a MapView that is bound to the
  // DOM element inside parameter 'mapElementRef'
  public async initDefaultMap(
    basemap: string,
    centerLon: number,
    centerLat: number,
    zoom: number,
    mapElementRef?: ElementRef
  ): Promise<void> {
    const [Map, MapView, BasemapToggle] = await this.esriLoaderWrapperService.loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/BasemapToggle',
    ]);

    const map = this.esriLoaderWrapperService.getInstance<esri.Map>(Map, { basemap });

    this.mapView = this.esriLoaderWrapperService.getInstance<esri.MapView>(MapView, {
      map,
      center: [centerLon, centerLat],
      zoom,
      container: mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });

    const toggle = this.esriLoaderWrapperService.getInstance<esri.BasemapToggle>(BasemapToggle, {
      view: this.mapView,
      nextBasemap: 'hybrid',
    });

    this.mapView?.ui.add(toggle, 'top-left');
  }

  public async addPointsToMap(json: object): Promise<void> {}

  public zoomToLayer(): void {}
}
