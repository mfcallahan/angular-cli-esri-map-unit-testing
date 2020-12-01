import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapView', { static: false })
  private mapElementRef?: ElementRef;
  defaultCenterLat: number;
  defaultCenterLon: number;
  defaultZoom: number;
  defaultBaseMap: string;

  constructor(private readonly environment: EnvironmentService, private readonly mapService: MapService) {
    // Set default map center and zoom to continental USA
    this.defaultCenterLat = 39.83;
    this.defaultCenterLon = -98.58;
    this.defaultZoom = 5;
    this.defaultBaseMap = 'streets';
  }

  ngAfterViewInit(): void {
    this.mapService.initDefaultMap(
      this.defaultBaseMap,
      this.defaultCenterLon,
      this.defaultCenterLat,
      this.defaultZoom,
      this.mapElementRef
    );
  }
}
