import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetPosition } from 'src/app/enums/widgetPosition';
import { BasemapId } from 'src/app/enums/basemapId';
import { MapService } from 'src/app/services/map.service';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapView', { static: false })
  mapElementRef?: ElementRef;

  constructor(readonly environment: EnvironmentService, readonly mapService: MapService) {}

  async ngAfterViewInit(): Promise<void> {
    await this.mapService.initDefaultMap(
      BasemapId.streets,
      this.environment.baseConfigs.mapSettings.defaultCenterLon,
      this.environment.baseConfigs.mapSettings.defaultCenterLat,
      this.environment.baseConfigs.mapSettings.defaultZoom,
      this.mapElementRef
    );

    this.mapService.addAllMapWidgets(BasemapId.hybrid, WidgetPosition.topLeft, WidgetPosition.topRight);
  }
}
