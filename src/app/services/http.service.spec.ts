import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';

describe('HttpService', () => {
  const mockUrl = 'https://foo.bar/baz';
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
  });

  it('should create HttpService', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET request', inject(
    // Inject HttpTestingController to create a mock httpClient instance.
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      const mockParams = new HttpParams().set('foo', 'bar').set('baz', 'qux');
      const mockHeaders = new HttpHeaders().set('x-foo-bar', 'baz');
      const mockResponse = {
        foo: 'bar',
        baz: 100,
        qux: [
          {
            blah: 1,
            corge: 'zjZ16',
          },
          {
            blah: 2,
            corge: 'AXVcw',
          },
        ],
      };

      httpService.get(mockUrl, mockParams, mockHeaders).subscribe((response) => {
        expect(response).toBe(mockResponse);
      });

      // Create a request using the mock HttpClient client, calling the mockUrl with mockParams and mockHeaders.
      const req = httpMock.expectOne([mockUrl, mockParams.toString()].join('?'));

      // Expect the request made by the mock HttpClient client to be a GET request.
      expect(req.request.method).toEqual('GET');

      // Set mockResponse to be returned by the request.
      req.flush(mockResponse);
    }
  ));
});
