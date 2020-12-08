import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestBase } from 'src/test/testBase';
import { IMapPoint } from '../interfaces/iMapPoint';

import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load map data from API and add points to map', () => {
    expect(component.showSpinner).toEqual(false);

    const mockResponse: Array<IMapPoint> = TestBase.getIMapPointArray();

    const showSpinnerSpy = spyOnProperty(component, 'showSpinner', 'set');
    const getRandomPointsInPhxSpy = spyOn(component.apiService, 'getRandomPointsInPhx').and.returnValue(
      of(mockResponse)
    );

    component.loadDataClick();

    expect(getRandomPointsInPhxSpy).toHaveBeenCalledTimes(1);
    expect(showSpinnerSpy).toHaveBeenCalledTimes(2);
    expect(component.showSpinner).toEqual(false);
  });
});
