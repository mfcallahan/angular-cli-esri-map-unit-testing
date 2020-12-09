import { ElementRef, Injectable } from '@angular/core';
import { EsriLoaderWrapperService } from 'src/app/services/esriLoaderWrapper.service';
import { EnvironmentService } from './environment.service';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { BasemapId } from 'src/app/enums/basemapId';
import esri = __esri; // Esri types

// This class encapsulates the Esri MapView and methods to manipulate the map. It is a singleton service, provided in
// the application root so that it can be injected into any component which needs to access the ArcGIS map.
@Injectable({
  providedIn: 'root',
})
export class MapService {
  map?: esri.Map;
  mapView?: esri.MapView;

  constructor(readonly environment: EnvironmentService, readonly esriLoaderWrapperService: EsriLoaderWrapperService) {}

  // Initialize a default Map object for the app, which is rendered with a MapView that is bound to the DOM
  // element inside parameter 'mapElementRef'
  public async initDefaultMap(mapElementRef?: ElementRef): Promise<void> {
    const [Map, MapView] = await this.esriLoaderWrapperService.loadModules(['esri/Map', 'esri/views/MapView']);

    this.map = this.esriLoaderWrapperService.getInstance<esri.Map>(Map, {
      basemap: this.environment.baseConfigs.defaultMapSettings.basemapId,
    });

    this.mapView = this.esriLoaderWrapperService.getInstance<esri.MapView>(MapView, {
      map: this.map,
      center: [
        this.environment.baseConfigs.defaultMapSettings.centerLon,
        this.environment.baseConfigs.defaultMapSettings.centerLat,
      ],
      zoom: this.environment.baseConfigs.defaultMapSettings.zoomLevel,
      container: mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });
  }

  // Creates instances of widgets and add them to the MapView
  public async addAllMapWidgets(): Promise<void> {
    const [BasemapToggle, Zoom] = await this.esriLoaderWrapperService.loadModules([
      'esri/widgets/BasemapToggle',
      'esri/widgets/Zoom',
    ]);

    const toggle = this.esriLoaderWrapperService.getInstance<esri.BasemapToggle>(BasemapToggle, {
      view: this.mapView,
      nextBasemap: BasemapId.hybrid,
    });

    const zoom = this.esriLoaderWrapperService.getInstance<esri.Zoom>(Zoom, {
      view: this.mapView,
    });

    this.mapView?.ui.add(toggle, this.environment.baseConfigs.defaultMapSettings.widgets.basemapTogglePosition);
    this.mapView?.ui.add(zoom, this.environment.baseConfigs.defaultMapSettings.widgets.zoomPosition);
  }

  public removeAllPoints(zoomToDefaultExtent: boolean): void {
    this.map?.removeAll();

    if (zoomToDefaultExtent) {
      this.mapView?.goTo({
        center: [
          this.environment.baseConfigs.defaultMapSettings.centerLon,
          this.environment.baseConfigs.defaultMapSettings.centerLat,
        ],
        zoom: this.environment.baseConfigs.defaultMapSettings.zoomLevel,
      });
    }
  }

  public async addPointsToMap(mapPoints: Array<IMapPoint>): Promise<void> {
    this.map?.removeAll();

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
