import { ElementRef, Injectable } from '@angular/core';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import esri = __esri; // Esri types

// This class encapsulates the Esri MapView and methods to manipulate the map. It is a singleton service, provided in
// the application root so that it can be injected into any component which needs to access the ArcGIS map.
@Injectable({
  providedIn: 'root',
})
export class MapService {
  map?: esri.Map;
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

    this.map = this.esriLoaderWrapperService.getInstance<esri.Map>(Map, { basemap });

    this.mapView = this.esriLoaderWrapperService.getInstance<esri.MapView>(MapView, {
      map: this.map,
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

  public clearAllLayers(): void {}

  public async addPointsToMap(mapPoints: Array<IMapPoint>): Promise<void> {
    const [Graphic, FeatureLayer] = await this.esriLoaderWrapperService.loadModules([
      'esri/Graphic',
      'esri/layers/FeatureLayer',
    ]);

    const graphics = mapPoints.map((point, i) => {
      return new Graphic({
        attributes: {
          ObjectId: i + 1,
          location: point.location,
        },
        geometry: {
          type: 'point',
          longitude: point.lon,
          latitude: point.lat,
        },
      });
    });

    const randomPointsLayer = new FeatureLayer({
      source: graphics,
      objectIdField: 'OBJECTID',
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: '#ffff00',
          size: '12px',
          outline: {
            color: '#0d0d0d',
            width: 1.5,
          },
        },
      },
      popupTemplate: {
        title: 'Map points',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'location',
                label: 'Location',
                visible: true,
              },
              {
                fieldName: 'latitude',
                label: 'Latitude',
                visible: true,
              },
              {
                fieldName: 'longitude',
                label: 'longitude',
                visible: true,
              },
            ],
          },
        ],
      },
    });

    this.map?.layers.add(randomPointsLayer);

    await this.zoomToLayer(randomPointsLayer);
  }

  public async zoomToLayer(layer: esri.FeatureLayer): Promise<void> {
    this.mapView?.goTo(await layer.queryExtent());
  }
}
