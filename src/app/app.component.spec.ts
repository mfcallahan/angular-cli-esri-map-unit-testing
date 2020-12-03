import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentService } from './services/environment.service';
import { TestBase } from 'src/test/testBase';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MapComponent } from './map/map.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let loadCssSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MapComponent],
      imports: [MaterialModule],
      providers: [EnvironmentService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loadCssSpy = spyOn(component.esriLoaderWrapperService, 'loadCss').and.returnValue();
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should create AppComponent', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(loadCssSpy).toHaveBeenCalledOnceWith(
      component.environment.baseConfigs.arcgisJsApiSettings.cssUrl,
      jasmine.any(String)
    );
  });
});
