import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
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

  constructor() {
    // Set default map center and zoom to continental USA
    this.defaultCenterLat = 39.83;
    this.defaultCenterLon = -98.58;
    this.defaultZoom = 5;
    this.defaultBaseMap = 'dark-gray';
  }

  ngOnInit(): void {
    this.initDefaultMap();
  }

  private async initDefaultMap(): Promise<void> {
    const [Map, MapView] = (await loadModules(['esri/Map', 'esri/views/MapView'])) as [
      esri.MapConstructor,
      esri.MapViewConstructor
    ];

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
  }
}
