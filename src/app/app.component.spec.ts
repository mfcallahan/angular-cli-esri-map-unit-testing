import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBase } from 'src/test/testBase';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBase.testTearDown(fixture);
  });

  it('should create AppComponent', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
