import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly environment: EnvironmentService, private readonly httpClient: HttpClient) {}

  public getRandomPointsInPhx(numPoints: number): Observable<object> {
    const params = new HttpParams().set('numPoints', numPoints.toString());

    return this.httpClient.get(this.environment.randomPtsPhxUrl, { params });
  }
}
