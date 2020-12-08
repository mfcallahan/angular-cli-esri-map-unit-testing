import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetPosition } from 'src/app/enums/widgetPosition';
import { BasemapId } from 'src/app/enums/basemapId';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapView', { static: false })
  mapElementRef?: ElementRef;
  // Set default map center and zoom to continental USA
  defaultCenterLat = 39.83;
  defaultCenterLon = -98.58;
  defaultZoom = 5;
  defaultBaseMap = 'streets';

  constructor(readonly mapService: MapService) {}

  async ngAfterViewInit(): Promise<void> {
    await this.mapService.initDefaultMap(
      this.defaultBaseMap,
      this.defaultCenterLon,
      this.defaultCenterLat,
      this.defaultZoom,
      this.mapElementRef
    );

    this.mapService.addAllMapWidgets(BasemapId.hybrid, WidgetPosition.topLeft, WidgetPosition.topRight);
  }
}
