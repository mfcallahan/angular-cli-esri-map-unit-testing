import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(readonly httpService: HttpService, readonly mapService: MapService) {}

  public loadDataClick(): void {
    const numPointsToLoad = 100;

    this.httpService.getRandomPointsInPhx(numPointsToLoad).subscribe((response) => {
      this.mapService.addPointsToMap(response);
    });
  }
}
