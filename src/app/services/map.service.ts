import { ElementRef, Injectable, Type } from '@angular/core';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
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
}
