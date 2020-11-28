import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  get(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.get(url, { params, headers });
  }
}
