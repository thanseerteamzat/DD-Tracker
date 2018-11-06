import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SroDespatchMonthReportComponent } from './sro-despatch-month-report.component';

describe('SroDespatchMonthReportComponent', () => {
  let component: SroDespatchMonthReportComponent;
  let fixture: ComponentFixture<SroDespatchMonthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SroDespatchMonthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SroDespatchMonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
