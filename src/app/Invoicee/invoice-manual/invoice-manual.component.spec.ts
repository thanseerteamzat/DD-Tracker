import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceManualComponent } from './invoice-manual.component';

describe('InvoiceManualComponent', () => {
  let component: InvoiceManualComponent;
  let fixture: ComponentFixture<InvoiceManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
