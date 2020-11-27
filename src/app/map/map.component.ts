import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: false })
  private mapRef?: ElementRef;
  mapView?: esri.MapView;
  map?: esri.Map;

  constructor() {}

  async ngOnInit(): Promise<void> {
    const [Map, MapView] = (await loadModules(['esri/Map', 'esri/views/MapView'])) as [
      esri.MapConstructor,
      esri.MapViewConstructor
    ];

    this.map = new Map({
      basemap: 'dark-gray',
    });
    this.mapView = new MapView({
      map: this.map,
      center: [-112.01, 33.44],
      zoom: 12,
      container: this.mapRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });
  }
}
