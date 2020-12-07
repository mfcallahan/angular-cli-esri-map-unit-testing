import { Component } from '@angular/core';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { ApiService } from 'src/app/services/api.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showSpinner = false;

  constructor(readonly apiService: ApiService, readonly mapService: MapService) {}

  public loadDataClick(): void {
    this.showSpinner = true;
    const numPointsToLoad = 100;

    this.apiService.getRandomPointsInPhx(numPointsToLoad).subscribe(async (response: Array<IMapPoint>) => {
      await this.mapService.addPointsToMap(response);
      this.showSpinner = false;
    });
  }
}
