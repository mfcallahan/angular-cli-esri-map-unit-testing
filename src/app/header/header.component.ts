import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showSpinner = false;

  constructor(readonly httpService: HttpService, readonly mapService: MapService) {}

  public loadDataClick(): void {
    this.showSpinner = true;
    const numPointsToLoad = 100;

    this.httpService.getRandomPointsInPhx(numPointsToLoad).subscribe(async (response: any) => {
      await this.mapService.addPointsToMap(response);
      this.showSpinner = false;
    });
  }
}
