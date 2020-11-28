import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ILoadScriptOptions, loadModules } from 'esri-loader';
import esri = __esri;
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: false })
  private mapElementRef?: ElementRef;
  mapView?: esri.MapView;
  map?: esri.Map;
  defaultCenterLat: number;
  defaultCenterLon: number;
  defaultZoom: number;
  defaultBaseMap: string;
  defaultLoadScriptOptions: ILoadScriptOptions;

  constructor(private readonly environment: EnvironmentService) {
    // Set default map center and zoom to continental USA
    this.defaultCenterLat = 39.83;
    this.defaultCenterLon = -98.58;
    this.defaultZoom = 5;
    this.defaultBaseMap = 'streets';
    this.defaultLoadScriptOptions = {
      url: this.environment.baseConfigs.arcgisJsApiSettings.apiUrl,
    };
  }

  async ngOnInit(): Promise<void> {
    this.initDefaultMap();
  }

  private async initDefaultMap(): Promise<void> {
    const [Map, MapView] = await this.loadModulesWrapper(['esri/Map', 'esri/views/MapView']);

    this.map = new Map({
      basemap: this.defaultBaseMap,
    });

    this.mapView = new MapView({
      map: this.map,
      center: [this.defaultCenterLon, this.defaultCenterLat],
      zoom: this.defaultZoom,
      container: this.mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });

    this.addBaseMapToggle();
  }

  private async addBaseMapToggle(): Promise<void> {
    const [BasemapToggle] = await this.loadModulesWrapper(['esri/widgets/BasemapToggle']);

    const toggle: esri.BasemapToggle = new BasemapToggle({
      view: this.mapView,
      nextBasemap: 'hybrid',
    });

    this.mapView?.ui.add(toggle, 'top-left');
  }

  private async loadModulesWrapper(modules: string[]): Promise<any[]> {
    return await loadModules(modules, this.defaultLoadScriptOptions);
  }
}