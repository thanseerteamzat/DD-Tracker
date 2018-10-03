import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEntryDetailsComponent } from './invoice-entry-details.component';

describe('InvoiceEntryDetailsComponent', () => {
  let component: InvoiceEntryDetailsComponent;
  let fixture: ComponentFixture<InvoiceEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
