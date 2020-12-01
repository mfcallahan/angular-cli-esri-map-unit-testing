import { ElementRef, Injectable } from '@angular/core';
import { EsriLoaderWrapperService } from './esriLoaderWrapper.service';
import esri = __esri; // Esri types

// This class encapsulates the Esri MapView and methods to manipulate the map. It is a singleton service, provided in
// the application root so that it can be injected into any component which needs to get or set map data.
@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapView?: esri.MapView;

  constructor(readonly esriLoaderWrapperService: EsriLoaderWrapperService) {}

  async initDefaultMap(
    basemap: string,
    centerLon: number,
    centerLat: number,
    zoom: number,
    mapElementRef?: ElementRef
  ): Promise<void> {
    const [Map, MapView] = await this.esriLoaderWrapperService.loadModules(['esri/Map', 'esri/views/MapView']);

    const map = new Map({
      basemap,
    });

    this.mapView = new MapView({
      map,
      center: [centerLon, centerLat],
      zoom,
      container: mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });

    this.addBaseMapToggle();
  }

  private async addBaseMapToggle(): Promise<void> {
    const [BasemapToggle] = await this.esriLoaderWrapperService.loadModules(['esri/widgets/BasemapToggle']);

    const toggle: esri.BasemapToggle = new BasemapToggle({
      view: this.mapView,
      nextBasemap: 'hybrid',
    });

    this.mapView?.ui.add(toggle, 'top-left');
  }
}
