import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterInvoiceReportComponent } from './center-invoice-report.component';

describe('CenterInvoiceReportComponent', () => {
  let component: CenterInvoiceReportComponent;
  let fixture: ComponentFixture<CenterInvoiceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterInvoiceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterInvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
