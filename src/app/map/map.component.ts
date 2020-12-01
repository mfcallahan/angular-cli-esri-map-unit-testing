import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';
import { IArcGisWrapperService } from 'src/app/interfaces/iArcGisWrapperService';
import { ArcGisWrapperServiceProvider } from 'src/app/services/arcGisWrapper/arcGisWrapperServiceProvider';
import esri = __esri;

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

  constructor(
    private readonly environment: EnvironmentService,
    // Interfaces are a design time concept in TypeScript and are not available at run time, so the constructor
    // parameter for arcGisWrapperService is marked with the @Inject() decorator. The DI framework will use a
    // custom provider for this dependency, injecting a concrete implementation of IArcGisWrapperService which is
    // defined in ArcGisWrapperServiceProvider.
    @Inject(ArcGisWrapperServiceProvider)
    private readonly arcGisWrapperService: IArcGisWrapperService
  ) {
    // Set default map center and zoom to continental USA
    this.defaultCenterLat = 39.83;
    this.defaultCenterLon = -98.58;
    this.defaultZoom = 5;
    this.defaultBaseMap = 'streets';
  }

  async ngOnInit(): Promise<void> {
    await this.initDefaultMap();
  }

  private async initDefaultMap(): Promise<void> {
    const [Map, MapView] = await this.arcGisWrapperService.loadModules(['esri/Map', 'esri/views/MapView']);

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

    await this.addBaseMapToggle();
  }

  private async addBaseMapToggle(): Promise<void> {
    const [BasemapToggle] = await this.arcGisWrapperService.loadModules(['esri/widgets/BasemapToggle']);

    const toggle: esri.BasemapToggle = new BasemapToggle({
      view: this.mapView,
      nextBasemap: 'hybrid',
    });

    this.mapView?.ui.add(toggle, 'top-left');
  }
}
