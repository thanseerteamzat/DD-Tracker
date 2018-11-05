import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcErpHoVerificationComponent } from './kkc-erp-ho-verification.component';

describe('KkcErpHoVerificationComponent', () => {
  let component: KkcErpHoVerificationComponent;
  let fixture: ComponentFixture<KkcErpHoVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcErpHoVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcErpHoVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
