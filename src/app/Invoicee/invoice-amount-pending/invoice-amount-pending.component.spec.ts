import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAmountPendingComponent } from './invoice-amount-pending.component';

describe('InvoiceAmountPendingComponent', () => {
  let component: InvoiceAmountPendingComponent;
  let fixture: ComponentFixture<InvoiceAmountPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAmountPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAmountPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
