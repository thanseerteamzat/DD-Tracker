import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcErpDespatchEntryComponent } from './kkc-erp-despatch-entry.component';

describe('KkcErpDespatchEntryComponent', () => {
  let component: KkcErpDespatchEntryComponent;
  let fixture: ComponentFixture<KkcErpDespatchEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcErpDespatchEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcErpDespatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
