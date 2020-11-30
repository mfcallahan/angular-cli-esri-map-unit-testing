import { TestBed } from '@angular/core/testing';

import { ArcGisWrapperService } from './arcGisWrapper.service';

describe('ArcgisService', () => {
  let service: ArcGisWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcGisWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
