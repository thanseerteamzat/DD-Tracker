import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAmountPendingListComponent } from './invoice-amount-pending-list.component';

describe('InvoiceAmountPendingListComponent', () => {
  let component: InvoiceAmountPendingListComponent;
  let fixture: ComponentFixture<InvoiceAmountPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAmountPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAmountPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
