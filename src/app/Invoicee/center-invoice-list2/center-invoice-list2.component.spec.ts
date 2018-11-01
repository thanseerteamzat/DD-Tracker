import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterInvoiceList2Component } from './center-invoice-list2.component';

describe('CenterInvoiceList2Component', () => {
  let component: CenterInvoiceList2Component;
  let fixture: ComponentFixture<CenterInvoiceList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterInvoiceList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterInvoiceList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
