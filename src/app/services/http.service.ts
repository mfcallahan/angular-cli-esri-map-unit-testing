import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly environment: EnvironmentService, private readonly httpClient: HttpClient) {}

  // TODO: make private or remove?
  public get(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.get(url, { params, headers });
  }

  // TODO: add test coverage
  public getRandomPointsInPhx(numPoints: number): Observable<object> {
    const params = new HttpParams().set('numPoints', numPoints.toString());

    return this.get(this.environment.randomPtsPhxUrl, params);
  }
}
