import { TestBed } from '@angular/core/testing';

import { EsriLoaderWrapperService } from './esriLoaderWrapper.service';

describe('ArcgisService', () => {
  let service: EsriLoaderWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriLoaderWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
