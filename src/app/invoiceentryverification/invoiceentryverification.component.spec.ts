import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceentryverificationComponent } from './invoiceentryverification.component';

describe('InvoiceentryverificationComponent', () => {
  let component: InvoiceentryverificationComponent;
  let fixture: ComponentFixture<InvoiceentryverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceentryverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceentryverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
