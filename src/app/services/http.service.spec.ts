import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { TestBase } from 'src/test/testBase';

import { HttpService } from './http.service';
import { EnvironmentService } from './environment.service';

fdescribe('HttpService', () => {
  let service: HttpService;
  const mockEnvironment = TestBase.getMockEnvironment();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EnvironmentService, useValue: mockEnvironment }, HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
  });

  it('should create HttpService', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET request to randomPtsPhxUrl', inject(
    // Inject HttpTestingController to create a mock httpClient instance.
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      const numPoints = 100;
      const mockParams = new HttpParams().set('numPoints', numPoints.toString());
      const mockResponse: Array<IMapPoint> = [
        {
          location: 'Foo',
          lat: 33.1995,
          lon: -112.261,
        },
        {
          location: 'Bar',
          lat: 33.6495,
          lon: -112.1032,
        },
      ];
      httpService.getRandomPointsInPhx(numPoints).subscribe((response) => {
        expect(response).toBe(mockResponse);
      });

      // Create a request using the mock HttpClient client, calling the mockUrl with mockParams and mockHeaders.
      const req = httpMock.expectOne([service.environment.randomPtsPhxUrl, mockParams.toString()].join('?'));

      // Expect the request made by the mock HttpClient client to be a GET request.
      expect(req.request.method).toEqual('GET');

      // Set mockResponse to be returned by the request.
      req.flush(mockResponse);
    }
  ));
});
