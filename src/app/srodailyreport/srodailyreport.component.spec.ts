import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrodailyreportComponent } from './srodailyreport.component';

describe('SrodailyreportComponent', () => {
  let component: SrodailyreportComponent;
  let fixture: ComponentFixture<SrodailyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrodailyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrodailyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
