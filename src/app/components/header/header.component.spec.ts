import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestBase } from 'src/test/testBase';
import { HeaderComponent } from './header.component';
import { MapService } from 'src/app/services/map.service';
import { ApiService } from 'src/app/services/api.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService, MapService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.showSpinner = false;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  it('should load map data from API and add points to map', async () => {
    component.dataLoaded = false;

    const getRandomPointsInPhxSpy = createGetRandomPointsInPhxSpy();
    const addPointsToMapSpy = createAddPointsToMapSpy();

    await component.loadDataClick();

    expect(component.showSpinner).toEqual(false);
    expect(component.dataLoaded).toEqual(true);
    expect(getRandomPointsInPhxSpy).toHaveBeenCalledTimes(1);
    expect(addPointsToMapSpy).toHaveBeenCalledTimes(1);
  });

  it('should remove all points from map before loading map data from API and adding points to map', async () => {
    component.dataLoaded = true;

    const getRandomPointsInPhxSpy = createGetRandomPointsInPhxSpy();
    const addPointsToMapSpy = createAddPointsToMapSpy();

    await component.loadDataClick();

    expect(component.showSpinner).toEqual(false);
    expect(component.dataLoaded).toEqual(true);
    expect(getRandomPointsInPhxSpy).toHaveBeenCalledTimes(1);
    expect(addPointsToMapSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear all map data', () => {
    component.dataLoaded = true;

    const removeAllDataSpy = spyOn(component.mapService, 'removeAllPoints').and.callFake(() => {
      return;
    });

    component.clearDataClick();

    expect(component.dataLoaded).toEqual(false);
    expect(removeAllDataSpy).toHaveBeenCalledTimes(1);
  });

  function createGetRandomPointsInPhxSpy(): jasmine.Spy {
    return spyOn(component.apiService, 'getRandomPointsInPhx').and.returnValue(of(TestBase.getIMapPointArray()));
  }

  function createAddPointsToMapSpy(): jasmine.Spy {
    return spyOn(component.mapService, 'addPointsToMap').and.returnValue(Promise.resolve());
  }
});
