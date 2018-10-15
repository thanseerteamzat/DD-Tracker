import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcvtpCenterInvoiceDetailsComponent } from './kcvtp-center-invoice-details.component';

describe('KcvtpCenterInvoiceDetailsComponent', () => {
  let component: KcvtpCenterInvoiceDetailsComponent;
  let fixture: ComponentFixture<KcvtpCenterInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcvtpCenterInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcvtpCenterInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
